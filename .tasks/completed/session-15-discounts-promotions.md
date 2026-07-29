# Session 15 — Discounts & Promotions

## Status: BACKLOG

## Dependencies

- [x] Session 9 — Cart/Checkout/Orders API (checkout integration point)

## Objective

Build a discount/promotion engine — coupon codes with percentage or fixed amount discounts, usage limits, and expiry.

## Deliverables

- [x] `promotions` table (code, type, value, min_order, max_uses, expires_at)
- [x] Promotions CRUD API + service
- [x] Coupon validation at checkout
- [x] Percentage discount (e.g., 10% off)
- [x] Fixed amount discount (e.g., $5 off)
- [x] Usage tracking per coupon
- [x] Admin UI for creating/managing promotions

## Acceptance Criteria

- [x] Valid coupon code reduces order total at checkout
- [x] Expired or maxed-out coupon is rejected with clear message
- [x] Coupon usage increments correctly
- [x] Promotions are tenant-scoped
- [x] Invalid coupon code shows error (not silent failure)

## Files to Touch

- `apps/api/src/modules/commerce/promotions/` — new module
- `apps/api/prisma/schema.prisma` — Promotion model
- `apps/admin/src/pages/marketing/promotions.tsx` — admin UI
- `apps/api/src/modules/commerce/checkout/` — integrate coupon validation

## Notes

- Phase 1: simple coupon codes only (no complex rule chains, BOGO, or auto-discounts)
- Cart-level promotions only (no product-specific discounts for Phase 1)
