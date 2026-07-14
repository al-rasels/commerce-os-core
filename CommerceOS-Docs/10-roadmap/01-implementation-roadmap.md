# Implementation Roadmap

## Phase 1 — Foundation (MVP)

Tenant Context + Auth/RBAC → Catalog/Orders/Checkout (Commerce core) → Design tokens + ~20 components → 1 theme, JSON-based page layout (no drag-drop UI) → Super Admin (provisioning + billing only).

**Exit criteria:** a real merchant can sign up, get a provisioned store, configure catalog + basic theme, and take a real order end to end, with tenant isolation regression tests passing. Full spec: `02-phase1-mvp-spec.md`.

## Phase 2 — Storefront Depth

CDN, queue workers, search engine (Meilisearch/Elasticsearch), image optimization, drag-and-drop Page Builder UI with Visual Data Binding UI and Responsive Breakpoint Editor, Real-Time Preview Staging, expand component library toward 50–80, coupons/promotions, returns/refunds, multiple themes/templates, template marketplace groundwork (not public yet).

## Phase 3 — Business Depth & Service Extraction

Extract Notification, Search, Media as independent services (module boundaries from Phase 1 make this a lift, not a rewrite — system architecture doc §2). Begin Business/ERP Engine: Multi-Warehouse Inventory & Routing, procurement, basic accounting, POS, Custom Metafields (EAV pattern). Full compliance posture (SOC2-track) work begins here.

## Phase 4 — Scale & Intelligence

Extract Orders, Payments, Analytics as services. Kubernetes, multi-region infra. Intelligence Engine begins: AI Copilot for merchants (content gen), AI-driven product recommendations, search/recommendations. Public template/plugin marketplace opens.

## Phase 5 — Enterprise & Ecosystem

White-label, headless commerce API, full marketplace (themes/plugins/apps), B2B features (Tiered pricing, multi-user accounts, and bulk workflows), multi-region data residency options.

## Governing Rule Across All Phases

No phase begins work that violates a Non-Negotiable from `07-agent-guide/01-agent-guide.md`. No phase pulls forward a later-phase feature (e.g. ERP in Phase 1) without an explicit scope decision documented here, not implied by convenience.

## What This Roadmap Deliberately Does NOT Include Yet

Full ER diagrams (150+ tables), complete API/OpenAPI spec, full 150+ component spec sheets, marketplace SDK spec. These are Phase 2/3 artifacts — generating them now, before Phase 1 code exists, risks documentation that doesn't match reality. Generate them once the corresponding phase begins, informed by actual implementation decisions made in Phase 1.
