# CommerceOS

**Multi-tenant e-commerce SaaS platform.**

A monorepo containing the API backend, customer-facing storefront, merchant admin dashboard, and shared packages that power a white-label commerce operating system. Built on the five-engine model: Platform, Commerce, Experience, Business, and Intelligence.

---

## Quick Start

```bash
# Prerequisites
# - Node.js 24 LTS
# - PostgreSQL 16 (or Docker)
# - Redis 7 (or Docker)

# Start infrastructure (optional — skip if running locally)
docker run -d --name commerceos-pg -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16
docker run -d --name commerceos-redis -p 6379:6379 redis:7

# Install dependencies
npm install --legacy-peer-deps

# Run all apps concurrently
npm run dev

# Build all apps and packages
npm run build
```

| App | URL | Description |
|---|---|---|
| API | `http://localhost:3000` | NestJS backend (REST API) |
| Storefront | `http://localhost:3001` | Next.js customer storefront (SSR) |
| Admin | `http://localhost:5174` | Vite merchant dashboard (SPA) |

---

## Repository Structure

```
commerce-os-core/
├── apps/                       Application workspaces
│   ├── api/                    NestJS backend service
│   ├── storefront/             Next.js storefront (SSR, tenant-facing)
│   └── admin/                  React + Vite admin dashboard (SPA)
│
├── packages/                   Shared internal packages
│   ├── design-tokens/          Design system token definitions
│   ├── components/             Shared UI component registry
│   ├── theme-engine/           Theme override/merge logic
│   ├── shared-types/           Zod schemas and TypeScript types
│   └── ui-config/              Shared Tailwind preset and configs
│
├── CommerceOS-Docs/            Architecture documentation set
│   ├── .agent/                 Machine-first rules and code templates
│   ├── 01–13 (prose volumes)   Vision, architecture, engine specs
│   ├── 14-data-contracts/      Exact schemas, APIs, component props
│   └── 15-system-and-database-design/
│       ├── 01-system-design-diagrams.md
│       ├── 02-database-entity-relationship.md
│       ├── 03-backend-api-service-design.md
│       └── 04-frontend-routing-design.md
│
├── package.json                Root workspace config
├── turbo.json                  Turborepo pipeline definition
├── tsconfig.json               Root TypeScript path aliases
└── .gitignore
```

---

## Applications

### `apps/api` — Backend Service

**Framework:** NestJS 11 · **Language:** TypeScript · **Database:** PostgreSQL via Prisma ORM

The backend is the central authority for tenant resolution, authentication, authorization, and all business logic. It exposes a REST API consumed by both the storefront and the admin dashboard.

```
apps/api/
├── prisma/
│   └── schema.prisma           Full Phase 1 multi-tenant database schema
├── src/
│   ├── main.ts                 Application bootstrap
│   ├── app.module.ts           Root module
│   ├── app.controller.ts       Health check / root controller
│   └── app.service.ts          Root service
├── test/                       E2E test configuration
└── .env                        Environment variables (DATABASE_URL, JWT_SECRET, REDIS_URL)
```

**Key libraries:**

| Category | Package |
|---|---|
| Auth | `@nestjs/jwt`, `passport-jwt`, `argon2` |
| Validation | `class-validator`, `class-transformer` |
| Database | `@prisma/client`, `prisma` |
| Caching/Queue | `ioredis`, `@nestjs/cache-manager`, `bullmq` |
| Security | `@nestjs/throttler`, `helmet` |
| Payments | `stripe` |
| Email | `resend` |
| Logging | `pino`, `nestjs-pino` |
| Monitoring | `@sentry/node` |
| API Docs | `@nestjs/swagger` |

**Database schema** ([schema.prisma](apps/api/prisma/schema.prisma)) contains 17 models covering all Phase 1 entities: Tenant, TenantDomain, User, Role, FeatureFlag, Product, ProductVariant, Category, Customer, Cart, CartItem, Order, OrderItem, ThemeBase, ThemeTenantOverride, PageLayout, and AuditLog. Every tenant-owned table includes a `tenant_id` foreign key for row-level isolation.

