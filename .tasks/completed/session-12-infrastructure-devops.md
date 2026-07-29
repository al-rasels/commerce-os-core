# Session 12 — Infrastructure & DevOps

## Status: BACKLOG

## Dependencies

- [x] All Phase 1 features have working backend

## Objective

Establish CI/CD, Dockerization, testing infrastructure, monitoring, and developer tooling for production readiness.

## Deliverables

- [x] GitHub Actions CI (lint, typecheck, test, build on every PR)
- [x] Dockerfiles for `apps/api` (multi-stage, non-root user)
- [x] `docker-compose.yml` with api + postgres + redis (verify working)
- [x] Integration test suite (API endpoint tests with test containers)
- [x] E2E test (Playwright): signup → provision → configure → order → verify
- [x] Pre-commit hooks (husky + lint-staged)
- [x] Sentry error monitoring integration (apps/api + apps/storefront + apps/admin)
- [x] Health check endpoint (`/api/health`)
- [x] Structured logging (NestJS Logger or Pino)
- [x] `.env.example` for all apps

## Acceptance Criteria

- [x] CI pipeline runs in <5 minutes
- [x] Docker compose boots entire stack with one command
- [x] E2E test passes reliably (not flaky)
- [x] Sentry captures unhandled errors in all apps
- [x] Pre-commit hooks block lint errors
- [x] Health check reports DB + Redis connectivity

## Files to Touch

- `.github/workflows/ci.yml`
- `apps/api/Dockerfile`
- `docker-compose.yml`
- `apps/api/test/` — integration tests
- `apps/e2e/` — Playwright tests
- `.husky/` — pre-commit hooks
- `apps/api/src/main.ts` — Sentry + health check
- Root `.env.example`

## Notes

- Use Playwright for E2E
- Health check returns `{ status, db: 'ok', redis: 'ok', version }`
- Sentry DSN configured per environment
