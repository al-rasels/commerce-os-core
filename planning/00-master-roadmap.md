# Commerce OS — Master Execution Roadmap

## Platform Overview

Commerce OS is a multi-tenant SaaS commerce platform powering online stores, admin dashboards, and API integrations. It serves three client applications from a single NestJS backend with a PostgreSQL database.

## Execution Principles

1. **One feature at a time** — No parallel feature work. Each feature must pass acceptance criteria before next begins.
2. **Security first** — Phase 0 addresses active data leaks before any business logic.
3. **Tested = done** — No feature is complete without tests at appropriate layers.
4. **Production-ready** — Every feature includes error handling, logging, monitoring, and documentation.

---

## Phase 0 — Security Hardening (P0 — Critical)

| #   | Feature                                                                           | Est. Effort | Dependencies | Acceptance                                                        |
| --- | --------------------------------------------------------------------------------- | ----------- | ------------ | ----------------------------------------------------------------- |
| 0.1 | Response Serialization — exclude password_hash, mfa_secret from all API responses | 1d          | None         | No sensitive fields returned by any endpoint                      |
| 0.2 | JWT Authentication — login, register, token refresh, guards on all routes         | 3d          | 0.1          | All routes require auth; login returns JWT; 401 on invalid token  |
| 0.3 | Prisma @hidden fields — schema-level protection                                   | 0.5d        | None         | password_hash and mfa_secret excluded at Prisma level             |
| 0.4 | CSRF Protection — double-submit cookie pattern on state-changing endpoints        | 1d          | 0.2          | State-changing endpoints reject requests without valid CSRF token |
| 0.5 | Rate Limiting — per-user throttle in addition to global                           | 0.5d        | 0.2          | Different limits for authenticated vs anonymous users             |

## Phase 1 — Core Commerce (P1)

| #   | Feature                              | Est. Effort | Dependencies | Acceptance                                                                           |
| --- | ------------------------------------ | ----------- | ------------ | ------------------------------------------------------------------------------------ |
| 1.1 | Product CRUD with soft-delete filter | 3d          | 0.2          | Create/read/update/delete products; soft-delete; deleted products excluded from list |
| 1.2 | Category tree with nested set        | 2d          | 0.2          | CRUD categories; parent-child; tree response; sort order                             |
| 1.3 | Cart with guest session support      | 3d          | 1.1          | Add/remove/update items; guest session; merge on login; TTL expiry                   |
| 1.4 | Checkout with idempotency key        | 4d          | 1.3          | Convert cart to order; idempotency prevents double-charge; validation                |
| 1.5 | Order lifecycle                      | 3d          | 1.4          | Status transitions (pending→confirmed→shipped→delivered→cancelled); audit trail      |
| 1.6 | Stock reservation with expiry        | 2d          | 1.3          | Reserve on add to cart; auto-release on expiry; release on cancel                    |
| 1.7 | Pagination on ALL list endpoints     | 2d          | 1.1          | page, limit, sort, order, search, filter params on every list endpoint               |

## Phase 2 — Multi-Tenant Foundation (P1)

| #   | Feature                                         | Est. Effort | Dependencies | Acceptance                                                      |
| --- | ----------------------------------------------- | ----------- | ------------ | --------------------------------------------------------------- |
| 2.1 | Tenant-scoped query filter (global interceptor) | 1d          | 0.2          | All queries scoped to authenticated tenant                      |
| 2.2 | Domain-based tenant resolution (middleware)     | 2d          | 0.2          | Tenant identified from request domain header                    |
| 2.3 | Role-based access control                       | 3d          | 2.1          | Admin, Manager, Viewer roles with CRUD permissions per module   |
| 2.4 | Permission system (resource × action matrix)    | 2d          | 2.3          | Granular permissions; API guard checks permission before action |

## Phase 3 — Infrastructure & DevOps (P1)

| #   | Feature                              | Est. Effort | Dependencies | Acceptance                                         |
| --- | ------------------------------------ | ----------- | ------------ | -------------------------------------------------- |
| 3.1 | Docker Compose with Postgres + Redis | 1d          | None         | docker-compose up starts all services              |
| 3.2 | CI/CD pipeline (GitHub Actions)      | 2d          | 3.1          | lint → test → build → deploy on push               |
| 3.3 | OpenAPI/Swagger auto-generation      | 1d          | 3.1          | /api/docs serves interactive Swagger UI            |
| 3.4 | Health check + readiness endpoints   | 0.5d        | 3.1          | /health, /ready return 200 with status             |
| 3.5 | Request ID / correlation ID tracing  | 1d          | 3.1          | Every request has unique traceable ID; logged      |
| 3.6 | Error tracking (Sentry)              | 1d          | 3.1          | Errors sent to Sentry; source maps uploaded        |
| 3.7 | Unit + integration test framework    | 3d          | 3.1          | Jest configured; 10+ tests passing                 |
| 3.8 | E2E test scaffold (Playwright)       | 2d          | 3.1          | Playwright configured; critical path tests passing |

## Phase 4 — Storefront Complete (P2)

