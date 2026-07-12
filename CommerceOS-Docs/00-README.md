# CommerceOS — Documentation Set (v1.0)

Master index for the enterprise architecture handbook. This package is scoped to be **implementable**, not exhaustive — deep enough for engineers/agents to build Phase 1, structured so later volumes slot in without rewrites.

## Delivery Plan (this session)

| Batch | Contents | Status |
|---|---|---|
| 1 | Vision, Business Model, System Architecture | ✅ included |
| 2 | Multi-Tenant Architecture, Database, Security | ✅ included |
| 3 | Design System, Component Library, Theme Engine, Template Engine, Page Builder | ✅ included |
| 4 | Commerce Engine, Business/ERP Engine, Intelligence Engine | ✅ included |
| 5 | AI Agent Guide (build conventions for coding agents), Skill Catalog | ✅ included |
| 6 | Dev Standards, Implementation Roadmap, Phase 1 MVP Spec | ✅ included |
| 7 (future) | Full API spec, ER diagrams, 150+ component spec sheets, Marketplace SDK | Not in v1.0 — flagged in roadmap as Phase 3+ |

Batches 1–6 are in this zip now. Batch 7 is intentionally deferred — writing full API/DB specs before Phase 1 code exists would drift from reality; roadmap.md tells you when to generate them.

## File Structure

```
CommerceOS-Docs/
├── 00-README.md                          # this file
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
│   └── 01-agent-guide.md                 # instructions for AI coding agents (Claude Code etc.)
├── 08-skills/
│   └── 01-skill-catalog.md               # reusable skill definitions for agents building this repo
├── 09-dev-standards/
│   └── 01-development-standards.md
├── 10-roadmap/
│   ├── 01-implementation-roadmap.md
│   └── 02-phase1-mvp-spec.md
└── 11-build-guide/
    └── 01-session-by-session-build-guide.md   # START HERE when coding
```

## Reading Order

New engineer/agent onboarding: `01-vision-strategy` → `02-architecture` → `03-multi-tenant` → `05-experience-engine` (if frontend) or `06-commerce-business-engines` (if backend) → `07-agent-guide` → `10-roadmap/02-phase1-mvp-spec.md` (what to actually build first).

**Actually writing code?** Skip straight to `11-build-guide/01-session-by-session-build-guide.md` — it's the hands-on, offline-readable, step-by-step version of everything above, with schemas, commands, and "done when" checklists per session.

## Five-Engine Model (governs every doc in this set)

| Engine | Owns |
|---|---|
| Platform | Tenants, auth, RBAC, billing, subscriptions, infra, APIs |
| Commerce | Products, inventory, orders, checkout, payments, shipping, tax |
| Experience | Design system, component library, theme engine, template engine, page builder |
| Business | ERP, CRM, marketing, analytics, automation |
| Intelligence | AI, search, recommendations, forecasting |

Rule: every new feature maps to exactly one engine. If it doesn't, the feature is mis-scoped — split it before building.
