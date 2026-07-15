# Module 4 — Quality Engineering, DevOps, and Documentation (Cross-Cutting)

Covers Phase 1 Milestones M11, M12, plus the cross-cutting QA/DevOps/Docs work every other module depends on.
Requirement IDs: `REQ-QA-001..024`, `REQ-OPS-001..020`, `REQ-DOC-001..014`.

---

## A. Quality Engineering Infrastructure (enables all module-level tests above)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-QA-001 | Standardize on `vitest` across Next.js/Vite apps; `jest` for NestJS API (per package catalog §6 decision) | — | 20m | XS | `vitest`, `jest` | ARCH |
| T-QA-002 | Configure test DB strategy: ephemeral Postgres per CI run, seeded via Prisma | T-PLAT-M3-017 | 45m | S | Docker, Prisma | DBA |
| T-QA-003 | Configure `supertest` harness for NestJS integration tests (bootstraps full Nest app per suite) | T-PLAT-M2-001 | 30m | S | `supertest`, `@nestjs/testing` | QA |
| T-QA-004 | Configure `@testing-library/react` + `vitest` for component tests (admin + storefront) | — | 30m | S | `@testing-library/react` | QA |
| T-QA-005 | Configure `jest-axe`/`axe-core` for automated a11y assertions in component tests | — | 20m | XS | `jest-axe` | Accessibility |
| T-QA-006 | Configure `playwright` project (multi-project: storefront, admin, multi-tenant/multi-domain scenarios) | — | 45m | S | `playwright` | QA |
| T-QA-007 | Configure `@axe-core/playwright` for E2E a11y checks | 006 | 20m | XS | `@axe-core/playwright` | Accessibility |
| T-QA-008 | Configure `k6` load-testing scripts targeting checkout path (phase1-mvp-spec §4 P95 target) | T-COMM-M9-028 | 45m | S | `k6` | Perf Engineer |
| T-QA-009 | Configure Lighthouse CI for storefront perf/SEO budgets | T-EXP-M8-021 | 30m | S | Lighthouse CI | Perf Engineer |
| T-QA-010 | Set up Storybook visual regression baseline (screenshot diffing) | T-EXP-M5-021 | 45m | S | `playwright` screenshots or `chromatic` | QA |
| T-QA-011 | Cross-browser test matrix config (Chromium/Firefox/WebKit via Playwright projects) | 006 | 20m | XS | `playwright` | QA |
| T-QA-012 | Cross-device/responsive test matrix config (viewport presets) | 006 | 20m | XS | `playwright` | QA |
| T-QA-013 | Security test pass: dependency vulnerability scan wired into CI | — | 20m | XS | `npm audit`/GitHub Dependabot alerts | SEC |
| T-QA-014 | Security test: automated JWT tenant-claim mismatch regression (permanent CI gate, not just one test) | T-PLAT-M2-018 | 20m | XS | `jest`/`supertest` | SEC |
| T-QA-015 | Regression suite tagging convention (`@isolation`, `@critical-path`, `@smoke`) so CI can run tiered suites | 003, 006 | 20m | XS | Jest/Playwright tags | QA |

## B. Milestone M11 — Cross-Tenant Isolation Regression Test Suite

**Depends on:** M3 (schema), M2 (auth), all module APIs existing

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-QA-M11-001 | Build isolation-test fixture: 2 seeded tenants with parallel data across every Phase-1 table | T-PLAT-M3-020 | 60m | M | Prisma seed | QA |
| T-QA-M11-002 | Automated sweep: for every tenant-scoped table, assert tenant A query never returns tenant B rows | 001 | 90m | L | `jest` (table-driven) | QA |
| T-QA-M11-003 | Automated sweep: every REST endpoint rejects cross-tenant JWT (403), not just the ones already spot-tested | T-PLAT-M2-018 | 90m | L | `supertest` (route-driven) | QA |
| T-QA-M11-004 | Cache/storage isolation test: Redis keys and S3 object paths are tenant-prefixed and structurally unreachable cross-tenant | T-PLAT-M1-009, T-COMM-M4-012 | 60m | M | `jest` | SEC |
| T-QA-M11-005 | Wire isolation suite as a **required, blocking** CI check on every PR (not advisory) | 002, 003, 004 | 30m | S | GitHub Actions | ARCH |
| T-QA-M11-006 | Document the 3-layer isolation model as a living checklist (security doc §6) tied to this suite | 005 | 30m | XS | Markdown | SEC |

