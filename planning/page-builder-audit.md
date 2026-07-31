# Page Builder & Page Editor — Security / Architecture Audit

Audit date: 2026-07-31 · Research-only (no code changed)
Scope: `apps/admin` page-builder + page-editor + theme, `apps/storefront` draft/render, `apps/api` builder module, `packages/components`, `packages/shared-types`.

## Executive Summary

- **P1 build break**: the `@commerceos/components` package cannot compile — `registry.ts:28` imports `FormRenderer` from `./form-renderer`, but the only file that exists is `form-renderer.spec.tsx` (no `form-renderer.tsx`), and `index.ts` re-exports `./form` but never `./form-renderer`. This blocks builds of admin and storefront alike.
- **P1 stored XSS**: `packages/components/rich-text.tsx:12` renders `content` via `dangerouslySetInnerHTML` with no sanitizer anywhere in the repo; the admin rich-text editor (Tiptap) and the builder's `html`-prop input both save raw HTML, which the storefront then renders. Any editor can inject script into any storefront visitor's page.
- **P1 hardcoded secret**: `PageBuilder.tsx:147-149` hardcodes `const secret = 'preview-secret'` into the client bundle. The storefront draft route (`draft/route.ts:11`) only enforces a match against `PREVIEW_SECRET` in production, so the "preview" flow is either broken (env unset → always 401) or secured by a guessable, publicly-committed value.
- **P2 architecture**: the visual `PageBuilder` canvas is a disconnected mock — it ignores its own route param (`settings/pages/:pageKey/builder`), loads no data, persists nothing, and its Preview/Publish are `setTimeout` stubs. The real, working editor is `PageLayoutEditor`; the two overlap with no single source of truth.
- **P2 security**: `GET v1/experience/builder/pages/:key?draft=true` (builder.controller.ts:22-24) is intentionally unguarded and returns **unpublished drafts** to anyone who knows the page key.

## Findings

### P1 — High severity

#### F1. Missing `form-renderer.tsx` breaks the whole components package build
- **File**: `packages/components/registry.ts:28`, `packages/components/registry.ts:63`, `packages/components/form-renderer.spec.tsx:3`
- **Evidence**: `registry.ts:28` `import { FormRenderer } from "./form-renderer"`; `registry.ts:63` registers `"form-renderer.v1": { component: FormRenderer, minPlan: "pro" }`; `form-renderer.spec.tsx:3` also imports `./form-renderer`. Only `form-renderer.spec.tsx` exists — there is no `form-renderer.tsx`/`.ts`. `packages/components/index.ts` (full read) re-exports `./registry`, `./utils`, every UI primitive, `./data-table`, `./form`, `./section-schema` — but **not** `./form-renderer`.
- **Impact**: `tsc`/`next build`/vite fail on `@commerceos/components`; `registry.ts` cannot load, so every consumer (admin, storefront) fails to build. Form rendering is entirely unavailable.
- **Recommendation**: Create `packages/components/form-renderer.tsx` exporting `FormRenderer` (implementing the interface the spec tests, driven by `section-schema` `"form"` prop shape) and add `export * from "./form-renderer"` to `index.ts`. Alternatively, if the feature is intentionally shelved, remove the import from `registry.ts` and the spec.

#### F2. Stored XSS via rich-text sections (no sanitization anywhere)
- **File**: `packages/components/rich-text.tsx:12`; `apps/admin/src/components/RichTextEditor.tsx`; `apps/storefront/src/components/section-renderer.tsx`
- **Evidence**: `rich-text.tsx` renders `dangerouslySetInnerHTML={{ __html: content }}`. `RichTextEditor.tsx` (full read, 47 lines) outputs `editor.getHTML()` with no sanitization. A repo-wide grep for `sanitize|DOMPurify|sanitizeHtml` found **zero** HTML sanitizers. `section-renderer.tsx` passes section `props` straight into the registered component. Because `PropEditor` falls back to a plain `Input` for the `"html"` prop type, raw HTML (including `<script>`) typed or pasted into the builder is stored verbatim and later executed on the storefront.
- **Impact**: Any authenticated admin (or any XSS-defeating stored payload) can run arbitrary script on every visitor's storefront page — full account/data compromise, defacement.
- **Recommendation**: Sanitize at the boundary with `DOMPurify` (server-side before persist is best; at minimum in `rich-text.tsx` before `dangerouslySetInnerHTML`), and treat the `html` prop type as high-trust only for admins with a documented policy.

#### F3. Hardcoded preview secret shipped in the client bundle
- **File**: `apps/admin/src/pages/builder/PageBuilder.tsx:147-149`; `apps/storefront/src/app/api/draft/route.ts:11`
- **Evidence**: `const secret = 'preview-secret';` with the comment "Should match process.env.PREVIEW_SECRET in storefront", then `window.open(.../api/draft?secret=${secret}&slug=${pageKey})`. The route only rejects when `secret !== process.env.PREVIEW_SECRET && NODE_ENV === 'production'`. So in production with `PREVIEW_SECRET` unset, preview always 401s (feature broken); if the operator sets `PREVIEW_SECRET=preview-secret` to make it work, draft mode is publicly guessable.
- **Impact**: Draft-mode preview is either non-functional in prod or enables anyone to enable draft mode (exposing unpublished content) via a known secret that ships in source control.
- **Recommendation**: Serve the preview secret to the admin from a server-side env (e.g., a small admin API endpoint), require `PREVIEW_SECRET` to be set in prod (fail closed), and rotate it. Keep the storefront route fail-closed when the env var is absent.

