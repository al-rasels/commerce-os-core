# Module 1 — Platform Engine (Tenancy, Auth/RBAC, DB Schema, Super Admin)

Covers Phase 1 Milestones M1, M2, M3, M10 (`10-roadmap/02-phase1-mvp-spec.md` §3).
Requirement IDs: `REQ-PLAT-001..028` (mapped fully in `05-traceability-and-gap-analysis.md`).

Reference docs for this whole module: `03-multi-tenant/01-multi-tenant-architecture.md`, `04-database-security/01-database-architecture.md`, `04-database-security/02-security-authentication.md`, `14-data-contracts/01-phase1-entities.md`, `.agent/rules/01-tenant-isolation.md`.

---

## Milestone M1 — Tenant Provisioning + Resolution

**Feature:** Tenant Resolution & Provisioning · **Depends on:** none (Phase 1 root)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-PLAT-M1-000 | Dependency Cleanup & Alignment: remove `bcrypt` in API, add missing `vitest`/`@testing-library/react` to frontend apps per catalog | — | 30m | XS | `npm` | BE/FE |
| T-PLAT-M1-001 | Write Prisma schema for `tenants` table per entity contract (id, name, plan_id, status, created_at) | — | 20m | XS | `prisma` | DBA |
| T-PLAT-M1-002 | Write Prisma schema for `tenant_domains` table (id, tenant_id FK, domain UNIQUE, is_primary) | 001 | 20m | XS | `prisma` | DBA |
| T-PLAT-M1-003 | Generate + review initial Prisma migration for both tables | 002 | 20m | XS | Prisma Migrate | DBA |
| T-PLAT-M1-004 | Add DB-level UNIQUE constraint + index on `tenant_domains.domain` | 003 | 15m | XS | `prisma` | DBA |
| T-PLAT-M1-005 | Scaffold `apps/api/src/modules/platform/platform.module.ts` | — | 15m | XS | `@nestjs/common` | BE |
| T-PLAT-M1-006 | Scaffold `apps/api/src/modules/platform/tenant/` directory + `tenant.module.ts` | 005 | 15m | XS | `@nestjs/common` | BE |
| T-PLAT-M1-007 | Implement `TenantContext` request-scoped provider class (fields per multi-tenant doc §2) | 006 | 45m | S | `@nestjs/core` (REQUEST scope) | BE |
| T-PLAT-M1-008 | Implement `tenant.service.ts`: lookup tenant by hostname from DB | 006 | 45m | S | `prisma`, `pg` | BE |
| T-PLAT-M1-009 | Add Redis-backed cache to tenant lookup, key `tenant:domain:{hostname}` | 008 | 45m | S | `ioredis`, `@nestjs/cache-manager` | BE |
| T-PLAT-M1-010 | Implement `tenant.middleware.ts`: parse `req.hostname`, resolve tenant, attach to `TenantContext` | 007, 009 | 60m | M | `@nestjs/common` (`NestMiddleware`) | BE |
| T-PLAT-M1-011 | Register `TenantMiddleware` globally in `app.module.ts` / `main.ts`, applied before all routes | 010 | 30m | S | `@nestjs/core` | BE |
| T-PLAT-M1-012 | Reject unmapped hostnames with 404 before controller logic executes | 010 | 30m | S | `@nestjs/common` exceptions | BE |
| T-PLAT-M1-013 | Build `/api/whoami` test endpoint returning resolved tenant id/name | 011 | 20m | XS | `@nestjs/common` | BE |
| T-PLAT-M1-014 | Write `prisma/seed.ts`: create 2 test tenants + domains (`tenanta.localhost`, `tenantb.localhost`) | 003 | 30m | XS | Prisma seed | BE |
| T-PLAT-M1-015 | Internal provisioning service: `createTenant()` (name, plan_id, primary domain) — used by seed + later Super Admin UI (M10) | 001-004 | 60m | M | `prisma` | BE |
| T-PLAT-M1-016 | Unit test: middleware rejects unmapped domain (404, no controller reached) | 012 | 30m | S | `jest`, `@nestjs/testing` | QA |
| T-PLAT-M1-017 | Integration test: `tenanta.localhost` and `tenantb.localhost` return correct distinct tenant ids via `/api/whoami` | 013, 014 | 45m | S | `jest`, `supertest` | QA |
| T-PLAT-M1-018 | Perf check: tenant lookup path served from Redis cache, not DB, on repeat requests (log/verify cache hit) | 009 | 30m | XS | `ioredis` | BE |

