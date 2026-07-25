# Feature 1.7 — Pagination

## 1. Problem

List endpoints return every matching row with no limits. As datasets grow, this causes OOM errors on the server, multi-second response times for the client, and zero UX for the user (no "next page" mechanism).

## 2. Standard Query Params

| Param    | Type           | Default        | Max   | Description                               |
| -------- | -------------- | -------------- | ----- | ----------------------------------------- |
| `page`   | number         | `1`            | —     | 1-indexed page number                     |
| `limit`  | number         | `20`           | `100` | Items per page                            |
| `sort`   | string         | entity default | —     | Field name to sort by                     |
| `order`  | `asc` / `desc` | `desc`         | —     | Sort direction                            |
| `search` | string         | —              | —     | Full-text search (ILIKE name/description) |
| `filter` | string (JSON)  | —              | —     | Field-level filters, see §6               |

```
GET /api/v1/products?page=2&limit=10&sort=price&order=asc&search=shoes&filter={"status":"active","price_gte":50}
```

## 3. Response Shape

```json
{
  "success": true,
  "data": [{ "id": "p1", "name": "Running Shoes", "price": 89.99 }],
  "meta": {
    "total": 342,
    "page": 2,
    "limit": 10,
    "totalPages": 35,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

| Meta Field    | Type    | Description                                      |
| ------------- | ------- | ------------------------------------------------ |
| `total`       | number  | Total records matching query (before pagination) |
| `page`        | number  | Current page number                              |
| `limit`       | number  | Items per page                                   |
| `totalPages`  | number  | `Math.ceil(total / limit)`                       |
| `hasNextPage` | boolean | `page < totalPages`                              |
| `hasPrevPage` | boolean | `page > 1`                                       |

## 4. Implementation

### `PaginatedResult<T>` — Generic Response Wrapper

```typescript
// src/common/pagination/paginated-result.ts

export class PaginatedResult<T> {
  readonly data: T[];
  readonly meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    };
  }
}
```

### `PaginateQuery` DTO

```typescript
// src/common/pagination/paginate-query.dto.ts
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsIn,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";

export class PaginateQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc" = "desc";

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  filter?: string;
}
```

### Pagination Service Method

```typescript
// src/common/pagination/pagination.service.ts
import { PrismaService } from "../prisma/prisma.service";

interface PaginateOptions {
  model: keyof typeof PrismaService.prototype;
  query: PaginateQuery;
  allowedSortFields: string[];
  searchFields?: string[];
  where?: any;
  include?: any;
  select?: any;
}

export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  async paginate<T>(opts: PaginateOptions): Promise<PaginatedResult<T>> {
    const {
      model,
      query,
      allowedSortFields,
      searchFields = ["name", "description"],
      where = {},
      include,
      select,
    } = opts;

    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const skip = (page - 1) * limit;

    // Sort
    const sortField = allowedSortFields.includes(query.sort)
      ? query.sort
      : "createdAt";
    const orderBy = { [sortField]: query.order ?? "desc" };

    // Search (ILIKE)
    let searchWhere: any = {};
    if (query.search && searchFields.length > 0) {
      searchWhere.OR = searchFields.map((field) => ({
        [field]: { contains: query.search, mode: "insensitive" },
      }));
    }

    // Filter (JSON)
    let filterWhere: any = {};
    if (query.filter) {
      filterWhere = this.parseFilter(JSON.parse(query.filter));
    }

    const combinedWhere = { ...where, ...searchWhere, ...filterWhere };

    const [data, total] = await Promise.all([
      (this.prisma as any)[model].findMany({
        where: combinedWhere,
        skip,
        take: limit,
        orderBy,
        include,
        select,
      }),
      (this.prisma as any)[model].count({ where: combinedWhere }),
    ]);

    return new PaginatedResult(data, total, page, limit);
  }

  private parseFilter(filter: Record<string, any>): Record<string, any> {
    const where: Record<string, any> = {};
    for (const [key, value] of Object.entries(filter)) {
      if (key.endsWith("_gte")) {
        where[key.slice(0, -4)] = { ...where[key.slice(0, -4)], gte: value };
      } else if (key.endsWith("_lte")) {
        where[key.slice(0, -4)] = { ...where[key.slice(0, -4)], lte: value };
      } else if (key.endsWith("_gt")) {
        where[key.slice(0, -3)] = { ...where[key.slice(0, -3)], gt: value };
      } else if (key.endsWith("_lt")) {
        where[key.slice(0, -3)] = { ...where[key.slice(0, -3)], lt: value };
      } else if (key.endsWith("_in")) {
        where[key.slice(0, -3)] = { in: value };
      } else {
        where[key] = value;
      }
    }
    return where;
  }
}
```

## 5. Prisma Pagination Strategy

### Offset (Default)

```typescript
const items = await prisma.product.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

