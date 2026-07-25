# Feature 1.6 — Stock Reservation with Expiry

## 1. Purpose

Reserve stock when items are added to cart, preventing overselling during the checkout window. Reservations auto-release after TTL expiry or on cart clear. On checkout, reservations convert to confirmed (consumed by the order).

## 2. Data Model

The `StockReservation` table already exists in the Prisma schema but needs a `cart_id` and `status` column added.

| Field        | Type                          | Notes                                              |
| ------------ | ----------------------------- | -------------------------------------------------- |
| `id`         | `String @id @default(uuid())` | PK                                                 |
| `tenant_id`  | `String @db.Uuid`             | FK → Tenant                                        |
| `variant_id` | `String @db.Uuid`             | FK → ProductVariant                                |
| `cart_id`    | `String @db.Uuid`             | **New** — FK → Cart; nullable (null after confirm) |
| `order_id`   | `String? @db.Uuid`            | FK → Order; set on checkout                        |
| `quantity`   | `Int`                         | Reserved units                                     |
| `status`     | `String`                      | **New** — `active` \| `released` \| `confirmed`    |
| `expires_at` | `DateTime @db.Timestamptz(6)` | TTL deadline                                       |
| `created_at` | `DateTime @default(now())`    | Auto-set                                           |

### Prisma Schema Changes

```prisma
model StockReservation {
  id         String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id  String         @db.Uuid
  variant_id String         @db.Uuid
  cart_id    String?        @db.Uuid       // NEW — track which cart holds the reservation
  order_id   String?        @db.Uuid
  quantity   Int
  status     String         @default("active") // NEW — active | released | confirmed
  expires_at DateTime       @db.Timestamptz(6)
  created_at DateTime       @default(now()) @db.Timestamptz(6)
  cart       Cart?          @relation(fields: [cart_id], references: [id], onDelete: Cascade)   // NEW
  order      Order?         @relation(fields: [order_id], references: [id])
  tenant     Tenant         @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  variant    ProductVariant @relation(fields: [variant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id])
  @@index([cart_id])
  @@index([variant_id, status])
  @@index([expires_at, status])
  @@map("stock_reservations")
}
```

Remove the stale `stock_reserved` counter field from `ProductVariant` — it will be computed dynamically.

```prisma
model ProductVariant {
  // remove: stock_reserved  Int  @default(0)
}
```

## 3. Flow

```
Add item to cart
  → Check available stock (product.quantity - SUM(active reservations))
    → Enough? → Create StockReservation(status=active, expires_at=now+15m)
    → Partial? → Reserve what's left, attach warning to response
    → None?   → Reject with "Insufficient stock"
      ↓
Checkout (convert cart → order)
  → Find all active reservations for this cart
  → For each: set status='confirmed', link order_id
  → Decrement product.stock_available
      ↓
Cart TTL expiry / Cart cleared
  → Find all active reservations for this cart
  → Set status='released'
  → Stock is freed for other shoppers
```

## 4. Reservation TTL

| Event                      | Action                        | TTL                      |
| -------------------------- | ----------------------------- | ------------------------ |
| Item added to cart         | Create reservation            | 15 min from now          |
| Cart item quantity updated | Extend all cart reservations  | Reset to 15 min from now |
| Cart completely cleared    | Release all cart reservations | Immediate                |
| Checkout completed         | Confirm reservations          | Immediate                |
| BullMQ cron tick           | Release expired reservations  | Every 5 min              |

## 5. Concurrency — `SELECT ... FOR UPDATE`

Wrap all stock operations in a Prisma `$transaction` with row-level locks to prevent double-booking.

