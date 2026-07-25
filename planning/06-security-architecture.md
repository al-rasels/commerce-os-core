# Security Architecture

## 1. Authentication Flow (JWT RS256)

```
┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────┐
│  Client   │    │  Auth Module │    │  Prisma  │    │  Redis   │
└─────┬────┘    └──────┬───────┘    └────┬─────┘    └────┬─────┘
      │                │                 │               │
      │ POST /auth/register              │               │
      │ { email, password }              │               │
      │───────────────→│                 │               │
      │                │ hash(password)  │               │
      │                │─────────────────│               │
      │                │←────────────────│               │
      │                │ create user     │               │
      │                │─────────────────→               │
      │                │←────────────────                 │
      │  { accessToken, refreshToken }   │               │
      │←───────────────│                                   │
      │                │                                   │
      │ POST /auth/login                  │               │
      │ { email, password }              │               │
      │───────────────→│                                   │
      │                │ verify hash                     │
      │                │ store refreshToken ─────────────→│
      │  { accessToken, refreshToken }   │               │
      │←───────────────│                                   │
      │                │                                   │
      │ POST /auth/refresh                │               │
      │ { refreshToken }                │               │
      │───────────────→│                                   │
      │                │ validate in Redis ←──────────────│
      │                │ rotate refreshToken ────────────→│
      │  { accessToken, refreshToken }   │               │
      │←───────────────│                                   │
```

### Token Lifecycle

| Stage                | What Happens                                                                  |
| -------------------- | ----------------------------------------------------------------------------- |
| Login                | Verify password → issue access(15m) + refresh(7d) → store refresh in Redis    |
| Request              | Client sends `Authorization: Bearer <accessToken>` → guard decodes + verifies |
| Access expired (401) | Client calls `/auth/refresh` with refresh token                               |
| Refresh valid        | Issue new access + rotate refresh (old invalidated)                           |
| Refresh expired      | Client must re-login                                                          |
| Logout               | Revoke refresh token in Redis                                                 |

---

## 2. JWT Structure

Signed with **RS256** (asymmetric RSA). Public key served at `/.well-known/jwks.json`.

### Access Token (15 min)

```json
{
  "sub": "user-uuid",
  "tenant_id": "tenant-uuid",
  "role": "admin",
  "permissions": ["product:read", "product:write", "order:read"],
  "type": "access",
  "iat": 1712000000,
  "exp": 1712000900
}
```

### Refresh Token (7 days)

```json
{
  "sub": "user-uuid",
  "jti": "unique-token-id",
  "type": "refresh",
  "iat": 1712000000,
  "exp": 1712604800
}
```

| Property            | Access Token             | Refresh Token                 |
| ------------------- | ------------------------ | ----------------------------- |
| TTL                 | 15 minutes               | 7 days                        |
| Algorithm           | RS256                    | RS256                         |
| Stored server-side  | No (stateless)           | Yes (Redis, keyed by jti)     |
| Carries permissions | Yes                      | No                            |
| Rotation on use     | N/A                      | Yes (old revoked, new issued) |
| Revocable           | No (short TTL mitigates) | Yes (delete from Redis)       |

---

## 3. Password Handling

| Concern          | Implementation                                                   |
| ---------------- | ---------------------------------------------------------------- |
| Hashing          | `bcrypt` with cost factor **12** (`~250ms per hash`)             |
| Peppering        | HMAC-SHA256(password, pepper) before bcrypt; pepper from env     |
| Storage          | `password_hash` column only — never plaintext                    |
| Password history | Last 5 hashes stored in `password_history` table; prevents reuse |
| Min length       | 8 characters (validated by class-validator)                      |
| Strength check   | zxcvbn-ts on registration; reject score < 2                      |
| Reset flow       | Time-limited token (15 min), stored hashed in DB                 |

```
┌──────────────────────────────────────────────┐
│  password submission                         │
│    → HMAC(password, PEPPER) → derived        │
│      → bcrypt(derived, cost=12) → hash       │
│        → store in users.password_hash        │
│        → push to password_history (keep 5)   │
└──────────────────────────────────────────────┘
```

---

## 4. CSRF Protection

Double-submit cookie pattern — **not** synchronizer token (no server-side storage).

```
Client                          Server
  │                                │
  │ POST /api/orders              │
  │ Cookie: csrf_token=<random>   │
  │ Header: X-CSRF-Token=<random> │
  │───────────────────────────────→│
  │                                │  Compare cookie vs header
  │                                │  Reject if mismatch / missing
  │ 201 Created                    │
  │←───────────────────────────────│
```

| Setting          | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| Cookie name      | `csrf_token`                                                       |
| Cookie httpOnly  | `false` (JS needs to read for header copy)                         |
| Cookie Secure    | `true` (prod) / `false` (dev)                                      |
| Cookie SameSite  | `Strict`                                                           |
| Header name      | `X-CSRF-Token`                                                     |
| Token generation | `crypto.randomUUID()` per session                                  |
| Token length     | 36 chars (UUID v4)                                                 |
| Validation       | `CsrfGuard` — decorator on all mutating routes (`POST/PUT/DELETE`) |
| Exempt           | Webhook endpoints (Stripe) — signature verified instead            |

