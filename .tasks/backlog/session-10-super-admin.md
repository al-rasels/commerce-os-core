# Session 10 — Super Admin Console

## Status: BACKLOG

## Dependencies
- [x] Session 3 — Auth & RBAC (RBAC framework exists)
- [x] Session 2 — Tenant Resolution (tenant model exists)

## Objective
Build the Super Admin console for platform operators to provision tenants, manage billing, and toggle feature flags.

## Deliverables
- [ ] Tenant list page (all tenants with plan, status, created date)
- [ ] Tenant provisioning flow (create tenant + domain + seed defaults)
- [ ] Tenant detail page (plan, status, domains, feature flags)
- [ ] Feature flag toggles per tenant
- [ ] Billing status display (Stripe Billing subscription status)
- [ ] Plan change flow (trial → starter → growth → enterprise)

## Acceptance Criteria
- [ ] New tenant provisioned in <60s end to end
- [ ] Toggling a flag for tenant A doesn't affect tenant B
- [ ] Billing webhook correctly suspends a tenant on payment failure
- [ ] Suspended tenant storefront shows read-only mode
- [ ] Only `super_admin` role can access these endpoints/UI

## Files to Touch
- `apps/admin/src/pages/super-admin/` — tenants, provisioning, flags
- `apps/admin/src/components/super-admin/` — TenantCard, FlagToggle, PlanSelector
- `apps/api/src/modules/platform/admin/` — super admin controller/service (new)
- `apps/api/prisma/seed.ts` — super admin user seed

## Notes
- Super Admin operates at platform level (no tenant context)
- Feature flags stored in the existing `feature_flags` table
- Stripe Billing webhook updates `tenants.status` to `suspended` on failure
