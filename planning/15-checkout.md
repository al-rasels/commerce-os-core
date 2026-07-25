# Feature 1.4 — Checkout with Idempotency Key

## Checkout Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CHECKOUT PIPELINE                                 │
│                                                                         │
│  POST /api/v1/checkout                                                  │
│  Idempotency-Key: <uuid>                                                │
│       │                                                                 │
│       ▼                                                                 │
│  ┌─────────────────┐                                                    │
│  │  1. Idempotency  │──── Duplicate key? ────→ Return cached result     │
│  │     Check        │                                                    │
│  └────────┬────────┘                                                    │
│           ▼ (new key)                                                   │
│  ┌─────────────────┐                                                    │
│  │  2. Load Cart    │──── Cart empty? ──────────→ 422 CART_EMPTY        │
│  │     + Items      │──── Cart belongs to user? ─→ 403 FORBIDDEN        │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  3. Validate     │──── Variant exists? ───────→ 404 NOT_FOUND        │
│  │     Variants     │──── Is active? ────────────→ 400 VARIANT_INACTIVE │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  4. Stock Gate   │──── Enough stock? ─────────→ 422 OUT_OF_STOCK     │
│  │     Reserve      │     Reserve stock                                 │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  5. Price Gate   │──── Prices match? ─────────→ 200 PRICE_CHANGED    │
│  │     Recalculate  │     (return warning, no order)                     │
│  └────────┬────────┘                                                    │
│           ▼ (prices match or user accepted)                             │
│  ┌─────────────────┐                                                    │
│  │  6. Validate     │──── Address exists? ───────→ 422 INVALID_ADDRESS  │
│  │     Shipping     │                                                    │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  7. Calculate    │                                                    │
│  │     Totals       │                                                    │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  8. Create       │                                                    │
│  │     Order        │                                                    │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │  9. Clear Cart   │                                                    │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│  ┌─────────────────┐                                                    │
│  │ 10. Cache Result │── Store key→result for 24h                        │
│  └────────┬────────┘                                                    │
│           ▼                                                             │
│     Return Order                                                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  ROLLBACK HANDLER                                             │        │
│  │  If any step (2–9) fails: release reserved stock + return err│        │
│  └─────────────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Endpoints

| Method | Path                          | Auth     | Description               |
| ------ | ----------------------------- | -------- | ------------------------- |
| POST   | `/api/v1/checkout`            | Required | Convert cart to order     |
| GET    | `/api/v1/checkout/:id/status` | Required | Get checkout/order status |

### POST /api/v1/checkout

**Headers:**

| Header            | Type   | Required | Description                             |
| ----------------- | ------ | -------- | --------------------------------------- |
| `Authorization`   | string | Yes      | `Bearer <jwt>`                          |
| `Idempotency-Key` | string | Yes      | UUID v4 — prevents duplicate processing |
| `X-CSRF-Token`    | string | Yes      | Double-submit CSRF token                |

**Request Body:**

```typescript
class CheckoutRequestDto {
  @IsUUID()
  cartId: string;

  @IsUUID()
  shippingAddressId: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsUUID()
  promotionCode?: string;
}
```

**Response (201 Created):**

```typescript
class CheckoutResponseDto {
  orderId: string;
  orderNumber: string; // e.g., "CO-20260725-00001"
  status: OrderStatus; // "pending"
  items: OrderItemDto[];
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  currency: string;
  createdAt: string;

  // Present only when prices changed
  priceWarning?: {
    changedItems: {
      variantId: string;
      sku: string;
      oldPriceCents: number;
      newPriceCents: number;
    }[];
    oldTotalCents: number;
    newTotalCents: number;
  };
}
```

**Response (200 OK — Idempotent Replay):**

Same shape as `201`, plus header `X-Idempotent-Replayed: true`.

### GET /api/v1/checkout/:id/status

```typescript
class CheckoutStatusDto {
  checkoutId: string;
  status: "processing" | "completed" | "failed";
  orderId?: string;
  orderNumber?: string;
  error?: {
    code: string;
    message: string;
  };
}
```

---

## Idempotency Implementation