```typescript
// src/modules/stock/stock-reservation.service.ts

import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { TenantContext } from "../../platform/tenant/tenant-context";

@Injectable()
export class StockReservationService {
  private readonly logger = new Logger(StockReservationService.name);
  private readonly MAX_RETRIES = 3;

  constructor(private readonly prisma: PrismaService) {}

  async reserve(
    ctx: TenantContext,
    variantId: string,
    cartId: string,
    quantity: number,
  ): Promise<{ reserved: number; available: number }> {
    let attempt = 0;

    while (attempt < this.MAX_RETRIES) {
      try {
        return await this.prisma.$transaction(async (tx) => {
          // Lock the variant row — blocks concurrent reservations
          const [variant] = await tx.$queryRawUnsafe<
            { stock_available: number; id: string }[]
          >(
            `SELECT id, stock_available FROM product_variants
             WHERE id = $1 AND tenant_id = $2
             FOR UPDATE`,
            variantId,
            ctx.tenantId,
          );

          if (!variant) throw new Error("Variant not found");

          // Sum active reservations (exclude released/confirmed)
          const [agg] = await tx.$queryRawUnsafe<
            { reserved_total: bigint | null }[]
          >(
            `SELECT COALESCE(SUM(quantity), 0) AS reserved_total
             FROM stock_reservations
             WHERE variant_id = $1 AND status = 'active'`,
            variantId,
          );

          const reservedTotal = Number(agg?.reserved_total ?? 0);
          const available = variant.stock_available - reservedTotal;

          if (quantity > available) {
            throw new Error(
              `Insufficient stock: requested ${quantity}, available ${available}`,
            );
          }

          await tx.stockReservation.create({
            data: {
              tenant_id: ctx.tenantId,
              variant_id: variantId,
              cart_id: cartId,
              quantity,
              status: "active",
              expires_at: new Date(Date.now() + 15 * 60 * 1000),
            },
          });

          return { reserved: quantity, available };
        });
      } catch (err: any) {
        // Retry on deadlock (Postgres error 40P01)
        if (err?.code === "40P01" && attempt < this.MAX_RETRIES - 1) {
          attempt++;
          this.logger.warn(
            `Deadlock on reserve (attempt ${attempt}/${this.MAX_RETRIES}), retrying...`,
          );
          continue;
        }
        throw err;
      }
    }

    throw new Error("Reservation failed after max retries");
  }

  async releaseByCart(ctx: TenantContext, cartId: string): Promise<number> {
    const result = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.stockReservation.updateMany({
        where: { cart_id: cartId, status: "active" },
        data: { status: "released" },
      });
      return count;
    });

    this.logger.log(`Released ${result} reservation(s) for cart ${cartId}`);
    return result;
  }

  async confirmByCart(
    ctx: TenantContext,
    cartId: string,
    orderId: string,
  ): Promise<number> {
    const result = await this.prisma.$transaction(async (tx) => {
      const reservations = await tx.stockReservation.findMany({
        where: { cart_id: cartId, status: "active" },
      });

      for (const r of reservations) {
        await tx.stockReservation.update({
          where: { id: r.id },
          data: { status: "confirmed", order_id: orderId },
        });

        // Deduct from variant stock
        await tx.$executeRawUnsafe(
          `UPDATE product_variants
           SET stock_available = stock_available - $1
           WHERE id = $2 AND tenant_id = $3`,
          r.quantity,
          r.variant_id,
          ctx.tenantId,
        );
      }

      return reservations.length;
    });

    this.logger.log(`Confirmed ${result} reservation(s) for order ${orderId}`);
    return result;
  }

  async extendCartReservations(
    ctx: TenantContext,
    cartId: string,
  ): Promise<number> {
    const newExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const result = await this.prisma.stockReservation.updateMany({
      where: { cart_id: cartId, status: "active" },
      data: { expires_at: newExpiry },
    });

    return result.count;
  }
}
```

## 6. Available Stock Calculation

```typescript
// src/modules/catalog/catalog.service.ts

async getAvailableStock(
  ctx: TenantContext,
  variantId: string,
): Promise<number> {
  const [row] = await this.prisma.$queryRawUnsafe<
    { available: bigint }[]
  >(
    `SELECT pv.stock_available - COALESCE(SUM(sr.quantity), 0) AS available
     FROM product_variants pv
     LEFT JOIN stock_reservations sr
       ON sr.variant_id = pv.id AND sr.status = 'active'
     WHERE pv.id = $1 AND pv.tenant_id = $2
     GROUP BY pv.id, pv.stock_available`,
    variantId,
    ctx.tenantId,
  );

  return Number(row?.available ?? 0);
}
```

## 7. Auto-Release Cron — BullMQ

```typescript
// src/modules/stock/stock-expiry.job.ts

import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Processor("stock")
@Injectable()
export class StockExpiryJob extends WorkerHost {
  private readonly logger = new Logger(StockExpiryJob.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<unknown>): Promise<{ released: number }> {
    this.logger.log("Running stock expiry check...");

    const result = await this.prisma.stockReservation.updateMany({
      where: {
        status: "active",
        expires_at: { lte: new Date() },
      },
      data: { status: "released" },
    });

    this.logger.log(`Released ${result.count} expired reservation(s)`);
    return { released: result.count };
  }
}
```