| Use Case                       | Strategy                                |
| ------------------------------ | --------------------------------------- |
| < 10k rows, random page access | Offset — simple, supports any page jump |
| > 10k rows, deep pages         | Offset degrades (DB scans skipped rows) |
| Infinite scroll, cursor known  | Cursor — O(1) per page, no offset drift |

### Cursor-Based (Large Datasets)

```typescript
const items = await prisma.product.findMany({
  take: limit + 1, // Fetch +1 to detect hasNext
  cursor: { id: cursorId },
  skip: 1, // Skip the cursor itself
  orderBy: { id: "asc" },
});

const hasNextPage = items.length > limit;
if (hasNextPage) items.pop(); // Remove the extra item
```

When using cursor-based mode, the response meta includes `nextCursor` instead of `page`-related fields. The service switches to cursor mode when a `cursor` query param is present.

## 6. Sort Mapping

Every entity defines a whitelist. Unrecognised sort fields fall back to `createdAt`.

```typescript
// src/products/products.controller.ts
private readonly ALLOWED_SORT = [
  'name', 'price', 'createdAt', 'updatedAt', 'stock', 'sku',
];
```

| Risk                           | Mitigation                                                         |
| ------------------------------ | ------------------------------------------------------------------ |
| `sort=__proto__`               | String check against whitelist — rejects non-listed fields         |
| `sort=passwordHash`            | Entity whitelist only includes model columns safe for exposure     |
| `order=malicious`              | Enum validation — only `asc` / `desc` accepted                     |
| Prisma raw `orderBy` injection | Prisma generates parameterised queries — no SQL injection possible |

## 7. Filter Parsing

```
filter={ "status": "active", "price_gte": 10, "price_lte": 100, "createdAt_gte": "2025-01-01" }
```

| Suffix  | Prisma Operator | Example                                                                          |
| ------- | --------------- | -------------------------------------------------------------------------------- |
| _(none) | Equals          | `{ "status": "active" }` → `{ status: "active" }`                                |
| `_gte`  | `gte`           | `{ "price_gte": 10 }` → `{ price: { gte: 10 } }`                                 |
| `_lte`  | `lte`           | `{ "price_lte": 100 }` → `{ price: { lte: 100 } }`                               |
| `_gt`   | `gt`            | `{ "stock_gt": 0 }` → `{ stock: { gt: 0 } }`                                     |
| `_lt`   | `lt`            | `{ "rating_lt": 3 }` → `{ rating: { lt: 3 } }`                                   |
| `_in`   | `in`            | `{ "status_in": ["active","draft"] }` → `{ status: { in: ["active","draft"] } }` |

Filter values are validated against the entity schema at the controller level before reaching the service.

## 8. Search

`search=term` triggers a `contains` (case-insensitive) query across a configurable set of fields.

```typescript
// Default search fields per entity
const SEARCH_FIELDS: Record<string, string[]> = {
  Product: ["name", "description", "sku"],
  Category: ["name", "description"],
  Order: ["orderNumber"],
  Customer: ["name", "email"],
};
```

- ILIKE is implemented via Prisma's `{ contains: term, mode: 'insensitive' }`
- For PostgreSQL, this translates to `WHERE name ILIKE '%term%'`
- For large text fields, a GIN trgm index should be added (`CREATE INDEX ... ON products USING gin (name gin_trgm_ops)`)
- Search is skipped when param is absent or empty string

## 9. `@Paginated()` Decorator

```typescript
// src/common/pagination/paginated.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Paginated = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginateQuery => {
    const req = ctx.switchToHttp().getRequest();
    const query = req.query as Record<string, string>;

    return {
      page: query.page ? parseInt(query.page, 10) : 1,
      limit: query.limit ? parseInt(query.limit, 10) : 20,
      sort: query.sort,
      order: (query.order === "asc" ? "asc" : "desc") as "asc" | "desc",
      search: query.search,
      filter: query.filter,
    };
  },
);
```

Usage in controller:

```typescript
@Get()
async findAll(@Query() query: PaginateQuery, @Paginated() paginate: PaginateQuery) {
  // paginate is the validated + parsed query
}
```

