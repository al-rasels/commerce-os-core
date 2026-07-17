# CommerceOS — Master Tasklist

> **Project Completion (Phase 1): ~55%** | **36 of 36 API endpoints live**
> Generated: 2026-07-17 | Pipeline: `.tasks/backlog/` → `next/` → (build) → `completed/`

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

## 3. Commerce Engine (~95% Backend, ~20% Frontend)

### Catalog (100% Complete)

| # | Session | Status | Deps |
|---|---|---|---|
| 05 | Catalog CRUD Backend (products, categories, brands, collections) | ✅ Done | 04 |
| 05a | Admin Catalog UI (product list, create/edit, category tree) | ✅ Done | 05 |

### Customer Management

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| — | Customer CRUD Backend | ✅ Done (part of commerce module) | 04 | — |
| 05b | **Admin Customer Management** (list, detail, order history) | 📋 Backlog | 05 | 1 day |

### Cart, Checkout, Orders, Payments

| # | Session | Status | Deps |
|---|---|---|---|
| 09 | Cart/Checkout/Orders/Payments Backend | ✅ Done | 04, 05 |
| 09a | **Admin Order Management** (list, detail, fulfill, cancel, refund) | 🔜 **Next** | 09 |
| 09b | **Storefront Cart + Checkout UI** (drawer, checkout flow, Stripe) | 📋 Backlog | 09, 06a |

### Shipping, Tax, Promotions

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 13 | **Shipping Module** (flat-rate rules, admin config, checkout integration) | 📋 Backlog | 09 | 1-2 days |
| 14 | **Tax Module** (flat % rules, admin config, checkout integration) | 📋 Backlog | 09 | 1 day |
| 15 | **Discounts & Promotions** (coupon codes, admin management) | 📋 Backlog | 09 | 1-2 days |

### Admin Dashboard

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 16 | **Admin Dashboard** (revenue, orders, charts, recent activity) | 📋 Backlog | 09, 05, 05a | 1-2 days |

---

## 4. Experience Engine (~70% Complete)

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
| 08a | **Admin Page Layout Editor** (add/reorder sections, prop editor) | 🔜 **Next** | 08, 06a | 2-3 days |
| 11 | **Storefront Core Pages** (homepage, product listing, detail, search, account) | 📋 Backlog | 08a, 06a | 3-4 days |

**Storefront Core Pages Detail:**
- [ ] Multi-tenant routing (hostname resolution at edge)
- [ ] Homepage rendering from published page layouts
- [ ] Product listing (grid, filters, sort, pagination)
- [ ] Product detail (variant selector, add-to-cart, gallery)
- [ ] Category navigation
- [ ] Search (basic keyword)
- [ ] User account (login, register, order history, profile)
- [ ] SEO metadata (titles, OG tags, JSON-LD)

---

## 5. Quality & Infrastructure (~10% Complete)

| # | Session | Status | Deps | Est. Effort |
|---|---|---|---|---|
| 17 | **Regression + E2E Testing** (isolation tests, cross-tenant auth, E2E flow) | ❌ **Missing — Needs Creation** | All above | 2-3 days |
| 12 | **Infrastructure & DevOps** (CI/CD, Dockerfiles, monitoring, logging) | 📋 Backlog | All above | 2-3 days |

**Regression + E2E Detail (from build guide Sessions 11-12):**
- [ ] Isolation test for every table (parameterized, automated)
- [ ] Cross-tenant token test for every authenticated endpoint
- [ ] Full E2E flow: signup → provision → configure → order → verify
- [ ] Load-test checkout (target P95 < 300ms)
- [ ] All tests green in CI

**Infrastructure & DevOps Detail:**
- [ ] GitHub Actions CI (lint, typecheck, test, build)
- [ ] Dockerfiles (api — multi-stage, non-root)
- [ ] Integration test suite (API + test containers)
- [ ] E2E tests (Playwright)
- [ ] Pre-commit hooks (husky + lint-staged)
- [ ] Sentry error monitoring (all 3 apps)
- [ ] Health check endpoint
- [ ] Structured logging
- [ ] .env.example for all apps

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
Current:  Next/ (2 tasks) → Build → Backlog
         ┌─────────────────────────────────┐
         │  08a  Admin Page Layout Editor   │ ← Build this first
         │  09a  Admin Order Management     │ ← Then this
         └─────────────────────────────────┘
               ↓
         ┌─────────────────────────────────┐
         │  05b  Admin Customer Management  │ ← Short win
         │  09b  Storefront Cart + Checkout │ ← Revenue-critical
         │  11   Storefront Core Pages      │ ← Customer-facing
         └─────────────────────────────────┘
               ↓
         ┌─────────────────────────────────┐
         │  09c  Auth Gaps (Security)       │ ← Security-critical
         │  10   Super Admin Console        │ ← Platform ops
         │  13   Shipping Module            │ ← Commerce depth
         │  14   Tax Module                 │ ← Compliance
         │  15   Discounts & Promotions     │ ← Marketing
         │  16   Admin Dashboard            │ ← Visibility
         └─────────────────────────────────┘
               ↓
         ┌─────────────────────────────────┐
         │  17   Regression + E2E Testing   │ ← Quality gate
         │  12   Infrastructure & DevOps    │ ← Production readiness
         └─────────────────────────────────┘
```

---

## 8. Task File Inventory

### `.tasks/completed/` (14 files)
session-00, session-01, session-01b, session-02, session-03, session-04, session-05, session-05a, session-06, session-06a, session-07, session-07a, session-08, session-09-backend, ui-component-creation

### `.tasks/next/` (2 files — ready to build)
session-08a (Admin Page Layout Editor), session-09a (Admin Order Management)

### `.tasks/backlog/` (10 files — prioritized)
session-05b, session-09b, session-09c, session-10, session-11, session-12, session-13, session-14, session-15, session-16

### ❌ Missing (1 file — needs creation)
session-17 (Regression + E2E Testing)

---

## 9. Key Metrics

| Metric | Value |
|---|---|
| Phase 1 Completion | **~55%** |
| API Endpoints Live | **36 / 36** (100%) |
| Completed Sessions | **14 / 27** (52%) |
| Next (Ready) Sessions | **2** |
| Backlog Sessions | **10** |
| Missing Sessions | **1** |
| Shared Components Built | **30** (exceeds 20 planned) |
| Admin Dashboard Coverage | **~20%** (auth, tenants scaffolded) |
| Storefront Coverage | **~5%** (boilerplate only) |
| Testing Coverage | **~10%** (API only, no admin/storefront) |
| CI/CD | **0%** |