### P2 — Medium severity

#### F4. Unpublished drafts are readable without authentication
- **File**: `apps/api/src/modules/experience/builder/builder.controller.ts:22-24`
- **Evidence**: `@Get(':key')` has no guard (comment: "No auth guard for storefront reads") and returns the draft when `draft === 'true'` (via `builder.service.ts` draft-key fallback). Storefront legitimately needs the published read, but the same unauthenticated endpoint returns drafts to anyone who knows/guesses a `pageKey` on a tenant domain.
- **Impact**: Unpublished page content disclosure; draft content often contains unreleased pricing/offers.
- **Recommendation**: Require the draft read to be gated (e.g., signed preview token tied to the preview flow, or a separate authenticated admin endpoint). Keep only the published read public.

#### F5. Visual `PageBuilder` is a disconnected mock; duplicate editor architecture
- **File**: `apps/admin/src/pages/builder/PageBuilder.tsx`; `apps/admin/src/App.tsx:76`
- **Evidence**: Route `<Route path="settings/pages/:pageKey/builder" element={<PageBuilder />} />` passes no props; `PageBuilder` has no `useParams`, no data loading, hardcodes a root `flex.v1` node and sample content, and `handlePublish`/`handleSave` are `setTimeout` mocks that persist nothing. The functional editor is `apps/admin/src/pages/settings/PageLayoutEditor.tsx` (real draft/publish/unpublish via `usePages`). Two overlapping "page editor" UIs exist with different UX, state models, and persistence.
- **Impact**: Users routed to "Page Builder" get a non-working canvas; duplicated code drifts (dnd tree vs sortable list); no single editor is the source of truth.
- **Recommendation**: Pick one editor as canonical. Either finish `PageBuilder` (wire `pageKey`, load layout, persist via `pages.ts` API) or remove it and its route, and converge builder components into `page-editor`.

#### F6. Data-binding (`$bind`) feature is inert
- **File**: `apps/admin/src/pages/builder/DataBindingPanel.tsx`; `apps/storefront/src/components/section-renderer.tsx:29-41`
- **Evidence**: The storefront's `resolveBind`/`resolveProps` expect `{ "$bind": "product.title" }` (dot-path) values, but `DataBindingPanel` (full read) never mutates the selected node — the select/inputs write nothing back. `PageLayoutEditor` has no binding UI at all. The advertised dynamic-content binding feature is dead code in the admin.
- **Impact**: Dynamic content cannot be configured; admins who try the builder's binding panel see no effect.
- **Recommendation**: Implement `$bind` writes in `DataBindingPanel` (and/or a binding UI in `PageLayoutEditor`), with the object-shape contract the storefront already consumes, and cover with a unit test on `resolveBind`.

#### F7. Rich-text (`html` prop) is not editable as rich text in the builder
- **File**: `apps/admin/src/components/page-editor/PropEditor.tsx`; `packages/components/section-schema.ts`
- **Evidence**: `section-schema.ts` defines an `"html"` `PropType` (used by `rich-text.v1`), but `PropEditor` (full read) has no `"html"` case — it falls through to the default string `Input`, showing raw HTML. `RichTextEditor.tsx` exists but is not wired to any prop editor.
- **Impact**: Admins cannot edit rich text visually; they must hand-edit HTML (also the input surface for F2).
- **Recommendation**: Map `"html"` props to `RichTextEditor` in `PropEditor`, and (per F2) sanitize output before save.

#### F8. Plan gating is duplicated across two sources of truth
- **File**: `packages/shared-types/index.ts` (`ComponentMetadata` minPlan) vs `packages/components/registry.ts` (per-entry `minPlan`)
- **Evidence**: The API enforces plans via `builder.service.ts:32-60` using `ComponentMetadata[node.component].minPlan` (shared-types), while the registry carries its own `minPlan` used by the admin UI. Both must be kept in sync manually (`gallery.v1`, `sidebar.v1`, `data-table.v1`, `form-renderer.v1` are `pro` in both today).
- **Impact**: Drift risk — a section can be locked in UI but allowed by the API (or vice-versa), producing confusing 403s or plan leaks.
- **Recommendation**: Derive `ComponentMetadata.minPlan` from the registry (single source), or type-check both against one map in CI.

### P3 — Low severity

