# Session 5 — Catalog CRUD (Admin)

## Status: BACKLOG

## Dependencies
- [ ] Session 3 — Auth & RBAC
- [ ] Session 4 — Core Schema + Isolation Test Pattern

## Objective
Prove the tenant-scoped pattern works end-to-end through a real feature: product catalog CRUD in the admin dashboard.

## Key Deliverables
- `ProductsController` + `ProductsService` using `TenantScopedRepository`
- DTOs with `class-validator` validation
- Minimal admin UI page: list/create/edit products via API with auth token
- Verify tenant A's products are invisible to tenant B
