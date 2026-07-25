# Feature 7 — Scale & Polish

## 1. Redis Caching

### Architecture

```
Request → CacheInterceptor → RedisCache (TTL: 60s-300s)
                ↓
          Miss → DB Query → Store in cache → CacheInterceptor returns result
                ↓
          Hit  → Return cached result directly
```

### Cache Module

```typescript
// src/modules/cache/cache.module.ts
import { Module, CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";

@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        ttl: 60, // default 60s
      }),
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
```

### Caching Strategy

| Endpoint                     | TTL  | Key Pattern                       | Invalidate On                    |
| ---------------------------- | ---- | --------------------------------- | -------------------------------- |
| `GET /categories`            | 120s | `categories:{tenantId}`           | Category created/updated/deleted |
| `GET /products/:id`          | 60s  | `product:{tenantId}:{id}`         | Product updated/deleted          |
| `GET /products` (list)       | 30s  | `products:{tenantId}:{queryHash}` | Product created/updated/deleted  |
| `GET /variants/:id`          | 60s  | `variant:{tenantId}:{id}`         | Variant updated                  |
| `GET /page-layouts/:pageKey` | 300s | `pageLayout:{tenantId}:{pageKey}` | Layout published                 |
| `GET /theme`                 | 600s | `theme:{tenantId}`                | Theme updated                    |

### Invalidation

```typescript
// src/modules/cache/cache-invalidation.service.ts
@Injectable()
export class CacheInvalidationService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async invalidateProduct(tenantId: string, productId: string): Promise<void> {
    await Promise.all([
      this.cache.del(`product:${tenantId}:${productId}`),
      this.cache.del(`products:${tenantId}:*`), // wildcard flush
    ]);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const client = (this.cache.store as any).client;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(keys);
    }
  }
}
```

### Performance Cache Decorator

```typescript
// src/modules/cache/decorators/tenant-cache.decorator.ts
export function TenantCache(ttl = 60) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const ctx = args.find((a) => a instanceof TenantContext);
      if (!ctx) return original.apply(this, args);
      const cacheKey = `custom:${ctx.tenantId}:${propertyKey}:${JSON.stringify(args)}`;
      const cached = await this.cache.get(cacheKey);
      if (cached) return cached;
      const result = await original.apply(this, args);
      await this.cache.set(cacheKey, result, ttl);
      return result;
    };
  };
}
```

---

## 2. Read Replicas

### Configuration

```prisma
// prisma/schema.prisma — datasource block
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}

// apps/api/src/database/prisma.module.ts
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

```typescript
// apps/api/src/database/prisma.service.ts
import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  private replicaClient: PrismaClient | null = null;

  constructor() {
    super({ datasources: { db: { url: process.env.DATABASE_URL } } });
  }

  get read(): PrismaClient {
    if (!this.replicaClient && process.env.READ_REPLICA_URL) {
      this.replicaClient = new PrismaClient({
        datasources: { db: { url: process.env.READ_REPLICA_URL } },
      });
    }
    return this.replicaClient ?? this;
  }
}
```

### Usage Convention

```typescript
// Read queries → use read replica
async getProduct(id: string) {
  return this.prisma.read.product.findUnique({ where: { id } });
}

// Write queries → use primary
async createProduct(data: CreateProductInput) {
  return this.prisma.product.create({ data });
}
```

---

## 3. Rate Limiting

### Throttler Module (NestJS)

```typescript
// apps/api/src/app.module.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// Global throttle config
ThrottlerModule.forRoot([{
  ttl: 60000,   // 1 minute window
  limit: 100,   // max 100 requests per window
}]),

providers: [
  { provide: APP_GUARD, useClass: ThrottlerGuard },
];
```

### Per-Route Decorators

```typescript
@Controller('products')
export class ProductsController {
  // Public endpoints: stricter
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  @Get()
  async list(@Query() query: ListProductDto) { ... }

  // Customer auth: moderate
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  @Get(':id')
  async get(@Param('id') id: string) { ... }

