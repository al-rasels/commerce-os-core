# Feature 0.4 — CSRF Protection

## 1. Problem

State-changing endpoints (POST/PUT/PATCH/DELETE) are vulnerable to CSRF. An attacker can craft a malicious page that submits a cross-origin form to `POST /api/orders`, and the browser automatically includes the session cookie. Without CSRF protection, the server cannot distinguish the forged request from a legitimate one.

Commerce OS uses cookie-based auth for server-rendered pages (admin panel) and will use `Authorization: Bearer` headers for the SPA. The POST/PUT/PATCH/DELETE endpoints in the admin context must be protected.

## 2. Solution — Double-Submit Cookie Pattern

No server-side token storage. The server sets a random token as a non-httpOnly cookie. Client-side JS reads the cookie and copies its value into a custom header. The server compares cookie vs header.

| Aspect                         | Synchronizer Token         | Double-Submit Cookie (chosen) |
| ------------------------------ | -------------------------- | ----------------------------- |
| Server state                   | Token stored in session    | None (stateless)              |
| Memory cost                    | O(n) active tokens         | O(0)                          |
| Works with Bearer-only clients | Yes (header only)          | Yes (cookie + header)         |
| Works with cookie-auth clients | Yes                        | Yes                           |
| Implementation complexity      | Higher (storage + cleanup) | Lower                         |

## 3. How It Works

```
Browser                              Server
  │                                     │
  │ GET /admin/products                 │
  │────────────────────────────────────→│
  │                                     │  No csrf_token cookie? Generate
  │ Set-Cookie: commerce.csrf=<token>   │
  │   httpOnly=false, Secure, SameSite=Lax
  │←────────────────────────────────────│
  │                                     │
  │ (JS reads document.cookie,          │
  │  sets X-CSRF-Token header)          │
  │                                     │
  │ POST /api/orders                    │
  │ Cookie: commerce.csrf=<token>       │
  │ X-CSRF-Token: <token>              │
  │────────────────────────────────────→│
  │                                     │  Compare cookie vs header
  │ 201 Created                         │  Match → allow
  │←────────────────────────────────────│
  │                                     │
  │ POST /api/orders                    │
  │ Cookie: commerce.csrf=<token>       │
  │ X-CSRF-Token: EVIL                 │
  │────────────────────────────────────→│
  │                                     │  Compare cookie vs header
  │ 403 Forbidden                       │  Mismatch → reject + clear cookie
  │←────────────────────────────────────│
```

### Why the browser cannot forge the header

| Attack vector                          | Why it fails                                                             |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `<form>` POST                          | Forms can send cookies but cannot set custom headers                     |
| `<img>` / `<script>`                   | GET only                                                                 |
| `fetch()` cross-origin                 | SameSite=Strict blocks cookie; even if sent, JS cannot read the response |
| `XMLHttpRequest` cross-origin          | Preflight OPTIONS fails CORS without matching origin                     |
| Attacker reads victim's cookie via XSS | XSS is a separate vulnerability — outside CSRF threat model              |

The double-submit pattern relies on the same-origin policy blocking cross-origin JS from reading the cookie value. The attacker's page can send the cookie (automatic), but cannot read it (httpOnly=false is irrelevant cross-origin) nor construct the matching header.

## 4. Implementation — NestJS Middleware

```typescript
// src/common/middleware/csrf.middleware.ts

import { Injectable, NestMiddleware, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as crypto from "node:crypto";

const COOKIE_NAME = "commerce.csrf";
const HEADER_NAME = "x-csrf-token";
const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];
const TOKEN_BYTES = 32;

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (SAFE_METHODS.includes(req.method)) {
      const existing = req.cookies[COOKIE_NAME];
      if (!existing) {
        const token = crypto.randomBytes(TOKEN_BYTES).toString("hex");
        res.cookie(COOKIE_NAME, token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
      }
      return next();
    }

    const cookieToken = req.cookies?.[COOKIE_NAME];
    const headerToken = req.headers[HEADER_NAME] as string | undefined;

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      res.clearCookie(COOKIE_NAME, { path: "/" });
      res.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Invalid or missing CSRF token",
        error: "Forbidden",
      });
      return;
    }

    next();
  }
}
```

### Registration

```typescript
// src/app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({ ... })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CsrfMiddleware)
      .exclude(
        { path: 'webhooks/stripe', method: RequestMethod.POST },
        { path: 'webhooks/shipping', method: RequestMethod.POST },
        { path: 'uploads/public', method: RequestMethod.POST },
        { path: 'uploads/public', method: RequestMethod.PUT },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
```

### Request flow

```
Incoming Request
  → CookieParser middleware (express cookie-parser)
    → CsrfMiddleware
      → Helmet
        → ThrottlerGuard
          → AuthGuard → Controller → Response
```

## 5. Exempt Endpoints

| Endpoint             | Method   | Rationale                                                                                           |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `/webhooks/stripe`   | POST     | Stripe signs payloads with `stripe-signature` — verified separately. No browser context.            |
| `/webhooks/shipping` | POST     | External carrier webhook — no CSRF cookie present. Signature or IP-whitelist verified.              |
| `/uploads/public`    | POST/PUT | Unauthenticated file uploads (guest checkout attachments). CSRF token requires an existing session. |

Public webhooks from external services do not carry a CSRF cookie because they never received one. Requiring a token would break the integration. Signature verification is the correct control.

Unauthenticated upload endpoints cannot enforce a CSRF token because there is no prior GET to establish one. These are exempted and rely on rate limiting + size caps.

## 6. Cookie Configuration

