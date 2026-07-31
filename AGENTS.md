# CommerceOS — Agent Guide

## Project
Multi-tenant e-commerce SaaS built on 5 engines (Platform, Commerce, Experience, Business, Intelligence). Custom-built (not Vendure/Medusa). ~55-60% complete (Phase 1).

## Architecture
```
apps/
  api/          — NestJS 11 REST API (Prisma + PostgreSQL, Redis)
  storefront/   — Next.js 16.2.10 SSR storefront
  admin/        — React 19.2 + Vite 8 SPA (TanStack Query)
packages/
  components/   — React component library (React Aria, CVA, Tailwind v4)
  design-tokens/— Style Dictionary tokens
  theme-engine/ — Dynamic theme resolution (deepmerge)
  shared-types/ — Zod schemas + TypeScript types
  ui-config/    — UI layout/menu definitions
tests/
  e2e/          — Playwright E2E tests
```

## Start Commands
```bash
npm install --legacy-peer-deps   # install (required! engine conflicts exist)
npm run dev                      # turbo: runs all apps in parallel
npx turbo run lint test build    # CI pipeline (lint→test→build order)
```

## Per-App Commands
| App | Dev | Build | Test | Lint |
|-----|-----|-------|------|------|
| api | `nest start --watch` | `nest build` | `jest` (unit), `npm run test:e2e` | eslint |
| storefront | `next dev` | `next build` | next test | eslint |
| admin | `vite` | `tsc -b && vite build` | — | **`oxlint`** (not eslint!) |
| components | — | `tsc` | `vitest run` | — |

## Critical Quirks
- **Admin linting** uses `oxlint`, NOT eslint. Do not add eslint config there.
- **`npm install` requires `--legacy-peer-deps`** (React 19 + Next 16 peer dep conflicts).
- **API E2E tests** need PostgreSQL + Redis running (docker-compose.yml provides both).
- **API unit tests** also need DATABASE_URL (Prisma instantiation).
- **Framework versions are very new**: Next.js 16, NestJS 11, React 19.2, TypeScript ~6.0, Vite 8. Watch for breaking changes — especially `next/link` changes in Next 16 and TS 6 syntax changes.
- **Ports**: API=:3000, Storefront=:3001, Admin=:5173/5174
- **Commit convention**: conventional commits via commitlint + Husky.

## Key Files to Read First
| File | Purpose |
|------|---------|
| `.ai/SYSTEM.md` | Universal engineering constitution (consistency rules) |
| `.ai/FOLDER_STRUCTURE.md` | Module boundary rules |
| `MASTER_TASKLIST.md` | Project progress, session tracking |
| `.tasks/README.md` | Task pipeline system |
| `CommerceOS-Docs/.agent/AGENTS.md` | **Full architectural guide** (comprehensive) |
| `CommerceOS-Docs/.agent/rules/` | 4 rule files (tenant isolation, modules, naming, testing) |
| `apps/storefront/AGENTS.md` | Storefront-specific notes (Next.js 16 quirks) |

## Testing
- **API (unit)**: Jest, ts-jest, 30s timeout. Prisma needs DB connection.
- **API (E2E)**: Jest with `jest-e2e.json`, regex `.e2e-spec.ts$`.
- **Components**: Vitest + jsdom + @testing-library/react.
- **E2E**: Playwright in `tests/e2e/`.
- **Theme Engine**: Has `index.spec.ts` — run via its own package test script.

## Environment
- `.env.example` → `.env` (copy before first run)
- Docker Compose: PostgreSQL 15 + Redis 7
- Node.js 20+ required
