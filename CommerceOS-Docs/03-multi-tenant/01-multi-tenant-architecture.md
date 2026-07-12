# Multi-Tenant Architecture

## 1. Tenant Resolution

```
Incoming request → hostname parsed
  ├── custom domain match  → lookup tenant_domains table
  └── *.platform.com subdomain → parse subdomain → lookup tenants table
→ tenant_id resolved → TenantContext constructed → attached to request scope
```

Failure to resolve a tenant = hard 404 before any downstream module executes. No default/global tenant fallback ever.

## 2. TenantContext (the object every module depends on)

```ts
TenantContext {
  tenantId: string
  plan: string
  effectiveFlags: Set<string>
  theme: { id, tokens }
  locale: string
  currency: string
  permissions: Permission[]
  domain: string
  storagePrefix: string   // e.g. "tenant-{id}/"
}
```

Constructed once per request in middleware, injected via DI into every service — never re-fetched or re-derived downstream.

## 3. Isolation — one pattern, five surfaces

| Surface | Mechanism |
|---|---|
| Database | `tenant_id` column on every tenant-owned table; every query auto-filtered via query-builder middleware (not manual `WHERE` in each repo method) |
| Cache | Key prefix `tenantId:module:key` (e.g. `45:products:featured`) |
| Object storage | Path prefix `tenant-{id}/...` |
| Queue jobs | Every job payload carries `tenant_id`; worker rejects jobs without it |
| Analytics/events | Every event envelope carries `tenant_id`; queries always filtered |

Global/reference tables (countries, currencies, tax rate defaults) are the only tables without `tenant_id` — explicitly marked `@Global()` in schema to prevent accidental scoping bugs.

## 4. Query-Level Enforcement (critical control)

Rather than trusting every developer to remember `WHERE tenant_id = ?`, tenant-owned repositories extend a `TenantScopedRepository` base class that injects the filter automatically. A raw/unscoped query against a tenant table is a lint-time and code-review-time violation — flag this explicitly in PR templates.

## 5. Tenant Lifecycle

```
Provisioning → schema/row init, default theme assign, trial flags set
  ↓
Active
  ↓
Suspended (billing failure) → storefront read-only, admin still accessible
  ↓
Offboarding → data export triggered → soft delete (30-day retention) → hard delete
```

Migration path: default is shared-schema. Enterprise tenants may be moved to dedicated schema/database later — TenantContext design already abstracts storage location so this migration doesn't touch application code, only the connection resolver.

## 6. Backups & DR (tenant-aware)

Backups are tenant-restorable independently — a single-tenant restore must never require restoring the whole cluster. Nightly logical backups partitioned by `tenant_id` range are sufficient at Phase 1 scale; point-in-time recovery is a Phase 3 infra item.

## 7. Anti-Patterns to Reject in Review

- Any service method accepting data without a `TenantContext` parameter
- Any cache key without a tenant prefix
- Any admin/debug endpoint that can query across tenants without an explicit, logged super-admin override path