```
┌───────────────────────────────────────────────────────────┐
│                  IDEMPOTENCY KEY STORE                     │
│                                                           │
│  Storage: Redis + Postgres (dual-write)                   │
│  TTL:     24 hours                                        │
│  Key:     idempotency:{tenantId}:{key}                    │
│                                                           │
│  ┌──────────────┐    ┌─────────────────┐                  │
│  │  New Request  │───▶│  Redis EXISTS?  │                  │
│  │  + Key        │    └────────┬────────┘                  │
│  │               │         │        │                     │
│  │               │         No       Yes                    │
│  │               │         │        │                     │
│  │               │         ▼        ▼                     │
│  │               │    Process    Return                   │
│  │               │    + Store    Cached                   │
│  │               │    in Redis   Result                   │
│  └──────────────┘    + Persist   + Header                 │
│                         to DB    X-Idempotent-Replayed    │
└───────────────────────────────────────────────────────────┘
```

```typescript
// IdempotencyService
async getOrProcess(
  key: string,
  tenantId: string,
  processor: () => Promise<CheckoutResponseDto>,
): Promise<{ data: CheckoutResponseDto; replayed: boolean }> {
  const cacheKey = `idempotency:${tenantId}:${key}`;

  // Check Redis
  const cached = await this.redis.get(cacheKey);
  if (cached) {
    return { data: JSON.parse(cached), replayed: true };
  }

  // Acquire distributed lock to prevent concurrent processing
  const lockKey = `idempotency:lock:${tenantId}:${key}`;
  const lock = await this.redis.set(lockKey, '1', 'PX', 30000, 'NX');
  if (!lock) {
    throw new ConflictException('Checkout already in progress');
  }

  try {
    const result = await processor();

    // Store in Redis (24h TTL)
    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 86400);

    // Store idempotency key reference in Postgres (Order record)
    // Order.idempotencyKey = key (unique constraint prevents duplicates)

    return { data: result, replayed: false };
  } finally {
    await this.redis.del(lockKey);
  }
}
```

---

## Validation Steps

### Step 1 — Load Cart

| Check                                          | Failure Code | HTTP Status |
| ---------------------------------------------- | ------------ | ----------- |
| Cart exists                                    | `NOT_FOUND`  | 404         |
| Cart belongs to authenticated user             | `FORBIDDEN`  | 403         |
| Cart has items                                 | `CART_EMPTY` | 422         |
| Cart is `open` (not `checked_out`/`abandoned`) | `CONFLICT`   | 409         |

### Step 2 — Validate Variants

| Check                   | Failure Code       | HTTP Status |
| ----------------------- | ------------------ | ----------- |
| All variants exist      | `NOT_FOUND`        | 404         |
| All variants are active | `VARIANT_INACTIVE` | 400         |

### Step 3 — Stock Gate

| Check                                | Failure Code   | HTTP Status |
| ------------------------------------ | -------------- | ----------- |
| Available stock ≥ requested quantity | `OUT_OF_STOCK` | 422         |

Stock reservation is performed atomically:

```typescript
async reserveStock(
  tenantId: string,
  items: { variantId: string; quantity: number }[],
  ttlMinutes: number = 15,
): Promise<void> {
  for (const item of items) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: item.variantId },
    });

    const available = variant.stockAvailable - variant.stockReserved;
    if (available < item.quantity) {
      throw new OutOfStockException(item.variantId, available, item.quantity);
    }
  }

  // Create reservations
  await this.prisma.stockReservation.createMany({
    data: items.map((item) => ({
      tenantId,
      variantId: item.variantId,
      quantity: item.quantity,
      expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000),
    })),
  });
}
```

### Step 4 — Price Gate

| Check                                         | Failure Code    | HTTP Status     |
| --------------------------------------------- | --------------- | --------------- |
| Cart item price matches current variant price | `PRICE_CHANGED` | 200 (not error) |

On price mismatch, the endpoint **does not fail**. It recalculates and returns `200` with a `priceWarning` block. The client must re-request with `acceptPriceChange: true` to proceed.

```typescript
// Request (after receiving PRICE_CHANGED)
class CheckoutConfirmDto {
  cartId: string;
  shippingAddressId: string;
  acceptPriceChange: boolean; // Must be true to proceed
}
```

