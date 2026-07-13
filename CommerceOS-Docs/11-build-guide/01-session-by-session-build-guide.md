# CommerceOS — Session-by-Session Build Guide

Offline reference for building Phase 1. Work through sessions in order — each depends on the last. Don't skip the "Done When" checks; they're regression guards for the rest of the project, not busywork.

How to use this file: pick a session, read the whole section before touching code, build until "Done When" passes, commit, move on. If a session drags past ~1 sitting, stop at a sub-checkpoint rather than half-finishing two sessions.

---

## Session 0 — Prerequisites (do once)

- [ ] Node.js LTS installed
- [ ] PostgreSQL running locally (or Docker)
- [ ] Redis running locally (or Docker)
- [ ] Git repo initialized
- [ ] Package manager decided (npm/pnpm/yarn — pnpm recommended for monorepos)

```bash
docker run -d --name commerceos-pg -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16
docker run -d --name commerceos-redis -p 6379:6379 redis:7
```

---

## Session 1 — Repo Scaffold

**Goal:** three apps running, sharing packages, nothing tenant-aware yet.

**Structure:**
```
commerceos/
├── apps/
│   ├── api/          NestJS
│   ├── storefront/    Next.js
│   └── admin/          React (Vite)
├── packages/
│   ├── design-tokens/
│   ├── components/
│   └── shared-types/
├── turbo.json
└── package.json
```

**Steps:**
1. `npx create-turbo@latest commerceos` (or Nx equivalent)
2. Scaffold `apps/api` with Nest CLI: `nest new api`
3. Scaffold `apps/storefront` with `create-next-app`
4. Scaffold `apps/admin` with `create-vite` (React + TS template)
5. Create empty `packages/design-tokens`, `packages/components`, `packages/shared-types` with minimal `package.json` + `index.ts`
6. Wire workspace references so `apps/*` can import `@commerceos/design-tokens` etc.

**Done When:**
- [ ] `pnpm dev` (or `turbo dev`) boots all three apps without errors
- [ ] `apps/storefront` can import something trivial from `packages/shared-types`
- [ ] Committed to git with a clean initial commit

**Common pitfalls:** forgetting to set `"workspaces"` in root `package.json`; TS path aliases not matching workspace package names.

---

## Session 2 — Tenant Resolution

**Goal:** every request resolves to a tenant before anything else runs.

**Reference docs:** `03-multi-tenant/01-multi-tenant-architecture.md`

**Schema (migration in `apps/api`):**
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_id TEXT NOT NULL DEFAULT 'trial',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tenant_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  domain TEXT NOT NULL UNIQUE,
  is_primary BOOLEAN DEFAULT true
);
```

**Steps:**
1. Add a NestJS middleware that runs before all routes: parse `req.hostname`, look up `tenant_domains`, attach `tenant_id`.
2. Build `TenantContext` class (fields per multi-tenant doc §2) and a request-scoped provider that constructs it once per request.
3. Local dev trick: use `tenanta.localhost:3000` / `tenantb.localhost:3000` (most browsers/OSes resolve `*.localhost` to `127.0.0.1` without `/etc/hosts` edits).
4. Seed two test tenants + domains via a seed script.

**Done When:**
- [ ] Hitting `tenanta.localhost:3000/api/whoami` returns tenant A's id; `tenantb.localhost:3000` returns tenant B's
- [ ] Hitting an unmapped hostname returns 404 before any controller logic runs
- [ ] `TenantContext` is injectable in a test controller and logs correctly

**Common pitfalls:** resolving tenant *after* some route logic already ran (middleware must be global and first); forgetting the 404 fallback for unmapped domains.

---

## Session 3 — Auth & RBAC

**Goal:** login works, JWTs carry tenant_id, cross-tenant tokens are rejected.

**Reference docs:** `04-database-security/02-security-authentication.md`

**Schema:**
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),  -- NULL for platform-level roles
  name TEXT NOT NULL
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id), -- NULL for super admins
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role_id UUID REFERENCES roles(id),
  UNIQUE(tenant_id, email)
);
```

**Steps:**
1. Install `@nestjs/jwt` + `bcrypt` (or `argon2`).
2. Login endpoint: verify credentials → issue access token (15min, claims: `sub`, `tenant_id`, `role`) + refresh token (rotating, stored hashed in Redis, tenant-namespaced key).
3. Auth guard: verify JWT signature + expiry, then **compare token's `tenant_id` claim against the request's resolved `TenantContext.tenantId`** — mismatch = 403, always, no exceptions.
4. Seed 4 roles: Super Admin (tenant_id NULL), Store Owner, Store Staff, Customer.
5. Build `TenantScopedRepository` base class: wraps TypeORM/Prisma repository, auto-injects `WHERE tenant_id = :ctx.tenantId` on every query. Every future tenant-owned entity's repository extends this — never the raw repository.

