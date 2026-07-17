# Session 09b — Storefront: Cart + Checkout UI

## Status: BACKLOG

## Dependencies
- [x] Session 9 — Cart/Checkout/Orders API (completed)
- [ ] Session 06a — Storefront Components (for CartDrawer, CheckoutSummary)

## Objective
Build the storefront cart and checkout flow — add to cart, review, enter address, select shipping, pay via Stripe, order confirmation.

## Deliverables
- [ ] Cart drawer (slide over from header) with line items, quantity adjustment, remove
- [ ] Cart page (for mobile or full-screen view)
- [ ] Checkout page with steps:
  - [ ] Address form (shipping + billing)
  - [ ] Shipping method selection
  - [ ] Payment (Stripe Elements / PaymentElement)
  - [ ] Review + place order
- [ ] Order confirmation page with summary
- [ ] Guest checkout flow (session-bound cart)

## Acceptance Criteria
- [ ] Adding a product to cart shows item in drawer
- [ ] Checkout flow completes with Stripe test card
- [ ] Order confirmation displays correct totals and items
- [ ] Cart persists for guest via `session_id` cookie
- [ ] Concurrent checkout on last stock — only one succeeds

## Files to Touch
- `apps/storefront/src/app/cart/` — cart page
- `apps/storefront/src/app/checkout/` — checkout flow pages
- `apps/storefront/src/app/order/confirmation/[id]/` — confirmation page
- `apps/storefront/src/components/cart/` — CartDrawer, CartItem, CartSummary
- `apps/storefront/src/components/checkout/` — AddressForm, ShippingSelector, PaymentForm
- `apps/storefront/src/lib/api/` — API client functions

## Notes
- Use Stripe PaymentElement for PCI-compliant payment form
- Cart API determines guest vs. authenticated user via TenantContext
- Address form can skip geocoding/validation for Phase 1