| #   | Feature                                | Est. Effort | Dependencies | Acceptance                                  |
| --- | -------------------------------------- | ----------- | ------------ | ------------------------------------------- |
| 4.1 | Error boundaries + Suspense boundaries | 1d          | None         | App doesn't white-screen on error           |
| 4.2 | Loading skeletons                      | 1d          | None         | Skeleton shown during data fetch            |
| 4.3 | Optimistic cart UI                     | 2d          | 1.3          | Cart updates instantly; syncs in background |
| 4.4 | SEO (metadata, JSON-LD, sitemap)       | 2d          | None         | Pages have proper meta; sitemap generates   |
| 4.5 | Analytics (PostHog)                    | 1d          | None         | Page views, events tracked                  |
| 4.6 | Accessibility audit + fixes            | 3d          | None         | WCAG 2.2 AA compliance                      |
| 4.7 | PWA manifest + service worker          | 1d          | None         | Installable; offline page                   |
| 4.8 | Internationalization (next-intl)       | 2d          | None         | Multi-locale; RTL support                   |

## Phase 5 — Admin Panel Complete (P2)

| #   | Feature                               | Est. Effort | Dependencies | Acceptance                               |
| --- | ------------------------------------- | ----------- | ------------ | ---------------------------------------- |
| 5.1 | Lazy-loaded routes                    | 1d          | None         | Code-split by route                      |
| 5.2 | Advanced table (sort, filter, export) | 3d          | 1.7          | Sortable, filterable, exportable tables  |
| 5.3 | Bulk operations                       | 2d          | 5.2          | Batch status change, delete              |
| 5.4 | Confirm dialogs                       | 1d          | None         | Destructive actions require confirmation |
| 5.5 | Audit log viewer                      | 1d          | None         | Searchable audit trail in admin          |
| 5.6 | Dashboard with charts                 | 3d          | None         | Revenue, orders, customers stats         |

## Phase 6 — Advanced Features (P3)

| #   | Feature                  | Est. Effort | Dependencies | Acceptance                               |
| --- | ------------------------ | ----------- | ------------ | ---------------------------------------- |
| 6.1 | Stripe payments          | 5d          | 1.5          | Charge card; webhook; refund; receipt    |
| 6.2 | Email notifications      | 3d          | 1.5          | Order confirmation; shipping update      |
| 6.3 | Search (Meilisearch)     | 3d          | 1.1          | Typo-tolerant product search             |
| 6.4 | Background jobs (BullMQ) | 2d          | 3.1          | Queue for email, exports, cleanup        |
| 6.5 | File uploads (S3/R2)     | 2d          | None         | Product images; presigned URLs           |
| 6.6 | Promotions engine        | 3d          | 1.5          | Coupon codes; percentage/fixed discounts |
| 6.7 | Shipping rules engine    | 2d          | 1.5          | Weight/price-based shipping              |
| 6.8 | Tax rules engine         | 2d          | 1.5          | Region-based tax calculation             |

## Phase 7 — Scale & Polish (P4)

| #   | Feature                  | Est. Effort | Dependencies | Acceptance                         |
| --- | ------------------------ | ----------- | ------------ | ---------------------------------- |
| 7.1 | Redis caching layer      | 3d          | 3.1          | Cache product/category queries     |
| 7.2 | Read replicas (CQRS)     | 5d          | 3.1          | Separate read/write DB connections |
| 7.3 | Rate limiting per tenant | 1d          | 2.1          | Per-tenant throttle limits         |
| 7.4 | Storybook for components | 2d          | None         | Component library documented       |
| 7.5 | Bundle analysis          | 1d          | None         | CI checks bundle size              |
| 7.6 | Load testing (k6)        | 2d          | None         | Spike test; soak test              |

---

## Dependency Graph

```
Phase 0 ─────────────────────────────────────────────────────────
  │
  ├──→ 0.1 Response Serialization ──→ 0.2 JWT Auth ──→ 0.4 CSRF
  │                                                     0.5 Rate Limit
  │
  ├──→ 0.3 Prisma Hidden Fields (independent)
  │
  ├──→ Phase 1 (depends on 0.2)
  │     │
  │     ├──→ 1.1 Products ──→ 1.7 Pagination
  │     ├──→ 1.2 Categories
  │     ├──→ 1.3 Carts ──→ 1.6 Stock Reservation
  │     ├──→ 1.4 Checkout ──→ 1.5 Order Lifecycle
  │
  ├──→ Phase 2 (depends on 0.2)
  │     │
  │     ├──→ 2.1 Tenant Scope ──→ 2.3 RBAC
  │     ├──→ 2.2 Domain Routing   └──→ 2.4 Permissions
  │
  ├──→ Phase 3 (can start after 0.1)
  │     │
  │     ├──→ 3.1 Docker ──→ 3.3 OpenAPI ──→ 3.7 Tests
  │     │                ├──→ 3.4 Health
  │     │                ├──→ 3.5 Tracing
  │     │                └──→ 3.6 Sentry
  │     └──→ 3.2 CI/CD (parallel)
  │
  ├──→ Phase 4 (Frontend improvements, lighter deps)
  ├──→ Phase 5 (Admin improvements)
  ├──→ Phase 6 (Advanced, depends on Phase 1)
  └──→ Phase 7 (Scale, depends on Phase 3)
```

---

## Definition of Done

Every feature is complete only when:

1. Code compiles with zero TypeScript errors
2. All new endpoints tested (unit + integration)
3. Security review passed (no secrets leaked, auth enforced)
4. No console errors/warnings in any client
5. Accessibility checked (keyboard nav, screen reader, contrast)
6. Pagination implemented on all list endpoints
7. Error handling covers success, client error, server error, edge cases
8. Request ID tracing present in logs
9. OpenAPI schema reflects new endpoints
10. Acceptance criteria met
