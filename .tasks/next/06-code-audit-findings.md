# Session 06 — Full-Project Code Audit: Global Findings List

## Status: NEXT

## Dependencies

- [x] Mission prompt corrected & complete (`planning/38-code-audit-mission-prompt.md`)
- [x] 7-region audit fleet deployed and completed (this file)

## Objective

Consolidate every finding from the 7-region audit into **one global, ranked list**
of things that still need focus, fixing, or implementing — with file:line evidence
and a recommended action for each item. Execution instructions live in
`07-code-audit-action-guide.md` (next in this folder).

## Audit Coverage

| # | Region | Report highlights |
|---|--------|-------------------|
| 1 | `apps/api` | Checkout broken (Prisma delegate names), per-request PrismaClient, CSRF `/api/api`, catalog `findMany` misuse |
| 2 | `apps/storefront` | Non-existent `/catalog/**` endpoints, login persistence gap, hard-coded shipping, 3 mock pages |
| 3 | `apps/admin` | Super-admin API wrong prefix, mock Analytics + Visual Builder, dead buttons, stale `dist` consumption |
| 4 | `packages/components` | Package doesn't compile, stale `dist/`, seed-data contract crashes, 26 unused primitives |
| 5 | `packages/{design-tokens,theme-engine,ui-config,shared-types}` | Nested-vs-flat token schema split, theme never applied, ui-config abandoned, shared-types rotting |
| 6 | `tests/` | Only ~16 of 42 test files exercise real code; 7 placeholder specs; auth spec crashes on load |
| 7 | Root + infra + config + docs | Merge-conflict corruption, committed Redis dump + tool caches, env/config drift, husky/E2E/k6 never run |

## Summary Statistics

- **Critical (P0): 9** — broken or corrupting, fix immediately
- **High (P1): 41** — real bugs / missing features / blockers
- **Medium (P2): 59** — dead or wrong code; clean up when touching file
- **Low (P3): 48** — cosmetic / trivial / batch cleanup
- **Total: ~157 findings**

| Category | Count | Dominant pattern |
|----------|-------|------------------|
| ERRONEOUS | ~50 | Contract mismatches (route↔DTO↔schema), wrong Prisma delegate/where usage |
| UNNECESSARY | ~35 | Dead exports/hooks/imports/deps, duplicate implementations |
| STALE | ~31 | Committed artifacts, stale `dist/`, stale docs/reports |
| UNIMPLEMENTED | ~26 | Mock pages/stubs, disconnected workers, features never wired |
| STATIC | ~15 | Hard-coded secrets/values/ports that should be env/config-driven |

---

## CRITICAL (P0) — Fix immediately

### P0-1 Checkout and all tax/shipping endpoints crash — wrong Prisma delegate names
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/api/src/modules/commerce/tax/tax-rule.repository.ts:8`, `shipping-rule.repository.ts:8`
- SNIPPET: `super(prisma, 'tax_rule');` / `super(prisma, 'shipping_rule');`
- ISSUE: Prisma client exposes `taxRule`/`shippingRule`, not `tax_rule`/`shipping_rule`. Every `findMany` hits `undefined.findMany` → TypeError. Breaks **every checkout** and all tax/shipping CRUD.
- RECOMMENDATION: Change both to `'taxRule'` / `'shippingRule'`; add a unit test asserting the delegate resolves; add an e2e running a full checkout.

### P0-2 Storefront controllers create a new PrismaClient per request (connection exhaustion)
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/api/src/modules/storefront/storefront.controller.ts:14` (same pattern across all 4 storefront controllers, ~12 sites)
- SNIPPET: `const prisma = (await import('../../prisma/prisma.service.js')).PrismaService; const service = new prisma();`
- ISSUE: Bypasses DI, opens a fresh connection pool every request, never disconnects → connection-pool exhaustion in production. The `.js` dynamic import also breaks under ts-node dev.
- RECOMMENDATION: Inject `PrismaService` (or the relevant service/repository) into the controllers and delete the per-request instantiation pattern.

