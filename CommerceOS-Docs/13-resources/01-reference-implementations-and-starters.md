# Resources & Reference Implementations

## Decision Log

**Status: DECIDED — Path A (Custom Build).** Recorded [this session]. Rationale: tenant isolation is a hard, non-negotiable requirement (vision doc §5) and the project's stated differentiator is design system depth (Experience Engine), not commerce breadth — so adopting an OSS commerce core would only save time on commodity logic while adding real integration risk to the isolation model, which is the one thing this project can't compromise on. Full reasoning kept below for context and in case this is revisited at a later phase (e.g. if Business/ERP Engine work in Phase 3 makes an OSS core's breadth more attractive).

**What this means for every other doc in this handbook:** `14-data-contracts/`, `.agent/skills/`, and `06-commerce-business-engines/01-commerce-engine.md` are the source of truth for the Commerce Engine — REST APIs, Prisma/Postgres schema, `tenant_id`-column isolation, the checkout state machine as specified. Do not introduce Vendure/Medusa entities, GraphQL, or Channel-based tenancy concepts into the codebase. If this decision is ever revisited, it requires updating this log entry first, then a full pass over `14-data-contracts/` and `.agent/skills/` before any code changes — don't let the two drift.

Everything below is kept for reference (what was considered, why) — not an active recommendation.

---

Everything here is a real, current (checked July 2026) option to build **on top of** instead of from scratch. This is the single highest-leverage doc in the handbook — it can cut months off Phase 1.

## 1. The Big Decision (Now Resolved — See Decision Log Above)

Your handbook (system architecture doc) specced a custom NestJS Commerce Engine. Before building it by hand, the three options considered were:

| Path | What it means | Time to Phase-1-equivalent |
|---|---|---|
| **A — Build Commerce Engine custom** (as originally specced) | Full control, but you re-implement catalog/cart/checkout/orders/tax/promotions from zero | Months |
| **B — Adopt Vendure as the Commerce Engine core** | Fork/extend Vendure (NestJS + TypeScript + GraphQL + Postgres — matches your stack almost exactly), build your Platform/Experience/Business engines around it as plugins | Weeks |
| **C — Adopt Medusa as the Commerce Engine core** | Node.js modular commerce framework, headless, huge module catalog, but Express-based (not NestJS) and multi-tenancy needs a patch (RLS-based, community-documented) | Weeks–1 month |

**Original analysis favored Path B (Vendure)** on stack-fit grounds — it's built on the same stack (TypeScript, NestJS, Postgres), has a plugin system, and its admin dashboard uses shadcn/ui. **That analysis was overridden — see Decision Log above.** The deciding factor was the isolation risk noted in the trade-off below, weighed against this project's non-negotiable zero-leakage requirement.

Trade-off that tipped the decision: Vendure's multi-tenancy via Channels shares some entities across tenants by default (customers, taxes/zones/countries). A customer who orders in two channels shares one identity record — that's a real isolation gap against this project's hard requirement (multi-tenant doc §3), not just a rough edge to work around.

## 2. Commerce Engine Foundations

### Vendure — closest fit to your stack
- Core: `github.com/vendurehq/vendure` — TypeScript, NestJS, GraphQL, Postgres/MySQL/MariaDB, GPLv3 (commercial license available for IP indemnification)
- Multi-tenancy guide (Channels-as-tenants pattern): official blog, "Multi-tenant Commerce with Vendure"
- Plugin model: a plugin is literally a decorated NestJS module — this is a near 1:1 match with your `07-agent-guide` module-boundary rules
- Admin dashboard design system: `vendurehq/design` — built on shadcn + BaseUI, directly reusable as your Experience Engine foundation
- Official Next.js storefront starter: `nextjs-starter-vendure`
- Real precedent: IBM built a multi-tenant commerce platform ("Project Marlin") on Vendure Core

### Medusa — strong alternative, more modules, less native multi-tenancy
- Core: `github.com/medusajs/medusa` — modular commerce framework, decoupled modules (v2), each module (Cart, Order, Product, Payment, Tax, Store, Customer) usable independently
- Multi-tenancy: not native — two documented approaches: (1) one Medusa instance per tenant behind a gateway, (2) PostgreSQL Row-Level-Security patch (community guide: "Implement Multi-Tenancy in Medusa with PostgreSQL Row Level Security") — this second pattern is architecturally identical to your `TenantScopedRepository` concept, just implemented at the DB layer instead of the ORM layer
- Admin UI already ships light/dark mode (Vite-based, v2.0+) — directly relevant to your theming doc
- Good fit if you want maximum out-of-box module breadth (B2B, marketplace, POS-ready) and are comfortable patching in tenancy yourself

### Saleor — mention only
Python/Django backend, GraphQL-first. Skip unless your team is Python-native — it breaks your "one TypeScript stack" principle (system architecture doc §3) for no compensating multi-tenancy advantage.

## 3. Platform Engine (Auth, Billing, Multi-Tenant Shell) Starters

These solve tenant provisioning, org/team management, RBAC, and Stripe billing — exactly your Platform Engine — as a Next.js shell you'd adapt rather than write.

| Starter | Stack | Multi-tenancy | Cost | Best fit |
|---|---|---|---|---|
| **supastarter** | Next.js, Drizzle/Prisma/Supabase (your choice), Stripe/Lemon Squeezy/Polar | Native — orgs, custom domains, per-tenant feature flags out of the box | Paid | Closest match to your Platform Engine spec — "custom domain support" and "feature flags per tenant" are literally your multi-tenant doc's requirements, pre-built |
| **MakerKit** | Next.js 16, Drizzle, Better Auth, shadcn/ui | Native — teams/orgs, RBAC, per-org billing | Paid | Best B2B multi-tenant reference if you want Better Auth (self-hosted, not a hosted auth vendor) |
| **ixartz/SaaS-Boilerplate** | Next.js, Tailwind, shadcn/ui, i18n | Multi-tenancy + teams + RBAC included | Free (Pro tier optional) | Best free starting point — read its multi-tenancy implementation even if you don't clone it |
| **nextjs/saas-starter** | Official Next.js team template, Drizzle, Stripe | Basic (Owner/Member roles, no full org model) | Free | Good for the Platform Engine's auth+billing skeleton, not full multi-tenancy — you'd add tenant/org layer yourself |

**Practical use of these:** even if you don't clone one wholesale, cloning `ixartz/SaaS-Boilerplate` locally and reading its multi-tenancy + RBAC implementation before writing your own `TenantScopedRepository` (build guide Session 3) will save real time — it's a working reference for the exact pattern you're about to build.

## 4. Component Library / Design System Foundations

- **shadcn/ui** (`ui.shadcn.com`) — not a dependency, it's source you copy into `packages/components`. This is already your package catalog's choice; it's listed here because Vendure's own new admin design system is built on it too, reinforcing it as the correct pick.
- **Vendure Design System** (`vendurehq/design`) — if you adopt Vendure per §1, this is a ready-made shadcn+BaseUI component set already shaped for a commerce admin — a major head start on your Component Library doc's ~20-component Phase 1 target.
- **Radix UI** (`radix-ui.com`) — underlying primitives for shadcn, already in your package catalog.

## 5. Monorepo / Tooling References

- **Turborepo examples** (`github.com/vercel/turborepo/tree/main/examples`) — official reference monorepo layouts; use `with-tailwind` or a shadcn-monorepo example as a starting skeleton for the `apps/` + `packages/` structure in your folder-structure doc.
- **Style Dictionary** (`amzn/style-dictionary`) — already in your package catalog for token compilation; docs site has ready-made light/dark token pipeline examples worth copying directly.

## 6. Historical Note — How This Would Apply If Revisited

Kept for reference only (decision is Path A — see log above). If a future phase revisits adopting an OSS foundation: your five-engine model, tenant isolation rules, and override-merge patterns are architecture decisions worth keeping regardless of implementation. Map the OSS tool's concepts onto your five engines (e.g. Channel → Tenant, Plugin → Module), keep `TenantContext` as the law even if the tool has its own tenancy primitive, and never adopt a tool's multi-tenancy model uncritically — audit it against the hard requirement first.

## 7. Still Worth Reading

Even building custom, `vendurehq/design` (Vendure's shadcn/BaseUI admin component set) and the Turborepo/Style Dictionary references in §5 are legitimate references to look at while building your own Component Library and monorepo — adopting a foundation and reading a foundation's code for patterns are different things.