---

## 5. Rate Limiting

### Configuration

```typescript
// app.module.ts
ThrottlerModule.forRoot({
  throttlers: [
    { name: "global", ttl: 60_000, limit: 200 }, // 200 req/min global
  ],
});
```

### Per-Route Overrides

| Role          | Endpoint         | Limit                                | Burst      |
| ------------- | ---------------- | ------------------------------------ | ---------- |
| Anonymous     | Any              | 20 req/min                           | 5 req/10s  |
| Authenticated | Any              | 100 req/min                          | 20 req/10s |
| Admin         | Any              | 200 req/min                          | 50 req/10s |
| All           | `/auth/login`    | 10 req/min                           | 3 req/10s  |
| All           | `/auth/register` | 5 req/min                            | 2 req/10s  |
| All           | `/auth/refresh`  | 20 req/min                           | 10 req/10s |
| All           | Stripe webhook   | 100 req/min (by source IP whitelist) | N/A        |

### Burst Handling

```
Request → ThrottlerGuard
  → Check Redis sliding window counter
    → Under limit? → allow, increment counter
    → Over limit?  → return 429 with headers:
        Retry-After: <seconds>
        X-RateLimit-Limit: <limit>
        X-RateLimit-Remaining: 0
        X-RateLimit-Reset: <timestamp>
```

---

## 6. CORS Configuration

```typescript
// main.ts
app.enableCors({
  origin: [
    "https://app.commerceos.com",
    "https://admin.commerceos.com",
    /\.vercel\.app$/,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Idempotency-Key",
    "X-Tenant-Id",
  ],
  exposedHeaders: ["X-Request-Id", "Retry-After"],
  maxAge: 86400,
});
```

| Setting       | Value                                  | Rationale                              |
| ------------- | -------------------------------------- | -------------------------------------- |
| `credentials` | `true`                                 | Cookies (CSRF, session) must be sent   |
| `methods`     | GET, POST, PUT, PATCH, DELETE, OPTIONS | RESTful                                |
| `maxAge`      | 86400 (24h)                            | Cache preflight — reduce OPTIONS calls |
| Wildcard      | Not allowed with credentials           | Must use explicit origins              |

---

## 7. Helmet Configuration

```typescript
// main.ts
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://*.commerceos.com"],
        connectSrc: ["'self'", "https://api.commerceos.com"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true,
  }),
);
```

| Directive                | Value                       | Purpose                              |
| ------------------------ | --------------------------- | ------------------------------------ |
| `default-src`            | `'self'`                    | Block all unexpected origins         |
| `script-src`             | `'self'`                    | No inline scripts unless hashed      |
| `style-src`              | `'self'`, `'unsafe-inline'` | Required for CSS-in-JS               |
| `frame-ancestors`        | `'none'`                    | Clickjacking prevention              |
| `form-action`            | `'self'`                    | No form submission to external hosts |
| `X-Content-Type-Options` | `nosniff`                   | MIME sniffing prevention             |
| `X-Frame-Options`        | `DENY`                      | Clickjacking (legacy fallback)       |

---

## 8. Input Validation

| Layer          | Tool                                                 | What It Prevents                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------- |
| DTO validation | `class-validator` + `ValidationPipe`                 | Type coercion, malformed input, constraint bypass |
| Whitelist      | `whitelist: true` in ValidationPipe                  | Unknown property injection                        |
| XSS            | `sanitize-html` on user content                      | Stored XSS in metafields, descriptions            |
| HTML strip     | `stripTags` transformer on text fields               | Accidental markup injection                       |
| NoSQL          | N/A (PostgreSQL — not vulnerable to NoSQL injection) | —                                                 |
| SQL injection  | **Prisma parameterized queries** (always)            | SQLi (Prisma uses `$1`, `$2` placeholders)        |
| Prisma raw     | Forbidden in app code — must use query builder       | Raw SQL injection via interpolated strings        |

### Whitelist Mode

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Throw on unknown properties (dev)
    transform: true, // Auto-type conversion
    forbidUnknownValues: true, // Reject if no whitelist at all
  }),
);
```

---

## 9. OWASP Top 10 2021 — Mitigation Mapping

| #   | Category                  | Commerce OS Mitigation                                      | Status |
| --- | ------------------------- | ----------------------------------------------------------- | ------ |
| A01 | Broken Access Control     | RBAC + PermissionGuard + TenantGuard (row-level)            | ✅     |
| A02 | Cryptographic Failures    | bcrypt(12), RS256 JWT, TLS 1.3, pepper                      | ✅     |
| A03 | Injection                 | Prisma param queries + class-validator whitelist            | ✅     |
| A04 | Insecure Design           | Auth before rate-limit; CSRF on state-changing ops          | ✅     |
| A05 | Security Misconfiguration | Helmet, CORS whitelist, env-based configs                   | ✅     |
| A06 | Vulnerable Components     | Dependabot + Snyk weekly scans; lockfile audit in CI        | ✅     |
| A07 | ID & Auth Failures        | JWT short TTL, refresh rotation, rate-limit on auth         | ✅     |
| A08 | Data Integrity Failures   | Idempotency keys on orders, Stripe webhook sig verification | ✅     |
| A09 | Logging & Monitoring      | Audit log on all state changes; Sentry on 5xx               | ✅     |
| A10 | SSRF                      | Outbound HTTP restricted; no user-controlled URL fetch      | ✅     |

---

## 10. Secret Management

### .env Template

```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/commerce_os
REDIS_URL=redis://:password@host:6379
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
PEPPER=hex-64-char-random-string
CSRF_SECRET=hex-32-char-random-string

