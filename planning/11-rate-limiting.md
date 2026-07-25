# Rate Limiting

## 1. Problem

Current throttle is a single global rule — every request counts against the same bucket regardless of who sent it.

| Issue                       | Impact                                                                   |
| --------------------------- | ------------------------------------------------------------------------ |
| No per-user differentiation | Anonymous and authenticated users share same limit                       |
| No tiered enforcement       | Admins blocked alongside anonymous after global cap                      |
| No auth endpoint protection | `/auth/login` and `/auth/register` vulnerable to brute force             |
| No Redis-backed storage     | In-memory counters reset on pod restart; inaccurate under load balancing |

---

## 2. Solution

Use `@nestjs/throttler` with a custom `ThrottlerGuard` that reads user ID and role from the JWT payload. Storage backed by Redis via `@nestjs/throttler-storage-redis`.

### Dependency

```bash
npm install @nestjs/throttler @nestjs/throttler-storage-redis ioredis
```

### Module Registration

```typescript
// app.module.ts
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from "@nestjs/throttler-storage-redis";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ name: "global", ttl: 60_000, limit: 200 }],
      storage: new ThrottlerStorageRedisService(redisClient),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CommerceThrottlerGuard,
    },
  ],
})
export class AppModule {}
```

---

## 3. Tiered Limits

| Tier           | Limit   | TTL        | Applied To                                      | Tracker Key                          |
| -------------- | ------- | ---------- | ----------------------------------------------- | ------------------------------------ |
| Anonymous      | 20 req  | 60s        | All unauthenticated requests                    | `anon:{ip}`                          |
| Authenticated  | 100 req | 60s        | Users with valid JWT                            | `user:{userId}`                      |
| Admin          | 200 req | 60s        | `admin` / `manager` roles                       | `admin:{userId}`                     |
| Auth endpoints | 5 req   | 900s (15m) | `/auth/login`, `/auth/register` per email or IP | `auth:email:{email}`, `auth:ip:{ip}` |

### Guard Logic

```
Request → CommerceThrottlerGuard
  → Extract user from JWT (req.user)
    → user exists?
      → Yes → role === 'admin' || role === 'manager'?
        → Yes → use admin tier (200 req/60s, tracker: admin:{userId})
        → No  → use authenticated tier (100 req/60s, tracker: user:{userId})
      → No  → use anonymous tier (20 req/60s, tracker: anon:{ip})
  → Increment Redis counter
    → Under limit? → allow, decrement remaining
    → Over limit?  → return 429 with Retry-After
```

---

## 4. Custom ThrottlerGuard

```typescript
// src/common/guards/commerce-throttler.guard.ts
import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { Reflector } from "@nestjs/core";
import { ThrottlerStorageRedisService } from "@nestjs/throttler-storage-redis";

@Injectable()
export class CommerceThrottlerGuard extends ThrottlerGuard {
  constructor(
    private readonly reflector: Reflector,
    storageService: ThrottlerStorageRedisService,
  ) {
    super(
      [{ name: "global", ttl: 60_000, limit: 200 }],
      storageService,
      reflector,
    );
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const user = req.user;

    if (!user) {
      return `anon:${req.ip}`;
    }

    if (user.role === "admin" || user.role === "manager") {
      return `admin:${user.sub}`;
    }

    return `user:${user.sub}`;
  }

  protected getLimitAndTtl(
    context: ExecutionContext,
    options: { name: string; ttl: number; limit: number }[],
  ): { limit: number; ttl: number } {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) return { limit: 20, ttl: 60_000 };
    if (user.role === "admin" || user.role === "manager") {
      return { limit: 200, ttl: 60_000 };
    }
    return { limit: 100, ttl: 60_000 };
  }
}
```

### Auth Endpoint Override

```typescript
// src/auth/auth.controller.ts
@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900_000 } })
  async login(@Body() dto: LoginDto) { ... }

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 900_000 } })
  async register(@Body() dto: RegisterDto) { ... }
}
```

The auth guard additionally applies a dual-tracker (email + IP) inside the controller for brute-force blocking.

---

## 5. Storage — Redis

```typescript
// redis-config.service.ts
import { Redis } from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

export const throttlerStorage = new ThrottlerStorageRedisService(redisClient);
```

### Redis Key Structure

| Key Pattern                    | Example                                 | TTL  |
| ------------------------------ | --------------------------------------- | ---- |
| `throttler:anon:{ip}`          | `throttler:anon:203.0.113.5`            | 60s  |
| `throttler:user:{userId}`      | `throttler:user:a1b2c3d4`               | 60s  |
| `throttler:admin:{userId}`     | `throttler:admin:e5f6g7h8`              | 60s  |
| `throttler:auth:email:{email}` | `throttler:auth:email:user@example.com` | 900s |
| `throttler:auth:ip:{ip}`       | `throttler:auth:ip:203.0.113.5`         | 900s |

Storage uses a **sliding window** algorithm — Redis `INCR` with `EXPIRE` on first increment.

---

## 6. Custom Decorators

### `@Throttle()` — Override per Endpoint

```typescript
import { Throttle } from '@nestjs/throttler';

// Override limit for a specific endpoint
@Throttle({ default: { limit: 50, ttl: 60_000 } })
@Get('heavy-report')
async generateReport() { ... }

// Multiple throttlers
@Throttle({
  short: { limit: 10, ttl: 1_000 },
  long: { limit: 100, ttl: 60_000 },
})
@Post('bulk-import')
async bulkImport() { ... }
```

