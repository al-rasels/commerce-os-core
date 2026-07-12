# Package & Library Catalog

Principle: don't build what a well-maintained library already solves. This list maps every architectural need from the handbook to a specific, current, production-grade package — organized by app/package and by concern. Versions not pinned here (check latest stable at install time); this is a *selection* guide, not a lockfile.

---

## 1. Monorepo & Tooling

| Need | Package | Why |
|---|---|---|
| Monorepo orchestration | `turbo` (Turborepo) | Simple, fast, good caching; Nx is the heavier alternative if you want generators/plugins |
| Package manager | `pnpm` | Fast, disk-efficient, strict dependency resolution (catches phantom deps monorepos are prone to) |
| Linting | `eslint` + `@typescript-eslint` | Standard |
| Formatting | `prettier` | Standard, pair with `eslint-config-prettier` |
| Git hooks | `husky` + `lint-staged` | Block bad commits before CI |
| Commit convention | `commitlint` (conventional commits) | Enables changelog automation later |

## 2. Backend — `apps/api` (NestJS)

| Need | Package | Notes |
|---|---|---|
| Framework | `@nestjs/core`, `@nestjs/common` | Already chosen (system architecture doc) |
| ORM | `prisma` **or** `typeorm` | Prisma: better DX, migrations, type safety. TypeORM: more flexible for complex tenant-scoping base classes. **Recommendation: Prisma** for Phase 1 — its query builder makes the tenant-scoped wrapper pattern straightforward via middleware (`prisma.$use`) |
| DB driver | `pg` | PostgreSQL |
| Migrations | Prisma Migrate (bundled) | |
| Auth | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt` | JWT issuing/verification |
| Password hashing | `argon2` (preferred) or `bcrypt` | Argon2 is the modern recommendation |
| Validation | `class-validator`, `class-transformer` | DTO validation (dev standards doc §4 checklist item) |
| Config | `@nestjs/config` + `zod` (for env schema validation) | Fail fast on bad env config |
| Caching | `ioredis` + `@nestjs/cache-manager` | Tenant-namespaced keys (multi-tenant doc §3) |
| Queue | `bullmq` + `@nestjs/bullmq` | Tenant-scoped background jobs |
| Rate limiting | `@nestjs/throttler` | Per-tenant + per-IP (security doc §5) |
| Security headers | `helmet` | CSP, HSTS etc. |
| CSRF | `csurf` (or double-submit cookie pattern if session-based admin) | |
| API docs | `@nestjs/swagger` | Auto-generate OpenAPI spec (feeds Phase 2 `sdk-client` package) |
| File uploads | `multer` (+ `@nestjs/platform-express` built-in support) | |
| Object storage | `@aws-sdk/client-s3` | Works with AWS S3 or S3-compatible (Cloudflare R2, MinIO for local dev) |
| Email sending | `resend` (or `nodemailer` if self-hosting SMTP) | Pair with `react-email` for templated emails |
| Payments | `stripe` (official SDK) | Phase 1's one payment provider |
| Encryption (field-level) | `@aws-sdk/client-kms` or `node:crypto` with a KMS-backed key | PII/secret encryption (security doc §5) |
| Logging | `pino` + `nestjs-pino` | Structured logs, fast |
| Error monitoring | `@sentry/node` | |
| Testing | `jest`, `@nestjs/testing`, `supertest` | Unit + integration |
| Feature flags (internal) | Hand-rolled table + resolver (per business model doc §2) — no external flag SaaS needed at Phase 1 scale | |

## 3. Storefront — `apps/storefront` (Next.js)

| Need | Package | Notes |
|---|---|---|
| Framework | `next` (App Router) | SSR/ISR for SEO (system architecture doc) |
| Styling | `tailwindcss` | Utility-first, pairs cleanly with the token system |
| Component primitives | `@radix-ui/*` (via `shadcn/ui` CLI) | Unstyled, accessible primitives — you style with tokens, get a11y for free (component library doc §3 requirement) |
| Variant management | `class-variance-authority` (cva) | Clean way to implement component variants (component library doc §1) without prop-explosion |
| Icons | `lucide-react` | Single consistent icon set (design system doc §1) |
| Theme/dark-mode | `next-themes` | Handles `data-theme` attribute, system preference, SSR-safe (folder structure doc §3) |
| Forms | `react-hook-form` + `zod` (`@hookform/resolvers`) | Checkout forms, address forms |
| State (client) | `zustand` | Lightweight — cart state, UI state. Avoid Redux unless complexity demands it |
| Data fetching | Next.js built-in fetch + `@tanstack/react-query` (for client-side interactive bits, e.g. cart) | |
| Animation | `framer-motion` | Motion tokens (design system doc §1) — fade/stagger/hover per the motion system spec |
| SEO | `next-seo` (or Next's built-in Metadata API — prefer built-in in modern Next) | |
| Image optimization | `next/image` + `sharp` (server-side) | |
| i18n (Phase 2) | `next-intl` | |
| Analytics (optional) | `@vercel/analytics` or self-hosted (Plausible/PostHog) | Avoid Google Analytics by default for privacy-conscious merchants — offer as a config option instead |

## 4. Admin — `apps/admin` (React + Vite)

| Need | Package | Notes |
|---|---|---|
| Build tool | `vite` | Fast dev server |
| Routing | `react-router` (v6+) | |
| Data fetching/cache | `@tanstack/react-query` | Central for admin — list views, mutations, optimistic updates |
| Forms | `react-hook-form` + `zod` | Same as storefront — shared validation schemas via `packages/shared-types` |
| Tables | `@tanstack/react-table` | Product/order list views — sorting, filtering, pagination without reinventing |
| Charts (reporting) | `recharts` | Dashboard/analytics views |
| Drag-and-drop (Page Builder, Phase 2) | `@dnd-kit/core` | Modern, accessible, actively maintained — better than `react-beautiful-dnd` (unmaintained) |
| Rich text editing (CMS/product descriptions) | `tiptap` | Extensible, headless rich-text editor |
| Component primitives | Same `@radix-ui` + `shadcn/ui` as storefront (shared via `packages/components`) | One design language across both apps |
| Theme/dark-mode | `next-themes`-equivalent pattern manually, or `mode-watcher` for Vite apps | |
| Notifications/toasts | `sonner` | Clean, minimal toast library |
| Command palette (nice-to-have) | `cmdk` | Merchant power-user navigation |

## 5. Shared Packages

| Package | Purpose | Key libs |
|---|---|---|
| `packages/design-tokens` | Token source of truth | `style-dictionary` (compiles JSON tokens → CSS vars, Tailwind config, TS types — single source, multiple outputs) |
| `packages/components` | Shared component registry | `@radix-ui/*`, `cva`, `tailwindcss`, `lucide-react` (re-exported) |
| `packages/theme-engine` | Merge logic | Plain TS, `deepmerge` (small, well-tested deep-merge utility — don't hand-roll this) |
| `packages/shared-types` | Cross-app types/DTOs | `zod` schemas as the source of truth (infer TS types from Zod, validate at runtime and compile-time from one definition) |
| `packages/ui-config` | Shared configs | Base `tsconfig.json`, `tailwind.config` preset, `eslint` config |
| `packages/sdk-client` (Phase 2) | Typed API client | `openapi-typescript` + `openapi-fetch`, generated from the NestJS Swagger spec — never hand-write API client types |

## 6. Testing (all apps)

| Layer | Package |
|---|---|
| Unit | `jest` (or `vitest` for Vite/Next apps — faster, ESM-native; consider standardizing on `vitest` across the whole monorepo instead of splitting) |
| Component testing | `@testing-library/react` |
| a11y testing | `axe-core` + `jest-axe` (or `@axe-core/playwright` for E2E) |
| Visual regression | `chromatic` (if using Storybook) or `playwright` screenshot testing |
| E2E | `playwright` (preferred over Cypress for multi-tab/multi-domain tenant testing scenarios) |
| Load testing | `k6` | Checkout path P95 target (vision doc §5) |
| Component docs/dev | `storybook` | Visual catalog of `packages/components`, doubles as the component library doc §6 testing surface |

## 7. Infra & DevOps (Phase 1–2)

| Need | Choice |
|---|---|
| Containerization | `docker` + `docker-compose` (local dev: Postgres, Redis, MinIO for S3-compatible local storage) |
| CI | GitHub Actions |
| Hosting (Phase 1 pragmatic choice) | Vercel (storefront + admin) + Railway/Render/Fly.io (API + Postgres + Redis) — defer Kubernetes to Phase 4 per roadmap, don't over-engineer infra before Phase 1 ships |
| Secrets management | Platform's built-in env secrets (Vercel/Railway) at Phase 1; move to a dedicated secrets manager (AWS Secrets Manager/Doppler) at Phase 2+ |
| Error monitoring (frontend) | `@sentry/nextjs`, `@sentry/react` |
| Uptime/status | Better Uptime or equivalent (Phase 2) |

## 8. Explicitly Do NOT Build From Scratch

- Password hashing → `argon2`, never hand-rolled
- Deep object merging (theme/template overrides) → `deepmerge`, never hand-rolled recursive merge
- Form validation → `zod` + `react-hook-form`, never manual validation logic
- Drag-and-drop → `@dnd-kit`, never manual mouse-event tracking
- Rich text editing → `tiptap`, never a custom `contenteditable` implementation
- Date/time handling → `date-fns` (lightweight, tree-shakeable) — never manual date math, never `moment` (legacy/unmaintained)
- Currency/number formatting → `Intl.NumberFormat` (native) — no library needed
- Accessible UI primitives (dropdowns, dialogs, popovers) → `@radix-ui/*`, never custom focus-trap/keyboard-nav code

## 9. Version Policy

Pin exact versions in Phase 1 (no `^` ranges) for anything touching auth/security/payments (`jsonwebtoken`, `argon2`, `stripe`) to avoid silent breaking changes. Looser ranges acceptable for UI-only packages. Renovate/Dependabot for automated update PRs, reviewed not auto-merged for the security-sensitive set.