### Step 5 — Address Validation

| Check                   | Failure Code      | HTTP Status |
| ----------------------- | ----------------- | ----------- |
| Address exists          | `INVALID_ADDRESS` | 422         |
| Address belongs to user | `INVALID_ADDRESS` | 422         |

---

## Price Recalculation

```typescript
function recalculateOrderTotals(
  items: {
    variant: ProductVariant;
    quantity: number;
    unitPriceCents: number;
  }[],
): {
  items: OrderItemInput[];
  subtotalCents: number;
  changed: boolean;
  changes: PriceChange[];
} {
  let subtotalCents = 0;
  const changes: PriceChange[] = [];

  const orderItems = items.map((item) => {
    const currentPrice = item.variant.priceCents;
    const oldPrice = item.unitPriceCents;

    if (currentPrice !== oldPrice) {
      changes.push({
        variantId: item.variant.id,
        sku: item.variant.sku,
        oldPriceCents: oldPrice,
        newPriceCents: currentPrice,
      });
    }

    const totalPriceCents = currentPrice * item.quantity;
    subtotalCents += totalPriceCents;

    return {
      variantId: item.variant.id,
      quantity: item.quantity,
      unitPriceCents: currentPrice,
      totalPriceCents,
    };
  });

  return {
    items: orderItems,
    subtotalCents,
    changed: changes.length > 0,
    changes,
  };
}
```

---

## Order Number Format

Format: `CO-YYYYMMDD-NNNNN`

- `CO` — Commerce OS prefix
- `YYYYMMDD` — Current date
- `NNNNN` — 5-digit zero-padded daily sequence

```typescript
async generateOrderNumber(tenantId: string): Promise<string> {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const prefix = `CO-${date}-`;

  // Atomically increment daily counter
  const key = `order_seq:${tenantId}:${date}`;
  const seq = await this.redis.incr(key);
  await this.redis.expire(key, 86400 * 2); // 48h safety margin

  return `${prefix}${String(seq).padStart(5, '0')}`;
}
```

| Example             | Explanation                  |
| ------------------- | ---------------------------- |
| `CO-20260725-00001` | First order on July 25, 2026 |
| `CO-20260725-00042` | 42nd order on same day       |
| `CO-20260726-00001` | Next day, counter resets     |

---

## Order Creation

```typescript
async createOrder(
  tenantId: string,
  customerId: string,
  input: CheckoutRequestDto,
  recalculated: RecalculatedTotals,
): Promise<Order> {
  const orderNumber = await this.generateOrderNumber(tenantId);

  return this.prisma.$transaction(async (tx) => {
    // 1. Create Order
    const order = await tx.order.create({
      data: {
        tenantId,
        customerId,
        status: 'pending',
        orderNumber,
        subtotalCents: recalculated.subtotalCents,
        taxCents: recalculated.taxCents,
        shippingCents: recalculated.shippingCents,
        discountCents: recalculated.discountCents,
        totalCents: recalculated.totalCents,
        currency: 'USD',
        notes: input.notes,
        idempotencyKey: input.idempotencyKey,
        channel: 'online',
        items: {
          create: recalculated.items.map((item) => ({
            tenantId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            totalPriceCents: item.totalPriceCents,
          })),
        },
      },
      include: { items: { include: { variant: true } } },
    });

    // 2. Update stock reservations — link to order instead of cart
    await tx.stockReservation.updateMany({
      where: { cartId: input.cartId },
      data: { orderId: order.id, cartId: null },
    });

    // 3. Mark cart as checked_out
    await tx.cart.update({
      where: { id: input.cartId },
      data: { status: 'checked_out' },
    });

    return order;
  });
}
```

---

## Error Codes

| Code                 | HTTP | When                                                           |
| -------------------- | ---- | -------------------------------------------------------------- |
| `OUT_OF_STOCK`       | 422  | Insufficient stock for one or more items                       |
| `PRICE_CHANGED`      | 200  | Prices have changed; recalculated totals returned with warning |
| `CART_EMPTY`         | 422  | Cart has no items                                              |
| `INVALID_ADDRESS`    | 422  | Shipping address missing or doesn't belong to user             |
| `IDEMPOTENCY_REPLAY` | —    | Internal signal (resolved by returning cached result)          |
| `VARIANT_INACTIVE`   | 400  | One or more variants have been deactivated                     |
| `FORBIDDEN`          | 403  | Cart doesn't belong to authenticated user                      |
| `NOT_FOUND`          | 404  | Cart or variant not found                                      |

