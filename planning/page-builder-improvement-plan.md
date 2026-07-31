# Page Builder — Improvement Plan

- **Status**: Planned (research-only; no source edits made)
- **Date**: 2026-07-31
- **Source**: `planning/page-builder-audit.md` (findings F1–F13; P1 = 3 · P2 = 5 · P3 = 5)
- **Scope**: `@commerceos/components`, `apps/admin`, `apps/storefront`, `apps/api`, `packages/shared-types`
- **Approach**: Small, surgical, independently shippable tasks. Every task has measurable acceptance criteria and exact verification commands.

## Overview

The audit found one **build break** (F1), two **P1 security** issues (F2 stored XSS, F3 hardcoded preview secret), and a duplicated/partially-mock page-editor architecture (F5). This plan fixes the build and the two security holes first, then converges the editor UX and data layer, then closes lower-severity correctness/ops gaps.

Two design decisions were made and are documented in [Decisions](#decisions):

- **F1 → CREATE** `form-renderer.tsx` (spec-driven). The feature is registered in both `registry.ts:63` and `ComponentMetadata`; deleting would remove a real feature and touch more files than implementing it.
- **F5 → CONVERGE on `PageLayoutEditor`; remove the disconnected `PageBuilder`** mock (and its route + `pages/builder/*` components). This also removes the F3 secret literal and resolves F12.

## Priorities (execution order)

### P1 — Fix build + close security holes (do first)

1. [F1] Create `form-renderer.tsx` and export it (unblocks the whole workspace build)
2. [F2] Sanitize rich-text HTML before render (closes stored XSS)
3. [F3] Remove the hardcoded preview secret from the client bundle; fail closed in prod

### P2 — Security + editor convergence

4. [F4] Gate unpublished-draft reads on the API
5. [F5] Remove the mock `PageBuilder`; `PageLayoutEditor` is canonical
6. [F6] Make `$bind` dynamic-content binding functional in the canonical editor
7. [F7] Edit `html` props with `RichTextEditor` (sanitize before save)
8. [F8] Single source of truth for `minPlan` plan gating

### P3 — Correctness & ops polish

9. [F9] Robust dirty-state check (replace `JSON.stringify` diff)
10. [F10] Revalidate storefront on publish
11. [F11] Centralized PageLayout schema; drop dual-name fallback
12. [F12] Close as resolved by F5 (builder canvas removed)
13. [F13] Verify remaining `dangerouslySetInnerHTML` sites

---

## Task: F1 — Create `form-renderer.tsx` and export it

- **Status**: Done
- **Completed**: `form-renderer.tsx` (plain controlled inputs + local state, `submitLabel` default `"Submit"`) and the `index.ts` re-export were created in a prior session; this session verified. Note: `react-hook-form@^7.52.1` was added to `packages/components` deps by that prior session (the plan's "do not add" guidance predates `form.tsx` already importing it; the dep was needed to fix the latent gap and is now present, so no follow-up required).
- **Deviations**: verification surfaced 24 pre-existing test failures + 6 `dist/*.spec.js` suite failures, all unrelated to F1 (see below). An unrelated root cause — `packages/components/input.tsx:1` corrupted to `/rimport ...` — was breaking vite transform of every importing suite (including this one); fixed via `git checkout HEAD -- packages/components/input.tsx` (verified restored).
  - Pre-existing failures (baseline, not introduced here): `cart-drawer.spec.tsx` (8/8), `checkout-summary.spec.tsx` (4/4), `data-table.spec.tsx` (6/6 — "Columns require an id when using a non-string header"), `banner.spec.tsx` (3/6 — description and dismiss button never rendered; `background-image: url("undefined")`), `button.spec.tsx` (1/7 — link-as-anchor), `empty-state.spec.tsx` (1/3 — action link), `header.spec.tsx` (1/7 — mobile menu toggle), and vitest picking up compiled `dist/*.spec.js` (breadcrumbs, modal, pagination, search-bar, sidebar, tabs). Track these in a separate baseline-fix task if desired.
- **Source finding**: F1 (P1) — `packages/components/registry.ts:28` imports `./form-renderer`; `registry.ts:63` registers `"form-renderer.v1"` (minPlan `"pro"`); `form-renderer.spec.tsx:3` imports it too; `index.ts` never re-exports it. No `form-renderer.tsx` exists → `tsc`/`next build`/vite fail on `@commerceos/components`, blocking every consumer.
- **Scope**: `packages/components`
- **Changes**
  - Create `packages/components/form-renderer.tsx` exporting `FormRenderer` implementing the contract in `form-renderer.spec.tsx`:
    - Props: `fields: { name; label; type: "text" | "textarea" | "select" | "email"; required?: boolean; options?: { value; label }[] }[]`, `onSubmit(values: Record<string, string>)`, `submitLabel?: string` (default `"Submit"`).
    - Renders one labeled field per entry (text/email inputs, `<textarea>`, `<select>` with options), `required` markers, and submits collected values.
  - Add `export * from "./form-renderer"` to `packages/components/index.ts` (alongside the existing `./form` re-export).
  - Prefer plain controlled inputs + local state; **do not** add `react-hook-form` to this package's deps (it is currently absent even though `form.tsx` imports it — see Risk).
- **Acceptance criteria**
  - `registry.ts` and the spec resolve `./form-renderer`.
  - Existing `form-renderer.spec.tsx` passes unmodified.
  - `@commerceos/components` builds with `tsc` and strict TS.
- **Verification**
  - `npm run build -w @commerceos/components` (or `npx tsc --noEmit -p packages/components`)
  - `npm run test -w @commerceos/components`
  - Root `npm run build`
- **Risk**
  - **`react-hook-form` latent gap**: `index.ts` re-exports `./form` (`form.tsx`), which imports `react-hook-form`, yet it is not in `packages/components/package.json`. If `tsc --noEmit` fails on that import, add `react-hook-form` to `dependencies` (match the version the spec/existing code expects) as part of this task or a follow-up.

---

## Task: F2 — Sanitize rich-text HTML before render

- **Status**: Done
- **Completed**: added `dompurify@3.4.12` to `packages/components` deps (ships own types, no `@types/dompurify` needed); created `packages/components/sanitize.ts` (`export function sanitizeHtml(html: string): string` wrapping `DOMPurify.sanitize`); exported it from `index.ts`; `rich-text.tsx` now renders `sanitizeHtml(content)`; new `sanitize.spec.tsx` passes (3 tests: strips `<script>` keeping `<p>ok</p>`, removes `onerror`, and a `RichText` render test asserting no script element lands in the DOM).
- **Deviations**: the defense-in-depth "sanitize before persist in `builder.service.ts`" was not done here (plan marks it recommended/with F7) — left for F7. The remaining `dangerouslySetInnerHTML` sites on the render path are the known F13 cases (`storefront json-ld.tsx` JSON.stringify of structured data — low risk; `chart.tsx` SVG) and are tracked by F13. Pre-existing `tsc` errors in `combobox.tsx`/`dialog.tsx`/`sheet.tsx` (icon size variants) are unrelated and unfixed.
- **Source finding**: F2 (P1) — `packages/components/rich-text.tsx:12` renders `dangerouslySetInnerHTML` with no sanitizer; `RichTextEditor.tsx` outputs `editor.getHTML()` unsanitized; repo-wide grep for `sanitize|DOMPurify|sanitizeHtml` found zero sanitizers. `section-renderer.tsx` passes stored props straight into the component. Stored XSS reaches every storefront visitor.
- **Scope**: `packages/components` (+ note for API defense-in-depth)
- **Changes**
  - Add `dompurify` to `packages/components/package.json` `dependencies` (v3 ships its own types; install and confirm no `@types/dompurify` is needed).
  - Add `export function sanitizeHtml(html: string): string` (wrap `DOMPurify.sanitize`) in a small module and export it from `index.ts` so admin/storefront can reuse it.
  - In `rich-text.tsx`, render `sanitizeHtml(content)` instead of raw `content` in `dangerouslySetInnerHTML`. This is the render boundary that also protects the storefront.
  - (Recommended, can land with F7) Sanitize before persist in `builder.service.ts` update pipeline as defense-in-depth.
- **Acceptance criteria**
  - A `<script>`/`<img onerror>` payload passed to `RichText` renders inert (DOM contains no script element / no event handlers).
  - Unit test asserting `sanitizeHtml('<script>alert(1)</script><p>ok</p>')` strips the script and keeps `ok`.
  - No `dangerouslySetInnerHTML` on the storefront render path without going through the sanitizer.
- **Verification**
  - `npm run test -w @commerceos/components` (new sanitizer test)
  - `npm run build`
- **Risk**
  - Low. DOMPurify is well-maintained; keep the allowlist default (blocks scripts/event handlers, keeps basic formatting). Revisit allowlist only if a legitimate use case is broken.

---

## Task: F3 — Remove hardcoded preview secret; fail closed in prod

- **Status**: Done
- **Completed**: 2026-07-31. Removed `const secret = 'preview-secret'` and the `window.open(.../api/draft?secret=${secret}...)` call plus the now-unused Preview button/handler from `PageBuilder.tsx` (leaves the mock publish button in place). Hardened `apps/storefront/src/app/api/draft/route.ts` to fail closed: `const previewSecret = process.env.PREVIEW_SECRET; if (!previewSecret || secret !== previewSecret) return 401;` — rejects in all environments when unset and only accepts the current server value.
- **Deviations**
  - `npm run build` for both apps cannot complete on this baseline (pre-existing TS errors elsewhere: `data-table.tsx`, `AdminLayout.tsx`, `AnalyticsPage.tsx`, `LoginPage.tsx`, `OrderListPage.tsx` in admin; `account/login/page.tsx`, `checkout/page.tsx` in storefront). Verified instead with `tsc` per app — neither edited file appears in the error lists, so no new errors were introduced. Tracked for the baseline-fix task.
  - Runtime verification done via `next dev` (Turbopack) rather than `curl` against a production build, since the repo has no running prod instance: unset secret → 401; wrong secret → 401; correct rotated secret → 307 with `__prerender_bypass` Set-Cookie and `Location: /homepage` (draft cookie minted per build, per `draftMode` docs). A `middleware → proxy` deprecation warning surfaced in dev logs — pre-existing, out of scope.
- **Source finding**: F3 (P1) — `apps/admin/src/pages/builder/PageBuilder.tsx:147-149` hardcodes `const secret = 'preview-secret'` into the client bundle; `apps/storefront/src/app/api/draft/route.ts:11` only rejects when `secret !== process.env.PREVIEW_SECRET && NODE_ENV === 'production'` (dev bypasses; prod with unset `PREVIEW_SECRET` always 401s, or is guessable if set to the shipped literal).
- **Scope**: `apps/admin`, `apps/storefront`
- **Changes**
  - Remove the `const secret = 'preview-secret'` literal and the `window.open(.../api/draft?secret=${secret}...)` call from `PageBuilder.tsx` (file is deleted outright in F5 — this task removes the secret independently so the P1 closes even if F5 lands later).
  - Harden `apps/storefront/src/app/api/draft/route.ts`: fail closed in all environments when `process.env.PREVIEW_SECRET` is unset; keep only the published path functional without a valid secret. (Note: `route.ts` already redirects only to `/${slug}`, so no open-redirect change is needed.)
  - After F5, the preview URL must be minted server-side only (admin API returns a preview link using server-held `PREVIEW_SECRET`; storefront route validates it).
- **Acceptance criteria**
  - No occurrence of `preview-secret` (or any secret literal) in client-reachable admin code (grep the bundle / source).
  - With `PREVIEW_SECRET` unset, the draft route returns 401 in both dev and prod.
  - With `PREVIEW_SECRET` set to a rotated value, only that value enables draft mode.
- **Verification**
  - Grep `apps/admin/src` and `apps/storefront/src` for `preview-secret`.
  - `curl` the draft route without/with wrong secret → 401; with correct secret → draft cookie + redirect.
  - `npm run build`
- **Risk**
  - Low; removing the button is a UX regression only for the (currently broken) mock canvas, which F5 deletes anyway.

---

## Task: F4 — Gate unpublished-draft reads on the API

- **Status**: Done
- **Completed**: `DraftReadGuard` (`apps/api/src/modules/experience/builder/guards/draft-read.guard.ts`) gates `?draft=true` reads on `GET v1/experience/builder/pages/:key`: published reads stay public (guard short-circuits when `draft !== 'true'`); draft reads require `x-preview-secret` header equal to `process.env.PREVIEW_SECRET` OR a valid admin JWT via the app-global `JwtService` (payload `tenant_id` must match the request tenant, else 403). `builder.controller.ts` `GET :key` now uses `@UseGuards(DraftReadGuard)` and passes `request?.['isDraftAuthorized']` into `getPageLayout`; `builder.service.ts` fails closed — the `:draft` key is only read when `draft && canReadDraft`. `apps/storefront/src/lib/server-api.ts` `experience.getPage(pageKey, draft)` forwards `x-preview-secret: process.env.PREVIEW_SECRET` only when `draft` is true (server-side only, never to the browser). Tests: `draft-read.guard.spec.ts` (8 cases — public pass without JWT; secret match; wrong secret + no token → 401; valid JWT → pass; cross-tenant JWT → 403; invalid JWT → 401; JWT without `tenant_id` → 403; fail-closed when `PREVIEW_SECRET` unset) and `builder.service.spec.ts` (5 cases — published key read; fail-closed never reads draft key; authorized draft read; draft→published fallback; empty default layout).
- **Deviations**: The F4 implementation was already present in HEAD commit `8ddcb19` (committed by the prior audit wave); this session verified it end-to-end, removed trailing whitespace from the two blank lines inside the `getPageLayout` edit region, and prettier-formatted the new `builder.service.spec.ts`. Runtime curl of the three acceptance cases requires a live API (none running in this repo); verification used unit tests + per-app typecheck + eslint instead. Pre-existing unrelated failures observed (documented, not fixed): API `auth.controller.spec.ts` (3 tests — `res.cookie`/refresh-token mock gaps), storefront `account/login/page.tsx` (TS2345) and `checkout/page.tsx` (TS2300 duplicate `Elements`), and `builder.service.ts` prettier formatting debt at untouched lines (8, 75–92, 104–161).
- **Source finding**: F4 (P2) — `apps/api/.../builder/builder.controller.ts:22-24` `@Get(':key')` has no guard and returns the draft when `draft === 'true'` (via `builder.service.ts` draft-key fallback). Anyone knowing a `pageKey` on a tenant domain can read unpublished content.
- **Scope**: `apps/api`, `apps/storefront` (`server-api.ts`), `apps/admin` (if admin reads drafts via this endpoint)
- **Changes**
  - Keep the **published** read (`draft !== 'true'`) public — the storefront legitimately needs it.
  - Gate the **draft** read: require a server-held preview secret header (e.g. `x-preview-secret` matching `process.env.PREVIEW_SECRET`) or a valid admin JWT. Guard with a small guard/pipe, not a blanket `TenantAuthGuard`, so the public read stays public.
  - `apps/storefront/src/lib/server-api.ts`: when `isDraft`, forward `process.env.PREVIEW_SECRET` as the secret header (server-side only; never to the browser).
  - `builder.service.ts`: only return the draft variant when the request is authorized (fail closed otherwise).
- **Acceptance criteria**
  - `GET /api/v1/experience/builder/pages/:key` (no `draft`) returns published content with no auth.
  - `GET ...?draft=true` without the secret header (or with a wrong secret) returns 401/403.
  - `GET ...?draft=true` with the correct secret header returns the draft.
  - Storefront draft-mode preview still renders drafts.
- **Verification**
  - Curl the three cases above against a running API.
  - `npm run build` (api + storefront) and api unit tests.
- **Risk**
  - Medium — touches the storefront's draft-preview path. Must keep the published-read contract identical. Consider the secret a shared server-to-server credential (never shipped to the client, per F3).

---

## Task: F5 — Remove the mock `PageBuilder`; converge on `PageLayoutEditor`

- **Status**: Planned
- **Source finding**: F5 (P2) — `apps/admin/src/pages/builder/PageBuilder.tsx` is a disconnected mock (no `useParams`, no data load, hardcoded `flex.v1` root, `setTimeout` Save/Publish stubs); route `App.tsx:76` `<Route path="settings/pages/:pageKey/builder" element={<PageBuilder />} />` passes no props. The real editor is `apps/admin/src/pages/settings/PageLayoutEditor.tsx` (real draft/publish/unpublish via `usePages`).
- **Scope**: `apps/admin`
- **Changes**
  - Delete route `App.tsx:76` and the `PageBuilder` import (`App.tsx:14`).
  - Delete `apps/admin/src/pages/builder/*` (`PageBuilder.tsx`, `PropertyPanel.tsx`, `ResponsiveEditor.tsx`, `DataBindingPanel.tsx`, `components/BuilderNode.tsx`, `components/DraggableElement.tsx`).
  - Confirm nothing else imports from `pages/builder` (grep). Re-home any still-referenced pieces into `pages/settings/` or `components/page-editor/` before deleting.
  - `PageLayoutEditor` remains the single page editor. (Add a binding UI there in F6.)
- **Acceptance criteria**
  - No route references `PageBuilder`; no files under `pages/builder/`.
  - Grep for `pages/builder` and `PageBuilder` returns no app imports (only this plan/audit docs).
  - `settings/pages/:pageKey` (PageLayoutEditor) still saves/publishes/unpublishes.
- **Verification**
  - `npm run build` (admin) and `npm run lint -w apps/admin`.
  - Manual: navigate `settings/pages`, open a page, save draft, publish, unpublish.
- **Risk**
  - Low-medium: deleting the mock removes the only current UI for F3's secret (already removed in F3) and the canvas that F12 comments target. Ensure the `pages/builder` folder is fully self-contained first.

---

## Task: F6 — Make `$bind` dynamic-content binding functional

- **Status**: Planned
- **Source finding**: F6 (P2) — storefront `section-renderer.tsx:29-41` already resolves `{ "$bind": "product.title" }` (dot-path) via `resolveBind`/`resolveProps`, but admin `DataBindingPanel.tsx` never writes `$bind` values back and `PageLayoutEditor` has no binding UI. The feature is dead in the admin.
- **Scope**: `apps/admin` (`components/page-editor`), `packages/components` (test only), `apps/storefront` (test only)
- **Changes**
  - Add a small "Bind to data" control to `PropEditor` (in `components/page-editor`) that, for a given prop, sets the value to `{ "$bind": "<dot.path>" }` — matching the shape `section-renderer.tsx` consumes. Optionally a path autocomplete list.
  - Keep `resolveBind`/`resolveProps` in the storefront as the execution contract (no change needed there).
  - Cover with a unit test on `resolveBind` (e.g. resolves `product.title`, returns `undefined` for missing path, leaves non-`$bind` values untouched).
- **Acceptance criteria**
  - In `PageLayoutEditor`, a prop can be set to a `$bind` path and the saved section `props` contain `{ key: { "$bind": "..." } }`.
  - Storefront renders the bound value from `dataContext` (products/categories) for that section.
- **Verification**
  - New unit test in `packages/components` or `apps/storefront` for `resolveBind`.
  - Manual: bind hero heading to `product.title` in the editor, save, publish, load storefront product page.
  - `npm run build`
- **Risk**
  - Low. The storefront contract already exists; only the admin write-path is added. Keep the control read-only-safe for props whose schema type doesn't support binding if needed.

---

## Task: F7 — Edit `html` props with `RichTextEditor` (sanitize before save)

- **Status**: Planned
- **Source finding**: F7 (P2) — `section-schema.ts` defines `"html"` PropType (used by `rich-text.v1`), but `PropEditor.tsx` has no `html` case and falls through to a plain `Input` (raw HTML editing; also the input surface for F2). `RichTextEditor.tsx` exists but isn't wired anywhere.
- **Scope**: `apps/admin`
- **Changes**
  - Add an `"html"` case in `PropEditor.tsx` that renders `RichTextEditor` (from `@/components/RichTextEditor`) bound to the prop value, calling `onChange(schema.key, html)`.
  - Sanitize the output with `sanitizeHtml` (from `@commerceos/components`, added in F2) before `onChange` persists it.
- **Acceptance criteria**
  - Editing a `rich-text.v1` section shows the Tiptap toolbar instead of a raw-HTML input.
  - Saved HTML is sanitized (no `<script>`/event handlers).
- **Verification**
  - Manual: open a page with a rich-text section in `PageLayoutEditor`, edit bold/list content, save; reload shows formatted content.
  - Unit/integration check that the `html` prop editor emits sanitized HTML.
  - `npm run build` + `npm run test -w apps/admin`
- **Risk**
  - Low. Reuses the existing `RichTextEditor`; sanitization per F2 keeps the boundary safe.

---

## Task: F8 — Single source of truth for `minPlan` plan gating

- **Status**: Planned
- **Source finding**: F8 (P2) — `packages/shared-types/index.ts:81-85` `ComponentMetadata` (with `minPlan`, used by API `builder.service.ts` plan gating) vs `packages/components/registry.ts` per-entry `minPlan` (used by admin UI). Both lists duplicated by hand (`gallery.v1`, `sidebar.v1`, `data-table.v1`, `form-renderer.v1` are `pro` in both today) → drift risk.
- **Scope**: `packages/shared-types`, `packages/components`, `apps/api`
- **Changes**
  - `packages/components` depends on `@commerceos/shared-types` (pure TS/zod leaf — no cycle; components already depends on `@commerceos/design-tokens`).
  - `registry.ts` derives each entry's `minPlan` from `ComponentMetadata[key]?.minPlan` (import from `shared-types`) instead of re-listing it. `ComponentMetadata` remains the single source consumed by both the API and the admin UI.
- **Acceptance criteria**
  - `ComponentMetadata` values and the registry's effective `minPlan` for the four pro components are identical by construction (single source).
  - API plan gating (`builder.service.ts`) and admin lock badges (`AddSectionPanel.tsx`) stay in sync without manual duplication.
- **Verification**
  - `npm run build` (shared-types, components, api).
  - Type-check: registry entry type still satisfies `ComponentRegistryEntry`.
  - A new test or type assertion comparing the two maps fails if they diverge (e.g. `expect(componentRegistry["gallery.v1"].minPlan).toBe(ComponentMetadata["gallery.v1"].minPlan)`).
- **Risk**
  - Low. Adding a pure-TS dependency is safe; the main risk is a lint/type nit in `registry.ts` `as const satisfies` — adjust the assertion to keep `minPlan` optional and derived.

---

## Task: F9 — Robust dirty-state check

- **Status**: Planned
- **Source finding**: F9 (P3) — `PageLayoutEditor.tsx` uses `JSON.stringify(sections) !== JSON.stringify(layout.sections_json ?? [])`, which is key-order/whitespace-sensitive.
- **Scope**: `apps/admin`
- **Changes**
  - Replace with a structured deep-equal (stable key order; `isEqual`-style) over the section list (compare `id`, `component`, `visible`, `props`).
- **Acceptance criteria**
  - Reordering keys or formatting a prop value doesn't falsely flag "unsaved changes"; genuinely different props do.
- **Verification**
  - Unit test for the comparator (dirty vs clean cases).
  - `npm run test -w apps/admin`
- **Risk**
  - Low.

---

## Task: F10 — Revalidate storefront on publish

- **Status**: Planned
- **Source finding**: F10 (P3) — storefront `page.tsx:5` `revalidate = 60` and `usePages` `staleTime: 60s`; after publish, visitors may see stale content for up to ~60s.
- **Scope**: `apps/storefront`, `apps/admin`
- **Changes**
  - Add a storefront route handler (e.g. `POST /api/revalidate`) guarded by the server-held `PREVIEW_SECRET`/shared admin secret that calls `revalidatePath('/')` (or `revalidateTag('pages')` with a tag set on the page) — Next.js 16 route handler; read `node_modules/next/dist/docs/` first per `apps/storefront/AGENTS.md`.
  - In `apps/admin/src/hooks/usePages.ts` `usePublishPageLayout`, call that endpoint after a successful publish (fire-and-forget with error swallowed/logged).
- **Acceptance criteria**
  - Publishing from admin refreshes the storefront home page promptly (no 60s wait).
  - Route handler rejects requests without the secret.
- **Verification**
  - Manual: publish → storefront reflects immediately.
  - `curl` the revalidate route without secret → 401.
  - `npm run build`
- **Risk**
  - Low. Guard carefully; swallow failures so publish UX never breaks on a revalidate miss.

---

## Task: F11 — Centralized PageLayout schema; drop dual-name fallback

- **Status**: Planned
- **Source finding**: F11 (P3) — storefront `page.tsx:28` reads `sections || sections_json`; `shared-types` has `BuilderNode`/`ComponentMetadata` but no Page/PageLayout schema. Client camelCase body (`sectionsJson`, `publish`) vs API snake_case response columns; the dual-name fallback masks the drift.
- **Scope**: `packages/shared-types`, `apps/storefront`, `apps/admin`, `apps/api`
- **Changes**
  - Add a zod `PageLayoutSchema`/`PageSchema` in `shared-types` (fields: `pageKey`, `sections`, `publishedAt`, etc.) and type API request/response DTOs from it.
  - Update `apps/storefront/src/app/page.tsx` to read a single normalized field; drop the `sections || sections_json` fallback.
  - Update `apps/api` response serialization and `apps/admin` `pages.ts` types to use the shared schema.
- **Acceptance criteria**
  - One schema type drives API body, API response, storefront, and admin; no dual-name fallback in storefront.
  - Existing published page still renders after migration.
- **Verification**
  - `npm run build`; api/admin/storefront unit tests; manual publish→render.
- **Risk**
  - Medium (cross-package type migration). Sequence after F10; keep `sections_json` mapping at the API boundary (snake→camel) rather than in the client.

---

## Task: F12 — Close as resolved by F5

- **Status**: Planned (no standalone code change)
- **Source finding**: F12 (P3) — `PageBuilder.tsx` recreates `findNode` every render; `ResponsiveEditor` buttons are inert. Both are moot once the mock canvas is removed.
- **Scope**: `apps/admin`
- **Changes**: None beyond F5. If `PageBuilder` is kept for any reason, memoize `findNode` (e.g. `useMemo`/`useCallback`) and make `ResponsiveEditor` stateful before keeping the canvas.
- **Acceptance criteria**: F5 removes the files; grep for `findNode` / `ResponsiveEditor` shows no remaining usage.
- **Verification**: Same as F5 (`npm run build`, grep).

---

## Task: F13 — Verify remaining `dangerouslySetInnerHTML` sites

- **Status**: Planned
- **Source finding**: F13 (P3) — `apps/storefront/src/components/json-ld.tsx:5` (JSON-LD via `JSON.stringify` — low risk) and `apps/admin`/`packages` `chart.tsx:88` inject SVG.
- **Scope**: `apps/storefront`, `apps/admin`, `packages/components`
- **Changes**
  - Confirm `json-ld.tsx` only serializes app-controlled data (no user text) — add a comment/test if so; sanitize otherwise.
  - Audit `chart.tsx` SVG payload sources: verify chart data/series labels are never attacker-controlled; if they are, pass through `sanitizeHtml` (F2) or escape.
- **Acceptance criteria**
  - Documented verdict per site (safe / sanitized) in the audit coverage table.
  - Any attacker-influenceable site goes through the sanitizer.
- **Verification**
  - Code review + a targeted test if a sanitizer is added.
  - `npm run build`
- **Risk**
  - Low.

---

## Definition of Done

- Root `npm run build` (turbo) passes across all workspaces.
- `npm run lint` (oxlint) and typecheck pass with no new warnings.
- `npm run test` passes — including the new `form-renderer`, sanitizer, `resolveBind`, dirty-state, and minPlan-sync tests.
- All P1 tasks (F1, F2, F3) shipped; P2/P3 shipped or explicitly deferred with a reason in this file.
- No regressions in products, theme, settings (PageLayoutEditor save/publish/unpublish), or storefront rendering.
- Storefront changes verified against `apps/storefront/AGENTS.md` (Next.js 16 docs in `node_modules/next/dist/docs/`).
- No secrets in client bundles (grep for `preview-secret` clean); draft previews fail closed in production.

## Decisions

1. **F1 — CREATE `form-renderer.tsx`** (not delete). Rationale: the interface contract is fully specified by `form-renderer.spec.tsx`; the feature is registered in two places (`registry.ts:63`, `shared-types ComponentMetadata`); deleting would require removing the registration, the metadata entry, and the spec (more churn than a small component) and would drop a pro-plan feature.
2. **F5 — CONVERGE on `PageLayoutEditor`; remove `PageBuilder`.** Rationale: `PageLayoutEditor` is the only editor with a real data layer (`usePages` → `pages.ts` → guarded API) and working draft/publish/unpublish; `PageBuilder` is a mock (no params, no load, no persistence). Removing the mock also deletes the F3 secret literal and the F12 dead canvas. Any genuinely useful builder ideas should be re-implemented inside `components/page-editor` (as F6/F7 do).
