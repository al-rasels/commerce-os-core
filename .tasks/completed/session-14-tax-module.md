# Session 14 — Tax Module

## Status: BACKLOG

## Dependencies
- [x] Session 9 — Cart/Checkout/Orders API (checkout integration point)

## Objective
Build a basic tax rules engine — flat percentage or regional rate tax calculation, admin configuration, and checkout integration.

## Deliverables
- [ ] `tax_rules` table (region, rate percentage, priority)
- [ ] Tax rules CRUD API + service
- [ ] Flat % tax rule (applied to subtotal)
- [ ] Region-based tax rule (e.g., different rates per state/country)
- [ ] Tax calculation integrated into checkout
- [ ] Admin UI for configuring tax rules

## Acceptance Criteria
- [ ] Checkout displays tax line item with correct amount
- [ ] Admin can create/edit/delete tax rules
- [ ] Rules are tenant-scoped
- [ ] Changing a tax rate updates checkout calculation

## Files to Touch
- `apps/api/src/modules/commerce/tax/` — new module
- `apps/api/prisma/schema.prisma` — TaxRule model
- `apps/admin/src/pages/settings/tax.tsx` — admin UI
- `apps/api/src/modules/commerce/checkout/` — integrate tax calculation

## Notes
- Phase 1: flat % only; region-based tax = stretch goal
- Full Avalara/TaxJar integration deferred to Phase 2+
