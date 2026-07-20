# Session 12 — Infrastructure & DevOps

## Status: BACKLOG

## Dependencies
- [x] All Phase 1 features have working backend

## Objective
Establish CI/CD, Dockerization, testing infrastructure, monitoring, and developer tooling for production readiness.

## Deliverables
- [ ] GitHub Actions CI (lint, typecheck, test, build on every PR)
- [ ] Dockerfiles for `apps/api` (multi-stage, non-root user)
- [ ] `docker-compose.yml` with api + postgres + redis (verify working)
- [ ] Integration test suite (API endpoint tests with test containers)
- [ ] E2E test (Playwright): signup → provision → configure → order → verify
- [ ] Pre-commit hooks (husky + lint-staged)
- [ ] Sentry error monitoring integration (apps/api + apps/storefront + apps/admin)
- [ ] Health check endpoint (`/api/health`)
- [ ] Structured logging (NestJS Logger or Pino)
- [ ] `.env.example` for all apps

## Acceptance Criteria
- [ ] CI pipeline runs in <5 minutes
- [ ] Docker compose boots entire stack with one command
- [ ] E2E test passes reliably (not flaky)
- [ ] Sentry captures unhandled errors in all apps
- [ ] Pre-commit hooks block lint errors
- [ ] Health check reports DB + Redis connectivity

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