---

### `apps/storefront` — Customer Storefront

**Framework:** Next.js 16 (App Router) · **Rendering:** SSR/ISR · **Styling:** Tailwind CSS

The tenant-facing storefront renders product pages, category listings, cart, and checkout. It fetches data from the API and resolves the active tenant's theme to apply brand-specific styling via CSS custom properties.

```
apps/storefront/
├── src/
│   └── app/
│       ├── layout.tsx          Root layout (ThemeProvider wraps here)
│       ├── page.tsx            Homepage
│       ├── globals.css         Global styles and CSS variable definitions
│       └── favicon.ico
├── public/                     Static assets
└── next.config.ts              Next.js configuration
```

**Key libraries:**

| Category | Package |
|---|---|
| Forms | `react-hook-form`, `@hookform/resolvers`, `zod` |
| State | `zustand` (cart, UI state) |
| Server State | `@tanstack/react-query` |
| Animation | `framer-motion` |
| Theming | `next-themes` |
| Notifications | `sonner` |
| Icons | `lucide-react` |

---

### `apps/admin` — Merchant Dashboard

**Framework:** React 19 + Vite 8 · **Routing:** React Router v6 · **Type:** Single-Page Application

The merchant-facing dashboard for managing products, orders, themes, page layouts, and tenant settings. Communicates with the API using authenticated requests. Designed as a separate SPA so it can be deployed and scaled independently from the storefront.

```
apps/admin/
├── src/
│   ├── main.tsx                Application entry point
│   ├── App.tsx                 Root component
│   ├── App.css                 Application styles
│   ├── index.css               Global styles
│   └── assets/                 Static assets (logos, icons)
├── vite.config.ts              Vite build config (aliases, port 5174)
└── tsconfig.app.json           TypeScript compiler config
```

**Key libraries:**

| Category | Package |
|---|---|
| Routing | `react-router-dom` |
| Data Fetching | `@tanstack/react-query` |
| Tables | `@tanstack/react-table` |
| Forms | `react-hook-form`, `@hookform/resolvers`, `zod` |
| Charts | `recharts` |
| Drag & Drop | `@dnd-kit/core` |
| Rich Text | `@tiptap/react`, `@tiptap/starter-kit` |
| Notifications | `sonner` |
| Icons | `lucide-react` |

---

## Shared Packages

All packages are scoped under `@commerceos/` and linked via npm workspaces. Apps import them as standard dependencies — Turborepo handles build ordering automatically.

### `packages/design-tokens`

Design system token definitions for light and dark modes. Semantic token names (e.g., `surface`, `text`, `primary`) are identical across modes — only values differ. Components consume tokens by name and never branch on mode.

**Planned build step:** Uses `style-dictionary` to compile JSON tokens into CSS custom properties, TypeScript constants, and Tailwind config values.

### `packages/components`

Shared UI component registry consumed by both the storefront and admin dashboard. Contains:

- **`registry.ts`** — Component ID → implementation map used by the page builder/renderer
- **`utils.ts`** — `cn()` utility for merging Tailwind classes (`clsx` + `tailwind-merge`)
- **`index.ts`** — Public API re-exporting registry and utilities

Components are built on `@radix-ui` primitives (via `shadcn/ui`) with variants managed by `class-variance-authority`. Every component consumes design tokens — no hardcoded colors or spacing.

### `packages/theme-engine`

The single implementation of the theme/template override merge algorithm. Exports `resolveOverride<T>()` which:

1. Detects **conflicts** (override references keys the base no longer defines)
2. Deep-merges base + override (arrays replace, never concatenate)
3. Returns `{ resolved, conflicts }` for downstream handling

Used identically for theme resolution, template resolution, and page layout merging. Never duplicated — always imported from this package.