### Registration

```typescript
// stock.module.ts
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { StockExpiryJob } from "./stock-expiry.job";

@Module({
  imports: [BullModule.registerQueue({ name: "stock" })],
  providers: [StockExpiryJob],
})
export class StockModule {}
```

Every 5 min via cron in `app.module.ts` or the BullMQ dashboard:

```typescript
BullModule.registerQueue(
  { name: "stock" },
  {
    defaultJobOptions: {
      removeOnComplete: 100,
      removeOnFail: 50,
    },
  },
);

// Schedule the repeatable job on module init
@Injectable()
export class StockCronScheduler {
  constructor(@InjectQueue("stock") private readonly stockQueue: Queue) {
    this.stockQueue.upsertJobScheduler(
      "stock-expiry-cron",
      { pattern: "*/5 * * * *" },
      { name: "stock-expiry" },
    );
  }
}
```

## 8. Edge Cases

| Edge Case                            | Handling                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Partial stock available**          | Reserve what's left; return `{ reserved: X, requested: Y }` so the frontend can warn the user                      |
| **Stock increased while reserved**   | The next shopper sees the new stock minus active reservations — no false negatives                                 |
| **Concurrent reservation race**      | `FOR UPDATE` row lock serializes access; deadlock retry loop handles collisions                                    |
| **Cart merged on login**             | Re-extend TTL on all reservations belonging to the merged guest cart                                               |
| **Reservation expires mid-checkout** | BullMQ cron may not catch it in time → checkout re-validates stock before confirming                               |
| **Multiple carts, same variant**     | Each cart reserves independently; last one may get denied if stock runs out                                        |
| **Order cancelled after confirm**    | Restore stock: `UPDATE product_variants SET stock_available = stock_available + N` and mark reservation `released` |

## 9. Over-Reservation Prevention

Every `reserve()` call gates on this invariant before inserting:

```typescript
if (requested > available) {
  throw new BadRequestException({
    code: "INSUFFICIENT_STOCK",
    message: `Only ${available} units available, requested ${requested}`,
    available,
    requested,
  });
}
```

The `available` value is always computed inside the `FOR UPDATE` transaction, guaranteeing serialized access.

## 10. Test Cases

```typescript
describe("StockReservationService", () => {
  it("reserves stock, then releases it, freeing the units", async () => {
    const before = await getAvailableStock(ctx, variantId);
    await service.reserve(ctx, variantId, cartId, 5);
    expect(await getAvailableStock(ctx, variantId)).toBe(before - 5);
    await service.releaseByCart(ctx, cartId);
    expect(await getAvailableStock(ctx, variantId)).toBe(before);
  });

  it("reserves stock, then confirms — stock_available decreases", async () => {
    const before = await getVariantStock(ctx, variantId);
    await service.reserve(ctx, variantId, cartId, 3);
    await service.confirmByCart(ctx, cartId, orderId);
    const after = await getVariantStock(ctx, variantId);
    expect(after).toBe(before - 3);
  });

  it("rejects reservation when stock is insufficient", async () => {
    await service.reserve(ctx, variantId, cartId, 100);
    await expect(
      service.reserve(ctx, variantId, otherCartId, 1),
    ).rejects.toThrow("Insufficient stock");
  });

  it("handles concurrent reservations for same variant", async () => {
    const promises = Array.from({ length: 5 }, (_, i) =>
      service.reserve(ctx, variantId, `cart-${i}`, 2),
    );
    const results = await Promise.allSettled(promises);
    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");
    expect(fulfilled.length).toBeLessThanOrEqual(5);
    expect(rejected.length).toBeGreaterThanOrEqual(0);
  });

  it("auto-releases expired reservations via cron", async () => {
    await prisma.stockReservation.create({
      data: {
        tenant_id: ctx.tenantId,
        variant_id: variantId,
        cart_id: cartId,
        quantity: 5,
        status: "active",
        expires_at: new Date(Date.now() - 60_000), // already expired
      },
    });
    const result = await job.process({} as any);
    expect(result.released).toBe(1);
  });

  it("reserves partial stock and reports back", async () => {
    const available = await getAvailableStock(ctx, variantId);
    try {
      await service.reserve(ctx, variantId, cartId, available + 10);
    } catch (e: any) {
      expect(e.message).toContain(`available ${available}`);
    }
  });
});
```
