# Session 4 — Core Schema + Isolation Test Pattern

## Status: BACKLOG

## Dependencies
- [ ] Session 2 — Tenant Resolution
- [ ] Session 3 — Auth & RBAC

## Objective
All Phase 1 tables migrated and a reusable parameterized isolation test catches any future cross-tenant data leak automatically.

## Key Deliverables
- Run Prisma migrations for all Phase 1 tables
- Every entity extends `TenantScopedEntity` (adds `tenant_id` + relation automatically)
- One parameterized isolation test function: seed 2 tenants → assert cross-read empty → reuse for every table
- CI (GitHub Action) runs isolation suite on every PR
