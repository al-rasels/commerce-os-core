# Rule 02 — Module Boundaries (STRICT)

## 1. The Five Engines Map to Five Top-Level Folders

```
/apps/api/src/modules/
  platform/       Tenant, Auth, RBAC, Billing, FeatureFlags
  commerce/       Catalog, Inventory, Cart, Checkout, Orders, Shipping, Tax
  experience/     Theme, Template, PageBuilder, ComponentRegistry
  business/       (Phase 3+ — empty scaffold in Phase 1)
  intelligence/   (Phase 4+ — empty scaffold in Phase 1)
```

A file that doesn't obviously belong to one of these five is mis-scoped. Stop and classify it correctly before writing it — do not create a sixth top-level category, do not put it in `common/` if it's actually business logic.

## 2. What "Module Boundary" Means, Exactly

Each module (e.g. `commerce/catalog`) exposes exactly one public surface: its `*.service.ts` files, decorated `@Injectable()`, exported from the module's `index.ts`. Everything else — entities, repositories, internal DTOs — is NOT exported and NOT imported by another module.

```ts
// CORRECT — commerce/orders/orders.service.ts calling into commerce/inventory
import { InventoryService } from '../inventory'; // public service interface
...
await this.inventoryService.reserveStock(variantId, qty, ctx);

// WRONG — reaching into inventory's internals directly
import { InventoryRepository } from '../inventory/inventory.repository'; // NEVER
import { ProductVariant } from '../inventory/entities/product-variant.entity'; // NEVER outside inventory module
```

If `orders` needs data shaped differently than what `inventory.service.ts` currently returns, the fix is to **add or extend a method on `InventoryService`** — not to import its entity and query it directly.

## 3. Cross-Module Communication: Two Patterns Only

**Synchronous need (caller needs a result now):** direct call to the other module's public service method.

**Side-effect / eventual consistency (caller doesn't need to wait):** emit a domain event, consumed by a listener in the other module.

```ts
// commerce/orders/orders.service.ts
async placeOrder(...) {
  const order = await this.ordersRepo.create(...);
  this.eventBus.publish(new OrderCreatedEvent({ tenantId: ctx.tenantId, orderId: order.id }));
  return order;
}

// business/reporting listens, doesn't block order placement, doesn't touch orders table directly
@EventHandler(OrderCreatedEvent)
async onOrderCreated(event: OrderCreatedEvent) { /* ... */ }
```

Never use a shared database transaction spanning two modules. If two writes must be atomic across modules, that's a signal the boundary is wrong — escalate rather than force a cross-module transaction.

## 4. Feature Flags — Platform Module Only

```ts
// CORRECT — anywhere in commerce/experience/business
if (ctx.hasFeature('inventory.advanced')) { ... }

// WRONG — anywhere outside modules/platform
if (ctx.plan === 'enterprise') { ... } // hardcoded plan check, banned outside platform module
```

## 5. Checklist Before Committing Any Cross-Module Code

- [ ] Am I importing anything other than a `*.service.ts` export from another module? If yes, stop.
- [ ] Could this be an event instead of a direct call? If the caller doesn't need the result synchronously, prefer the event.
- [ ] Does this belong in Business/ERP instead of Commerce? (e.g. warehouse transfers, procurement, accounting → Business, not Commerce — see `06-commerce-business-engines/02-business-erp-engine.md` §3 boundary rule)