> Note: `@Paginated()` is a convenience wrapper. The `PaginateQuery` DTO (with `ValidationPipe`) should be the primary vehicle for validation. The decorator provides a typed reference for service consumption.

## 10. All List Endpoints

| Endpoint              | Sort Fields                                   | Filter Fields                                                     | Search Fields          |
| --------------------- | --------------------------------------------- | ----------------------------------------------------------------- | ---------------------- |
| `GET /products`       | name, price, createdAt, updatedAt, stock, sku | status, price_gte/lte, stock_gt/lt, createdAt_gte/lte, categoryId | name, description, sku |
| `GET /categories`     | name, createdAt, updatedAt                    | status, parentId                                                  | name, description      |
| `GET /orders`         | createdAt, updatedAt, total, status           | status, total_gte/lte, createdAt_gte/lte, customerId              | orderNumber            |
| `GET /customers`      | name, email, createdAt                        | status, createdAt_gte/lte                                         | name, email            |
| `GET /variants`       | price, stock, createdAt                       | status, productId, price_gte/lte, stock_gt/lt                     | sku                    |
| `GET /reviews`        | rating, createdAt                             | rating_gte/lte, status, productId, customerId                     | (none)                 |
| `GET /inventory-logs` | createdAt, quantity                           | type, productId, createdAt_gte/lte, quantity_gt/lt                | (none)                 |
| `GET /discounts`      | name, value, createdAt, expiresAt             | status, type, value_gte/lte, expiresAt_gte/lte                    | name, code             |

## 11. Error Responses

```json
// 400 — Invalid filter JSON
{
  "success": false,
  "error": {
    "code": "INVALID_FILTER",
    "message": "Filter must be a valid JSON string"
  }
}

// 400 — Unknown sort field
{
  "success": false,
  "error": {
    "code": "INVALID_SORT",
    "message": "Sort field 'passwordHash' is not allowed. Allowed: name, price, createdAt"
  }
}
```

## 12. Test Cases

```typescript
describe("Pagination", () => {
  it("returns page 1 with default limit of 20", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(20);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(20);
    expect(res.body.meta.hasNextPage).toBeDefined();
  });

  it("caps limit at 100 when higher value is requested", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products?limit=999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.meta.limit).toBe(100);
    expect(res.body.data.length).toBeLessThanOrEqual(100);
  });

  it("sorts by price ascending", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products?sort=price&order=asc&limit=50")
      .set("Authorization", `Bearer ${token}`);

    const prices = res.body.data.map((p: any) => p.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it("filters by status and date range", async () => {
    const filter = JSON.stringify({
      status: "active",
      createdAt_gte: "2025-01-01",
      createdAt_lte: "2025-12-31",
    });

    const res = await request(app.getHttpServer())
      .get(`/api/v1/products?filter=${encodeURIComponent(filter)}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    res.body.data.forEach((p: any) => {
      expect(p.status).toBe("active");
    });
  });

  it("searches by name", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products?search=shoes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    res.body.data.forEach((p: any) => {
      const matches =
        p.name.toLowerCase().includes("shoes") ||
        p.description?.toLowerCase().includes("shoes");
      expect(matches).toBe(true);
    });
  });

  it("returns 400 for invalid sort field", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products?sort=passwordHash")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_SORT");
  });

  it("returns 400 for malformed filter JSON", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/v1/products?filter={broken")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("INVALID_FILTER");
  });
});
```

## 13. Edge Cases

| Edge Case                       | Behaviour                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `page=0`                        | Clamped to 1 by DTO `@Min(1)`                                                               |
| `page=999` on 10-record dataset | Returns empty `data: []`, `meta.totalPages: 1`, `hasNextPage: false`                        |
| `limit=0`                       | Clamped to 1 by DTO `@Min(1)`                                                               |
| `limit=-5`                      | Rejected by DTO `@Min(1)`                                                                   |
| `sort` not in whitelist         | Falls back to `createdAt`                                                                   |
| `order=invalid`                 | Falls back to `desc`                                                                        |
| `search` with special SQL chars | Prisma parameterised — safe from injection                                                  |
| `filter` with unknown field     | Passed to Prisma — Prisma throws, caught by exception filter → 400                          |
| Concurrent pagination           | Stateless — no race conditions                                                              |
| Deleted rows mid-pagination     | Standard offset drift — acceptable for < 10k datasets. Cursor mode for critical consistency |