**Milestone AC:** zero cross-tenant leakage across all isolation regression tests (phase1-mvp-spec §4) — enforced as a CI gate, not a one-time manual pass.

## C. Milestone M12 — E2E: Signup → Provision → Configure → Real Order

**Depends on:** all Phase 1 milestones

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-QA-M12-001 | E2E scenario script: merchant signup → tenant provisioned (<60s assertion) | T-PLAT-M10-019 | 45m | S | `playwright` | QA |
| T-QA-M12-002 | E2E scenario script: merchant configures catalog (product + variant + category) | T-COMM-M4-014 | 45m | S | `playwright` | QA |
| T-QA-M12-003 | E2E scenario script: merchant sets theme + publishes homepage layout | T-EXP-M6-014, T-EXP-M7-014 | 45m | S | `playwright` | QA |
| T-QA-M12-004 | E2E scenario script: customer completes real order on storefront (test Stripe keys) | T-COMM-M9-033 | 45m | S | `playwright`, `stripe` test mode | QA |
| T-QA-M12-005 | Chain 001-004 into a single end-to-end pipeline scenario, run as release-gate | 001-004 | 30m | S | `playwright` | QA |
| T-QA-M12-006 | Wire full E2E chain into CI as pre-release gate (nightly + pre-deploy) | 005 | 30m | S | GitHub Actions | ARCH |

**Milestone AC:** the full signup-to-order journey passes as a single automated pipeline before any production deploy.

---

## D. DevOps & Infrastructure

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-OPS-001 | `docker-compose.yml` for local dev: Postgres, Redis, MinIO (S3-compatible local storage) | — | 45m | S | `docker`, `docker-compose` | DevOps |
| T-OPS-002 | Dockerfile for `apps/api` (multi-stage build) | 001 | 30m | S | `docker` | DevOps |
| T-OPS-003 | GitHub Actions workflow: lint + typecheck on every PR | — | 30m | S | `eslint`, `tsc`, GitHub Actions | DevOps |
| T-OPS-004 | GitHub Actions workflow: unit + integration tests (ephemeral Postgres service container) | T-QA-002 | 45m | S | GitHub Actions | DevOps |
| T-OPS-005 | GitHub Actions workflow: Playwright E2E suite | T-QA-006 | 30m | S | GitHub Actions | DevOps |
| T-OPS-006 | GitHub Actions workflow: isolation regression gate (T-QA-M11-005) as required check | T-QA-M11-005 | 20m | XS | GitHub Actions branch protection | DevOps |
| T-OPS-007 | Deploy pipeline: `apps/storefront` + `apps/admin` to Vercel | — | 30m | S | Vercel | DevOps |
| T-OPS-008 | Deploy pipeline: `apps/api` + Postgres + Redis to Railway/Render/Fly.io | — | 45m | S | Railway/Render/Fly.io | DevOps |
| T-OPS-009 | Environment secrets configuration (platform-native secrets at Phase 1, per catalog §7) | 007, 008 | 30m | S | Vercel/Railway env secrets | SEC |
| T-OPS-010 | `husky` + `lint-staged` pre-commit hooks | — | 20m | XS | `husky`, `lint-staged` | DevOps |
| T-OPS-011 | `commitlint` conventional-commit enforcement | 010 | 15m | XS | `commitlint` | DevOps |
| T-OPS-012 | Structured logging wired across API | T-PLAT-M3-014 | 30m | S | `pino`, `nestjs-pino` | DevOps |
| T-OPS-013 | Error monitoring: backend | — | 20m | XS | `@sentry/node` | DevOps |
| T-OPS-014 | Error monitoring: frontend (storefront + admin) | T-EXP-M8-015 | 20m | XS | `@sentry/nextjs`, `@sentry/react` | DevOps |
| T-OPS-015 | Health-check endpoints (`/health`, `/health/db`, `/health/redis`) | — | 30m | S | `@nestjs/terminus` | DevOps |
| T-OPS-016 | Automated Postgres backup schedule + restore drill | 008 | 45m | S | Managed provider backups | DBA |
| T-OPS-017 | Alerting rules (error-rate spike, checkout latency P95 breach, health-check failure) | 013, 014, 015 | 45m | S | Sentry alerts / provider monitoring | DevOps |
| T-OPS-018 | Scaling baseline: horizontal scaling config for `apps/api` (stateless, Redis-backed sessions) | 008 | 30m | S | Railway/Render/Fly.io scaling config | Cloud Architect |

