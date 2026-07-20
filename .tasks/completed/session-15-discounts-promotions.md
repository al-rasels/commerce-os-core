# Session 15 — Discounts & Promotions

## Status: BACKLOG

## Dependencies
- [x] Session 9 — Cart/Checkout/Orders API (checkout integration point)

## Objective
Build a discount/promotion engine — coupon codes with percentage or fixed amount discounts, usage limits, and expiry.

## Deliverables
- [ ] `promotions` table (code, type, value, min_order, max_uses, expires_at)
- [ ] Promotions CRUD API + service
- [ ] Coupon validation at checkout
- [ ] Percentage discount (e.g., 10% off)
- [ ] Fixed amount discount (e.g., $5 off)
- [ ] Usage tracking per coupon
- [ ] Admin UI for creating/managing promotions

## Acceptance Criteria
- [ ] Valid coupon code reduces order total at checkout
- [ ] Expired or maxed-out coupon is rejected with clear message
- [ ] Coupon usage increments correctly
- [ ] Promotions are tenant-scoped
- [ ] Invalid coupon code shows error (not silent failure)

## Files to Touch
- `apps/api/src/modules/commerce/promotions/` — new module
- `apps/api/prisma/schema.prisma` — Promotion model
- `apps/admin/src/pages/marketing/promotions.tsx` — admin UI
- `apps/api/src/modules/commerce/checkout/` — integrate coupon validation

## Notes
- Phase 1: simple coupon codes only (no complex rule chains, BOGO, or auto-discounts)
- Cart-level promotions only (no product-specific discounts for Phase 1)
