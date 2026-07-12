# Phase 1 MVP — Technical Spec

## 1. In Scope

```
Platform:    tenant provisioning, JWT auth, RBAC (4 roles), feature flags, basic billing (subscription only, no usage metering)
Commerce:    catalog (products/variants/categories), inventory (single-location stock), cart, checkout,
             1 payment provider integration, basic tax rules, basic shipping rate rules, order lifecycle, invoices
Experience:  design tokens, ~20 components, 1 default theme + tenant color/typography override,
             JSON page layout (homepage, category, product, checkout) with settings-panel editing (no drag-drop)
Business:    none (deferred)
Intelligence: none (deferred, empty module scaffold only)
```

## 2. Out of Scope (explicitly, to prevent scope creep)

Multi-warehouse inventory, POS, drag-drop builder UI, template marketplace, AI features, microservice extraction, multi-region infra, full compliance certification.

## 3. Milestones

| # | Milestone | Depends on |
|---|---|---|
| 1 | Tenant provisioning + resolution + TenantContext middleware | — |
| 2 | Auth/RBAC + JWT tenant-claim enforcement | 1 |
| 3 | Database schema (Phase 1 tables) + TenantScopedRepository | 1 |
| 4 | Catalog CRUD (admin) | 2, 3 |
| 5 | Design tokens + component library (20 components) | — (parallel to 1–4) |
| 6 | Theme engine (base + override merge) | 5 |
| 7 | Page layout JSON + settings-panel editor + renderer | 5, 6 |
| 8 | Storefront (Next.js) rendering published pages | 7 |
| 9 | Cart/checkout/payment provider/order lifecycle | 4 |
| 10 | Super Admin: provisioning UI, billing, feature flags | 2 |
| 11 | Isolation regression test suite across all tenant tables | 3, 9 |
| 12 | E2E: signup → provision → configure → real order | all above |

## 4. Acceptance Criteria (ties to vision doc §5 metrics)

- Tenant provisioning < 60s end to end
- Zero cross-tenant leakage across all isolation regression tests (§11)
- A merchant can change theme color/font and publish a page edit with zero code/deploy involvement
- P95 checkout API latency < 300ms under simulated shared-tenant load

## 5. Team Cut (if parallelizing)

Track A (Platform+Commerce backend) → milestones 1–4, 9–10. Track B (Experience Engine) → milestones 5–8. Converge at 11–12.

## 6. Definition of Done for Phase 1

All milestones complete, acceptance criteria met, `07-agent-guide` non-negotiables verified via automated checks (not just review), documentation in this handbook updated to reflect any deviations made during build (dev standards doc §6).