**Note:** Kubernetes/multi-region infra is explicitly Phase 4 per the roadmap — not included here to avoid over-engineering ahead of Phase 1 traffic reality.

---

## E. Documentation

| ID | Task | Depends On | Est | Cx | Format | Reviewer |
|---|---|---|---|---|---|---|
| T-DOC-001 | Publish generated OpenAPI/Swagger spec as the canonical API reference | T-COMM-M4-026 | 20m | XS | `@nestjs/swagger` output | Tech Writer |
| T-DOC-002 | Architecture doc update: reconcile any Phase 1 build deviations back into `CommerceOS-Docs` (dev standards doc §6 requirement) | all modules | 45m | S | Markdown | ARCH |
| T-DOC-003 | Developer guide: local setup (docker-compose, seed data, env vars) | T-OPS-001 | 30m | S | Markdown | Tech Writer |
| T-DOC-004 | Deployment guide: Vercel + Railway/Render/Fly.io deploy steps | T-OPS-007, 008 | 30m | S | Markdown | Tech Writer |
| T-DOC-005 | Operations guide: monitoring dashboards, alert response, scaling levers | T-OPS-017, 018 | 30m | S | Markdown | Tech Writer |
| T-DOC-006 | Admin (merchant-facing) guide: catalog, theme, page layout, orders | T-COMM-M4, T-EXP-M6/M7 | 45m | S | Markdown | Tech Writer |
| T-DOC-007 | End-user (customer-facing) help content: account, orders, checkout | T-COMM-M9 | 30m | S | Markdown | Tech Writer |
| T-DOC-008 | Database documentation: finalized ERD + field dictionary matching entity contract | T-PLAT-M3-018 | 30m | S | Markdown/diagram | DBA |
| T-DOC-009 | Runbook: isolation-breach sev-1 response (per security doc §6) | T-QA-M11-006 | 30m | S | Markdown | SEC |
| T-DOC-010 | Runbook: payment-webhook failure / order-reconciliation | T-COMM-M9-016 | 30m | S | Markdown | BE |
| T-DOC-011 | Incident response playbook (on-call, escalation, comms template) | T-OPS-017 | 30m | S | Markdown | PM |
| T-DOC-012 | Update repo's `.tasks/` structure to point at this plan for Phase 1 (supersession note, per your scope decision) | all above | 15m | XS | Markdown | PM |

**Total this module: 15 (QA infra) + 6 (M11) + 6 (M12) + 18 (DevOps) + 12 (Docs) = 57** — reconciled to **58** in the master index after adding T-QA-016 (regression-suite ownership rotation doc, trivial XS task) during the gap-analysis pass in `05-traceability-and-gap-analysis.md`.