**Milestone AC (from phase1-mvp-spec §4):** tenant provisioning < 60s end to end; `TenantContext` injectable in any controller; unknown hostname never reaches route logic.

---

## Milestone M2 — Auth / RBAC + JWT Tenant-Claim Enforcement

**Feature:** Authentication & Role-Based Access Control · **Depends on:** M1, M3 (users/roles tables)
**Library note (per your decision):** `@nestjs/jwt` + `passport-jwt` for JWT issuing/verification, `argon2` for password hashing — the repo's documented choice (`02-package-catalog.md` §2), not Better Auth.

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-PLAT-M2-001 | Scaffold `apps/api/src/modules/platform/auth/` + `auth.module.ts` | M1-011 | 15m | XS | `@nestjs/common` | BE |
| T-PLAT-M2-002 | Register `@nestjs/jwt` (`JwtModule`) with access-token config (15min expiry) | 001 | 30m | XS | `@nestjs/jwt` | BE |
| T-PLAT-M2-003 | Implement `strategies/jwt.strategy.ts` (Passport JWT strategy, extract `sub`/`tenant_id`/`role`) | 002 | 45m | S | `passport-jwt`, `@nestjs/passport` | BE |
| T-PLAT-M2-004 | Implement `auth.guard.ts`: verify JWT signature/expiry via strategy | 003 | 30m | S | `@nestjs/passport` | SEC |
| T-PLAT-M2-005 | Extend `auth.guard.ts`: compare token `tenant_id` claim vs resolved `TenantContext.tenantId`, reject (403) on mismatch | 004, M1-007 | 45m | S | custom | SEC |
| T-PLAT-M2-006 | Create login DTO (`email`, `password`) with `class-validator` decorators | 001 | 20m | XS | `class-validator`, `class-transformer` | BE |
| T-PLAT-M2-007 | Implement `auth.service.ts`: credential verification against `users.password_hash` | 006 | 45m | S | `argon2` | SEC |
| T-PLAT-M2-008 | Implement password hashing utility using `argon2` (never bcrypt/plaintext) | 007 | 20m | XS | `argon2` | SEC |
| T-PLAT-M2-009 | Implement access + refresh token issuance on successful login | 007, 002 | 45m | S | `@nestjs/jwt` | BE |
| T-PLAT-M2-010 | Store refresh token hashed in Redis, tenant-namespaced key `tenant:{tenantId}:refresh:{userId}` | 009 | 45m | S | `ioredis` | SEC |
| T-PLAT-M2-011 | Implement refresh-token rotation endpoint (invalidate old, issue new) | 010 | 60m | M | `@nestjs/jwt`, `ioredis` | BE |
| T-PLAT-M2-012 | Implement logout/revoke endpoint (blacklist refresh token in Redis) | 010 | 30m | S | `ioredis` | SEC |
| T-PLAT-M2-013 | Build `auth.controller.ts`: login, register, refresh, logout routes | 007, 009, 011, 012 | 45m | S | `@nestjs/common` | BE |
| T-PLAT-M2-014 | Build registration endpoint for tenant users (creates `users` row scoped to resolved tenant) | 013, M1-007 | 45m | S | `class-validator` | BE |
| T-PLAT-M2-015 | Seed 4 roles: `super_admin` (tenant_id NULL), `store_owner`, `store_staff`, `customer` | M3-roles-table | 30m | XS | Prisma seed | BE |
| T-PLAT-M2-016 | Implement `TenantScopedRepository` base class: auto-inject `WHERE tenant_id = ctx.tenantId` via `prisma.$use` middleware | M1-007, M3 | 60m | M | `prisma` (`$use`) | ARCH |
| T-PLAT-M2-017 | Implement permission-check resolver reading through `TenantContext.permissions` (never raw role-name string compare) | 015, 016 | 45m | S | custom | SEC |
| T-PLAT-M2-018 | Critical isolation test: mint JWT for tenant A, call endpoint resolved as tenant B → assert 403 | 005 | 45m | M | `jest`, `supertest` | QA |
| T-PLAT-M2-019 | `TenantScopedRepository` unit test: seed rows for 2 tenants, confirm tenant A query never returns tenant B rows | 016 | 45m | M | `jest`, `@nestjs/testing` | QA |
| T-PLAT-M2-020 | Refresh-token rotation test: confirm old token invalidated after use | 011 | 30m | S | `jest`, `supertest` | QA |
| T-PLAT-M2-021 | Forgot-password flow: request reset (email + time-limited signed token) | 007 | 45m | S | `@nestjs/jwt` (short-lived reset token) or signed UUID + Redis TTL | SEC |
| T-PLAT-M2-022 | Forgot-password flow: reset endpoint (verify token, set new argon2 hash, invalidate all existing refresh tokens for that user) | 021, 008, 010 | 45m | S | `argon2`, `ioredis` | SEC |
| T-PLAT-M2-023 | Password-reset email template + send | 021 | 30m | XS | `resend` + `react-email` | BE |
| T-PLAT-M2-024 | Change-password endpoint (authenticated, current-password verification required) | 007, 008 | 30m | S | `argon2` | SEC |
| T-PLAT-M2-025 | On password change or reset, revoke **all** existing refresh tokens for that user (not just the current session) | 022, 024, 010 | 30m | S | `ioredis` | SEC |
| T-PLAT-M2-026 | MFA/OTP enrollment for platform-level (Super Admin) accounts — **mandatory**, per security doc §1 | 013 | 60m | M | `otplib` (TOTP) | SEC |
| T-PLAT-M2-027 | MFA/OTP verification step inserted into login flow for accounts with MFA enabled | 026 | 45m | S | `otplib` | SEC |
| T-PLAT-M2-028 | MFA/OTP optional enrollment for tenant-level accounts (per-plan gated via feature flag) | 026, T-PLAT-M10-013 | 30m | S | `otplib` | SEC |
| T-PLAT-M2-029 | Recovery-code generation/storage for MFA-enrolled accounts (lockout prevention) | 026 | 30m | S | `argon2`-hashed codes at rest | SEC |
| T-PLAT-M2-030 | Test: password change/reset invalidates all prior sessions (no stale refresh token survives) | 025 | 30m | S | `jest`, `supertest` | QA |
| T-PLAT-M2-031 | Test: Super Admin login is rejected without MFA step once enrolled (cannot be bypassed) | 027 | 30m | S | `jest`, `supertest` | QA |