### `packages/shared-types`

Zod schemas that serve as the **single source of truth** for data shapes across frontend and backend:

- `TenantSchema`, `TenantDomainSchema`
- `UserSchema`, `RoleSchema`
- `ProductSchema`, `ProductVariantSchema`
- `CategorySchema`

TypeScript types are inferred directly from Zod schemas (`z.infer<typeof Schema>`) — write once, validate at runtime and compile-time from one definition.

### `packages/ui-config`

Shared Tailwind CSS preset that maps CSS custom properties (set by the theme engine at runtime) to Tailwind utility classes. Consumed by both the storefront and admin Tailwind configs as a preset, ensuring a consistent design language across applications.

---

## Five-Engine Model

Every feature in CommerceOS maps to exactly one engine:

| Engine | Responsibility | Phase |
|---|---|---|
| **Platform** | Tenants, auth, RBAC, billing, subscriptions, feature flags, infra | Phase 1 ✅ |
| **Commerce** | Products, inventory, orders, checkout, payments, shipping, tax | Phase 1 ✅ |
| **Experience** | Design system, components, theme engine, template engine, page builder | Phase 1 ✅ |
| **Business** | ERP, CRM, marketing, analytics, automation | Phase 3 |
| **Intelligence** | AI, search, recommendations, forecasting | Phase 4 |

---

## Non-Negotiable Rules

1. **No tenant data without context** — Every tenant-owned query, cache key, and storage path requires a resolved `TenantContext`
2. **No cross-module access** — Modules communicate through public service interfaces, never direct table/entity imports
3. **No hardcoded billing checks** — Plan/feature checks live exclusively in the Platform module
4. **No hardcoded design tokens** — Components consume CSS variables from the design system, never raw hex values
5. **No invented schemas** — All field names, API routes, and component props must match `CommerceOS-Docs/14-data-contracts/`

See [.agent/AGENTS.md](CommerceOS-Docs/.agent/AGENTS.md) for the full agent guide and [.agent/rules/](CommerceOS-Docs/.agent/rules/) for detailed constraint specifications.

---

## Documentation

The full documentation set lives in [`CommerceOS-Docs/`](CommerceOS-Docs/00-README.md):

| Directory | Contents |
|---|---|
| `01-vision-strategy/` | Product vision, business model |
| `02-architecture/` | System architecture overview |
| `03-multi-tenant/` | Tenant isolation model |
| `04-database-security/` | Database architecture, auth/security specs |
| `05-experience-engine/` | Design system, components, themes, templates, page builder |
| `06-commerce-business-engines/` | Commerce engine, ERP, intelligence specs |
| `07-agent-guide/` | AI coding agent instructions |
| `08-skills/` | Reusable skill catalog |
| `09-dev-standards/` | Development standards and PR checklist |
| `10-roadmap/` | Implementation roadmap, Phase 1 MVP spec |
| `11-build-guide/` | Session-by-session build guide |
| `12-tech-stack-and-packages/` | Folder structure, theming, package catalog |
| `13-resources/` | Reference implementations |
| `14-data-contracts/` | **Source of truth** — exact entity schemas, API contracts, component props, checkout state machine |
| `15-system-and-database-design/` | **Visual architecture** — system flow and entity relationship diagrams |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start all apps concurrently (Turbo) |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Lint all workspaces |
| `npm run test` | Run tests across all workspaces |

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + npm workspaces |
| Backend | NestJS, Prisma, PostgreSQL, Redis |
| Storefront | Next.js (App Router, SSR) |
| Admin | React, Vite |
| Styling | Tailwind CSS, CSS custom properties |
| UI Primitives | Radix UI (shadcn/ui), Lucide React |
| State | Zustand (client), TanStack Query (server) |
| Auth | JWT + Passport + Argon2 |
| Payments | Stripe |
| Testing | Jest / Vitest, Playwright |

---

## License

Private — all rights reserved.
