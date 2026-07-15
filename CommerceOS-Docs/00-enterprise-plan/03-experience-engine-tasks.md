# Module 3 — Experience Engine (Design Tokens, Components, Theme Engine, Page Layout, Storefront)

Covers Phase 1 Milestones M5, M6, M7, M8.
Requirement IDs: `REQ-EXP-001..041`.

Reference docs: `05-experience-engine/01-design-system.md`, `05-experience-engine/02-component-library.md`, `05-experience-engine/03-theme-engine.md`, `05-experience-engine/04-page-builder.md` (JSON-layout subset only for Phase 1), `12-tech-stack-and-packages/02-package-catalog.md` §3–5.

---

## Milestone M5 — Design Tokens + Component Library (~20 components)

**Depends on:** none (parallel track to M1–M4)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-EXP-M5-001 | Scaffold `packages/design-tokens` with JSON token source files (color, spacing, typography, radius, shadow, motion) | — | 30m | S | `style-dictionary` | UI/UX |
| T-EXP-M5-002 | Configure `style-dictionary` build: JSON → CSS custom properties | 001 | 45m | S | `style-dictionary` | FE |
| T-EXP-M5-003 | Configure `style-dictionary` build: JSON → Tailwind config extension | 001 | 30m | S | `style-dictionary` | FE |
| T-EXP-M5-004 | Configure `style-dictionary` build: JSON → TS types (for `packages/shared-types`) | 001 | 30m | S | `style-dictionary` | FE |
| T-EXP-M5-005 | Define color scale tokens (primitive + semantic layers per design system doc §1) | 001 | 45m | S | JSON | UI/UX |
| T-EXP-M5-006 | Define typography tokens (font family/scale/weight/line-height) | 001 | 30m | S | JSON | UI/UX |
| T-EXP-M5-007 | Define spacing/radius/shadow/motion tokens | 001 | 30m | S | JSON | UI/UX |
| T-EXP-M5-008 | Scaffold `packages/components` package + shadcn/ui CLI init | 002 | 30m | XS | `shadcn/ui` CLI, `@radix-ui/*` | FE |
| T-EXP-M5-009 | Configure `class-variance-authority` variant pattern conventions for the package | 008 | 30m | XS | `cva` | FE |
| T-EXP-M5-010 | Build Button component (variants: primary/secondary/ghost/destructive) | 008, 009 | 30m | XS | `@radix-ui/*`, `cva` | FE |
| T-EXP-M5-011 | Build Input, Textarea, Select components | 008, 009 | 45m | S | `@radix-ui/*` | FE |
| T-EXP-M5-012 | Build Checkbox, Radio, Switch components | 008, 009 | 30m | XS | `@radix-ui/react-*` | FE |
| T-EXP-M5-013 | Build Dialog/Modal, Drawer components | 008 | 45m | S | `@radix-ui/react-dialog` | FE |
| T-EXP-M5-014 | Build Dropdown Menu, Popover, Tooltip components | 008 | 45m | S | `@radix-ui/*` | FE |
| T-EXP-M5-015 | Build Card, Badge, Avatar components | 008, 009 | 30m | XS | `@radix-ui/*`, `cva` | FE |
| T-EXP-M5-016 | Build Table (presentational) + Tabs components | 008 | 45m | S | `@radix-ui/react-tabs` | FE |
| T-EXP-M5-017 | Build Toast component wiring (`sonner` wrapper) | 008 | 20m | XS | `sonner` | FE |
| T-EXP-M5-018 | Build Skeleton, Spinner, Empty-state, Error-state components | 008 | 45m | S | Tailwind | FE |
| T-EXP-M5-019 | Build Navigation/Breadcrumb, Pagination components | 008 | 30m | XS | `@radix-ui/*` | FE |
| T-EXP-M5-020 | Icon set integration (single consistent set) | 008 | 15m | XS | `lucide-react` | FE |
| T-EXP-M5-021 | Storybook setup for `packages/components` (visual catalog + dev surface) | 010-020 | 60m | M | `storybook` | FE |
| T-EXP-M5-022 | a11y audit pass across all ~20 components (keyboard nav, focus states, ARIA) | 021 | 60m | M | `jest-axe`, `axe-core` | Accessibility |
| T-EXP-M5-023 | Component unit/render tests for all ~20 components | 010-020 | 90m | L | `@testing-library/react`, `vitest` | QA |
| T-EXP-M5-024 | Responsive variant pass (mobile/tablet/desktop) on all components | 021 | 60m | M | Tailwind responsive utilities | FE |
| T-EXP-M5-025 | Publish component usage docs (props, variants, examples) | 021 | 45m | S | `storybook` docs addon | Tech Writer |

