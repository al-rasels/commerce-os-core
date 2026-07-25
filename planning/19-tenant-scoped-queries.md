# Feature 2.1 — Tenant-Scoped Queries

## 1. Purpose

Every database query must be automatically scoped to the requesting tenant. No cross-tenant data leaks — a user from tenant A must never see tenant B's products, orders, or customers.

| Risk                                     | Impact                           |
| ---------------------------------------- | -------------------------------- |
| Missing `where: { tenantId }` on a query | Full cross-tenant data exposure  |
| `create()` without tenantId              | Orphan record with null tenantId |
| `findMany()` without filter              | Returns all tenants' data        |
| Bulk import without tenant scoping       | Batch data corruption            |

---

## 2. Approach

Two-layer enforcement:

1. **Global NestJS interceptor** — extracts `tenantId` from JWT, injects into `ExecutionContext` (available via `@Inject(REQUEST)`).
2. **Prisma middleware** — appends `where: { tenantId }` to every query on tenant-scoped models.

```
Request → JwtAuthGuard (req.user.tenantId set)
  → TenantInterceptor (injects tenantId into request context)
    → Service (reads tenantId from context)
      → Prisma.$use middleware (auto-appends tenantId to where clause)
        → Database
```

---

## 3. TenantId Resolution

Extracted from JWT payload at authentication time by `JwtAuthGuard`:

```typescript
// src/common/guards/jwt-auth.guard.ts (already implemented — Feature 0.8)
// JWT payload shape:
interface JwtPayload {
  sub: string; // user id
  email: string;
  tenantId: string; // <-- added to payload
  role: "admin" | "manager" | "staff";
}
```

Available in any service via:

```typescript
import { Inject, Injectable, REQUEST } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class ProductService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  private get tenantId(): string {
    return this.req.user?.tenantId;
  }
}
```

Or via a convenience decorator:

```typescript
// src/common/decorators/tenant-id.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const TenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.tenantId;
  },
);

// Usage:
// @Get()
// async findAll(@TenantId() tenantId: string) { ... }
```

---

## 4. Prisma Middleware

```typescript
// src/common/prisma/tenant.middleware.ts
import { Prisma } from "@prisma/client";

const TENANT_SCOPED_MODELS = new Set([
  "Product",
  "ProductVariant",
  "Category",
  "Order",
  "OrderItem",
  "Customer",
  "Cart",
  "CartItem",
]);

const EXEMPT_MODELS = new Set(["Tenant", "User", "AuditEvent"]);

export function createTenantMiddleware(
  getTenantId: () => string | null,
): Prisma.Middleware {
  return async (params, next) => {
    const model = params.model as string;

    // Skip non-scoped and exempt models
    if (!TENANT_SCOPED_MODELS.has(model)) return next(params);
    if (EXEMPT_MODELS.has(model)) return next(params);

    const tenantId = getTenantId();
    if (!tenantId) return next(params);

    // ---- CREATE ----
    if (params.action === "create") {
      params.args.data.tenantId = tenantId;
    }

    // ---- CREATE MANY ----
    if (params.action === "createMany") {
      if (Array.isArray(params.args.data)) {
        for (const record of params.args.data) {
          (record as Record<string, unknown>).tenantId = tenantId;
        }
      }
    }

    // ---- READ ----
    if (
      params.action === "findUnique" ||
      params.action === "findFirst" ||
      params.action === "findMany" ||
      params.action === "findFirstOrThrow" ||
      params.action === "findUniqueOrThrow"
    ) {
      params.args = {
        ...params.args,
        where: {
          ...params.args.where,
          tenantId,
        },
      };
    }

    // ---- UPDATE / UPSERT / DELETE ----
    if (
      params.action === "update" ||
      params.action === "updateMany" ||
      params.action === "delete" ||
      params.action === "deleteMany"
    ) {
      params.args = {
        ...params.args,
        where: {
          ...params.args.where,
          tenantId,
        },
      };
    }

    // ---- UPSERT (create path) ----
    if (params.action === "upsert") {
      params.args.where = { ...params.args.where, tenantId };
      if (params.args.create) {
        params.args.create.tenantId = tenantId;
      }
    }

    return next(params);
  };
}
```

