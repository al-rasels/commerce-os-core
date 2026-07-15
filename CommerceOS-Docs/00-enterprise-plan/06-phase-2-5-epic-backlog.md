# Module 6 — Phase 2–5 Epic Backlog

Per the roadmap's own governing rule (`10-roadmap/01-implementation-roadmap.md`): full atomic WBS decomposition for these phases is deliberately deferred until the corresponding phase begins, informed by actual Phase 1 implementation decisions. Generating exhaustive 15–120-minute tasks for unbuilt phases now would create documentation that drifts from reality before code exists — that's the repo's stated reason, and I'm respecting it rather than padding this plan with speculative detail. Each epic below is scoped enough to size and sequence; say the word and I'll decompose any single epic to full atomic task level once you're ready to build it.

---

## Phase 2 — Storefront Depth

| Epic ID | Epic | Depends On | Reference Library (where catalog already names one) |
|---|---|---|---|
| EPIC-P2-01 | CDN integration for storefront assets | Phase 1 storefront | Provider-native CDN (Vercel Edge Network is default if hosting stays on Vercel) |
| EPIC-P2-02 | Queue worker infrastructure expansion (beyond reservation-expiry job) | T-COMM-M9-005 | `bullmq` (already in catalog for Phase 1 queue) |
| EPIC-P2-03 | Search engine integration (product search/filtering at scale) | Catalog (M4) | Meilisearch or Elasticsearch — roadmap names both, decision deferred to Phase 2 kickoff |
| EPIC-P2-04 | Image optimization pipeline hardening (beyond Phase 1 `sharp` baseline) | T-COMM-M4-013 | `sharp`, CDN-based transforms |
| EPIC-P2-05 | Drag-and-drop Page Builder UI | Phase 1 JSON layout (M7) | `@dnd-kit/core` (catalog §4 — explicitly chosen over unmaintained `react-beautiful-dnd`) |
| EPIC-P2-06 | Visual Data Binding UI (bind layout sections to live data sources) | EPIC-P2-05 | Extends `packages/theme-engine`/layout schema |
| EPIC-P2-07 | Responsive Breakpoint Editor (per-breakpoint layout overrides) | EPIC-P2-05 | Extends layout JSON schema (M7) |
| EPIC-P2-08 | Real-Time Preview Staging environment | EPIC-P2-05 | Isolated staging deploy per draft, likely via preview-branch hosting |
| EPIC-P2-09 | Expand component library from ~20 to 50–80 components | Phase 1 (M5) | Same stack: `@radix-ui/*`, `cva`, `storybook` |
| EPIC-P2-10 | Coupons & promotions engine | Commerce Engine (M9) | New rule engine, likely reuses tax/shipping rule-engine pattern (M9) |
| EPIC-P2-11 | Returns & refunds workflow | Orders (M9) | Extends order-lifecycle state machine |
| EPIC-P2-12 | Multiple themes/templates (beyond Phase 1's single theme) | Theme Engine (M6) | Extends `packages/theme-engine` + `style-dictionary` |
| EPIC-P2-13 | Template marketplace groundwork (not public yet) | EPIC-P2-12 | New `packages/marketplace-core` — architecture TBD at kickoff |

## Phase 3 — Business Depth & Service Extraction

| Epic ID | Epic | Depends On | Reference Library |
|---|---|---|---|
| EPIC-P3-01 | Extract Notification service as an independent deployable | Module boundaries from Phase 1 (system architecture doc §2) | `bullmq` for cross-service messaging; transport TBD (likely NATS/SQS, decide at kickoff) |
| EPIC-P3-02 | Extract Search service (built in EPIC-P2-03) as independent deployable | EPIC-P2-03 | Same search engine, containerized standalone |
| EPIC-P3-03 | Extract Media service as independent deployable | Object storage (T-COMM-M4-012) | `@aws-sdk/client-s3`, standalone service |
| EPIC-P3-04 | Multi-Warehouse Inventory & Routing (Business/ERP Engine begins) | Phase 1 single-location stock (M4) | New inventory-routing algorithm — architecture TBD |
| EPIC-P3-05 | Procurement module | EPIC-P3-04 | New — architecture TBD |
| EPIC-P3-06 | Basic accounting module | Orders/Invoices (M9) | New — architecture TBD (likely double-entry ledger pattern) |
| EPIC-P3-07 | POS (Point of Sale) channel | Orders (`channel` field already reserved in entity contract for `'pos'`) | New client app — stack TBD |
| EPIC-P3-08 | Custom Metafields (EAV pattern) generalized beyond Phase 1's `metafields_json` columns | Products/Orders `metafields_json` (already in Phase 1 schema) | Likely formalized EAV tables + admin UI |
| EPIC-P3-09 | SOC2-track compliance program (full compliance posture) | Phase 1 GDPR-ready baseline (T-PLAT-M10-014/015) | Compliance tooling TBD (e.g. Vanta/Drata) — not a code library decision |

## Phase 4 — Scale & Intelligence

| Epic ID | Epic | Depends On | Reference Library |
|---|---|---|---|
| EPIC-P4-01 | Extract Orders service as independent deployable | Orders (M9) | Standalone NestJS service, same ORM |
| EPIC-P4-02 | Extract Payments service as independent deployable | Payments (M9) | Standalone service, `stripe` |
| EPIC-P4-03 | Extract Analytics service as independent deployable | Reporting (admin `recharts` dashboards) | Standalone service, likely event-sourced |
| EPIC-P4-04 | Kubernetes migration | Phase 1 Railway/Render/Fly.io baseline (catalog §7, explicitly deferred to here) | `kubernetes`, likely `helm` |
| EPIC-P4-05 | Multi-region infrastructure | EPIC-P4-04 | Cloud-provider multi-region — TBD |
| EPIC-P4-06 | AI Copilot for merchants (content generation) — Intelligence Engine begins | Catalog/CMS (M4, M7) | LLM provider integration — TBD at kickoff (not yet decided in catalog) |
| EPIC-P4-07 | AI-driven product recommendations | Catalog + order history (M4, M9) | Likely paired with EPIC-P2-03 search infra |
| EPIC-P4-08 | Search/recommendations unification | EPIC-P2-03, EPIC-P4-07 | Same search engine, extended |
| EPIC-P4-09 | Public template/plugin marketplace opens | EPIC-P2-13 groundwork | `packages/sdk-client` (catalog §5, Phase 2 groundwork item) |

## Phase 5 — Enterprise & Ecosystem

| Epic ID | Epic | Depends On | Reference Library |
|---|---|---|---|
| EPIC-P5-01 | White-label support | Theme Engine (M6), Tenant model (M1) | Extends multi-tenant domain resolution |
| EPIC-P5-02 | Headless commerce API (public, versioned) | All Commerce Engine APIs (M4, M9) | `@nestjs/swagger`-generated spec, `openapi-typescript` client generation (catalog §5) |
| EPIC-P5-03 | Full marketplace (themes/plugins/apps) | EPIC-P4-09 | `packages/sdk-client`, marketplace billing/revenue-share — TBD |
| EPIC-P5-04 | B2B features: tiered pricing | Catalog/Orders (M4, M9) | Extends variant pricing model |
| EPIC-P5-05 | B2B features: multi-user accounts | Auth/RBAC (M2) | Extends `users`/`roles` model for account hierarchies |
| EPIC-P5-06 | B2B features: bulk workflows (bulk order, bulk pricing import) | EPIC-P5-04 | Likely CSV/bulk-API tooling — TBD |
| EPIC-P5-07 | Multi-region data residency options | EPIC-P4-05 | Data-residency-aware infra — TBD |

**Epic count: 13 (P2) + 9 (P3) + 9 (P4) + 7 (P5) = 38.** Plus 3 cross-phase epics tracked separately: `EPIC-X-01` Email deliverability monitoring (flagged in gap analysis), `EPIC-X-02` CSRF library re-evaluation if session-based flows are added, `EPIC-X-03` Stripe webhook retry/idempotency hardening beyond Phase 1 baseline. **Total: 41 epics**, matching the master index.