### P0-3 Storefront data layer points at non-existent endpoints — most catalog pages silently empty
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/storefront/src/lib/server-api.ts:49` (and 60, 72)
- SNIPPET: `serverRequest('/catalog/products?...')` (comment: "according to API docs, it's catalog/products")
- ISSUE: `serverApi.products.list/get` and `categories.list` call `/catalog/**`, but the API exposes `v1/storefront/**` and guarded `v1/commerce/catalog`. Every `.catch(() => empty)` silently renders home/product/category/search/new/featured empty.
- RECOMMENDATION: Point at `/storefront/products` (param `category`, not `categoryId`), `/storefront/products/${slug}`, `/storefront/categories` — mirror `api.ts`. Delete the misleading comment.

### P0-4 Product page 404s even after endpoint fix — response-shape mismatch
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/storefront/src/app/products/[slug]/page.tsx:37`
- SNIPPET: `if (!productResponse || !productResponse.data || productResponse.notFound) return notFound();`
- ISSUE: Storefront controller returns the product object directly (no `.data` wrapper) → `.data` always undefined → every product page 404s.
- RECOMMENDATION: Normalize shapes in `serverApi.products.get` (unwrap to `{ data, notFound }`) or change the page check; verify against live response.

### P0-5 CSRF middleware registered at `/api/api` — never runs
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/api/src/app.module.ts:53`
- SNIPPET: `consumer.apply(CsrfMiddleware).forRoutes('api');`
- ISSUE: Global prefix is already `api`; Nest prepends it to non-wildcard middleware paths → resolves to `/api/api`, so **all state-changing endpoints are CSRF-unprotected**.
- RECOMMENDATION: Use `.forRoutes('*')` (expands to `/api$` + `/api/*`), excluding only the Stripe webhook; verify with an e2e POST lacking a CSRF header → assert 403.

### P0-6 `packages/components` does not compile — registry imports deleted module
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `packages/components/registry.ts:28`
- SNIPPET: `import { FormRenderer } from "./form-renderer";`
- ISSUE: `form-renderer.tsx` was deleted (only the spec remains) but is still imported → `tsc --noEmit` fails TS2307; the package cannot build. Related: `size="icon-sm"`/`"icon-xs"` at `dialog.tsx:69`, `sheet.tsx:67`, `combobox.tsx:221` are not in `buttonVariants` (3× TS2322).
- RECOMMENDATION: Restore `form-renderer.tsx` or remove the import + registry entry + orphaned spec; add `icon-sm`/`icon-xs` variants or switch call sites to `icon`; run `npx tsc --noEmit` until clean.

### P0-7 `auth.service.spec.ts` crashes on load — duplicate declaration
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/api/src/modules/platform/auth/auth.service.spec.ts:59` (dup at 39; dup import at 11)
- SNIPPET: `const mockUsersService = { findByEmail: jest.fn(), ... }` declared twice under `// @ts-nocheck`
- ISSUE: Emitted JS is a SyntaxError → the whole auth suite never runs. (See also P1-*: assertions mismatch current `refresh:${tenant}:${user}:${sid}` key and `sid` requirement.)
- RECOMMENDATION: Delete the second declaration and duplicate import; remove `@ts-nocheck`; rewrite assertions against current `AuthService` behavior.

### P0-8 Super-admin console 404s — wrong API path prefix
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `apps/admin/src/lib/api/superAdmin.ts:30` (all 5 methods)
- SNIPPET: `listTenants: () => api.get('/api/v1/admin/tenants')`
- ISSUE: Backend registers `v1/super-admin/tenants`; every super-admin call 404s. (API agent also flagged the controller may be unregistered — **verify registration** in `TenantModule`/`AdminModule`.)
- RECOMMENDATION: Change prefix to `/api/v1/super-admin/tenants`; align `suspendTenant` to `POST :id/suspend`.

### P0-9 `PROGRESS_REPORT.md` corrupted with unresolved merge-conflict markers
- CATEGORY: ERRONEOUS — CONFIDENCE: High — ACTION: Fix
- FILE: `PROGRESS_REPORT.md:24` (43 markers: lines 24, 38, 51, 58, 63, 75, 135, 181, 207, 269, 324–640+)
- SNIPPET: `<<<<<<< HEAD ... ======= ... >>>>>>> feat/admin-ui-refactor`
- ISSUE: Report is unreadable — Markdown renders both sides of every table; parsers see junk. Root cause of several "stale blocker" claims (see P1-10).
- RECOMMENDATION: Rebuild from the `feat/admin-ui-refactor` side (newer), verify each claim against current code, regenerate.

---

## HIGH (P1) — Fix next

### Storefront (5)
- **P1-1 Login doesn't persist `user` → order history broken after fresh login.** `apps/storefront/src/app/account/login/page.tsx:58` — no `localStorage.setItem('user', ...)`; orders/change-password/account read `localStorage['user']`. ACTION: Fix. Persist `result.user` (mirror mfa/register) or replace localStorage reads with the persisted zustand auth store.
- **P1-2 Client-side logout never calls API logout → stale HttpOnly session remains.** `apps/storefront/src/app/account/orders/page.tsx:63`, `account/page.tsx:32-36`. ACTION: Fix. Call `useAuthStore.getState().logout()` (or `api.auth.logout(user.id)`) before clearing local state.
- **P1-3 Checkout shipping hard-coded and inconsistent with backend.** `apps/storefront/src/app/checkout/page.tsx:168-169` — `const tax = 0; const shipping = subtotal > 15000 ? 0 : 1500;` Express option ($25) never applied; backend charges `totalCents = subtotalCents` → customer charged less than UI shows. ACTION: Fix. Pass `shipping_method` to backend or match totals exactly; remove magic numbers → config.
- **P1-4 Stripe init duplicated + dead `PaymentForm`.** `apps/storefront/src/app/checkout/page.tsx:7-8,17,20` — `getStripe()` unused (stripe.ts), inline `loadStripe('pk_test_mock')` fallback, unused `PaymentForm`. ACTION: Fix/Remove. Use `getStripe()`; delete dead component + duplicate import.
- **P1-5 `serverApi` fallback port wrong.** `apps/storefront/src/lib/server-api.ts:3` — defaults to `:3001` (its own port) vs `api.ts` `:3000`. ACTION: Fix. Single `getApiBase()` helper; add `NEXT_PUBLIC_API_URL` to `.env.example`.

### API (16)
- **P1-6 Catalog/builder `findMany` misuse → create/update + page builder 500.** `apps/api/src/modules/commerce/catalog/catalog.service.ts:30,42,64,93,116-119` and `experience/builder/repositories/page-layout.repository.ts:18` — `{ slug }`/`{ page_key }` passed as top-level args instead of `where`. ACTION: Fix. Wrap in `where`; add repo tests.
- **P1-7 Variant DTO↔schema mismatch → variant creation always fails.** `apps/api/src/modules/commerce/catalog/dto/create-product-variant.dto.ts:21` — `name`/`price`/`stock` not on Prisma model (needs `price_cents`/`stock_available`); required `currency` never set. ACTION: Fix. Map fields, default `currency`.
- **P1-8 `softDelete` writes `deleted_at` on models without that column → delete endpoints 500.** `apps/api/src/common/repositories/tenant-scoped.repository.ts:78` (Category/Customer/ProductVariant lack the column). ACTION: Fix. Migrate the column in or hard-delete those models.
- **P1-9 Register/invite default role `member` doesn't exist → registration 404s.** `apps/api/src/modules/platform/auth/auth.service.ts:42` (and invite line 242). ACTION: Fix. Default to `'Customer'` or create the `member` role.
- **P1-10 `AuditLogController` requires `audit.read` but never attaches `PermissionGuard`.** `apps/api/src/modules/platform/audit-log/audit-log.controller.ts:9`. ACTION: Fix. Add `PermissionGuard` like every other guarded controller.
- **P1-11 Inventory accounting diverges (double-decrement / never-restore).** `apps/api/src/modules/commerce/order/order.repository.ts:28,44` — `fulfillStock` decrements `stock_available` again after `reserveStock` already did; `releaseStock` never restores `stock_available`. ACTION: Fix. Fulfill → decrement only `stock_reserved`; cancel/refund → increment `stock_available`.
- **P1-12 Returns refund double-transition → endpoint 400s.** `apps/api/src/modules/commerce/returns/returns.service.ts:74` — `payments.refund` already flips order to `refunded`, then `updateStatus('refunded')` hits empty transition table. ACTION: Fix. Drop the duplicate status update.
- **P1-13 Payments refund only accepts `paid` — returns on fulfilled orders impossible.** `apps/api/src/modules/commerce/payments/payments.service.ts:72`. ACTION: Fix. Allow `fulfilled` (and `refunded` idempotently).
- **P1-14 Storefront cart add-to-cart broken — missing required `tenant_id`.** `apps/api/src/modules/storefront/storefront-cart.controller.ts:86` (also no cart/tenant ownership checks on update/remove). ACTION: Fix. Include `tenant_id: ctx.tenantId`; add ownership checks.
- **P1-15 Guest checkout passes `null`/`undefined` `customer_id` to required column.** `apps/api/src/modules/storefront/storefront-checkout.controller.ts:97`, `checkout.service.ts:139`. ACTION: Fix. Require/resolve customer for guest carts or reject with 400.
- **P1-16 CORS `origin: '*'` + `credentials: true` is invalid combo → auth cookies fail.** `apps/api/src/main.ts:26`. ACTION: Configure. Require `CORS_ORIGIN` outside dev; never pair wildcard with credentials.
- **P1-17 Schema drift — columns in schema but no migration.** `apps/api/prisma/schema.prisma:129,240,249` (`product_type`, `discount_cents`, `payment_intent_id`). ACTION: Verify. Run `prisma migrate diff`; generate migration or document `db push` path.
- **P1-18 Order DTO `sku` always undefined.** `apps/api/src/modules/commerce/order/order.service.ts:166`. ACTION: Fix. Include `items: { include: { variant: { select: { sku: true } } } }`.
- **P1-19 Default JWT secret fallback.** `apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:24`, `auth.module.ts:12` — `'dev-secret-key-change-in-prod'`. ACTION: Configure. Fail fast if `JWT_SECRET` missing; centralize.
- **P1-20 `tenant-isolation.e2e-spec.ts` expects 200 on a route now guarded → 401.** `apps/api/test/tenant-isolation.e2e-spec.ts:67`. ACTION: Fix. Mint a token or assert 401.
- **P1-21 Seven placeholder repository specs assert `true`.** `apps/api/src/modules/commerce/*/repositories/*.repository.spec.ts:43` (cart, customer, order, users, theme-override, page-layout, catalog). ACTION: Implement. Write real tenant-isolation assertions or delete.

### Design system & types (7)
- **P1-22 Nested-vs-flat token schema split — next clean build breaks admin.** `packages/design-tokens/tokens.ts:23` (nested `muted`/`colorful`) vs stale `dist/tokens.d.ts` (flat `surface/text/border`). Consumers: `apps/admin/src/pages/theme/ThemeEditorPage.tsx:134-148`, `apps/admin/src/lib/invoice.ts:14`, `packages/ui-config/index.js`. ACTION: Fix. Converge on the nested schema (matches `theme-engine/themes/*`); update consumers; rebuild dist.
- **P1-23 Theme editor writes flat hex over nested variant object → saving any color corrupts the theme.** `apps/admin/src/pages/theme/ThemeEditorPage.tsx:296,476`. ACTION: Fix. Edit `colors.{mode}.{variant}.{field}`.
- **P1-24 `theme-engine` accepts arbitrary override JSON with no validation → type-invalid merged theme.** `packages/theme-engine/index.ts:30` + `apps/api/src/modules/experience/theme/theme.service.ts:60-61`. ACTION: Fix. Add zod deep-partial schema; validate `overridesJson`.
- **P1-25 Storefront tenant themes never applied.** `apps/storefront/src/components/tenant-theme-provider.tsx:19` — expects `tokensJson` but API returns nested `tokens`. ACTION: Implement. Convert resolved tokens → CSS vars keyed off `theme.tokens`.
- **P1-26 `@commerceos/ui-config` imported by no code; apps hard-code 3 diverging copies of the token set.** `packages/ui-config/index.js:1` + `apps/admin/src/index.css:44-181`, `apps/storefront/src/app/globals.css:63-132`. ACTION: Fix/Remove. Wire `tokens.css`/ui-config into the apps or delete both and pick one source of truth.
- **P1-27 Apps re-declare local copies of shared types that have already diverged.** `apps/admin/src/lib/api/catalog.ts:3,25,47`, `superAdmin.ts:3`, `users.ts:3`, `orders.ts:11`, `apps/storefront/src/lib/auth-store.ts:5`, `section-renderer.tsx:10`. ACTION: Fix. Reconcile shared-types with real DTOs; import from `@commerceos/shared-types`.
- **P1-28 Shared-types mostly unused → rotting.** `packages/shared-types/index.ts:4` — `Tenant/User/Product/ProductVariant/Category/Role/BuilderNode` schemas never imported. ACTION: Remove or use.

### Components (6)
- **P1-29 `dist/` stale vs source; consumers run old APIs (old `DataTable` `Column`/`keyField`).** `packages/components/dist/data-table.d.ts` + `apps/admin/src/pages/orders/OrderListPage.tsx:5`. ACTION: Fix. Fix source, rebuild dist, update consumers to `ColumnDef`; add clean-before-build.
- **P1-30 Undeclared deps imported (recharts, @tanstack/react-table, @tanstack/react-virtual, react-hook-form).** `packages/components/{chart.tsx,data-table.tsx,form.tsx}`. ACTION: Fix. Declare in `package.json`.
- **P1-31 16 unused Radix deps + `date-fns` + `react-day-picker` after Base UI migration.** `packages/components/package.json:22`. ACTION: Remove.
- **P1-32 Seed data ↔ component prop contracts broken → seeded homepage crashes.** `apps/api/prisma/seed.ts:181-197` — `testimonials` (needs `items`), `gallery` (needs `images`), `breadcrumbs` (needs `items`), `faq` (`question`/`answer`). ACTION: Fix. Align seed props with component contracts (and `section-schema.ts`).
- **P1-33 `CartDrawer` gutted to a stub with hard-coded `0` count; `checkout-summary` renders fake `$0.00`.** `packages/components/cart-drawer.tsx:8`, `checkout-summary.tsx:31`. ACTION: Implement. Restore controlled props (old spec is the spec) or remove from registry.
- **P1-34 Several component specs test removed/old APIs and fail.** `banner.spec.tsx`, `cart-drawer.spec.tsx`, `checkout-summary.spec.tsx`, `data-table.spec.tsx`, `empty-state.spec.tsx`, `button.spec.tsx`, `form-renderer.spec.tsx`. ACTION: Fix. Rewrite against current props or delete.

### Admin (8)
- **P1-35 Inventory locations/levels CRUD targets non-existent routes.** `apps/admin/src/lib/api/inventory.ts:45` (backend only `GET locations`, `GET locations/:id/levels`). ACTION: Remove. Trim to served routes.
- **P1-36 Returns API client doesn't match backend workflow.** `apps/admin/src/lib/api/returns.ts:27` — backend: `POST :orderId`, `POST :id/approve|receive|refund`. ACTION: Fix. Rewrite to workflow endpoints.
- **P1-37 Invite sends `role_id` but backend accepts `roleName` → every invite silently gets default role.** `apps/admin/src/lib/api/users.ts:57` vs `auth/dto/invite.dto.ts:9`. ACTION: Fix.
- **P1-38 Feature-flag field mismatch — every toggle force-enables.** `apps/admin/src/pages/super-admin/TenantDetailPage.tsx:93` reads/writes `is_enabled`; model is `enabled`. ACTION: Fix.
- **P1-39 `@commerceos/components` dist stale — admin's DataTable breaks if package rebuilt.** (see P1-29, admin consumption). ACTION: Fix.
- **P1-40 Login-page tests fail 5/5 — copy + setup broken.** `apps/admin/src/pages/__tests__/login-page.test.tsx:35,69` — asserts copy that doesn't exist; `vi.mock` TDZ; `useState` null error. ACTION: Fix.
- **P1-41 ~10 management pages are read-only shells with dead create/edit/delete buttons.** `settings/shipping.tsx:46`, `settings/tax.tsx:46`, `marketing/promotions.tsx:46`, `orders/returns/ReturnsListPage.tsx:16`, `subscriptions/SubscriptionsListPage.tsx:27`, `b2b/CompanyProfilesListPage.tsx:26`, `settings/locations/LocationsListPage.tsx:26`. ACTION: Implement. Wire CRUD (backends already serve it).
- **P1-42 Analytics + Visual Builder are static mocks.** `apps/admin/src/pages/AnalyticsPage.tsx:25`, `builder/PageBuilder.tsx:156` (mock publish, hard-coded `preview-secret`, ignores `pageKey`). ACTION: Implement. Wire to real endpoints.

### Root / infra / docs (5)
- **P1-43 `conflicts.diff` (326KB, UTF-16) accidentally committed in merge.** ACTION: Remove. `git rm`; add `*.diff` to `.gitignore`.
- **P1-44 `dump.rdb` — live Redis snapshot committed.** ACTION: Remove. `git rm --cached`; add `*.rdb` to `.gitignore`.
- **P1-45 `.graphify/` (1006 files, 9.1MB) committed — tool cache with personal absolute paths.** ACTION: Remove. `git rm -r --cached .graphify`; ignore `.graphify/`, `.gsd/`, `.ai/`, `.opencode/`, `.npx-cache/`.
- **P1-46 `.env.example` out of sync — dead keys (`API_URL`, `ADMIN_URL`, `JWT_*`, `SENTRY_*`, `AWS_*`) and missing real keys (`NEXT_PUBLIC_API_URL`, `CORS_ORIGIN`, `REDIS_*`, `PREVIEW_SECRET`); Postgres password `password` vs `dev` elsewhere.** `apps/api/src/modules/platform/auth/auth.module.ts:13` hard-codes `15m` while env documents `JWT_EXPIRES_IN`. ACTION: Configure. Regenerate env contract from code's `process.env` reads.
- **P1-47 Version drift: Node (README 24 vs CI 22 vs Dockerfile 20), Postgres (compose 15 vs README/CI 16), admin port (5173 vs README 5174 vs env 3002).** ACTION: Configure. Pick one of each; align everywhere.

---

## MEDIUM (P2) — Fix when touching the file

### Storefront
- P2-1 `/categories` link 404s — no route (only `/categories/[slug]`). `floating-header.tsx:51`, `home-client.tsx:97,139`, `mobile-nav.tsx:11`. ACTION: Fix — add `categories/page.tsx` or change links.
- P2-2 Orphaned `home-client.tsx` (214 lines, homepage migrated to builder). ACTION: Remove.
- P2-3 Orphaned `mobile-nav.tsx` (imported in `layout.tsx`, never rendered). ACTION: Remove or wire.
- P2-4 Duplicate variant-selection logic across `product-client.tsx` / `product-page-client.tsx`. ACTION: Remove — keep one.
- P2-5 13 unused shadcn ui components in `apps/storefront/src/components/ui/`. ACTION: Remove (keep button/input/label/card/badge/sheet).
- P2-6 Returns / subscriptions / B2B pages are mocks with dead buttons. `returns/page.tsx:13`, `subscriptions/page.tsx:13`, `(auth)/b2b/page.tsx:13`. ACTION: Implement or mark route unavailable.
- P2-7 Cart-drawer cross-sells mock + hard-coded `FREE_SHIPPING_THRESHOLD=15000`. `cart/cart-drawer.tsx:87,83`. ACTION: Implement or remove; move threshold to config.
- P2-8 "New Arrivals"/"Featured" not curated — both call unfiltered list. `new/page.tsx:7`, `featured/page.tsx:7`. ACTION: Fix — pass flags or relabel.
- P2-9 `layout.tsx` imports `SearchAutocomplete`/`MobileNav` never rendered. ACTION: Remove.
- P2-10 `products/page.tsx` uses browser `api` while siblings use `serverApi`. ACTION: Fix — one client per environment.

### API
- P2-11 `HealthController` defined but never registered → `GET /api/health` 404, liveness probe dead. `platform/health/health.controller.ts:11`. ACTION: Fix — register module or remove.
- P2-12 Duplicate storefront order routes (both `StorefrontController` and `StorefrontOrderController` register `orders/by-email` + `orders/:id`). ACTION: Remove — keep the dedicated controller.
- P2-13 `TenantAdminController` orphaned/possibly unregistered (see P0-8). ACTION: Verify/Remove.
- P2-14 Dead `TenantCacheService`, `JobPayload` interface, `cart.service.get`, `updatePaymentIntentId`, `OrderResponseDto`, `OrderItemRepository`, catalog `reserveStock/confirmReservation/releaseReservation` + `StockReservationRepository`. ACTION: Remove.
- P2-15 Hard-coded magic numbers: low-stock threshold `5`, take `5`, `15*60*1000` (comment references non-existent `RESERVATION_TTL_MS`); dashboard fabricated 7-day sparkline (`dashboard.service.ts:34`); Meilisearch default `masterKey`. ACTION: Configure/Implement.
- P2-16 Returns restocks every order item on a partial return (no `ReturnRequestItem`). `returns.service.ts:57`. ACTION: Implement.
- P2-17 Promotions DTO fields don't map to schema (`min_order_amount` vs `min_order`, etc.). `promotions/dto/create-promotion.dto.ts:25`. ACTION: Fix.
- P2-18 `PaymentIntentId` split-brain — two columns store the same Stripe id. `schema.prisma:249`. ACTION: Remove — pick one.
- P2-19 Cart `@Min(1)` makes the remove-when-zero branch unreachable. `cart/dto/update-item.dto.ts:4`. ACTION: Fix — `@Min(0)`.
- P2-20 Search-sync worker disconnected — `search_sync` queue never registered, nothing enqueues. `search/search-sync.worker.ts:14`. ACTION: Implement.
- P2-21 Host-resolver dev fallback ("first active tenant on localhost") runs in production middleware. `tenant/middlewares/host-resolver.middleware.ts:22`. ACTION: Fix — gate behind `NODE_ENV !== 'production'`.
- P2-22 Inventory reservation updates bypass tenant filter. `inventory.service.ts:59`. ACTION: Fix.
- P2-23 JWT expiry hard-coded in `auth.module.ts:13` while env documents it. ACTION: Configure.
- P2-24 Two orphaned e2e specs matched by no jest config. `catalog.e2e-spec.ts`, `experience.e2e-spec.ts`. ACTION: Remove or relocate + add `test:e2e` CI step.

### Components / design
- P2-25 `style-dictionary` declared but never used (build is hand-rolled `build-tokens.mjs`). ACTION: Remove.
- P2-26 `tokens.css` generated but never imported; apps hard-code the same oklch values. ACTION: Configure.
- P2-27 `ui-config` fractional spacing vars use dashed names (`--spacing-0-5`) but generator emits dots (`--spacing-0.5`) — never resolve. ACTION: Fix (or drop package).
- P2-28 `ComponentMetadata` gated keys (`sidebar.v1`, `data-table.v1`, `form-renderer.v1`) can never match admin sections; `minPlan` union lacks `"trial"`. ACTION: Verify/align.
- P2-29 `breadcrumb.tsx` — second unused breadcrumb primitive. ACTION: Remove.
- P2-30 Toast references `success`/`warning` tokens not in design-tokens. `toast.tsx:37`. ACTION: Fix — add tokens.
- P2-31 Header `mega-menu` variant unimplemented; `navItems` required but absent from schema → editor-created headers crash. `header.tsx:27`. ACTION: Implement.
- P2-32 Registry declares 27 components but section-schemas cover 11 → 16 can't be added via editor. `registry.ts:36`. ACTION: Implement or trim.
- P2-33 `minPlan` gating defined but never enforced in `SectionRenderer`. ACTION: Implement.
- P2-34 Section schemas lack required-prop defaults (`footer.v1` needs `columns`, etc.). `section-schema.ts:57`. ACTION: Implement.
- P2-35 Theme version hard-coded `'1.0.0'`. `apps/api/src/modules/experience/theme/theme.service.ts:39`. ACTION: Configure.
- P2-36 `TenantService` hard-codes `en-US`/`USD`. `tenant/tenant.service.ts:51`. ACTION: Configure.
- P2-37 `@commerceos/design-tokens` `"require"` condition points at ESM file → `ERR_REQUIRE_ESM`. ACTION: Configure — emit CJS.
- P2-37b Tsconfig-dependent type-checking: root `tsconfig.json:8` maps design-system packages to **source** (`packages/design-tokens/index.ts`) while `apps/admin` resolves them via package.json `types` → **stale dist** (old flat schema). Same import compiles under admin config but errors under root config — build outcome is tsconfig-dependent. ACTION: Verify — align tsconfigs on source or dist after converging the token schema (P1-22), then clean `turbo build`.

### Admin
- P2-38 B2B company CRUD + subscriptions CRUD target non-existent routes. `b2b.ts:29`, `subscriptions.ts:25`. ACTION: Remove (trim to served GETs).
- P2-39 `AuthContext` uses raw relative fetch, bypassing `VITE_API_URL`. ACTION: Configure — route through api client.
- P2-40 Hard-coded `Acme Corp` / `Global Admin` in sidebar; no role/permission gating — every user sees Super Admin console. `AdminLayout.tsx:170`, `App.tsx:38`. ACTION: Implement.
- P2-41 `⌘B` shortcut queries `[data-sidebar-trigger]` but UI renders `data-sidebar="trigger"` → silent no-op. `AdminLayout.tsx:319`. ACTION: Fix.
- P2-42 Locations page renders wrong fields (`city/country/is_active` vs `address_json/is_default`). `settings/locations/LocationsListPage.tsx:58`. ACTION: Fix.
- P2-43 Order detail SKU column always blank. `pages/orders/OrderDetailPage.tsx:121` (see P1-18). ACTION: Fix.
- P2-44 PageLayoutList hard-codes "Draft" status. `settings/PageLayoutList.tsx:58`. ACTION: Implement.
- P2-45 16 exported hooks never imported (inventory/returns/subscriptions/b2b/customers/categories). `hooks/*`. ACTION: Remove.
- P2-46 10 unused ui primitives duplicated in `apps/admin/src/components/ui/` + packages/components. ACTION: Remove.
- P2-47 `DataBindingPanel` select is decorative; `ResponsiveEditor` inert. `builder/DataBindingPanel.tsx:32`. ACTION: Implement or hide.
- P2-48 `DraftOrdersPage` shows regular orders filtered to `pending`; "Create Draft" does nothing. ACTION: Fix — real feature or remove.
- P2-49 Orphaned `ProvisionTenantDialog` (dead duplicate of `/super-admin/create-store` route). ACTION: Remove.
- P2-50 Category mutations triplicated; DnD reorder writes duplicate `sort_order`. `CategoryListPage.tsx:71,215,266`. ACTION: Fix.
- P2-51 `date-fns` imported but undeclared in admin (only via hoisting). ACTION: Fix — declare dep.
- P2-52 Hard-coded `https://i.pravatar.cc` avatar + "Sarah Jenkins" testimonial on login. ACTION: Remove/Replace.

### Tests
- P2-53 Playwright spec unrunnable — no config/script/CI. `tests/e2e/checkout.spec.ts:1` (also hard-coded `:3001` URL). ACTION: Implement (config + `test:e2e`) or remove.
- P2-54 k6 load test unrunnable — `k6@0.0.0` is the npm placeholder, not the binary. `tests/load/checkout.js:1` (+ hard-coded URL). ACTION: Remove or wire real k6.
- P2-55 `theme-engine/index.spec.ts` correct but no test script → never runs. ACTION: Configure.
- P2-56 Storefront cart-page test missing `next/link` mock (may fail at render). `cart/__tests__/cart-page.test.tsx:24`. ACTION: Verify/fix.
- P2-57 E2E suite not wired into CI (CI runs only unit `npm test`). ACTION: Implement.
- P2-58 Stale `dist/*.spec.js` artifacts from an older build. ACTION: Remove + clean step.

### Root / docs
- P2-59 Husky configured (`prepare: husky`, lint-staged, commitlint) but no hook files → never run. `.husky/`. ACTION: Implement — `npx husky add .pre-commit/.commit-msg`.
- P2-60 Root unused deps: `@sentry/nextjs`, `@sentry/react`, `pino-http`; devDeps `axe-core`, `jest-axe`, `k6`, `storybook`. ACTION: Remove.
- P2-61 CI injects `SENTRY_*` env but no app uses Sentry. `ci.yml:63-65`. ACTION: Remove or wire.
- P2-62 `MASTER_TASKLIST.md` stale: task-file inventory wrong (29 vs 23, 5 in next, no backlog), 09c/10 marked Backlog but completed, "Business engine empty" (b2b/subscriptions exist). ACTION: Fix.
- P2-63 `CommerceOS-Docs/12-folder-structure-theming.md` structure tree stale (business/, intelligence/, admin layout, token files, sdk-client, [locale]). ACTION: Fix — regenerate from `git ls-files`.
- P2-64 `CommerceOS-Docs/14-api-contracts.md` labeled SOURCE OF TRUTH but routes wrong (`v1/platform/auth`, `v1/catalog`, split checkout flow). ACTION: Fix — regenerate from `@Controller` decorators.
- P2-65 README/run.bat port + node version drift (see P1-47); `run.bat` has `npm install` commented out → fresh checkout fails. ACTION: Fix.
- P2-66 `.gitignore` incomplete (`.graphify/.gsd/.ai/.opencode/.npx-cache`, `*.rdb`, `*.diff`, `nul`). ACTION: Configure.
- P2-67 Phase-1 spec documents invoices/billing/full-E2E with no code — needs status markers. `CommerceOS-Docs/10-roadmap/02-phase1-mvp-spec.md`. ACTION: Verify/annotate.

---

## LOW (P3) — Batch cleanup

- **Storefront:** unused imports (`XCircle`, `api` in mocks, `getStripe`, `clientSecret` prop) · image-loader placeholder `fmt=webp` + `localhost:3000` fallback · tenant middleware stub · boilerplate README + unused SVGs · dead package deps (`@tanstack/react-query`, `sonner`, `shared-types`, `theme-engine`, `ui-config`, `design-tokens`).
- **API:** `fix-hasfeature*.js`, `fix-imports.js`, `fix-theme.js`, `test-dashboard.ts`, `test-promotions.ts` (6 one-off scripts) · committed `.turbo/turbo-build.log`, `prisma/seed.js/.map/.d.ts`, `tsconfig.build.tsbuildinfo` · unused `InternalServerErrorException` import · `crypto` not imported from `node:crypto` · unused `Post` imports in b2b/subscriptions controllers.
- **Components:** unused imports (`Minus/Plus`, `X`, `toast` in registry) · 5 skeleton presets with zero consumers · `product-grid` decorative `source`/`sourceId` · hard-coded amber/zinc hero palettes, `text-[10px]`, `bg-black/40` overlays bypassing tokens.
- **Admin:** `nul` file · starter assets (`hero.png`, `react.svg`, `vite.svg`, `icons.svg`) · `ui/data-table` wrapper duplicate · `ProvisionTenantDialog` (dup) · hard-coded `.env.local`.
- **Root/docs:** `.agents/skills/...zip` (1.4MB binary) · boilerplate app READMEs (`apps/api/README.md`, `apps/admin/README.md`, `apps/storefront/README.md`) · `copy-components.js` orphan · `UI-AUDIT-REPORT.md` describes already-fixed P0s · `MASTER_TASKLIST.md:180` ".env.example for all apps" done but storefront/admin have none · planning docs 23/24 read as stale proposals.

---

## Cross-cutting themes (read before executing)

1. **Two clients / two contracts everywhere.** Storefront runs parallel `api`/`serverApi` clients; shared-types exists but apps re-declare local types that have diverged; `dist/` for `design-tokens` and `components` ships different APIs than source. **Converge on one source of truth per layer** (schema → shared-types → DTO → client), then rebuild all `dist`.
2. **"Configured but not running" is the project's default state.** Husky, Playwright E2E, k6, health probe, search-sync worker, minPlan gating, CSRF — all present but disconnected. **Either wire it or delete it**; never leave a half-wired path that looks done.
3. **Themes/tokens have three competing copies** (design-tokens source vs `dist` vs `ui-config` vs hand-rolled CSS in both apps). Pick the nested variant schema, update the few consumers, delete the rest.
4. **Docs and reports contradict the code** (PROGRESS_REPORT conflict corruption, MASTER_TASKLIST statuses, api-contracts "source of truth", folder-structure tree). Fix docs last, from verified code, and add an implementation-status column where features are documented-but-unbuilt.
5. **Many "mock for MVP" pages became production surfaces** (Analytics, Visual Builder, returns/subscriptions/B2B, checkout-summary, cart-drawer, dashboard sparkline). Decide per page: **implement** (backend often already exists) or **remove/gate**, then update the audit trail.

## Notes

- Generated 2026-07-31 from a 7-agent parallel audit. Findings carry agent confidence; anything marked "Verify" needs a human/code check before acting.
- The corrected mission prompt is `planning/38-code-audit-mission-prompt.md`; execution instructions are `07-code-audit-action-guide.md` in this folder.
