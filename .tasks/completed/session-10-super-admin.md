# Session 10 — Super Admin Console

## Status: BACKLOG

## Dependencies

- [x] Session 3 — Auth & RBAC (RBAC framework exists)
- [x] Session 2 — Tenant Resolution (tenant model exists)

## Objective

Build the Super Admin console for platform operators to provision tenants, manage billing, and toggle feature flags.

## Deliverables

- [x] Tenant list page (all tenants with plan, status, created date)
- [x] Tenant provisioning flow (create tenant + domain + seed defaults)
- [x] Tenant detail page (plan, status, domains, feature flags)
- [x] Feature flag toggles per tenant
- [x] Billing status display (Stripe Billing subscription status)
- [x] Plan change flow (trial → starter → growth → enterprise)

## Acceptance Criteria

- [x] New tenant provisioned in <60s end to end
- [x] Toggling a flag for tenant A doesn't affect tenant B
- [x] Billing webhook correctly suspends a tenant on payment failure
- [x] Suspended tenant storefront shows read-only mode
- [x] Only `super_admin` role can access these endpoints/UI

## Files to Touch

- `apps/admin/src/pages/super-admin/` — tenants, provisioning, flags
- `apps/admin/src/components/super-admin/` — TenantCard, FlagToggle, PlanSelector
- `apps/api/src/modules/platform/admin/` — super admin controller/service (new)
- `apps/api/prisma/seed.ts` — super admin user seed

## Notes

- Super Admin operates at platform level (no tenant context)
- Feature flags stored in the existing `feature_flags` table
- Stripe Billing webhook updates `tenants.status` to `suspended` on failure
