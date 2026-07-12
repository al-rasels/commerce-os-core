# Rule 01 — Tenant Isolation (STRICT)

This is the single most security-critical rule in the project. Violations are treated as sev-1, not style feedback.

## 1. The Mechanism, Exactly

```ts
// TenantContext — constructed ONCE per request, in middleware, never reconstructed downstream
interface TenantContext {
  tenantId: string;          // UUID
  plan: string;               // e.g. "starter" | "growth" | "enterprise"
  effectiveFlags: Set<string>;
  theme: { themeBaseId: string; overrides: Record<string, unknown> };
  locale: string;              // BCP-47, e.g. "en-US"
  currency: string;            // ISO 4217, e.g. "USD"
  permissions: string[];       // resolved permission keys for the current actor
  domain: string;
  storagePrefix: string;       // `tenant-${tenantId}/`
}
```

Resolution order (must happen in exactly this sequence, as NestJS middleware/guards, before any controller executes):

```
1. HostResolverMiddleware   — parse req.hostname → lookup tenant_domains → tenantId (or 404)
2. TenantContextMiddleware  — load tenant row, plan, flags, theme pointer → build TenantContext → attach to req
3. AuthGuard                — verify JWT → compare token.tenant_id === req.tenantContext.tenantId, reject on mismatch
4. PermissionGuard          — check req.tenantContext.permissions against route's required permission
5. (controller executes)
```

If step 1 fails to resolve a tenant: **hard 404, immediately, before any other middleware runs.** No default tenant. No "global" fallback. Ever.

## 2. Database Query Rule

Every tenant-owned entity's repository MUST extend the base scoped repository — never the raw ORM repository.

```ts
// CORRECT
@Injectable()
export class ProductsRepository extends TenantScopedRepository<Product> {
  constructor(prisma: PrismaService) { super(prisma, 'product'); }
}
// Internally, every findMany/findUnique/create/update/delete call
// auto-injects `where: { tenant_id: this.context.tenantId, ...userWhere }`

// WRONG — never do this for a tenant-owned table
const products = await this.prisma.product.findMany({ where: { sku } }); // NO tenant_id filter = LEAK
```

If a task requires querying a tenant table and `TenantScopedRepository` doesn't yet support the query shape needed, **extend the base class's capability — do not drop down to the raw client as a workaround.**

## 3. Cache Key Rule

```ts
// CORRECT
const key = `${ctx.tenantId}:products:featured`;
// WRONG
const key = `products:featured`; // no tenant prefix = cross-tenant cache poisoning
```

Enforce via a `TenantCacheService` wrapper — never call the raw Redis client with a hand-built key string in feature code.

## 4. Storage Path Rule

```ts
// CORRECT
const path = `${ctx.storagePrefix}products/${productId}/image.jpg`; // tenant-{id}/products/...
// WRONG
const path = `products/${productId}/image.jpg`;
```

## 5. Queue Job Rule

Every job payload interface MUST include `tenantId` as a required (not optional) field. Worker entrypoints reject any job missing it before processing:

```ts
interface JobPayload { tenantId: string; /* ...job-specific fields */ }

async function processJob(payload: JobPayload) {
  if (!payload.tenantId) throw new Error('Job rejected: missing tenantId'); // fail closed
  // ...
}
```

## 6. Global/Reference Tables — The Only Exception

Tables explicitly marked `@Global()` in the schema (countries, currencies, tax_rate_defaults, plans) have no `tenant_id` and are the ONLY tables allowed to skip this rule. Any new table defaults to tenant-scoped; marking it `@Global()` requires the same escalation as AGENTS.md §5.

## 7. Mandatory Test Pattern for Every New Tenant Table

```ts
describe('isolation: <table>', () => {
  it('never returns another tenant\'s rows', async () => {
    const tenantA = await seedTenant();
    const tenantB = await seedTenant();
    await seedRowFor(tenantA, /* data */);
    const resultsAsB = await repoAs(tenantB).findMany({});
    expect(resultsAsB).toHaveLength(0);
  });
});
```
This test is not optional. A PR adding a tenant table without this test fails review automatically, regardless of what else it does correctly.

## 8. Cross-Tenant Token Rejection Test (mandatory for every authenticated endpoint)

```ts
it('rejects a token minted for a different tenant', async () => {
  const tokenForTenantA = await login(tenantA);
  const res = await request(app)
    .get('/api/products')
    .set('Host', tenantB.domain)         // resolves TenantContext to B
    .set('Authorization', `Bearer ${tokenForTenantA}`); // token claims A
  expect(res.status).toBe(403);
});
```