---

## Rollback

```typescript
async checkout(tenantId: string, customerId: string, dto: CheckoutRequestDto, idempotencyKey: string) {
  // Idempotency check (handled at service level, no rollback needed)
  return this.idempotencyService.getOrProcess(idempotencyKey, tenantId, async () => {
    // All steps below share the same rollback scope
    const rollback = new RollbackStack();

    try {
      const cart = await this.loadCartOrThrow(tenantId, customerId, dto.cartId);
      await this.validateVariantsOrThrow(tenantId, cart.items);

      const reservation = await this.reserveStockOrThrow(tenantId, cart.items);
      rollback.push(() => this.releaseStock(reservation));

      const recalculated = this.recalculatePrices(cart);
      if (recalculated.changed) {
        rollback.execute(); // Release reserved stock before returning
        return { priceWarning: recalculated.changes, ... };
      }

      await this.validateAddressOrThrow(tenantId, customerId, dto.shippingAddressId);

      const order = await this.createOrder(tenantId, customerId, dto, recalculated);
      // — reservation linked to order, no need to release —

      return { orderId: order.id, ... };
    } catch (error) {
      rollback.execute();
      throw error;
    }
  });
}

class RollbackStack {
  private actions: (() => Promise<void>)[] = [];
  push(fn: () => Promise<void>): void { this.actions.push(fn); }
  async execute(): Promise<void> {
    for (const fn of this.actions.reverse()) { await fn(); }
  }
}
```

---

## Test Cases

| #   | Scenario                      | Input                                                | Expected                                                                   |
| --- | ----------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Successful checkout**       | Valid cart, valid address, stock available           | 201, order returned with `pending` status                                  |
| 2   | **Idempotent retry**          | Same `Idempotency-Key` sent twice                    | 200 (second call), `X-Idempotent-Replayed: true`, same order ID            |
| 3   | **Out of stock**              | Cart item quantity exceeds available stock           | 422, `OUT_OF_STOCK`, stock NOT reserved                                    |
| 4   | **Price changed**             | Variant price modified since item was added to cart  | 200, `priceWarning` with `changedItems` array, stock reserved and released |
| 5   | **Price changed + accept**    | Same as #4, client sends `acceptPriceChange: true`   | 201, order created with new prices                                         |
| 6   | **Empty cart**                | Cart has no items                                    | 422, `CART_EMPTY`                                                          |
| 7   | **Double-submit without key** | Same request sent twice, different `Idempotency-Key` | Two separate orders created (201 each), duplicate stock scenario handled   |
| 8   | **Invalid address**           | Non-existent or another user's address               | 422, `INVALID_ADDRESS`                                                     |
| 9   | **Concurrent checkout**       | Two simultaneous requests with same key              | One succeeds (201), one gets `CONFLICT` (lock held) then 200 replay        |
| 10  | **Expired idempotency key**   | Same key used after 24h                              | Two orders created (201 each), no replay                                   |

---

## Implementation Checklist

- [ ] `CheckoutController` with `POST /checkout`, `GET /checkout/:id/status`
- [ ] `CheckoutService` with pipeline orchestration + rollback
- [ ] `IdempotencyService` with Redis + Postgres dual store
- [ ] `OutOfStockException`, `PriceChangedException`, `CartEmptyException`, `InvalidAddressException`
- [ ] `RollbackStack` utility class
- [ ] Stock reservation + release logic
- [ ] Price recalculation + `priceWarning` response
- [ ] Order number generator with daily Redis counter
- [ ] `CheckoutRequestDto`, `CheckoutConfirmDto`, `CheckoutResponseDto`, `CheckoutStatusDto`
- [ ] Cart status transition (`open` → `checked_out`)
- [ ] Idempotency cleanup job (remove expired Redis keys)
- [ ] Tests (unit + integration) covering all 10 test cases
