# CommerceOS — Master Tasklist

> **Project Completion (Phase 1): ~55-60%** | **36+ of 36 API endpoints live**
> Generated: 2026-07-20 | Pipeline: `.tasks/backlog/` → `next/` → (build) → `completed/`

---

## Legend

| Icon | Meaning |
|---|---|
| ✅ **Completed** | Task file exists in `.tasks/completed/` |
| 🔜 **Next** | Task file exists in `.tasks/next/` — ready to build |
| 📋 **Backlog** | Task file exists in `.tasks/backlog/` — prioritized |
| ❌ **Missing** | Identified gap — task file needs creation |
| 🟡 **Partial** | Work started but not complete |

---

## 1. Foundation Layer (100% Complete)

These sessions provide the scaffolding everything else runs on.

| # | Session | Status | File |
|---|---|---|---|
| 00 | Prerequisites (Node, Docker, Git) | ✅ Done | `completed/session-00-prerequisites.md` |
| 01 | Repo Scaffold (Turborepo, 3 apps, packages) | ✅ Done | `completed/session-01-repo-scaffold.md` |
| 01b | Environment Setup (Docker Compose, env, scripts) | ✅ Done | `completed/session-01-environment-setup.md` |

---

## 2. Platform Engine (~60% Complete)

### Multi-Tenant & Auth

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 02 | Tenant Resolution (middleware, context, hostnames) | ✅ Done | 01 | — |
| 03 | Auth & RBAC (JWT, guards, permissions) | ✅ Done | 02 | — |
| 09c | **Auth Gaps** (password reset, MFA, change pw, staff invitations) | 📋 Backlog | 03 | 1-2 days |

**Auth Gaps Detail:**
- [ ] Forgot password (email with reset token)
- [ ] Reset password (validate token, set new pw)
- [ ] Change password (verify current pw)
- [ ] MFA/OTP setup + verification (TOTP)
- [ ] Staff invitation (create user, temp password, invite email)
- [ ] Admin UI for user management (list, create, assign roles)

### Super Admin Console

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 04 | Core Schema + Isolation (all tables, isolation tests) | ✅ Done | 03 | — |
| 10 | **Super Admin Console** (tenant provisioning, billing, feature flags) | 📋 Backlog | 03, 02 | 2-3 days |

**Super Admin Detail:**
- [ ] Tenant list page (plan, status, created date)
- [ ] Tenant provisioning flow (tenant + domain + seed defaults)
- [ ] Tenant detail with plan, status, domains, feature flags
- [ ] Feature flag toggles per tenant
- [ ] Billing status display (Stripe Billing)
- [ ] Plan change flow (trial → starter → growth → enterprise)
- [ ] Only super_admin role access

---

## 3. Commerce Engine (~100% Backend, ~85% Frontend)

### Catalog (100% Complete)

| # | Session | Status | Deps |
|---|---|---|---|
| 05 | Catalog CRUD Backend (products, categories, brands, collections) | ✅ Done | 04 |
| 05a | Admin Catalog UI (product list, create/edit, category tree) | ✅ Done | 05 |

### Customer & User Management

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| — | Customer CRUD Backend | ✅ Done (part of commerce module) | 04 | — |
| 05b | **Admin Customer Management** (list, detail, create/edit) | ✅ Done | 05 | — |
| — | **Admin User Management** (list, detail, invite UI) | ✅ Done | 03 | — |

### Cart, Checkout, Orders, Payments

| # | Session | Status | Deps |
|---|---|---|---|
| 09 | Cart/Checkout/Orders/Payments Backend | ✅ Done | 04, 05 |
| 09a | **Admin Order Management** (list, detail, fulfill, cancel, refund) | ✅ Done | 09 |
| 09b | **Storefront Cart + Checkout UI** (drawer, checkout flow, Stripe) | ✅ Done | 09, 06a |

### Shipping, Tax, Promotions

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 13 | **Shipping Module** (flat-rate rules, admin config) | ✅ Done | 09 | — |
| 14 | **Tax Module** (flat % rules, admin config) | ✅ Done | 09 | — |
| 15 | **Discounts & Promotions** (coupon codes, admin management) | ✅ Done | 09 | — |

> Note: Backend + Admin UI complete. Checkout shipping/tax/promotion integration is backend-ready but not yet wired into the storefront checkout flow.

### Admin Dashboard

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 16 | **Admin Dashboard** (revenue, orders, charts, recent activity) | ✅ Done | 09, 05, 05a | — |

---

## 4. Experience Engine (~90% Complete)

### Design System & Components

| # | Session | Status | Deps |
|---|---|---|---|
| 06 | Design Tokens + Components (design-tokens package, 30 components) | ✅ Done | 01 |
| 06a | Storefront Components Installation (shadcn/ui, Tailwind setup) | ✅ Done | 06 |

### Theme Engine

| # | Session | Status | Deps |
|---|---|---|---|
| 07 | Theme Engine (merge function, caching, API) | ✅ Done | 06 |
| 07a | Admin Theme Editor (color pickers, typography, live preview) | ✅ Done | 07 |

### Page Builder & Storefront

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 08 | Page Layout Backend (sections_json, publish, API) | ✅ Done | 07 | — |
| 08a | **Admin Page Layout Editor** (add/reorder sections, prop editor) | ✅ Done | 08, 06a | — |
| 11 | **Storefront Core Pages** (homepage, product listing, detail, search, account) | ✅ Done | 08a, 06a | — |