  // Admin: relaxed
  @Throttle({ default: { ttl: 60000, limit: 200 } })
  @Post()
  @Roles('admin')
  async create(@Body() body: CreateProductDto) { ... }
}
```

### Rate Limit Configuration

| Scope                    | Window | Limit | Response |
| ------------------------ | ------ | ----- | -------- |
| Global (unauthenticated) | 1 min  | 30    | 429      |
| Authenticated (customer) | 1 min  | 100   | 429      |
| Authenticated (admin)    | 1 min  | 200   | 429      |
| Login attempts           | 15 min | 5     | 429      |
| API keys (webhooks)      | 1 min  | 500   | 429      |

```typescript
// Login rate limit
@Throttle({ default: { ttl: 900000, limit: 5 } })
@Post('auth/login')
async login(@Body() body: LoginDto) { ... }
```

---

## 4. Storybook

### Structure

```
apps/
└── storefront/
    └── .storybook/
        ├── main.ts
        └── preview.ts
    └── src/
        └── components/
            ├── ui/
            │   ├── Button.stories.tsx   [Primary, Secondary, Ghost, Danger, Sizes, Loading, Disabled]
            │   ├── Input.stories.tsx     [Text, Email, Search, Error, Disabled, Sizes]
            │   ├── Badge.stories.tsx      [Default, Success, Warning, Error, Info, Sizes]
            │   ├── Card.stories.tsx       [Default, WithImage, WithActions, Loading]
            │   └── Modal.stories.tsx      [Default, WithForm, Confirm, FullScreen]
            ├── commerce/
            │   ├── ProductCard.stories.tsx  [Default, OutOfStock, OnSale, WithBadge]
            │   ├── ProductGrid.stories.tsx  [2Cols, 3Cols, 4Cols, Loading, Empty]
            │   ├── CartItem.stories.tsx     [Default, Removing, QuantityUpdate]
            │   ├── OrderSummary.stories.tsx [Empty, WithItems, WithPromo]
            │   └── CheckoutForm.stories.tsx [Shipping, Payment, Review]
            └── layout/
                ├── Header.stories.tsx    [LoggedOut, LoggedIn, Mobile]
                └── Footer.stories.tsx    [Default, Compact]
```

### Configuration

```typescript
// apps/storefront/.storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-tailwind-dark-mode",
  ],
  framework: { name: "@storybook/nextjs", options: {} },
};

export default config;

// apps/storefront/package.json
// "storybook": "storybook dev -p 6006",
// "build-storybook": "storybook build"
```

---

## 5. Production Readiness

### Health Endpoints

| Method | Path                   | Auth   | Description                       |
| ------ | ---------------------- | ------ | --------------------------------- |
| `GET`  | `/api/v1/health`       | Public | Basic health                      |
| `GET`  | `/api/v1/health/ready` | Public | Readiness (DB + Redis connection) |
| `GET`  | `/api/v1/health/live`  | Public | Liveness                          |

```typescript
@Controller("health")
export class HealthController {
  @Get()
  check(): { status: string; timestamp: string } {
    return { status: "ok", timestamp: new Date().toISOString() };
  }

  @Get("ready")
  async readiness(): Promise<{
    status: string;
    checks: Record<string, string>;
  }> {
    const checks: Record<string, string> = {};
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      checks.database = "ok";
    } catch {
      checks.database = "error";
    }
    return {
      status: Object.values(checks).every((c) => c === "ok")
        ? "ok"
        : "degraded",
      checks,
    };
  }

  @Get("live")
  liveness(): { status: string } {
    return { status: "ok" };
  }
}
```

### CORS

```typescript
// apps/api/src/main.ts
app.enableCors({
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
});
```

### Graceful Shutdown

```typescript
// apps/api/src/main.ts
app.enableShutdownHooks();

