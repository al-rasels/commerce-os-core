# Session 9 — Backend: Cart, Checkout, Orders, Payments

## Status: COMPLETED

## Dependencies
- [x] Session 4 — Core Schema + Isolation (database tables exist)
- [x] Session 5 — Catalog CRUD (products/variants for cart line items)
- [x] Session 3 — Auth & RBAC (tenant-scoped API)

## Objective
Build the full backend for cart management, checkout flow, order processing with state machine, and Stripe payment integration.

## Deliverables
- [x] Cart CRUD: create, get, add/update/remove items, clear cart
- [x] Cart with stock validation on add
- [x] Cart merge on duplicate variant (qty increment)
- [x] Checkout: validate cart, check stock, create order, reserve stock
- [x] Order creation with transactional integrity
- [x] Stock reservation with 30-min TTL expiry
- [x] Order state machine: pending → paid → fulfilled → refunded (with cancellation from pending/paid)
- [x] Stripe PaymentIntent creation at checkout
- [x] Stripe webhook handler with signature verification
- [x] payment_intent.succeeded → marks order paid
- [x] payment_intent.payment_failed → marks order cancelled
- [x] Idempotency keys on payment operations
- [x] Order listing with pagination + filtering
- [x] Order status update endpoint (state machine enforcement)

## Acceptance Criteria
- [x] Cart endpoints: create, get, add/update/remove items, clear all work correctly
- [x] Checkout validates cart is open and non-empty
- [x] Checkout validates stock availability before order creation
- [x] Checkout calculates correct subtotal from line items
- [x] Stock reservation prevents overselling (30-min lock)
- [x] Order state machine enforces valid transitions only
- [x] Stripe webhook correctly processes payment success and failure
- [x] All endpoints are tenant-scoped (data isolation)

## API Endpoints Created
| Endpoint | Purpose |
|---|---|
| `POST /v1/commerce/carts` | Create cart |
| `GET /v1/commerce/carts/:id` | Get cart with items + variant data |
| `POST /v1/commerce/carts/:id/items` | Add item (with stock check, merge on dup) |
| `PATCH /v1/commerce/carts/:id/items/:itemId` | Update item quantity |
| `DELETE /v1/commerce/carts/:id/items/:itemId` | Remove item |
| `DELETE /v1/commerce/carts/:id/items` | Clear cart |
| `POST /v1/commerce/checkout` | Place order (validate → reserve → create → pay) |
| `GET /v1/commerce/orders` | List orders (paginated, filterable) |
| `GET /v1/commerce/orders/:id` | Get order detail |
| `PATCH /v1/commerce/orders/:id/status` | Update order status (state machine) |
| `POST /v1/commerce/payments/create-intent` | Create Stripe PaymentIntent |
| `POST /v1/commerce/payments/webhook` | Stripe webhook handler |

## Files Created/Modified
- `apps/api/src/modules/commerce/cart/` — CartController, CartService, DTOs
- `apps/api/src/modules/commerce/checkout/` — CheckoutController, CheckoutService
- `apps/api/src/modules/commerce/orders/` — OrderController, OrderService (state machine)
- `apps/api/src/modules/commerce/payments/` — PaymentController, PaymentService (Stripe)
- `apps/api/src/modules/commerce/commerce.module.ts` — wired cart, checkout, orders, payments

## Completed
- **Date:** 2026-07-14
- **Verified by:** All 12 Cart/Checkout/Order/Payment endpoints live and tested