- **F9. Fragile dirty-state check** — `PageLayoutEditor.tsx` compares `JSON.stringify(sections) !== JSON.stringify(layout.sections_json ?? [])`; key-order/whitespace-sensitive, false "unsaved changes" and missed-change risk. Recommend a structured deep-equal or per-node versioning.
- **F10. Preview lag after publish** — storefront `page.tsx:5` uses `revalidate = 60` and `usePages` `staleTime: 60s` with no optimistic updates; after publish, visitors can see stale content for up to ~60s. Acceptable for static pages but worth a revalidate-on-publish hook or shorter TTL for draft preview.
- **F11. Dual-name fallback hides type drift** — `page.tsx:28` reads `sections || sections_json`; `PageLayout` client type and `builder.service.ts` return snake_case DB columns while the API body uses camelCase (`sectionsJson`, `publish`). The dual-name fallback masks the mismatch; centralize a shared zod schema in `shared-types` (none exists for pages — only `BuilderNode`/`ComponentMetadata`).
- **F12. Minor perf/UX in builder canvas** — `PageBuilder.tsx` recreates `findNode` every render (no memo) and `ResponsiveEditor` buttons are inert (no state change); both are moot until F5 is resolved but should be addressed if the canvas is kept.
- **F13. Other `dangerouslySetInnerHTML`** — `apps/storefront/src/components/json-ld.tsx:5` (JSON-LD, escaped via `JSON.stringify` — low risk) and `chart.tsx:88` (admin + packages) inject SVG. Verify chart payloads are never attacker-controlled.

## Audit Coverage

| File | Verdict |
|---|---|
| `apps/admin/src/pages/builder/PageBuilder.tsx` | **FAIL (P1)** — hardcoded secret (147-149), disconnected mock, ignores route param |
| `apps/admin/src/pages/builder/PropertyPanel.tsx` | OK — generic wrapper; minor rerender only |
| `apps/admin/src/pages/builder/ResponsiveEditor.tsx` | **WARN (P3)** — inert buttons, no state effect |
| `apps/admin/src/pages/builder/DataBindingPanel.tsx` | **FAIL (P2)** — `$bind` writes nothing (F6) |
| `apps/admin/src/pages/builder/components/BuilderNode.tsx` | OK — dnd tree with self-drop guard; heavy-recreate flagged |
| `apps/admin/src/pages/builder/components/DraggableElement.tsx` | OK |
| `apps/admin/src/components/page-editor/AddSectionPanel.tsx` | OK — plan lock badge logic sound |
| `apps/admin/src/components/page-editor/PropEditor.tsx` | **FAIL (P2)** — no `html` case, enables F2/F7 |
| `apps/admin/src/components/page-editor/SectionCard.tsx` | OK |
| `apps/admin/src/components/page-editor/index.ts` | OK |
| `apps/admin/src/pages/settings/PageLayoutEditor.tsx` | **WARN (P3)** — functional editor; JSON dirty-check (F9); duplicate of PageBuilder (F5) |
| `apps/admin/src/pages/settings/PageLayoutList.tsx` | OK (list UI; relies on F11 API types) |
| `apps/admin/src/pages/theme/ThemeEditorPage.tsx` | OK — sound pattern overall; minor (ties to F11) |
| `apps/admin/src/hooks/usePages.ts` | **WARN (P3)** — no optimistic updates / 60s staleness (F10) |
| `apps/admin/src/lib/api/pages.ts` | OK — camelCase body matches controller `@Body('sectionsJson')`/`@Body('publish')`; snake_case response types match service |
| `apps/admin/src/components/RichTextEditor.tsx` | **FAIL (P1)** — no sanitization on Tiptap output (F2) |
| `packages/shared-types/index.ts` | **WARN (P3)** — no Page/PageLayout schema; duplicated minPlan (F8) |
| `packages/components/registry.ts` | **FAIL (P1)** — imports missing `./form-renderer` (F1) |
| `packages/components/index.ts` | **FAIL (P1)** — never re-exports `./form-renderer` (F1) |
| `packages/components/section-schema.ts` | **WARN (P2)** — `html` prop type not honored by PropEditor (F7) |
| `packages/components/rich-text.tsx` | **FAIL (P1)** — `dangerouslySetInnerHTML` with no sanitizer (F2) |
| `apps/storefront/src/app/api/draft/route.ts` | **FAIL (P1)** — production preview requires guessable `PREVIEW_SECRET` (F3) |
| `apps/storefront/src/app/page.tsx` | **WARN (P3)** — `revalidate=60`, dual `sections||sections_json` (F10/F11) |
| `apps/storefront/src/components/section-renderer.tsx` | **WARN (P2)** — renders stored props incl. HTML; no sanitizer (F2) |
| `apps/api/src/modules/experience/builder/builder.controller.ts` | **FAIL (P2)** — unguarded GET returns drafts (F4); PUT/publish/unpublish guards OK |
| `apps/api/src/modules/experience/builder/builder.service.ts` | OK — zod node validation + plan gating solid |
| `apps/api/src/main.ts` | OK — `setGlobalPrefix('api')` matches admin paths |

**Counts:** P1 = 3 (F1, F2, F3) · P2 = 5 (F4–F8) · P3 = 5 (F9–F13)
