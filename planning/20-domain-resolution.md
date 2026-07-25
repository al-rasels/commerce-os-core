# Domain Resolution (Feature 2.2)

## 1. Purpose

Map each incoming HTTP request to the tenant it belongs to by reading the `Host` header and resolving it against the `TenantDomain` table. A single CommerceOS instance serves many tenants; domain resolution is the first transformation on every request.

## 2. TenantDomain Model

```prisma
model TenantDomain {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  domain     String   @unique // e.g. "store1.commerceos.com" or "custom.com"
  isPrimary  Boolean  @default(false) // primary domain → storefront
  sslEnabled Boolean  @default(false)
  verifiedAt DateTime?
  createdAt  DateTime @default(now())

  @@index([domain])
  @@index([tenantId])
}
```

| Column       | Type         | Notes                                     |
| ------------ | ------------ | ----------------------------------------- |
| `id`         | UUID         | PK                                        |
| `tenantId`   | UUID         | FK → tenants.id                           |
| `domain`     | VARCHAR(255) | Unique, lowercased on insert              |
| `isPrimary`  | Boolean      | Exactly one `isPrimary = true` per tenant |
| `sslEnabled` | Boolean      | AutoSSL flag                              |
| `verifiedAt` | TIMESTAMPTZ? | Null until DNS verification passes        |
| `createdAt`  | TIMESTAMPTZ  | Auto                                      |

## 3. Resolution Flow

```
Incoming Request
  → Extract Host header (e.g. "store1.commerceos.com:3000")
    → Strip port → lowercase → normalize
      → Check redis: tenant:domain:{domain}
        ┌─ HIT  → deserialize { tenantId } → attach to request
        └─ MISS → query TenantDomain WHERE domain = $1
                   ┌─ FOUND → redis.set(key, { tenantId }, EX 3600)
                   │          → attach tenantId to request
                   └─ NOT FOUND → check X-Tenant-Id header
                                   ┌─ PRESENT → use as tenantId
                                   └─ MISSING → return 404
```

### 3.1 Middleware

```typescript
// modules/tenant/domain-resolver.middleware.ts
import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { DomainCacheService } from "./domain-cache.service";
import { PrismaService } from "../../prisma/prisma.service";

export interface TenantRequest extends Request {
  tenantId?: string;
}

@Injectable()
export class DomainResolverMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: DomainCacheService,
  ) {}

  async use(
    req: TenantRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    // 1. X-Tenant-Id header takes precedence (admin API calls)
    const headerTenant = req.headers["x-tenant-id"];
    if (headerTenant && typeof headerTenant === "string") {
      req.tenantId = headerTenant;
      return next();
    }

    // 2. Resolve from Host header
    const host = req.headers["host"];
    if (!host) {
      throw new NotFoundException("Tenant not found");
    }

    const domain = host.split(":")[0].toLowerCase();
    let tenantId = await this.cache.get(domain);

    if (!tenantId) {
      const record = await this.prisma.tenantDomain.findUnique({
        where: { domain },
        select: { tenantId: true },
      });

      if (!record) {
        throw new NotFoundException("Tenant not found");
      }

      tenantId = record.tenantId;
      await this.cache.set(domain, tenantId);
    }

    req.tenantId = tenantId;
    next();
  }
}
```

### 3.2 Cache Service

```typescript
// modules/tenant/domain-cache.service.ts
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

const TTL = 3600; // 1 hour
const KEY_PREFIX = "tenant:domain:";

@Injectable()
export class DomainCacheService {
  constructor(private readonly redis: Redis) {}

  async get(domain: string): Promise<string | null> {
    const raw = await this.redis.get(`${KEY_PREFIX}${domain}`);
    if (!raw) return null;
    return JSON.parse(raw).tenantId;
  }

  async set(domain: string, tenantId: string): Promise<void> {
    await this.redis.setex(
      `${KEY_PREFIX}${domain}`,
      TTL,
      JSON.stringify({ tenantId }),
    );
  }

  async invalidate(domain: string): Promise<void> {
    await this.redis.del(`${KEY_PREFIX}${domain}`);
  }

  async invalidateByTenant(tenantId: string): Promise<void> {
    const pattern = `${KEY_PREFIX}*`;
    const keys = await this.redis.keys(pattern);
    // NOTE: use SCAN + pipeline in production; KEYS is dev-only
    const pipeline = this.redis.pipeline();
    for (const key of keys) {
      const raw = await this.redis.get(key);
      if (raw && JSON.parse(raw).tenantId === tenantId) {
        pipeline.del(key);
      }
    }
    await pipeline.exec();
  }
}
```

