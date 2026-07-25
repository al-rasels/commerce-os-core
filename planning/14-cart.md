# Cart (Feature 1.3)

## 1. Endpoints

| Method | Path                     | Auth     | Description                                |
| ------ | ------------------------ | -------- | ------------------------------------------ |
| GET    | `/api/v1/cart`           | Optional | Retrieve current cart (by session or user) |
| POST   | `/api/v1/cart/items`     | Optional | Add item to cart                           |
| PUT    | `/api/v1/cart/items/:id` | Optional | Update item quantity                       |
| DELETE | `/api/v1/cart/items/:id` | Optional | Remove item from cart                      |
| DELETE | `/api/v1/cart`           | Optional | Clear entire cart                          |

All endpoints accept `X-Session-Id` header for guest identification. Authenticated users may omit the header — cart is resolved from `userId`.

```
Cart Resolution
┌──────────────┐
│  Request      │
│  ┌─────────┐  │
│  │Auth?    │──├──→ userId present? → find/merge cart by userId
│  │Session? │  │        ↓ no
│  └─────────┘  │    sessionId present? → find/create cart by sessionId
│               │        ↓ no
│               │    return 200 { items: [] }
└──────────────┘
```

---

## 2. Cart Entity

```
Cart {
  id: UUID
  userId?: UUID (FK → users.id, nullable)
  sessionId?: UUID (nullable, client-generated)
  expiresAt: DateTime (NOW() + 7 days)
  createdAt: DateTime
  updatedAt: DateTime

  items: CartItem[]

  // Invariants
  - Must have either userId or sessionId
  - Cannot add items if cart is abandoned
  - expiresAt is reset to NOW() + 7d on every mutation
}
```

```
CartItem {
  id: UUID
  cartId: UUID (FK → carts.id)
  productId: UUID (FK → products.id)
  variantId?: UUID (FK → product_variants.id, nullable)
  quantity: PositiveInt (1–99)
  priceCents: PositiveInt (snapshot at add time)
  createdAt: DateTime

  // Invariants
  - quantity <= variant.stockAvailable (rejected on add/update)
  - quantity >= 1
  - productId must reference an existing product (status = published)
  - priceCents is immutable once set; staleness flagged separately
}
```

**Prisma schema:**

```prisma
model Cart {
  id        String     @id @default(uuid())
  userId    String?    @unique
  sessionId String?
  expiresAt DateTime
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  items     CartItem[]

  @@index([sessionId])
  @@index([expiresAt])
}

model CartItem {
  id           String   @id @default(uuid())
  cartId       String
  productId    String
  variantId    String?
  quantity     Int
  priceCents   Int
  createdAt    DateTime @default(now())

  cart         Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)

  @@unique([cartId, variantId])
  @@index([cartId])
}
```

Note: `@@unique([cartId, variantId])` ensures upsert behavior — adding the same variant increments quantity instead of creating a duplicate row.

---

## 3. Merge on Login

When a guest with a non-empty session cart authenticates, the guest cart is merged into the user's cart (or a new cart is created for the user):

```
Merge Algorithm
1. Find guest cart by sessionId
2. Find or create user cart by userId
3. For each guest CartItem:
   a. Match existing user cart item by variantId (or productId if variantId is null)
   b. If match found → newQty = MAX(existing.qty + guest.qty, 99)
   c. If no match → insert new CartItem into user cart
4. Delete guest cart
5. Return merged user cart
```

```typescript
// cart.service.ts
async mergeOnLogin(sessionId: string, userId: string): Promise<Cart> {
  const guestCart = await this.prisma.cart.findUnique({
    where: { sessionId },
    include: { items: true },
  });
  if (!guestCart || guestCart.items.length === 0) return this.findOrCreateCart(userId);

  const userCart = await this.findOrCreateCart(userId);
  const existing = await this.prisma.cartItem.findMany({
    where: { cartId: userCart.id },
  });
  const existingMap = new Map(existing.map(i => [i.variantId ?? 'null', i]));

  for (const item of guestCart.items) {
    const key = item.variantId ?? 'null';
    const match = existingMap.get(key);

    if (match) {
      const quantity = Math.min(match.quantity + item.quantity, 99);
      await this.prisma.cartItem.update({
        where: { id: match.id },
        data: { quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          priceCents: item.priceCents,
        },
      });
    }
  }

  await this.prisma.cart.delete({ where: { id: guestCart.id } });
  return this.getCart(userCart.id);
}
```

