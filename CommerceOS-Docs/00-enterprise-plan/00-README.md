# CommerceOS — Documentation Set (v1.2)

Master index. v1.2 adds the machine-first layer: `.agent/` (strict rules + exact code templates for AI coding agents) and `14-data-contracts/` (exact schemas/APIs/component props — the layer that stops an agent from inventing field names, routes, or props).

## If You Are an AI Coding Agent

Read `.agent/AGENTS.md` first. Not this README, not the prose docs — that file is written specifically for you and links to everything else in the right order. It is stricter and more literal than the prose volumes below on purpose.

## If You Are Human, Planning

1. `13-resources/01-reference-implementations-and-starters.md` — **decided: custom build** (see Decision Log at top of that file for why); kept for context if ever revisited
2. `01-vision-strategy/` → `02-architecture/` → `03-multi-tenant/` — the why and the shape
3. `10-roadmap/02-phase1-mvp-spec.md` — what's actually in scope right now

## If You Are Human, Building

`11-build-guide/01-session-by-session-build-guide.md`, with `14-data-contracts/` and `.agent/skills/` open alongside for exact schemas and code templates.

## Full File Structure

```
CommerceOS-Docs/
├── 00-README.md
├── .agent/                                    MACHINE-FIRST LAYER — read AGENTS.md before any code
│   ├── AGENTS.md                              canonical entrypoint for AI coding agents
│   ├── rules/                                  hard constraints, code-level, no deviation
│   │   ├── 01-tenant-isolation.md
│   │   ├── 02-module-boundaries.md
│   │   ├── 03-naming-conventions.md
│   │   └── 04-testing-requirements.md
│   └── skills/                                  exact, copy-this code templates
│       ├── 01-tenant-scoped-entity-template.md
│       ├── 02-override-merge-algorithm.md
│       └── 03-stock-reservation-algorithm.md
│
├── 01-vision-strategy/
│   ├── 01-vision.md
│   └── 02-business-model.md
├── 02-architecture/
│   └── 01-system-architecture.md
├── 03-multi-tenant/
│   └── 01-multi-tenant-architecture.md
├── 04-database-security/
│   ├── 01-database-architecture.md
│   └── 02-security-authentication.md
├── 05-experience-engine/
│   ├── 01-design-system.md
│   ├── 02-component-library.md
│   ├── 03-theme-engine.md
│   ├── 04-template-engine.md
│   └── 05-page-builder.md
├── 06-commerce-business-engines/
│   ├── 01-commerce-engine.md
│   ├── 02-business-erp-engine.md
│   └── 03-intelligence-engine.md
├── 07-agent-guide/
│   └── 01-agent-guide.md                       prose companion to .agent/AGENTS.md
├── 08-skills/
│   └── 01-skill-catalog.md                     prose skill index (see .agent/skills/ for exact code)
├── 09-dev-standards/
│   └── 01-development-standards.md
├── 10-roadmap/
│   ├── 01-implementation-roadmap.md
│   └── 02-phase1-mvp-spec.md
├── 11-build-guide/
│   └── 01-session-by-session-build-guide.md    hands-on, offline, step-by-step
├── 12-tech-stack-and-packages/
│   ├── 01-folder-structure-theming.md
│   └── 02-package-catalog.md
├── 13-resources/
│   └── 01-reference-implementations-and-starters.md
├── 14-data-contracts/                           SOURCE OF TRUTH — anti-hallucination layer
│   ├── 01-phase1-entities.md                    exact table/column schemas
│   ├── 02-api-contracts.md                      exact routes, DTOs, error codes
│   ├── 03-component-contracts.md                exact prop shapes, registry map
│   └── 04-checkout-state-machine.md             exact states/transitions/side effects
└── 15-system-and-database-design/               VISUAL ARCHITECTURE — system flow and entity relationship diagrams
    ├── 01-system-design-diagrams.md
    ├── 02-database-entity-relationship.md
    ├── 03-backend-api-service-design.md
    └── 04-frontend-routing-design.md
```

## Why the Split Between Prose Docs and `.agent/` + `14-data-contracts/`

The prose volumes (01–13) explain reasoning — why the five-engine model, why this isolation approach, why this vendor choice. They're for humans making decisions and for an agent that needs context.

`.agent/` and `14-data-contracts/` are different in kind: they're specifications an agent should follow literally, not interpret. A prose doc saying "every tenant table needs a `tenant_id` column" is guidance; the exact migration template in `.agent/skills/01-tenant-scoped-entity-template.md` is what to actually type. Keeping these separate means updating a strict rule doesn't require rewriting the reasoning around it, and vice versa.

## The Non-Negotiables (full detail in `.agent/rules/`)

1. No tenant data touched without a resolved `TenantContext`
2. No cross-module direct table/entity access — public service interfaces only
3. No hardcoded plan/billing checks outside the platform module
4. No hardcoded design tokens in components
5. No invented field/route/prop names — check `14-data-contracts/` first
6. No new architectural pattern without flagging it — see `.agent/AGENTS.md` §5

## Five-Engine Model

| Engine | Owns |
|---|---|
| Platform | Tenants, auth, RBAC, billing, subscriptions, infra, APIs |
| Commerce | Products, inventory, orders, checkout, payments, shipping, tax |
| Experience | Design system, component library, theme engine, template engine, page builder |
| Business | ERP, CRM, marketing, analytics, automation |
| Intelligence | AI, search, recommendations, forecasting |

## Version History

- **v1.0** — Vision through Phase 1 MVP spec, agent guide, skill catalog, dev standards
- **v1.1** — Session-by-session build guide, folder structure + dark/light theming, package catalog, resources/reference-implementations doc
- **v1.2** — `.agent/` machine-first layer (AGENTS.md, strict rules, exact code-template skills) and `14-data-contracts/` (exact entity/API/component/state-machine specs) — closes the gap between "described in prose" and "precise enough for an agent to implement without guessing"
- **v1.3** — Project scaffold live: Turborepo monorepo (`apps/api` NestJS, `apps/storefront` Next.js, `apps/admin` Vite), 5 shared packages (`design-tokens`, `components`, `theme-engine`, `shared-types`, `ui-config`), full Phase 1 Prisma schema, all dependencies installed and building. See root `README.md` for project structure reference.
