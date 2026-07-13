# System Architecture

## 1. High-Level Request Flow

```
Client
  → CDN / WAF
  → Reverse Proxy
  → Tenant Resolver          (subdomain / custom domain → tenant_id)
  → Authentication Layer     (JWT verify, session)
  → Tenant Context Middleware (attach TenantContext to request)
  → API Gateway / Router
  → Module (Commerce / Business / Experience / Platform / Intelligence)
  → Data Layer (PostgreSQL / Redis / Object Storage — all tenant-scoped)
  → Response
```

### 1.1 Storefront Single-Pass Rendering Pipeline
To guarantee ultra-fast, modern performance, the Next.js storefront executes a single-pass SSR rendering flow:
1. **Resolve Tenant**: Middlewares resolve `tenantId` via hostname.
2. **Parallel Fetch**: Storefront fetches the Theme (`theme:resolved`), Page Layout (`pageJson`), and dynamic Commerce Data (Catalog, Cart) concurrently in a single batch query.
3. **Context Injection**: Atomic components bind to dynamic data via Data Context Providers (`{{ product.title }}`).
4. **Style Injection**: The resolved theme is injected as a `<style>` block of CSS Custom Properties (`:root`) in the document head.
5. **Stream HTML**: The Next.js server streams the rendered component tree to the edge CDN.

## 2. Architecture Style

**Modular monolith** (Phase 1–2), organized as independent modules with enforced boundaries (no cross-module DB joins, communication via internal service interfaces or events only). This is a deliberate constraint so Phase 3/4 extraction to microservices is a lift-and-shift, not a rewrite.

## 3. Stack

| Layer | Choice |
|---|---|
| Frontend (storefront) | Next.js (SSR/ISR for SEO, component-driven rendering) |
| Frontend (admin) | React SPA |
| Backend | NestJS (modular, DI-friendly — maps cleanly to module boundaries) |
| Database | PostgreSQL (shared cluster, tenant_id isolation) |
| Cache | Redis (tenant-namespaced keys) |
| Queue | BullMQ (tenant-scoped jobs) |
| Object storage | S3-compatible, tenant-prefixed paths |
| CDN | In front of storefront + static assets |
| Search | Deferred to Phase 2 (Elasticsearch/Meilisearch candidate) |

## 4. Module Boundaries (Phase 1 modules)

```
/modules
  /platform     (tenant, auth, rbac, billing, feature-flags)
  /commerce     (catalog, inventory, cart, checkout, orders)
  /experience   (design-tokens, components, theme, page-builder)
  /business     (marketing, basic reporting)     [ERP deferred to Phase 3]
  /intelligence (empty scaffold only — Phase 4+)
```

Each module owns its own tables (prefixed), its own service layer, and exposes only a typed interface to other modules. Cross-module calls go through an internal service registry, not direct imports of another module's repository/DB layer — this is the rule that makes future extraction safe.

## 5. Event-Driven Backbone

Used for cross-module side effects, not core request/response flows:

```
order.created → inventory.reserve, notification.send, analytics.record
```

Events carry `tenant_id` mandatorily. Any consumer missing tenant scoping fails validation at the event-bus level (fail-closed, not fail-open).

## 6. Lifecycle Diagrams (reference — detail in respective volumes)

- **Tenant lifecycle** → `03-multi-tenant/01-multi-tenant-architecture.md`
- **Auth lifecycle** → `04-database-security/02-security-authentication.md`
- **Checkout lifecycle** → `06-commerce-business-engines/01-commerce-engine.md`
- **Rendering lifecycle** → `05-experience-engine/05-page-builder.md`

## 7. Non-Negotiables

- No request executes business logic without a resolved Tenant Context.
- No module reads another module's tables directly.
- No plan/billing string comparisons outside the Platform module (use feature flags).