**Milestone AC:** ~20 production components exist in `packages/components`, token-driven (no hardcoded hex/px values), documented in Storybook, a11y-audited, consumed identically by both `apps/storefront` and `apps/admin`.

---

## Milestone M6 — Theme Engine (Base + Tenant Override Merge)

**Depends on:** M5

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-EXP-M6-001 | Scaffold `packages/theme-engine` | M5-004 | 15m | XS | TypeScript | FE |
| T-EXP-M6-002 | Define `theme_base` structure (1 default theme, per entity contract) as base token set | M5-001 | 30m | S | JSON | UI/UX |
| T-EXP-M6-003 | Define tenant override schema (color/typography overrides only, Phase 1 scope) | 002 | 30m | S | `zod` | ARCH |
| T-EXP-M6-004 | Implement deep-merge logic: base theme + tenant override → resolved theme object | 002, 003 | 45m | S | `deepmerge` (never hand-rolled) | BE |
| T-EXP-M6-005 | Backend: `theme.service.ts` — fetch base + tenant override rows, merge, cache result | 004, T-PLAT-M1-009 (Redis) | 60m | M | `prisma`, `ioredis` | BE |
| T-EXP-M6-006 | Backend: `GET/PATCH /admin/theme` endpoints (tenant-scoped override CRUD) | 005 | 45m | S | `@nestjs/common` | BE |
| T-EXP-M6-007 | Resolved theme → CSS custom properties injection at storefront render time | 004 | 45m | S | Next.js SSR | FE |
| T-EXP-M6-008 | Dark-mode/theme-attribute handling (`data-theme`, SSR-safe) | 007 | 30m | S | `next-themes` | FE |
| T-EXP-M6-009 | Admin UI: Theme editor (color pickers, font selectors) bound to override schema | 003, 006 | 60m | M | `react-hook-form` + `zod` | FE |
| T-EXP-M6-010 | Live preview of theme changes in admin (unsaved override applied client-side) | 009 | 45m | S | React state | FE |
| T-EXP-M6-011 | Publish/save flow: override persisted, storefront reflects change with zero deploy | 006, 007 | 45m | S | `@tanstack/react-query` invalidation | BE |
| T-EXP-M6-012 | Unit test: merge logic — override wins per-key, base fills gaps, no full base replacement | 004 | 30m | S | `vitest` | QA |
| T-EXP-M6-013 | Isolation test: tenant A's theme override never leaks into tenant B's resolved theme | 005 | 30m | S | `jest`, `supertest` | QA |
| T-EXP-M6-014 | E2E test: merchant changes brand color in admin → published storefront reflects it, no redeploy | 010, 011 | 45m | M | `playwright` | QA |

**Milestone AC:** a merchant can change theme color/font and publish with zero code/deploy involvement (phase1-mvp-spec §4).

---

## Milestone M7 — Page Layout JSON + Settings-Panel Editor + Renderer

**Depends on:** M5, M6 · No drag-drop UI in Phase 1 (explicitly out of scope)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-EXP-M7-001 | Define page-layout JSON schema (sections, component refs, settings) for homepage/category/product/checkout | M5-025 | 60m | M | `zod` | ARCH |
| T-EXP-M7-002 | Backend: `page_layouts` table + Prisma schema (tenant_id, page_type, layout_json, status draft/published) | T-PLAT-M3-008 | 30m | S | `prisma` | DBA |
| T-EXP-M7-003 | Backend: `page-layout.service.ts` CRUD (draft save, publish, fetch by page_type) | 002 | 60m | M | `prisma` | BE |
| T-EXP-M7-004 | Backend: `GET/PATCH /admin/pages/:type` + `POST /admin/pages/:type/publish` endpoints | 003 | 45m | S | `@nestjs/common` | BE |
| T-EXP-M7-005 | Renderer: map layout JSON section → component from `packages/components` registry | 001, T-EXP-M5-021 | 90m | L | React, `packages/components` | FE |
| T-EXP-M7-006 | Renderer: settings-panel binding (component props sourced from layout JSON `settings`) | 005 | 60m | M | React | FE |
| T-EXP-M7-007 | Admin UI: Settings-panel editor (form per section, no drag-drop) for homepage | 001, 006 | 60m | M | `react-hook-form` + `zod` | FE |
| T-EXP-M7-008 | Admin UI: Settings-panel editor for category/product/checkout page types | 007 | 60m | M | `react-hook-form` | FE |
| T-EXP-M7-009 | Admin UI: draft vs published state indicator + publish action | 004, 007 | 30m | S | `@tanstack/react-query` | FE |
| T-EXP-M7-010 | Validation: layout JSON validated against schema before save (reject malformed section refs) | 001, 003 | 30m | S | `zod` | BE |
| T-EXP-M7-011 | Seed default layout JSON for all 4 Phase-1 page types | 002 | 30m | XS | Prisma seed | BE |
| T-EXP-M7-012 | Unit test: layout schema validation (valid/invalid section configs) | 010 | 30m | S | `vitest` | QA |
| T-EXP-M7-013 | Isolation test: tenant A's page layout never resolvable under tenant B's context | 003 | 30m | S | `jest`, `supertest` | QA |
| T-EXP-M7-014 | E2E: edit homepage settings in admin → publish → storefront reflects change | 007, 009 | 45m | M | `playwright` | QA |

