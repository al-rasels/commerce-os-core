# Session 2 — Tenant Resolution

## Status: NEXT

## Dependencies
- [x] Session 0 — Prerequisites (completed)
- [x] Session 1 — Repo Scaffold (completed)

## Objective
Every API request resolves to a tenant before any controller logic runs. Unmapped hostnames are rejected with 404 before reaching any route handler.

## Reference Docs
- `CommerceOS-Docs/03-multi-tenant/01-multi-tenant-architecture.md`
- `CommerceOS-Docs/14-data-contracts/01-phase1-entities.md` (tenants, tenant_domains tables)
- `CommerceOS-Docs/.agent/rules/01-tenant-isolation.md`

## Deliverables
- [ ] NestJS global middleware: parse `req.hostname` → look up `tenant_domains` → attach `tenant_id`
- [ ] `TenantContext` class (request-scoped provider) with fields per multi-tenant doc §2
- [ ] Seed script: create 2 test tenants + domains (`tenanta.localhost`, `tenantb.localhost`)
- [ ] Prisma migration: run initial migration to create `tenants` and `tenant_domains` tables
- [ ] `/api/whoami` test endpoint that returns the resolved tenant

## Files to Create/Modify
- `apps/api/src/modules/platform/tenant/` — new directory
  - `tenant.middleware.ts` — global hostname → tenant resolution
  - `tenant-context.ts` — request-scoped TenantContext class
  - `tenant.module.ts` — NestJS module declaration
  - `tenant.service.ts` — tenant lookup service (cached)
- `apps/api/src/modules/platform/platform.module.ts` — platform engine module
- `apps/api/prisma/seed.ts` — seed 2 test tenants + domains
- `apps/api/src/app.module.ts` — register TenantMiddleware globally

## Acceptance Criteria
- [ ] `tenanta.localhost:3000/api/whoami` returns tenant A's id
- [ ] `tenantb.localhost:3000/api/whoami` returns tenant B's id
- [ ] Unknown hostname returns 404 before any controller logic executes
- [ ] `TenantContext` is injectable in any controller and logs correctly
- [ ] Unit test: verify middleware rejects unmapped domains

## Technical Notes
- Middleware must run **before all routes** — use `app.use()` in `main.ts` or `NestMiddleware` with `forRoutes('*')`
- Local dev trick: `*.localhost` resolves to `127.0.0.1` in most browsers — no `/etc/hosts` edits needed
- Cache tenant lookups in Redis with key `tenant:domain:{hostname}` to avoid DB hit on every request
- Never resolve tenant *after* some route logic already ran
