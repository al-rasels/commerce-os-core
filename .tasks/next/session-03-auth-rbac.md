# Session 3 — Auth & RBAC

## Status: NEXT

## Dependencies
- [x] Session 1 — Repo Scaffold (completed)
- [ ] Session 2 — Tenant Resolution (next)

## Objective
Login works, JWTs carry `tenant_id` as a claim, and cross-tenant tokens are rejected. Four roles seeded: Super Admin, Store Owner, Store Staff, Customer.

## Reference Docs
- `CommerceOS-Docs/04-database-security/02-security-authentication.md`
- `CommerceOS-Docs/14-data-contracts/01-phase1-entities.md` (users, roles tables)
- `CommerceOS-Docs/.agent/rules/01-tenant-isolation.md`
- `CommerceOS-Docs/11-build-guide/01-session-by-session-build-guide.md` §Session 3

## Deliverables
- [ ] Login endpoint: verify credentials → issue access token (15min) + refresh token (rotating, hashed in Redis)
- [ ] JWT claims: `sub` (user id), `tenant_id`, `role`
- [ ] Auth guard: verify JWT + compare token's `tenant_id` against resolved `TenantContext.tenantId` — mismatch = 403
- [ ] Seed 4 roles: `super_admin` (tenant_id NULL), `store_owner`, `store_staff`, `customer`
- [ ] `TenantScopedRepository` base class: auto-inject `WHERE tenant_id = ctx.tenantId` on every query
- [ ] Registration endpoint for tenant users

## Files to Create/Modify
- `apps/api/src/modules/platform/auth/` — new directory
  - `auth.controller.ts` — login, register, refresh endpoints
  - `auth.service.ts` — credential verification, token issuance
  - `auth.module.ts` — module with JWT registration
  - `auth.guard.ts` — JWT validation + tenant-claim cross-check
  - `strategies/jwt.strategy.ts` — Passport JWT strategy
- `apps/api/src/modules/platform/auth/dto/` — login, register DTOs
- `apps/api/src/common/repositories/tenant-scoped.repository.ts` — base repository class
- `apps/api/prisma/seed.ts` — extend with role + user seeds

## Acceptance Criteria
- [ ] Login returns a working access + refresh token pair
- [ ] **Critical test:** mint token for tenant A, call endpoint resolved as tenant B → assert 403 (permanent automated test)
- [ ] `TenantScopedRepository` unit test: seed rows for 2 tenants, confirm querying as tenant A never returns tenant B's rows
- [ ] Refresh token rotation works (old token invalidated after use)
- [ ] Password hashed with argon2 (never plaintext, never bcrypt)

## Technical Notes
- Use `argon2` for password hashing (modern recommendation per package catalog)
- Refresh tokens stored **hashed** in Redis with tenant-namespaced key: `tenant:{tenantId}:refresh:{userId}`
- Never trust a `tenant_id` field from the request body — always use resolved `TenantContext`
- The `TenantScopedRepository` pattern uses Prisma middleware (`prisma.$use`) to auto-inject tenant filtering