**Milestone AC:** login returns working access+refresh pair; cross-tenant token rejected (permanent automated test); password always argon2-hashed, never plaintext/bcrypt.

---

## Milestone M3 — Database Schema (Phase 1 tables) + TenantScopedRepository

**Feature:** Core Data Layer · **Depends on:** M1

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-PLAT-M3-001 | Prisma schema: `users` table (tenant_id nullable, email, password_hash, role_id, UNIQUE(tenant_id,email)) | M1-003 | 25m | XS | `prisma` | DBA |
| T-PLAT-M3-002 | Prisma schema: `roles` table (tenant_id nullable, name) | M1-003 | 20m | XS | `prisma` | DBA |
| T-PLAT-M3-003 | Prisma schema: `feature_flags` table (tenant_id, flag_key dot-namespaced, enabled, UNIQUE(tenant_id,flag_key)) | M1-003 | 20m | XS | `prisma` | DBA |
| T-PLAT-M3-004 | Prisma schema: `products`, `product_variants`, `categories` per entity contract | M1-003 | 40m | S | `prisma` | DBA |
| T-PLAT-M3-005 | Prisma schema: `customers`, `carts`, `cart_items` | M1-003 | 30m | S | `prisma` | DBA |
| T-PLAT-M3-006 | Prisma schema: `orders`, `order_items` | M1-003 | 30m | S | `prisma` | DBA |
| T-PLAT-M3-007 | Prisma schema: `stock_reservations` per `.agent/skills` stock-reservation algorithm spec | 004 | 30m | S | `prisma` | DBA |
| T-PLAT-M3-008 | Prisma schema: `theme_base`, theme override tables per Experience Engine entity contract | M1-003 | 30m | S | `prisma` | DBA |
| T-PLAT-M3-009 | Generate consolidated Phase 1 migration, review against entity-contract doc field-by-field (no invented fields) | 001-008 | 60m | M | Prisma Migrate | DBA |
| T-PLAT-M3-010 | Add composite/UNIQUE indexes: `(tenant_id, slug)` on products/categories, `(tenant_id, sku)` on variants | 009 | 30m | S | `prisma` | DBA |
| T-PLAT-M3-011 | Add `deleted_at` soft-delete column + partial index pattern on products | 004 | 20m | XS | `prisma` | DBA |
| T-PLAT-M3-012 | Add `metafields_json` JSONB columns (products, orders) for third-party extensibility | 004, 006 | 20m | XS | `prisma` | DBA |
| T-PLAT-M3-013 | Implement KMS-backed field encryption helper for PII columns (customer email/phone) | 005 | 60m | M | `@aws-sdk/client-kms` or `node:crypto` | SEC |
| T-PLAT-M3-014 | Implement audit-log table + write-path for privilege-sensitive actions | 001, 002 | 45m | S | `prisma`, `pino` | SEC |
| T-PLAT-M3-015 | Implement DB connection pooling config + env validation (`pg`, `@nestjs/config` + `zod`) | 009 | 30m | S | `pg`, `zod` | BE |
| T-PLAT-M3-016 | Migration rollback test: apply → rollback → re-apply cleanly on fresh DB | 009 | 30m | S | Prisma Migrate | DBA |
| T-PLAT-M3-017 | Seed script: baseline reference data (roles, default theme_base row) | 002, 008 | 30m | XS | Prisma seed | BE |
| T-PLAT-M3-018 | Write ERD diagram doc for Phase 1 schema (matches entity contract exactly) | 009 | 45m | S | — (docs) | DBA |
| T-PLAT-M3-019 | DB-level isolation test: attempt cross-tenant FK insert (e.g. order referencing another tenant's variant), confirm rejected/constrained | 006, 007 | 45m | M | `jest` | QA |
| T-PLAT-M3-020 | Index/EXPLAIN ANALYZE pass on all tenant-scoped query patterns used by M1/M2/M4/M9 | 010 | 60m | M | `pg` (`EXPLAIN`) | DBA |

**Milestone AC:** schema matches `14-data-contracts/01-phase1-entities.md` field-for-field; no field exists in code without existing in the entity contract first.

---

## Milestone M10 — Super Admin (Provisioning UI, Billing, Feature Flags)

**Feature:** Platform Operations Console · **Depends on:** M2 (auth), M1 (provisioning service)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-PLAT-M10-001 | Scaffold Super Admin routes within `apps/admin` gated by `super_admin` role | M2-017 | 30m | XS | `react-router` | FE |
| T-PLAT-M10-002 | Build tenant-provisioning form (name, plan, primary domain) | M10-001 | 60m | M | `react-hook-form` + `zod` | FE |
| T-PLAT-M10-003 | Wire provisioning form to `POST /platform/tenants` calling `createTenant()` (M1-015) | 002 | 45m | S | `@tanstack/react-query` | BE |
| T-PLAT-M10-004 | Backend endpoint: `POST /platform/tenants` (super-admin only, calls provisioning service) | M1-015, M2-017 | 45m | S | `@nestjs/common` | BE |
| T-PLAT-M10-005 | Backend endpoint: `PATCH /platform/tenants/:id/status` (active/suspended/offboarding) | 004 | 30m | S | `@nestjs/common` | BE |
| T-PLAT-M10-006 | Build tenant list/table view (status, plan, domain) | M10-001 | 45m | S | `@tanstack/react-table` | FE |
| T-PLAT-M10-007 | Build tenant detail view (status toggle, domain management) | 006 | 45m | S | `@tanstack/react-query` | FE |
| T-PLAT-M10-008 | Integrate Stripe subscription-only billing (no usage metering) — checkout session creation | 004 | 60m | M | `stripe` | BE |
| T-PLAT-M10-009 | Stripe webhook handler: subscription created/updated/cancelled → sync `tenants.plan_id`/`status` | 008 | 60m | M | `stripe` webhooks | BE |
| T-PLAT-M10-010 | Build billing status view in Super Admin (plan, next invoice, status) | 009 | 45m | S | `@tanstack/react-query` | FE |
| T-PLAT-M10-011 | Backend endpoint: feature-flag CRUD (`feature_flags` table, hand-rolled resolver per package catalog) | M3-003 | 45m | S | `prisma` | BE |
| T-PLAT-M10-012 | Build feature-flag management UI (toggle per tenant, dot-namespaced keys) | 011 | 45m | S | `@radix-ui/*` (Switch) | FE |
| T-PLAT-M10-013 | Implement feature-flag resolver service used by other modules to gate functionality | 011 | 30m | XS | custom + `ioredis` cache | BE |
| T-PLAT-M10-014 | Implement GDPR data-export endpoint per tenant | M3-013 | 60m | M | custom | SEC |
| T-PLAT-M10-015 | Implement right-to-erasure hard-delete offboarding path | 005, 014 | 60m | M | `prisma` (transactional delete) | SEC |
| T-PLAT-M10-016 | Rate limiting: per-tenant + per-IP throttling on all Platform routes (using Redis storage provider) | M2-013 | 30m | S | `@nestjs/throttler` + Redis | SEC |
| T-PLAT-M10-017 | Security headers middleware (CSP, HSTS, X-Frame-Options) | — | 20m | XS | `helmet` | SEC |
| T-PLAT-M10-018 | Toast/notification feedback for Super Admin actions (provision success, billing sync) | 003, 009 | 20m | XS | `sonner` | FE |
| T-PLAT-M10-019 | E2E test: provision tenant via Super Admin UI → verify tenant resolvable within 60s | 003, 004 | 45m | M | `playwright` | QA |
| T-PLAT-M10-020 | Audit-log entries generated for all Super Admin privileged actions | M3-014 | 30m | S | `pino` + audit table | SEC |
| T-PLAT-M10-021 | Backend: tenant-scoped user management endpoints (`GET/POST/PATCH /admin/users` — Store Owner invites/manages Store Staff) | M2-016, M2-017 | 45m | S | `@nestjs/common`, `class-validator` | BE |
| T-PLAT-M10-022 | Staff invitation flow: email invite with signed onboarding token (sets password on first login) | 021, T-PLAT-M2-021 (reuses reset-token pattern) | 45m | S | `resend` + `react-email` | BE |
| T-PLAT-M10-023 | Role-assignment enforcement: Store Owner can assign `store_staff`/`store_owner` only within their own tenant, never `super_admin` | 021, M2-017 | 30m | S | custom guard | SEC |
| T-PLAT-M10-024 | Admin UI (in `apps/admin`, not Super Admin console): user/staff list + invite + role-assignment screen | 021 | 60m | M | `@tanstack/react-table`, `react-hook-form` | FE |
| T-PLAT-M10-025 | Admin Dashboard home/overview page: key metrics widgets (orders today, revenue, low-stock alerts) | T-COMM-M9-019, T-COMM-M4-004 | 60m | M | `recharts` (per package catalog §4) | FE |
| T-PLAT-M10-026 | Test: Store Owner cannot self-elevate or elevate staff to `super_admin` via user-management endpoint | 023 | 30m | S | `jest`, `supertest` | QA |
| T-PLAT-M10-027 | Isolation test: Store Owner in tenant A cannot see/invite/manage users belonging to tenant B | 021, T-QA-M11-002 | 30m | S | `jest`, `supertest` | QA |

**Milestone AC:** tenant provisioning < 60s; Super Admin can suspend/offboard a tenant; feature flags togglable per tenant without deploy.