---

## 4. Stock Validation

Every `POST /cart/items` and `PUT /cart/items/:id` must validate stock before mutating:

```typescript
// cart.service.ts
async validateStock(
  productId: string,
  variantId: string | null,
  requestedQty: number,
  existingQty = 0,
): Promise<void> {
  const product = await this.prisma.product.findUnique({
    where: { id: productId },
    select: { status: true },
  });
  if (!product || product.status !== 'published') {
    throw new NotFoundException('Product not found');
  }

  const variant = await this.prisma.productVariant.findUnique({
    where: { id: variantId ?? undefined },
    select: { stockAvailable: true },
  });
  if (!variant) {
    throw new NotFoundException('Variant not found');
  }

  const delta = requestedQty - existingQty;
  if (delta > 0 && delta > variant.stockAvailable) {
    throw new BadRequestException({
      code: 'INSUFFICIENT_STOCK',
      message: `Only ${variant.stockAvailable} units available`,
      available: variant.stockAvailable,
    });
  }
}
```

**Flow:**

```
Add Item Request
  → Validate quantity (1–99)
  → Validate product exists & published
  → Validate variant exists
  → Check stock: delta <= variant.stockAvailable
    → Fail: 400 INSUFFICIENT_STOCK
    → Pass: upsert CartItem (increment qty if duplicate variantId)
  → Touch cart.expiresAt = NOW() + 7d
  → Return updated cart
```

---

## 5. TTL Expiry & Cleanup

Abandoned carts expire 7 days after last mutation. A scheduled job runs daily:

```typescript
// cart-cleanup.processor.ts (BullMQ)
@Processor("cart-cleanup")
export class CartCleanupProcessor {
  constructor(private prisma: PrismaService) {}

  @Process("expire-carts")
  async expireCarts(): Promise<number> {
    const result = await this.prisma.cart.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    return result.count;
  }
}
```

```typescript
// cart-cleanup.module.ts (registration)
@Module({
  // BullMQ queue registration + cron schedule (daily at 03:00)
})
// Queue: cart-cleanup → expire-carts job
// Cron: 0 3 * * * → BullMQ Queue.add('cart-cleanup', 'expire-carts')
```

**Cron schedule:** `0 3 * * *` (daily 3 AM). Deletes all carts where `expiresAt < NOW()`. Cascade deletes cart items.

---

## 6. Price Snapshot & Staleness

`CartItem.priceCents` is set once on item creation and never updated. If the product's current price differs, the response includes a staleness flag:

```typescript
// cart.response.ts
interface CartItemResponse {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  priceCents: number;
  currentPriceCents: number;
  priceChanged: boolean;  // priceCents !== currentPriceCents
  createdAt: string;
}

// cart.service.ts
async enrichItem(item: CartItem): Promise<CartItemResponse> {
  const variant = await this.prisma.productVariant.findUnique({
    where: { id: item.variantId! },
    select: { priceCents: true },
  });
  return {
    ...item,
    currentPriceCents: variant?.priceCents ?? item.priceCents,
    priceChanged: item.priceCents !== (variant?.priceCents ?? item.priceCents),
  };
}
```

---

## 7. Validation Rules