Registration in Prisma service:

```typescript
// src/common/prisma/prisma.service.ts
constructor() {
  this.client = new PrismaClient();
  this.client.$use(createTenantMiddleware(() => this.tenantId));
}
```

---

## 5. Exempt Models

| Model        | Reason                                                                                 |
| ------------ | -------------------------------------------------------------------------------------- |
| `Tenant`     | Created during registration (no JWT yet); admin cross-tenant management                |
| `User`       | Cross-tenant admin lookup; login/register flow                                         |
| `AuditEvent` | Stored with explicit `tenantId` from context; requires special timestamp-range queries |

---

## 6. Creating Records

`tenantId` is automatically set on `create()` and `createMany()` by the middleware. Explicitly setting it in service code is also supported for clarity:

```typescript
// Either approach works — middleware catches both:
await this.prisma.product.create({
  data: { name: "Widget", price: 9.99 },
  // tenantId injected by middleware
});
```

---

## 7. Bulk Operations

`createMany` is handled — the middleware iterates and sets `tenantId` on each record:

```typescript
await this.prisma.productVariant.createMany({
  data: [
    { name: "Small", productId: "..." },
    { name: "Large", productId: "..." },
    // tenantId injected by middleware on each
  ],
});
```

---

## 8. Admin Override

Cross-tenant operations (super admin, migrations) use a bypass header:

```typescript
// src/common/guards/tenant-admin.guard.ts
// Header: X-Admin-Bypass: <tenantId>

// Bypass flow:
//   Middleware checks for X-Admin-Bypass header + super-admin role
//   → If valid, tenantId is set to the header value instead of JWT tenantId
//   → Allows admins to operate on any tenant explicitly
```

| Scenario                 | Header                        | Role          | Effect               |
| ------------------------ | ----------------------------- | ------------- | -------------------- |
| Normal user              | —                             | `staff`       | Scoped to own tenant |
| Support viewing tenant A | `X-Admin-Bypass: tenant-a-id` | `admin`       | Scoped to tenant A   |
| Super admin tooling      | `X-Admin-Bypass: *`           | `super-admin` | Bypass all scoping   |

---

## 9. Testing

```typescript
describe("Tenant Scoping", () => {
  it("tenant A cannot see tenant B products", async () => {
    const tokenA = await getToken("tenant-a");
    const tokenB = await getToken("tenant-b");

    // Tenant A creates a product
    await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ name: "A-Product", price: 10 });

    // Tenant B fetches all products — should be empty
    const res = await request(app)
      .get("/api/v1/products")
      .set("Authorization", `Bearer ${tokenB}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("sets correct tenantId on created record", async () => {
    const token = await getToken("tenant-a");

    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Widget", price: 9.99 });

    expect(res.status).toBe(201);
    expect(res.body.data.tenantId).toBe("tenant-a");
  });

  it("findFirst with additional where clause still works", async () => {
    const token = await getToken("tenant-a");

    const res = await request(app)
      .get("/api/v1/products/my-specific-product")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    // where: { id: 'specific-id', tenantId: 'tenant-a' } — both applied
  });
});
```

---

## 10. Edge Cases

| Edge Case                                               | Mitigation                                                                                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Unauthenticated endpoints** (login, register)         | JWT is absent → `getTenantId()` returns null → middleware skips scoping. Controller handles validation without tenant.                  |
| **Public product listing** (if enabled)                 | Explicit `@SkipTenantCheck()` decorator sets a flag on metadata. Middleware checks for `SKIP_TENANT` metadata key and bypasses scoping. |
| **Admin bypass missing header**                         | `TenantAdminGuard` returns 403 with `TENANT_BYPASS_REQUIRED` if admin tries cross-tenant access without header.                         |
| **Nested creates** (e.g., create Order with OrderItems) | Middleware only fires per-action. Each `create` call on `OrderItem` gets its own middleware invocation.                                 |
| **Aggregate / count**                                   | `aggregate` and `count` actions also scoped — middleware applies `where: { tenantId }` to the aggregation.                              |
| **Raw queries** (`$queryRaw`, `$executeRaw`)            | Not intercepted by middleware. Must accept `tenantId` as a bound parameter. All raw queries should be audited.                          |
