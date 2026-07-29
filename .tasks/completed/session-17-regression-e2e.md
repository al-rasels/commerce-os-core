# Session 17 — Full Regression + E2E Testing

## Status: BACKLOG

## Dependencies

- [x] All Phase 1 backend sessions (02–09)
- [x] All Phase 1 frontend sessions (05a, 06a, 07a, 08, 08a, 09a, 09b)
- [x] Storefront Core Pages (11)

## Objective

Run a comprehensive regression pass covering all built features, verify tenant isolation, and establish end-to-end testing infrastructure.

## Deliverables

- [x] Isolation test for every table (parameterized, automated, all CRUD paths)
- [x] Cross-tenant token test for every authenticated endpoint (verify isolation)
- [x] Unauthenticated access denial test for every guarded endpoint
- [x] Full E2E flow test: signup → provision tenant → configure catalog → place order → verify
- [x] Load-test checkout (target P95 < 300ms)
- [x] Admin UI smoke tests (catalog CRUD, theme editor, page builder)
- [x] Storefront smoke tests (homepage, product listing, detail, cart, checkout)
- [x] All tests green in CI pipeline

## Acceptance Criteria

- [x] Every Prisma model has an isolation test (tenant A cannot see tenant B's data)
- [x] Every authenticated endpoint rejects cross-tenant tokens with 403
- [x] Every guarded endpoint rejects unauthenticated requests with 401
- [x] Full checkout flow E2E test passes end-to-end
- [x] Checkout completes under 300ms at 50 concurrent requests
- [x] Admin UI catalog screens work without errors
- [x] Storefront renders products and processes cart correctly
- [x] CI workflow runs test suite on every push

## Notes

- Build guide Sessions 11-12 were merged into this single testing pass.
- Use Playwright for E2E, Supertest + Jest for API isolation tests, k6 for load testing.
- Seed data creation test should be deterministic (use seeded UUIDs).
- Each test should be independently runnable (no shared test state between files).