| Rule                 | Scope      | Enforcement                      | Error Code              |
| -------------------- | ---------- | -------------------------------- | ----------------------- |
| Product exists       | POST/PUT   | `SELECT` before upsert           | `PRODUCT_NOT_FOUND`     |
| Product published    | POST/PUT   | Check `status = 'published'`     | `PRODUCT_NOT_AVAILABLE` |
| Variant exists       | POST/PUT   | Null variant = simple product    | `VARIANT_NOT_FOUND`     |
| Qty > 0              | POST/PUT   | DTO `@Min(1)`                    | `QUANTITY_MIN`          |
| Qty ≤ 99             | POST/PUT   | DTO `@Max(99)`                   | `QUANTITY_MAX`          |
| Stock available      | POST/PUT   | `delta <= stockAvailable`        | `INSUFFICIENT_STOCK`    |
| Max 50 items/cart    | POST       | `COUNT items < 50` before insert | `CART_FULL`             |
| Cart not abandoned   | ALL        | Check `expiresAt`                | `CART_EXPIRED`          |
| Item belongs to cart | PUT/DELETE | `item.cartId === cartId`         | `ITEM_NOT_IN_CART`      |

**DTOs:**

```typescript
// dto/add-cart-item.dto.ts
export class AddCartItemDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  @IsOptional()
  variantId?: string;

  @Min(1)
  @Max(99)
  quantity: number;
}

// dto/update-cart-item.dto.ts
export class UpdateCartItemDto {
  @Min(1)
  @Max(99)
  quantity: number;
}
```

---

## 8. Test Cases

```typescript
describe("CartController", () => {
  describe("GET /cart", () => {
    it("returns empty cart for new session");
    it("returns existing cart by sessionId");
    it("returns existing cart by userId (authenticated)");
    it("prefers userId over sessionId when both present");
  });

  describe("POST /cart/items", () => {
    it("adds item to guest cart (sessionId)");
    it("adds item to user cart (userId)");
    it("increments quantity when duplicate variant added");
    it("returns 400 for non-existent product");
    it("returns 400 for unpublished product");
    it("returns 400 for quantity > 99");
    it("returns 400 for quantity < 1");
    it("returns 400 INSUFFICIENT_STOCK when qty > stockAvailable");
    it("returns 400 CART_FULL when cart has 50 items");
    it("sets priceCents snapshot at add time");
    it("creates cart with expiresAt = NOW() + 7d");
  });

  describe("PUT /cart/items/:id", () => {
    it("updates quantity");
    it("returns 404 for item not in cart");
    it("returns 400 INSUFFICIENT_STOCK on increase beyond stock");
    it("returns 400 for quantity > 99");
  });

  describe("DELETE /cart/items/:id", () => {
    it("removes item from cart");
    it("returns 404 for non-existent item");
    it("does not affect other cart items");
  });

  describe("DELETE /cart", () => {
    it("clears all items from cart");
    it("returns empty cart on subsequent GET");
  });

  describe("Merge on login", () => {
    it("merges guest items into empty user cart");
    it("combines quantities for matching variants (capped at 99)");
    it("preserves guest items when user cart already has items");
    it("deletes guest cart after merge");
    it("no-ops when guest cart is empty");
    it("no-ops when no guest session exists");
  });

  describe("Cart expiry", () => {
    it("expires cart after TTL");
    it("extends TTL on every mutation");
    it("returns 410 CART_EXPIRED for expired cart");
  });

  describe("Price staleness", () => {
    it("flags priceChanged=true when price differs from snapshot");
    it("flags priceChanged=false when price matches snapshot");
    it("returns currentPriceCents alongside snapshot");
  });
});
```

---

## 9. Module Structure

```
src/
└── modules/
    └── cart/
        ├── cart.module.ts
        ├── cart.controller.ts
        ├── cart.service.ts
        ├── cart-cleanup.processor.ts  ← BullMQ worker
        ├── guards/
        │   └── cart-owner.guard.ts    ← Verify item belongs to cart
        ├── dto/
        │   ├── add-cart-item.dto.ts
        │   └── update-cart-item.dto.ts
        ├── interfaces/
        │   └── cart-response.interface.ts
        └── constants/
            └── cart.constants.ts      ← TTL (7d), MAX_ITEMS (50), MAX_QTY (99)
```

**Module wiring:**

```typescript
@Module({
  imports: [PrismaModule, BullmqModule.registerQueue({ name: "cart-cleanup" })],
  controllers: [CartController],
  providers: [CartService, CartCleanupProcessor],
  exports: [CartService],
})
export class CartModule {}
```