**Storefront Core Pages Detail — 11 of 12 pages live:**
- [x] Root layout (HTML, fonts, theme integration)
- [x] Homepage (SSR with products, categories)
- [x] Product listing (grid, filters, sort)
- [x] Product detail (gallery, variant selector, add-to-cart)
- [ ] Category pages (scaffold only — needs product listing integration)
- [x] Cart page
- [x] Checkout page (multi-step: contact, shipping, payment)
- [x] Order success page
- [x] Search (basic form works, results render from API)
- [x] Auth (Login, Register)
- [x] Customer account dashboard
- [x] Order history

---

## 5. Quality & Infrastructure (~25% Complete)

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 17 | **Regression + E2E Testing** (isolation tests, cross-tenant auth, E2E flow) | ❌ **Missing — Needs Creation** | All above | 2-3 days |
| 12 | **Infrastructure & DevOps** (CI/CD, Dockerfiles, monitoring, logging) | 🟡 **Partial** (CI pipeline + API Dockerfile done) | All above | 1-2 days remaining |

**Regression + E2E Detail (from build guide Sessions 11-12):**
- [ ] Isolation test for every table (parameterized, automated)
- [ ] Cross-tenant token test for every authenticated endpoint
- [ ] Full E2E flow: signup → provision → configure → order → verify
- [ ] Load-test checkout (target P95 < 300ms)
- [ ] All tests green in CI

**Infrastructure & DevOps Detail:**
- [x] GitHub Actions CI (lint, typecheck, test, build)
- [x] Dockerfiles (api — multi-stage, non-root)
- [ ] Dockerfiles for admin + storefront apps
- [ ] Integration test suite (API + test containers)
- [x] E2E tests (Playwright — 1 skeleton spec)
- [ ] Pre-commit hooks (husky + lint-staged)
- [ ] Sentry error monitoring (all 3 apps)
- [x] Health check endpoint
- [x] Structured logging
- [x] .env.example for all apps

---

## 6. Phase 2+ (Not Yet Scoped)

These are defined in the roadmap but not planned for current sprint:

| Area | Description |
|---|---|
| **Business Engine** | ERP, CRM, Multi-Warehouse, Procurement, POS |
| **Intelligence Engine** | AI Copilot, Recommendations, Forecasting, Analytics |
| **Enterprise Features** | White-Label, Marketplace, B2B, Multi-Region |
| **Advanced Commerce** | Subscriptions, Bundles, Gift Cards, Reviews |
| **Notification System** | Email (SendGrid/Mailgun), SMS (Twilio), Push |

---

## 7. Execution Order (Recommended)

```
Current:  Backlog/ (3 tasks) → Build
         ┌──────────────────────────────────────┐
         │  09c  Auth Gaps (Security)            │ ← Security-critical
         │  10   Super Admin Console (backend)   │ ← Platform ops
         │  17   Regression + E2E Testing        │ ← Quality gate
         └──────────────────────────────────────┘
               ↓
         ┌──────────────────────────────────────┐
         │  Storefront cleanup (category page)   │ ← Quick win
         │  Shipping/tax/promo checkout wiring   │ ← Commerce depth
         └──────────────────────────────────────┘
               ↓
         ┌──────────────────────────────────────┐
         │  12   Infrastructure & DevOps (remain)| ← Production readiness
         └──────────────────────────────────────┘
```

### Completed Since July 17
The following sessions advanced from backlog/next to done:
- 🔜→✅ **08a** Admin Page Layout Editor
- 🔜→✅ **09a** Admin Order Management
- 📋→✅ **05b** Admin Customer Management
- 📋→✅ **09b** Storefront Cart + Checkout UI
- 📋→✅ **11** Storefront Core Pages (11 of 12 live)
- 📋→✅ **13** Shipping Module
- 📋→✅ **14** Tax Module
- 📋→✅ **15** Discounts & Promotions
- 📋→✅ **16** Admin Dashboard

---

## 8. Task File Inventory

### `.tasks/completed/` (23 files)
session-00, session-01, session-01b, session-02, session-03, session-04, session-05, session-05a, session-05b, session-06, session-06a, session-07, session-07a, session-08, session-08a, session-09-backend, session-09a, session-09b, session-11, session-13, session-14, session-15, session-16, ui-component-creation

### `.tasks/next/` (0 files — all moved to done or backlog)

### `.tasks/backlog/` (3 files — prioritized)
session-09c (Auth Gaps), session-10 (Super Admin Console), session-12 (Infrastructure & DevOps — partial)

### ❌ Missing (1 file — needs creation)
session-17 (Regression + E2E Testing)

> **Note:** Many backlog sessions were completed in recent commits but their .task files were never moved to `.tasks/completed/`. The counts above reflect actual code state, not file locations.

---

## 9. Key Metrics

| Metric | Value |
|---|---|
| Phase 1 Completion | **~55-60%** |
| API Endpoints Live | **36+ / 36+** (100%) |
| Completed Sessions | **23 / 27** (85%) |
| Next (Ready) Sessions | **0** |
| Backlog Sessions | **3** |
| Missing Sessions | **1** |
| Shared Components Built | **30** (exceeds 20 planned) |
| Admin Dashboard Coverage | **~95%** (18 page files, all CRUD done) |
| Storefront Coverage | **~85%** (11 of 12 pages live) |
| Testing Coverage | **~25%** (API + some components, no admin/storefront) |
| CI/CD | **100%** (GitHub Actions pipeline active) |