| Setting    | Value                         | Rationale                                                                |
| ---------- | ----------------------------- | ------------------------------------------------------------------------ |
| `name`     | `commerce.csrf`               | Namespaced — avoids collision with other apps on same domain             |
| `httpOnly` | `false`                       | Client JS must read cookie to set the header                             |
| `secure`   | `true` (prod) / `false` (dev) | Prod: HTTPS only. Dev: localhost no cert                                 |
| `sameSite` | `strict`                      | Blocks cookie on cross-origin requests entirely (defense in depth)       |
| `path`     | `/`                           | Available to all routes                                                  |
| `maxAge`   | (not set)                     | Session cookie — cleared on browser close. Regenerated on each fresh GET |

### Why `httpOnly: false` is not a vulnerability

The cookie is only read by first-party JS running on the same origin. An attacker who already has XSS can read whichever value they like — the CSRF cookie is the least of their concerns. For all legitimate use cases, the cookie is read once by the SPA's HTTP client and copied to the header.

## 7. Header Name

```
X-CSRF-Token
```

Case-insensitive per HTTP spec. The middleware reads `req.headers['x-csrf-token']` which Express normalises from any casing. The client should send:

```javascript
fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": getCsrfToken(), // read from document.cookie
  },
  body: JSON.stringify(payload),
});
```

### Client-side helper

```typescript
// src/lib/csrf.ts

export function getCsrfToken(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)commerce\.csrf=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}
```

## 8. Token Generation

```typescript
import * as crypto from "node:crypto";

const token = crypto.randomBytes(32).toString("hex");
// Example: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b"
```

| Property              | Value                         |
| --------------------- | ----------------------------- |
| Algorithm             | `crypto.randomBytes` (CSPRNG) |
| Length                | 32 bytes → 64 hex chars       |
| Collision probability | Negligible (2^256 space)      |
| Entropy source        | OS entropy pool               |
| Predictability        | None (CSPRNG)                 |

No hashing, no signing — the token is a random value compared byte-by-byte. No server state means no revocation list, no expiry, no cleanup job. The token is valid for the life of the browser session.

## 9. Restore on Error

When a CSRF check fails:

1. The middleware clears the `commerce.csrf` cookie
2. The client receives a 403 response
3. The client should re-fetch the page (or make a GET to any protected route)
4. The next GET triggers cookie generation in the middleware

```
Failure: POST → 403, cookie cleared
  → Client GETs /admin/products
    → Middleware: no cookie → generate + set new commerce.csrf
      → Client retries POST with fresh token → succeeds
```

This prevents a stuck state where the client holds an expired/invalid token and can never recover. The cookie is regenerated on the next safe request automatically, with zero user-visible disruption (the 403 should trigger a silent retry in the SPA's HTTP layer).

## 10. Test Cases

```typescript
import * as request from 'supertest';
import * as cookie from 'cookie';

describe('CSRF Protection', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST without CSRF token returns 403', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ productId: 'p1', quantity: 1 });

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/csrf/i);
  });

  it('POST with matching header and cookie succeeds', async () => {
    const getRes = await request(app.getHttpServer())
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`);

    const cookies = cookie.parse(getRes.headers['set-cookie'].join(';'));
    const csrfToken = cookies['commerce.csrf'];

    const postRes = await request(app.getHttpServer())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-CSRF-Token', csrfToken)
      .set('Cookie', `commerce.csrf=${csrfToken}`)
      .send({ productId: 'p1', quantity: 1 });

    expect(postRes.status).toBe(201);
  });

  it('POST with mismatched token returns 403', async () => {
    const getRes = await request(app.getHttpServer())
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`);

    const cookies = cookie.parse(getRes.headers['set-cookie'].join(';'));
    const csrfToken = cookies['commerce.csrf'];

    const postRes = await request(app.getHttpServer())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('X-CSRF-Token', 'evil-token-value')
      .set('Cookie', `commerce.csrf=${csrfToken}`)
      .send({ productId: 'p1', quantity: 1 });

    expect(postRes.status).toBe(403);
  });

  it('GET request sets CSRF cookie when absent', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`);

    const setCookieHeader = res.headers['set-cookie'];
    expect(setCookieHeader).toBeDefined();
    expect(setCookieHeader.some((c: string) => c.startsWith('commerce.csrf='))).toBe(true);
  });

  it('existing CSRF cookie persists across GET requests', async () => {
    const res1 = await request(app.getHttpServer())
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`);

    const cookies = cookie.parse(res1.headers['set-cookie'].join(';'));
    const csrfToken = cookies['commerce.csrf'];

    const res2 = await request(app.getHttpServer())
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `commerce.csrf=${csrfToken}`);

    // Should NOT set a new cookie (already exists)
    expect(res2.headers['set-cookie']).toBeUndefined();
  });

  it('exempt webhook endpoint bypasses CSRF', async () => {
    const res = await request(app.getHttpServer())
      .post('/webhooks/stripe')
      .send({ type: 'payment_intent.succeeded', data: { ... } })
      .set('stripe-signature', 'valid-sig');

    expect(res.status).not.toBe(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### Test matrix

| Scenario                               | Cookie | Header | Result             |
| -------------------------------------- | ------ | ------ | ------------------ |
| POST with no cookie and no header      | —      | —      | 403                |
| POST with cookie but no header         | `abc`  | —      | 403                |
| POST with no cookie but header         | —      | `abc`  | 403                |
| POST with matching cookie and header   | `abc`  | `abc`  | 200/201            |
| POST with mismatched cookie and header | `abc`  | `def`  | 403                |
| GET without cookie                     | —      | —      | 200 + Set-Cookie   |
| GET with existing cookie               | `abc`  | —      | 200, no Set-Cookie |
| Exempt POST (webhook)                  | —      | —      | Bypasses check     |
| OPTIONS (preflight)                    | —      | —      | Bypasses check     |