### `@SkipThrottle()` — Exempt Endpoints

```typescript
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Get('health')
async healthCheck() { ... }

// Skip a specific throttler by name
@SkipThrottle({ global: true })
@Get('metrics')
async metrics() { ... }
```

| Decorator                                      | Effect                                          |
| ---------------------------------------------- | ----------------------------------------------- |
| `@Throttle({ default: { limit: X, ttl: Y } })` | Override limit for this route                   |
| `@SkipThrottle()`                              | Bypass all throttling (health checks, webhooks) |
| `@SkipThrottle({ global: true })`              | Skip only named throttler `global`              |

---

## 7. Response Headers

Every rate-limited response includes standard headers from `@nestjs/throttler`:

| Header                  | Description                                   | Example      |
| ----------------------- | --------------------------------------------- | ------------ |
| `X-RateLimit-Limit`     | Maximum requests allowed in the window        | `100`        |
| `X-RateLimit-Remaining` | Requests remaining in the current window      | `42`         |
| `X-RateLimit-Reset`     | Epoch timestamp when the window resets        | `1712001000` |
| `Retry-After`           | Seconds to wait before retrying (on 429 only) | `15`         |

### 429 Error Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please retry after 15 seconds.",
    "details": {
      "retryAfter": 15,
      "limit": 100
    }
  }
}
```

### Header Injection Flow

```
ThrottlerGuard catches over-limit
  → Sets Retry-After header
  → Throws ThrottlerException
    → ExceptionFilter catches → maps to { success: false, code: "RATE_LIMITED" }
      → Response sent with rate-limit headers + 429 status
```

---

## 8. Guard Order in Pipeline

```
Incoming Request
  → CommerceThrottlerGuard (rate-limit check BEFORE auth)
    → JwtAuthGuard (authenticate)
      → TenantGuard (scope)
        → PermissionGuard (authorize)
          → Controller
```

Rate-limiting happens **before** auth to remain stateless for anonymous requests. The guard determines the tier based on whether `req.user` is populated (set by a preceding middleware that optionally decodes the JWT without rejecting).

---

## 9. Test Cases

### Anonymous Hits Limit

```typescript
it("returns 429 when anonymous exceeds 20 requests per 60s", async () => {
  const promises = Array.from({ length: 21 }, (_, i) =>
    request(app.getHttpServer())
      .get("/api/v1/commerce/products")
      .set("X-Forwarded-For", `203.0.113.${i % 5}`),
  );
  await Promise.all(promises);

  const res = await request(app.getHttpServer())
    .get("/api/v1/commerce/products")
    .set("X-Forwarded-For", "203.0.113.1");

  expect(res.status).toBe(429);
  expect(res.headers["retry-after"]).toBeDefined();
  expect(res.headers["x-ratelimit-remaining"]).toBe("0");
});
```

### Authenticated Has Higher Limit

```typescript
it("allows authenticated user up to 100 requests per 60s", async () => {
  const token = await getAuthToken();

  for (let i = 0; i < 100; i++) {
    const res = await request(app.getHttpServer())
      .get("/api/v1/commerce/products")
      .set("Authorization", `Bearer ${token}`);
    if (res.status === 429) break;
  }

  const final = await request(app.getHttpServer())
    .get("/api/v1/commerce/products")
    .set("Authorization", `Bearer ${token}`);

  expect(final.status).toBe(429);
});
```

### Admin Not Throttled

```typescript
it("allows admin 200 requests before throttling", async () => {
  const token = await getAdminToken();

  for (let i = 0; i < 200; i++) {
    const res = await request(app.getHttpServer())
      .get("/api/v1/platform/tenants")
      .set("Authorization", `Bearer ${token}`);
    if (res.status === 429) break;
  }

  const final = await request(app.getHttpServer())
    .get("/api/v1/platform/tenants")
    .set("Authorization", `Bearer ${token}`);

  expect(final.status).toBe(429);
});
```

### Auth Endpoint Brute Force Blocked

```typescript
it("blocks auth endpoint after 5 rapid attempts per email", async () => {
  const email = "test@example.com";

  for (let i = 0; i < 5; i++) {
    const res = await request(app.getHttpServer())
      .post("/api/v1/auth/login")
      .send({ email, password: "wrong" });
    expect(res.status).toBe(401); // Valid auth failure
  }

  const blocked = await request(app.getHttpServer())
    .post("/api/v1/auth/login")
    .send({ email, password: "correct" });

  expect(blocked.status).toBe(429);
  expect(blocked.body.error.code).toBe("RATE_LIMITED");
});
```

---

## 10. Edge Cases & Mitigations

| Edge Case                        | Mitigation                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Redis unavailable                | `ThrottlerStorageRedisService` throws → guard fails open (allow request) OR fails closed (deny). Configured to **fail open** in prod. |
| IP behind proxy                  | Trust `X-Forwarded-For` header via `app.set('trust proxy', 1)` in main.ts                                                             |
| Load balancer health checks      | `@SkipThrottle()` on `/health` ensures LBs never trigger rate limits                                                                  |
| Burst traffic at window boundary | Sliding window algorithm prevents reset-guzzling                                                                                      |
| User ID collision edge           | Tracker includes prefix (`anon:`, `user:`, `admin:`) — namespaced keys                                                                |
| Per-email vs per-IP on auth      | Both tracked independently; either hitting limit blocks the request                                                                   |