// Each module cleans up
@Injectable()
export class QueueService implements OnApplicationShutdown {
  async onApplicationShutdown(signal?: string) {
    await this.bullQueue.close();
  }
}
```

### Error Handling

```typescript
// apps/api/src/common/filters/http-exception.filter.ts
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let code = "INTERNAL_ERROR";
    let message = "An unexpected error occurred";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === "string" ? res : (res as any).message || message;
      code = (res as any).code || HttpStatusName[status];
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case "P2002":
          status = 409;
          code = "CONFLICT";
          message = "Resource already exists";
          break;
        case "P2025":
          status = 404;
          code = "NOT_FOUND";
          message = "Resource not found";
          break;
      }
    }

    response.status(status).json({
      error: {
        code,
        message,
        statusCode: status,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
```

---

## 6. Bundle Analysis

### Scripts

```json
// apps/storefront/package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}

// next.config.js with @next/bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({ ... });
```

### Target Bundle Budgets

| Chunk                        | Max Size      | Strategy                        |
| ---------------------------- | ------------- | ------------------------------- |
| Main vendor (React, Next.js) | 150 KB (gzip) | Keep as-is                      |
| UI components                | 50 KB (gzip)  | Lazy load modals, tooltips      |
| Commerce pages               | 80 KB (gzip)  | Dynamic import heavy components |
| Checkout                     | 100 KB (gzip) | Split card form, address lookup |
| Admin panel                  | 200 KB (gzip) | Lazy load by route              |

```typescript
// Lazy load heavy components
const CheckoutForm = dynamic(() => import('@/components/commerce/CheckoutForm'), {
  loading: () => <CheckoutSkeleton />,
});

const ProductGallery = dynamic(() => import('@/components/commerce/ProductGallery'), {
  ssr: false, // heavy 3D viewer
});
```

---

## 7. Load Testing (k6)

### Test Script

```javascript
// tests/load/api-load-test.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up
    { duration: "3m", target: 50 }, // Stay at 50
    { duration: "1m", target: 100 }, // Ramp up
    { duration: "3m", target: 100 }, // Stay at 100
    { duration: "1m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% under 500ms
    http_req_failed: ["rate<0.01"], // <1% failures
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:4000";
const TENANT_ID = __ENV.TENANT_ID || "test-tenant";

export default function () {
  // Browse products
  const listRes = http.get(`${BASE_URL}/api/v1/products?page=1&limit=20`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
  check(listRes, { "products listed": (r) => r.status === 200 });

  const products = listRes.json().data || [];
  if (products.length > 0) {
    const getRes = http.get(`${BASE_URL}/api/v1/products/${products[0].id}`, {
      headers: { "x-tenant-id": TENANT_ID },
    });
    check(getRes, { "product detail": (r) => r.status === 200 });
  }

  // Browse categories
  const catRes = http.get(`${BASE_URL}/api/v1/categories`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
  check(catRes, { "categories listed": (r) => r.status === 200 });

  sleep(1);
}

// Run: k6 run tests/load/api-load-test.js -e BASE_URL=https://staging.api.com -e TENANT_ID=abc
```

---

## 8. Module Structure Additions

```
src/
└── modules/
    ├── cache/
    │   ├── cache.module.ts
    │   ├── cache-invalidation.service.ts
    │   └── decorators/
    │       └── tenant-cache.decorator.ts
    └── health/
        ├── health.module.ts
        └── health.controller.ts
```

---

## 9. Test Cases

| #   | Scenario                     | Steps                               | Expect                                                  |
| --- | ---------------------------- | ----------------------------------- | ------------------------------------------------------- |
| 1   | Cache hit — product detail   | Request same product twice          | 2nd request returns faster (HTTP header `x-cache: HIT`) |
| 2   | Cache invalidation           | Update product, then GET            | Returns new data, not stale                             |
| 3   | Cache TTL expiry             | Cache product, wait 61s             | Cache miss, fresh from DB                               |
| 4   | Rate limit exceeded          | Send 31 requests to public endpoint | 31st returns 429                                        |
| 5   | Admin bypasses rate limit    | Admin sends 150 requests            | No 429 (200 limit)                                      |
| 6   | Health check                 | `GET /health`                       | `{ status: "ok" }`                                      |
| 7   | Readiness — DB down          | Stop PostgreSQL                     | `ready` returns database: error                         |
| 8   | CORS — allowed origin        | Request from `https://example.com`  | Works (no CORS error)                                   |
| 9   | CORS — disallowed origin     | Request from `https://evil.com`     | Blocked (CORS error)                                    |
| 10  | Graceful shutdown            | Send SIGTERM                        | In-flight requests complete; no dropped connections     |
| 11  | k6 — 50 concurrent users     | Run load test                       | P(95) response < 500ms                                  |
| 12  | Error filter — Prisma P2002  | Duplicate slug                      | 409 with code: CONFLICT                                 |
| 13  | Bundle analysis              | Run `npm run analyze`               | All chunks within budget                                |
| 14  | Storybook — component states | Visit Button stories                | All variants render without error                       |
