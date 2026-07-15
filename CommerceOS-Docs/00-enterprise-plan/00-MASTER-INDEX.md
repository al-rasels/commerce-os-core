# CommerceOS — Enterprise Execution Plan (Master Index)

Source repo: `github.com/al-rasels/commerce-os-core`
Grounded in: `CommerceOS-Docs/` (architecture, roadmap, entity contracts, package catalog) and the repo's own `.tasks/` backlog conventions.

This plan applies the requested Enterprise Software Organization methodology (Phases 1–13: analysis → domain model → architecture → feature inventory → UI/backend inventory → traceability → WBS → QA → DevOps → docs → execution graph → gap analysis) **scoped to what this specific repo actually is**, not a generic template. Every library reference below is pulled from the repo's own `12-tech-stack-and-packages/02-package-catalog.md` — I did not substitute external recommendations where the repo has already made a decision (see the Auth note below).

## Scope Decision (per your instruction)

Full plan, built from scratch, organized by module. Phase 1 (MVP, per `10-roadmap/02-phase1-mvp-spec.md`) is decomposed to **atomic task level** (15–120 min tasks) because it's specified precisely enough to do so honestly. Phases 2–5 are decomposed to **epic/feature level** — the roadmap doc itself explicitly says generating full atomic specs for later phases now would produce documentation that doesn't match reality once Phase 1 decisions land. That's not a shortcut on my part — it's the repo's own governing rule (`10-roadmap/01-implementation-roadmap.md`, "What This Roadmap Deliberately Does NOT Include Yet"). I can decompose any Phase 2–5 epic to atomic level on request once you're ready for it.

**Auth note:** Per your decision, auth tasks reference the repo's documented stack — `@nestjs/jwt`, `passport-jwt`, `argon2` — not Better Auth.

## Module Map

| # | Module | Engine (per system architecture doc) | File |
|---|---|---|---|
| 1 | Platform Engine — Tenancy, Auth/RBAC, Feature Flags, Super Admin | Platform Engine | `01-platform-engine-tasks.md` |
| 2 | Commerce Engine — Catalog, Cart, Checkout, Orders, Payments, Tax, Shipping | Commerce Engine | `02-commerce-engine-tasks.md` |
| 3 | Experience Engine — Design Tokens, Components, Theme Engine, Page Layout, Storefront | Experience Engine | `03-experience-engine-tasks.md` |
| 4 | Quality, DevOps & Documentation (cross-cutting, all modules) | — | `04-quality-devops-docs-tasks.md` |
| 5 | Requirement Traceability Matrix & Gap Analysis | — | `05-traceability-and-gap-analysis.md` |
| 6 | Phase 2–5 Epic Backlog (Business Engine, Intelligence Engine, scale-out) | Business + Intelligence Engines | `06-phase-2-5-epic-backlog.md` |

## Requirement IDs (Phase 1)

- `REQ-PLAT-xxx` — Platform Engine requirements (tenancy, auth, RBAC, flags, super admin)
- `REQ-COMM-xxx` — Commerce Engine requirements (catalog, cart, checkout, orders, payments)
- `REQ-EXP-xxx` — Experience Engine requirements (tokens, components, theme, layout, storefront)
- `REQ-QA-xxx` — Quality/testing requirements
- `REQ-OPS-xxx` — DevOps/infra requirements
- `REQ-DOC-xxx` — Documentation requirements

Each Requirement ID is mapped to Feature → Tasks → Tests → Docs → Deployment in `05-traceability-and-gap-analysis.md`. Nothing here is orphaned.

## Task ID Scheme

`T-<MODULE>-<MILESTONE>-<SEQ>` e.g. `T-PLAT-M2-004` = Platform module, Milestone 2 (Auth/RBAC), task 4.
Milestone numbers match `10-roadmap/02-phase1-mvp-spec.md` §3 (12 Phase-1 milestones) exactly, so this plan and the repo's roadmap never drift.

## Complexity / Time Legend

| Complexity | Typical Est. |
|---|---|
| XS | 15–30 min |
| S | 30–60 min |
| M | 60–90 min |
| L | 90–120 min (split further if it would exceed this) |

## Reviewer Role Legend

`SEC` = Security Engineer · `DBA` = Database Architect · `BE` = Backend Architect · `FE` = Frontend Architect · `QA` = QA Lead · `ARCH` = Solution/System Architect · `PM` = Project Manager

## Total Task Count (this plan)

- Phase 1 atomic tasks: **235** across 12 milestones (Platform 89, Commerce 65, Experience 75, after gap-analysis Pass 2 additions — see `05-traceability-and-gap-analysis.md`)
- Cross-cutting QA/DevOps/Docs atomic tasks: **58**
- **Phase 1 grand total: 293 atomic tasks**
- Phase 2–5: **41 epics**, ~9–14 features each — atomic decomposition deferred per roadmap governing rule (available on request, module by module)
- **Known open flag (not a missing task, a decision point):** `csurf` (CSRF library in package catalog) has upstream maintenance concerns — re-verify before any session-cookie admin flow is added. See `05-traceability-and-gap-analysis.md`.

## Milestone → File Cross-Reference

| Milestone (phase1-mvp-spec §3) | Module File | Status in repo today |
|---|---|---|
| M1 Tenant provisioning + resolution | `01-platform-engine-tasks.md` | `.tasks/next/session-02` exists — this plan supersedes it per your instruction, same intent |
| M2 Auth/RBAC + JWT tenant-claim | `01-platform-engine-tasks.md` | `.tasks/next/session-03` exists — superseded, same intent |
| M3 DB schema + TenantScopedRepository | `01-platform-engine-tasks.md` | new here |
| M4 Catalog CRUD (admin) | `02-commerce-engine-tasks.md` | `.tasks/backlog/session-05` exists — superseded |
| M5 Design tokens + component library | `03-experience-engine-tasks.md` | `.tasks/backlog/session-06` exists — superseded |
| M6 Theme engine | `03-experience-engine-tasks.md` | `.tasks/backlog/session-07` exists — superseded |
| M7 Page layout JSON + settings editor | `03-experience-engine-tasks.md` | new here |
| M8 Storefront rendering | `03-experience-engine-tasks.md` | `.tasks/backlog/session-08` exists — superseded |
| M9 Cart/checkout/payment/order lifecycle | `02-commerce-engine-tasks.md` | new here |
| M10 Super Admin (provisioning, billing, flags) | `01-platform-engine-tasks.md` | new here |
| M11 Isolation regression test suite | `04-quality-devops-docs-tasks.md` | new here |
| M12 E2E signup→order | `04-quality-devops-docs-tasks.md` | new here |