**Done When:**
- [ ] Login returns a working access+refresh token pair
- [ ] **Critical test:** mint a token for tenant A, call an endpoint resolved as tenant B → assert 403 (write this as a permanent automated test, not a manual check)
- [ ] `TenantScopedRepository` unit test: seed rows for 2 tenants, confirm querying as tenant A never returns tenant B's rows

**Common pitfalls:** trusting a `tenant_id` field in the request body instead of the resolved context; forgetting to hash refresh tokens at rest.

---

## Session 4 — Core Schema + Isolation Test Pattern

**Goal:** Phase 1 tables exist, and you have a reusable test to catch any future isolation bug automatically.

**Reference docs:** `04-database-security/01-database-architecture.md`

**Tables to migrate:**
```
products, product_variants, categories,
orders, order_items, customers, carts,
pages, themes_instance, feature_flags
```
All with `tenant_id UUID NOT NULL REFERENCES tenants(id)`, indexed first in every composite index.

**Steps:**
1. Write migrations for all tables above (use your ORM's migration tool — don't hand-write raw SQL files unless you have a reason to).
2. Every entity extends `TenantScopedEntity` (adds `tenant_id` + relation automatically).
3. Write **one parameterized isolation test function** that takes a table/repository and runs: seed 2 tenants → assert cross-read empty. Reuse this function for every table, forever — this is your single most valuable test asset.

**Done When:**
- [ ] All Phase 1 tables migrated
- [ ] Isolation test passes for every one of them
- [ ] CI (even a simple GitHub Action) runs this suite on every PR

**Common pitfalls:** adding a table later and forgetting to run it through the isolation test — make this a PR checklist item (see dev standards doc §4).

---

## Session 5 — Catalog CRUD (Admin)

**Goal:** prove the tenant-scoped pattern works end-to-end through a real feature.

**Steps:**
1. [x] `ProductsController` + `ProductsService` in `apps/api`, using `TenantScopedRepository`.
2. [x] DTOs with validation (`class-validator`).
3. Minimal admin UI page: list/create/edit products, calling the API with the auth token.

**Done When:**
- [ ] Create a product as tenant A, confirm it does not appear when authenticated as tenant B
- [ ] Basic CRUD works through the admin UI, not just API testing tools

---

## Session 6 — Design Tokens + Components (parallel track)

**Can run alongside Sessions 2–5 if you have bandwidth — no backend dependency.**

**Reference docs:** `05-experience-engine/01-design-system.md`, `02-component-library.md`

**Steps:**
1. In `packages/design-tokens`: define spacing, typography, color (semantic names, not raw hex), radius, shadow, motion tokens as a JS/TS object or CSS variables.
2. In `packages/components`: build ~20 components (Header, Footer, Hero w/ 4 variants, ProductCard, ProductGrid, CartDrawer, CheckoutSummary, Testimonials, Newsletter, FAQ, RichText, Gallery, Banner) — **consume tokens only, never hardcoded values.**
3. Set up Storybook (or a simple test-render page in `apps/storefront`) to visually verify components render and respond to token changes.
4. Each component gets: prop schema, a11y check (axe-core), one snapshot test per variant.

**Done When:**
- [ ] All ~20 components render in isolation
- [ ] Swapping a token value (e.g. primary color) visibly changes every component using it, with zero component code edits
- [ ] a11y checks pass

---

## Session 7 — Theme Engine

**Goal:** tenant-level theme overrides work without touching platform defaults.

**Reference docs:** `05-experience-engine/03-theme-engine.md`