**Milestone AC:** merchant can edit and publish a JSON-based page layout via settings panels (no code/deploy), for all 4 Phase-1 page types.

---

## Milestone M8 — Storefront (Next.js) Rendering Published Pages

**Depends on:** M6, M7

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-EXP-M8-001 | Scaffold `apps/storefront` Next.js App Router project | — | 20m | XS | `next` | FE |
| T-EXP-M8-002 | Multi-tenant routing: resolve tenant from request hostname at edge/middleware | T-PLAT-M1-010 | 60m | M | `next` middleware | BE |
| T-EXP-M8-003 | Fetch resolved theme (M6) and inject CSS vars at SSR layout level | T-EXP-M6-007 | 45m | S | Next.js SSR | FE |
| T-EXP-M8-004 | Fetch published page layout (M7) and render via component registry | T-EXP-M7-005 | 60m | M | Next.js (Server Components) | FE |
| T-EXP-M8-005 | Homepage route implementation | 004 | 45m | S | Next.js | FE |
| T-EXP-M8-006 | Category listing page route (product grid, pagination) | 004 | 60m | M | Next.js, `@tanstack/react-query` | FE |
| T-EXP-M8-007 | Product detail page route (variant selection, add-to-cart) | 004, T-COMM-M9-020 | 60m | M | Next.js | FE |
| T-EXP-M8-008 | Checkout page route (wired to Commerce Engine checkout flow) | T-COMM-M9-021 | 45m | S | Next.js | FE |
| T-EXP-M8-009 | SEO: Metadata API per page type (title/description/OG tags) | 005-008 | 45m | S | Next.js Metadata API | FE |
| T-EXP-M8-010 | Image optimization pipeline for storefront product images | T-COMM-M4-013 | 30m | S | `next/image`, `sharp` | FE |
| T-EXP-M8-011 | Responsive layout pass across all storefront pages | 005-008 | 60m | M | Tailwind responsive | FE |
| T-EXP-M8-012 | Loading/skeleton/empty/error states for all storefront pages | T-EXP-M5-018 | 45m | S | `packages/components` | FE |
| T-EXP-M8-012a| React Error Boundaries: implement fallback UI for component crashes (storefront + admin) | 012 | 30m | S | `react-error-boundary` | FE |
| T-EXP-M8-013 | Client-side cart state integration | T-COMM-M9-020 | 30m | S | `zustand` | FE |
| T-EXP-M8-014 | Motion/animation pass (page transitions, hover states) per motion tokens | T-EXP-M5-007 | 45m | S | `framer-motion` | FE |
| T-EXP-M8-015 | Frontend error monitoring wired in | — | 20m | XS | `@sentry/nextjs` | BE |
| T-EXP-M8-016 | Analytics integration (privacy-conscious default, config-gated) | T-PLAT-M10-013 (feature flags) | 30m | S | `@vercel/analytics` or self-hosted opt-in | BE |
| T-EXP-M8-017 | Cross-browser test pass (Chrome/Firefox/Safari) | 005-008 | 45m | S | `playwright` | QA |
| T-EXP-M8-018 | Cross-device/responsive test pass | 011 | 45m | S | `playwright` | QA |
| T-EXP-M8-019 | a11y test pass on storefront pages | 012 | 45m | S | `@axe-core/playwright` | Accessibility |
| T-EXP-M8-020 | Isolation test: tenant A's storefront never renders tenant B's products/theme/layout | 002-004 | 45m | M | `playwright` (multi-domain scenario) | QA |
| T-EXP-M8-021 | SEO validation pass (metadata present, valid OG tags, sitemap) | 009 | 30m | S | `next-seo`/Metadata API checks | QA |
| T-EXP-M8-022 | Lighthouse/perf pass on storefront core pages | 010, 011 | 30m | S | Lighthouse CI | Perf Engineer |

**Milestone AC:** a real customer can browse, add to cart, and complete checkout on the live storefront, correctly tenant-isolated by domain, meeting the roadmap's E2E exit criteria feeding directly into M12.
