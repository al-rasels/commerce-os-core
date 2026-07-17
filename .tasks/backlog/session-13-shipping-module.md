# Session 13 — Shipping Module

## Status: BACKLOG

## Dependencies
- [x] Session 9 — Cart/Checkout/Orders API (checkout integration point)

## Objective
Build the shipping rules engine — flat-rate and weight-tier shipping calculation, admin configuration UI, and checkout integration.

## Deliverables
- [ ] `shipping_rules` table (type: flat_rate, weight_tier; config: JSONB)
- [ ] Shipping rules CRUD API + service
- [ ] Flat-rate rule: fixed price per order
- [ ] Weight-tier rule: price based on total order weight
- [ ] Shipping method selection at checkout
- [ ] Admin UI for configuring shipping rules
- [ ] Tax calculation at checkout (flat % per region placeholder)

## Acceptance Criteria
- [ ] Checkout displays available shipping methods with prices
- [ ] Selecting a shipping method updates order total
- [ ] Admin can create/edit/delete shipping rules
- [ ] Rules are tenant-scoped
- [ ] Free shipping threshold option works

## Files to Touch
- `apps/api/src/modules/commerce/shipping/` — new module
- `apps/api/prisma/schema.prisma` — ShippingRule model
- `apps/admin/src/pages/settings/shipping.tsx` — admin UI
- `apps/api/src/modules/commerce/checkout/` — integrate shipping selection

## Notes
- Start with flat-rate only; weight-tier is a stretch goal for Phase 1
- Integration with real carriers (Shippo, EasyPost) deferred to Phase 2
