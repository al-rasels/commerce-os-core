# Checkout State Machine (SOURCE OF TRUTH — exact allowed transitions)

This is the exact, complete state machine for `CheckoutSession`. No transition outside this table is valid; implement as an explicit guard, not implicit control flow.

## States

```
CART_ACTIVE → ADDRESS_SET → SHIPPING_SET → PAYMENT_SET → PLACING_ORDER → ORDER_PLACED
                                                                        ↘ PAYMENT_FAILED → PAYMENT_SET (retry)
any state (except ORDER_PLACED) → EXPIRED (TTL timeout, releases stock reservation)
```

## Transition Table

| From | Event | To | Side Effects |
|---|---|---|---|
| — | `checkout.start` | `CART_ACTIVE` | Create `CheckoutSession`, snapshot cart items + prices, set `expiresAt = now + 15min` |
| `CART_ACTIVE` | `address.set` | `ADDRESS_SET` | Validate address, calculate tax |
| `ADDRESS_SET` | `shipping.set` | `SHIPPING_SET` | Validate method available for address, calculate shipping cost |
| `SHIPPING_SET` | `payment.set` | `PAYMENT_SET` | Tokenize payment method (never store raw card data) |
| `PAYMENT_SET` | `place_order` | `PLACING_ORDER` | Attempt stock reservation (all line items, atomic — see `.agent/skills/03-stock-reservation-algorithm.md`) |
| `PLACING_ORDER` | reservation succeeds + charge succeeds | `ORDER_PLACED` | Create `Order` + `OrderItem`s, confirm reservations, emit `order.created`, clear cart |
| `PLACING_ORDER` | reservation fails (insufficient stock) | `PAYMENT_SET` | Return `409 CONFLICT`, do not charge payment |
| `PLACING_ORDER` | charge fails (reservation succeeded) | `PAYMENT_FAILED` | Release stock reservation immediately, do not leave stock held |
| `PAYMENT_FAILED` | `payment.set` (retry) | `PAYMENT_SET` | Same as above |
| any pre-`ORDER_PLACED` state | TTL expiry | `EXPIRED` | Release any held stock reservation, session no longer usable |

## Hard Rules

1. **Never charge payment before stock reservation succeeds.** Reservation-then-charge, always in that order — reversing this order risks charging a customer for an item you can't fulfill.
2. **Never leave a stock reservation held if the charge fails.** The `PLACING_ORDER → PAYMENT_FAILED` transition must release the reservation synchronously, in the same handler, not via a separate cleanup job (the expiry job is a safety net, not the primary release mechanism).
3. **`ORDER_PLACED` is terminal.** No transition leaves this state. Refunds/returns are a separate flow on the `Order` entity, not a checkout session transition.
4. **Idempotency:** `place_order` must be idempotent on `checkoutSessionId` — a duplicate request (e.g. double-click, network retry) must not create two orders. Implement via a unique constraint or an idempotency key stored on the session, checked before processing.

## Implementation Skeleton

```ts
type CheckoutState = 'CART_ACTIVE' | 'ADDRESS_SET' | 'SHIPPING_SET' | 'PAYMENT_SET'
  | 'PLACING_ORDER' | 'ORDER_PLACED' | 'PAYMENT_FAILED' | 'EXPIRED';

const ALLOWED_TRANSITIONS: Record<CheckoutState, CheckoutState[]> = {
  CART_ACTIVE:   ['ADDRESS_SET', 'EXPIRED'],
  ADDRESS_SET:   ['SHIPPING_SET', 'EXPIRED'],
  SHIPPING_SET:  ['PAYMENT_SET', 'EXPIRED'],
  PAYMENT_SET:   ['PLACING_ORDER', 'EXPIRED'],
  PLACING_ORDER: ['ORDER_PLACED', 'PAYMENT_SET', 'PAYMENT_FAILED'],
  PAYMENT_FAILED:['PAYMENT_SET', 'EXPIRED'],
  ORDER_PLACED:  [], // terminal
  EXPIRED:       [], // terminal
};

function assertTransition(from: CheckoutState, to: CheckoutState) {
  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw new ConflictException(`Invalid checkout transition: ${from} -> ${to}`);
  }
}
```

Every checkout service method that changes state must call `assertTransition` before mutating — this is what makes an invalid transition a caught 409 instead of a silent data-integrity bug.
