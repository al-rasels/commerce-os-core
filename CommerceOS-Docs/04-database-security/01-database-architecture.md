# Database Architecture

## 1. Strategy

Shared PostgreSQL cluster, logical isolation via `tenant_id`. No schema-per-tenant at Phase 1 (operational overhead too high before scale justifies it). Migration path to dedicated DB per enterprise tenant is a connection-resolver change, not a schema change (see multi-tenant doc §5).

## 2. Table Categories

| Category | Examples | tenant_id? |
|---|---|---|
| Global/reference | countries, currencies, tax_rate_defaults, plans | No |
| Platform | tenants, tenant_domains, users, roles, feature_flags | tenants row itself has PK id, no tenant_id; everything else referencing a tenant does |
| Tenant-owned | products, orders, customers, inventory, pages, themes_instance | Yes — required, indexed |

## 3. Core Phase 1 Entities (indicative, not exhaustive — full ER diagram deferred to Phase 2 per roadmap)

```
tenants (id, name, plan_id, status, created_at)
tenant_domains (id, tenant_id, domain, is_primary)
users (id, tenant_id NULLABLE*, email, role_id)
  * platform-level admin users have tenant_id NULL; store users always have tenant_id
products (id, tenant_id, name, sku, status, ...)
product_variants (id, tenant_id, product_id, price, stock, ...)
categories (id, tenant_id, name, parent_id)
orders (id, tenant_id, customer_id, status, total, ...)
order_items (id, tenant_id, order_id, product_variant_id, qty, price)
customers (id, tenant_id, email, ...)
carts (id, tenant_id, customer_id/session_id, status)
pages (id, tenant_id, slug, layout_json)
themes_instance (id, tenant_id, template_id, theme_tokens_json, overrides_json)
feature_flags (id, tenant_id, flag_key, enabled)
```

## 4. Indexing Rules

- Every tenant-owned table: composite index leading with `tenant_id` (e.g. `(tenant_id, sku)`, `(tenant_id, status, created_at)`).
- Never index without `tenant_id` first — a query missing the tenant filter should be slow enough in dev/staging to get caught before production.

## 5. Overrides / Versioning (the mechanism that solves "safe template updates")

```
theme_base (platform-owned, versioned: id, version, tokens_json)
theme_tenant_override (tenant_id, theme_base_id, override_json, updated_at)
```

Rendered theme = `theme_base.tokens_json` deep-merged with `theme_tenant_override.override_json`. Updating `theme_base` to a new version never touches `theme_tenant_override` — merchant customizations survive platform updates by construction. Same pattern applies to `template_base` / `template_tenant_override` for page-builder layouts.

## 6. Soft Deletes & Auditing

- Tenant-owned business records (orders, customers) use `deleted_at` soft delete — never hard-delete without an explicit retention-policy job.
- All write operations on sensitive tables (orders, users, roles, feature_flags) logged to `audit_log(tenant_id, actor_id, action, entity, entity_id, diff, created_at)`.

## 7. Migrations

- Migrations run per-cluster (not per-tenant) since schema is shared — a migration must be backward-compatible with in-flight requests (expand/contract pattern: add nullable column → backfill → make required in a later migration).
- No migration may add a NOT NULL column without a default in the same deploy — this breaks the modular-monolith's ability to do zero-downtime deploys.

## 8. Deferred to Phase 2+ (per roadmap)

Full ER diagram with all 150+ tables, partitioning strategy for high-volume tenants, read-replica routing.