## 4. Header Priorities

| Priority    | Source                        | Use Case                            |
| ----------- | ----------------------------- | ----------------------------------- |
| 1 (highest) | `X-Tenant-Id` header          | Admin API calls, service-to-service |
| 2           | `Host` header → domain lookup | Storefront, public API              |

**Rationale:** Admin and internal services pass `X-Tenant-Id` explicitly to bypass domain resolution. This avoids requiring a dummy `Host` header for machine clients and makes tenant targeting unambiguous.

## 5. Multi-Domain

- One tenant may have **N** `TenantDomain` records.
- Exactly **one** per tenant has `isPrimary = true`.
- Primary domain is used for the storefront URL, canonical links, and email links.
- Secondary domains redirect to the primary at the reverse-proxy level (handled by Nginx/Caddy, not app code).

## 6. Verification Flow (DNS)

```
Admin requests domain verification
  → Backend generates verification token: crypto.randomUUID()
    → Stores token on TenantDomain record (separate column, not shown above)
      → Returns { domain, verificationToken, dnsRecord: "{token}.verify.commerceos.com TXT {token}" }
        → Admin adds TXT record at DNS provider
          → Admin calls POST /api/v1/tenant/domains/{id}/verify
            → Backend resolves TXT record at {token}.verify.{domain}
              ┌─ MATCHES stored token → verifiedAt = now()
              └─ MISMATCH or timeout  → return 400, retry
```

## 7. Module Structure

```
src/
└── modules/
    └── tenant/
        ├── tenant.module.ts
        ├── domain-resolver.middleware.ts
        ├── domain-cache.service.ts
        ├── domain-verification.service.ts
        └── guards/
            └── tenant.guard.ts       ← validates req.tenantId exists
```

**Wiring:**

```typescript
// tenant.module.ts
@Module({
  imports: [PrismaModule, RedisModule],
  providers: [DomainCacheService],
  exports: [DomainCacheService],
})
export class TenantModule {}
```

```typescript
// app.module.ts — middleware registration
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DomainResolverMiddleware).forRoutes("*");
  }
}
```

## 8. Test Cases

```typescript
describe("DomainResolverMiddleware", () => {
  it("resolves tenantId from Host header");
  it("returns cached value without querying DB");
  it("falls back to X-Tenant-Id header when Host is unknown");
  it("X-Tenant-Id overrides Host resolution (admin priority)");
  it("returns 404 when neither Host nor X-Tenant-Id resolves");
  it("returns 404 when Host header is missing");
  it("strips port from Host header before lookup");
  it(
    'is case-insensitive — "Store1.Commerceos.Com" matches "store1.commerceos.com"',
  );

  describe("DomainCacheService", () => {
    it("caches resolved tenantId for 1 hour");
    it("returns null for uncached domain");
    it("invalidates single domain on demand");
    it("invalidates all domains for a tenant");
  });

  describe("Multi-domain", () => {
    it("resolves all domains to the same tenantId");
    it("identifies primary domain");
  });
});
```

## 9. Error Responses

| Scenario                       | Status | Body                                                                            |
| ------------------------------ | ------ | ------------------------------------------------------------------------------- |
| Unknown domain                 | 404    | `{ "code": "TENANT_NOT_FOUND", "message": "No tenant found for this domain" }`  |
| Missing Host + X-Tenant-Id     | 404    | `{ "code": "TENANT_NOT_FOUND", "message": "No tenant identifier provided" }`    |
| Unverified domain used for API | 403    | `{ "code": "DOMAIN_NOT_VERIFIED", "message": "Domain ownership not verified" }` |