# Optional (prod defaults)
PORT=3000
CORS_ORIGINS=https://app.commerceos.com,https://admin.commerceos.com
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

| Principle          | Practice                                                          |
| ------------------ | ----------------------------------------------------------------- |
| No secrets in code | `.env` only; `.env` in `.gitignore`                               |
| Rotation           | Keys rotated every 90 days; overlap period supported              |
| Audit              | Secret access logged via audit log when used                      |
| CI/CD              | Secrets injected via GitHub Actions secrets, never in YAML        |
| Dev defaults       | `docker-compose` provides local Postgres + Redis; no real secrets |
| Key generation     | `openssl genrsa -out private.pem 2048` for JWT key pair           |
| Pepper rotation    | Support 2 active peppers; rehash on next login                    |

---

## 11. Audit Logging

### What Gets Logged

| Event                     | Fields                                     | Retention |
| ------------------------- | ------------------------------------------ | --------- |
| Login success             | actor_id, ip, user_agent, timestamp        | 90 days   |
| Login failure             | email (attempted), ip, reason, timestamp   | 90 days   |
| Logout                    | actor_id, timestamp                        | 30 days   |
| Token refresh             | actor_id, old_jti, new_jti, timestamp      | 30 days   |
| User create/update/delete | actor_id, target_id, diff, timestamp       | 90 days   |
| Order state change        | actor_id, order_id, from_status, to_status | 365 days  |
| Payment event             | actor_id, order_id, amount, status         | 365 days  |
| Product CRUD              | actor_id, product_id, diff, timestamp      | 90 days   |
| Role/permission change    | actor_id, role_id, permissions_diff        | 365 days  |
| API key operations        | actor_id, key_prefix, action, timestamp    | 90 days   |

### Log Format

```json
{
  "id": "uuid",
  "tenant_id": "uuid",
  "actor_id": "uuid",
  "action": "order.status_changed",
  "entity": "order",
  "entity_id": "order-uuid",
  "diff": { "status": { "from": "pending", "to": "confirmed" } },
  "metadata": { "reason": "payment_confirmed" },
  "ip_address": "203.0.113.1",
  "user_agent": "Mozilla/5.0 ...",
  "created_at": "2026-07-25T12:00:00Z"
}
```

### Retention & Cleanup

- Stored in `audit_log` PostgreSQL table
- Retention enforced by `pg_cron` job — daily DELETE of expired rows
- Partitioned by `created_at` month for efficient pruning
- TTL configurable per action type via `audit_config` table
- Hot path (current month) on primary; cold path archived to cold storage after 12 months

---

## 12. Security Headers (Complete)

| Header                         | Value                                          | Source                  |
| ------------------------------ | ---------------------------------------------- | ----------------------- |
| `Strict-Transport-Security`    | `max-age=31536000; includeSubDomains; preload` | Helmet                  |
| `X-Frame-Options`              | `DENY`                                         | Helmet                  |
| `X-Content-Type-Options`       | `nosniff`                                      | Helmet                  |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`              | Helmet                  |
| `X-XSS-Protection`             | `0` (deprecated, disabled)                     | Helmet                  |
| `Permissions-Policy`           | `camera=(), microphone=(), geolocation=()`     | Helmet                  |
| `Content-Security-Policy`      | `default-src 'self'; ...`                      | Helmet                  |
| `Cross-Origin-Embedder-Policy` | `require-corp`                                 | Custom                  |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                  | Custom                  |
| `Cross-Origin-Resource-Policy` | `same-origin`                                  | Custom                  |
| `Cache-Control`                | `no-store` (on auth endpoints)                 | Custom                  |
| `X-Request-Id`                 | `uuid` (per request)                           | Interceptor             |
| `X-RateLimit-Limit`            | `100` (per route)                              | ThrottlerGuard (on 429) |
| `X-RateLimit-Remaining`        | `42`                                           | ThrottlerGuard (on 429) |
| `Retry-After`                  | `15`                                           | ThrottlerGuard (on 429) |

### Response Header Pipeline

```
Incoming Request
  → Helmet (security headers)
    → RequestIdInterceptor (X-Request-Id)
      → ThrottlerGuard (rate-limit headers)
        → AuthGuard → Controller → Response
```