**Schema:**
```sql
CREATE TABLE theme_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  tokens_json JSONB NOT NULL
);

CREATE TABLE theme_tenant_override (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id),
  theme_base_id UUID REFERENCES theme_base(id),
  overrides_json JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Steps:**
1. Seed one `theme_base` row (your default token set from Session 6).
2. [x] Build the merge function: `resolvedTheme = deepMerge(themeBase.tokens_json, override.overrides_json)`.
3. [x] Cache resolved theme per tenant (`tenantId:theme:resolved`), invalidate on override write.
4. Simple admin UI: color pickers / font selectors that write to `overrides_json`.

**Done When:**
- [ ] Changing tenant A's brand color updates only tenant A's rendered storefront
- [ ] `theme_base` update does not require touching any tenant's override row
- [ ] Cache invalidates correctly on override save

---

## Session 8 — Page Layout + Storefront Rendering

**Goal:** admin edits a homepage, storefront reflects it after publish.

**Reference docs:** `05-experience-engine/04-template-engine.md`, `05-page-builder.md`

**Schema (extends themes_instance/pages from Session 4, or add):**
```sql
CREATE TABLE page_layouts (
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  page_key TEXT NOT NULL,  -- 'homepage', 'category', 'product', 'checkout'
  sections_json JSONB NOT NULL,
  published_at TIMESTAMPTZ,
  PRIMARY KEY (tenant_id, page_key)
);
```

**Steps:**
1. [x] Page JSON shape: `{ sections: [{ id, component, variant, props, visible }] }`.
2. Admin: settings-panel UI (not drag-drop yet) — add/remove/reorder sections, edit props via schema-driven form.
3. Storefront (Next.js): fetch published `sections_json` for the tenant/page, resolve each `component` ID against the component registry, apply resolved theme, render.
4. [x] Publish = atomic write to `sections_json` + `published_at`.

**Done When:**
- [ ] Editing homepage sections in admin and publishing reflects live on `tenanta.localhost:3000`
- [ ] A missing/invalid component ID fails closed (skips that section, logs) rather than crashing the page
- [ ] Preview (unpublished) never affects the live cached page

---

## Session 9 — Cart / Checkout / Orders

**Goal:** a real order can be placed end to end.

**Reference docs:** `06-commerce-business-engines/01-commerce-engine.md`

**Steps:**
1. Cart: session or customer-bound, tenant-scoped, line items reference `product_variants`.
2. Checkout: address → shipping (basic flat-rate rules) → payment (integrate **one** provider, e.g. Stripe test mode) → review → place order.
3. Order placement: reserve stock (row-level lock or optimistic concurrency on `product_variants.stock` — do not skip this, it's your oversell guard), create `orders` + `order_items`, emit `order.created` event.
4. Basic invoice generation (even a simple PDF or HTML record is fine for Phase 1).
5. Confirmation email (can be a stub/log at this stage if notification module isn't built yet).

**Done When:**
- [ ] A full test checkout completes with Stripe test card, order appears in admin
- [ ] Concurrent checkout attempts on the last unit of stock — only one succeeds (oversell test)
- [ ] Order data is tenant-isolated (run it through your Session 4 isolation test)

---

## Session 10 — Super Admin

**Goal:** platform operator can provision tenants and manage billing/flags without touching tenant data.

**Steps:**
1. Provisioning flow: create tenant row + default domain + seed default theme override (empty) + default feature flags for chosen plan.
2. Billing: subscription status only for Phase 1 (no usage metering) — integrate Stripe Billing or similar, webhook updates `tenants.status`.
3. Feature flag admin UI: toggle flags per tenant (writes to `feature_flags` table), resolved via `context.hasFeature(key)`.

**Done When:**
- [ ] New tenant provisioned in <60s end to end (vision doc metric)
- [ ] Toggling a flag for tenant A doesn't affect tenant B
- [ ] Billing webhook correctly suspends a tenant on payment failure (storefront read-only, admin still reachable)

---

## Sessions 11–12 — Full Regression + E2E

**Steps:**
1. Run the Session 4 isolation test pattern against **every** table in the schema — no exceptions.
2. Run the Session 3 cross-tenant-token test against **every** authenticated endpoint.
3. Write one full E2E test (Playwright/Cypress): signup → provision → configure theme/catalog → publish page → place order → verify in admin.
4. Load-test checkout path if you have time (k6/Artillery) — target P95 < 300ms per vision doc.

**Done When:**
- [ ] All isolation + auth regression tests green in CI
- [ ] E2E flow passes reliably (not flaky)
- [ ] Phase 1 acceptance criteria (roadmap doc, Phase 1 spec §4) all checked off

---

## Quick-Reference Checklist (pin this)

Before merging any PR, ask:
- [ ] Tenant-scoped queries verified?
- [ ] No cross-module direct table access?
- [ ] No hardcoded plan checks outside platform module?
- [ ] No hardcoded design tokens in components?
- [ ] Isolation test added if new tenant table?
- [ ] Docs updated if pattern changed?

(Full list: `09-dev-standards/01-development-standards.md` §4, `07-agent-guide/01-agent-guide.md` §1)

---

## If You Get Stuck

- Re-read the relevant engine doc before improvising a new pattern — most "how do I..." questions are already answered in `05-experience-engine/` or `06-commerce-business-engines/`.
- If genuinely new ground, check `07-agent-guide/01-agent-guide.md` §7 (escalation rules) before deciding solo.
- Don't pull Phase 2+ features forward (drag-drop builder, POS, AI, multi-warehouse) — check `10-roadmap/02-phase1-mvp-spec.md` §2 if tempted.
