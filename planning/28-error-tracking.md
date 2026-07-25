# 28 — Error Tracking (Sentry)

**Feature:** 3.6  
**Status:** Spec  
**Target:** `@sentry/node` + `@sentry/nestjs` — DSN from env, fingerprinting, PII scrubbing, performance spans, Pino transport, alert rules.

---

## 1. Sentry SDK Init

```ts
// src/bootstrap/sentry.ts
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
    release: `commerce-os@${process.env.npm_package_version ?? "0.0.0"}`,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    profilesSampleRate: 0.1,
    integrations: [nodeProfilingIntegration()],
    beforeSend,
    normalizeDepth: 6,
  });
}
```

| Env var               | Required            | Default       |
| --------------------- | ------------------- | ------------- |
| `SENTRY_DSN`          | Yes if using Sentry | —             |
| `NODE_ENV`            | No                  | `development` |
| `npm_package_version` | No                  | `0.0.0`       |

---

## 2. NestJS Exception Filter

Catches handled domain errors (thrown via `throw`) and unhandled crashes. Registered as a **global** filter.

```ts
// src/common/filters/sentry-exception.filter.ts
import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import * as Sentry from "@sentry/node";

@Catch()
export class SentryExceptionFilter extends BaseExceptionFilter {
  override catch(exception: unknown, host: ArgumentsHost) {
    const isHttp = exception instanceof HttpException;

    Sentry.withScope((scope) => {
      if (isHttp) {
        scope.setTag("http_status", exception.getStatus());
        scope.setTag("exception_type", "HttpException");
        if (exception.getStatus() < 500) return; // 4xx → capture but don't alert
      } else {
        scope.setTag("exception_type", "Unhandled");
      }
      if (!isHttp) {
        Sentry.captureException(exception);
      }
    });

    super.catch(exception, host);
  }
}
```

| Behaviour     | 4xx                   | 5xx / Unhandled |
| ------------- | --------------------- | --------------- |
| Captured      | Yes (no notification) | Yes             |
| Fingerprinted | By body shape         | By stack        |
| Alert         | No                    | Yes             |

---

## 3. Source Maps

Upload on every production build / CI release.

**CLI (CI step):**

```bash
npx @sentry/cli releases new "$SENTRY_RELEASE" --org "$SENTRY_ORG" --project "$SENTRY_PROJECT"
npx @sentry/cli releases files "$SENTRY_RELEASE" upload-sourcemaps ./dist \
  --ext ts --ext js --ext map \
  --rewrite --strip-prefix "$PWD"
npx @sentry/cli releases finalize "$SENTRY_RELEASE"
```

**`sentry.properties` (optional override):**

```properties
defaults.org=commerce-os
defaults.project=api
auth.token=${SENTRY_AUTH_TOKEN}
```

| CI var                          | Source                          |
| ------------------------------- | ------------------------------- |
| `SENTRY_AUTH_TOKEN`             | GH secret                       |
| `SENTRY_ORG` / `SENTRY_PROJECT` | Repo env                        |
| `SENTRY_RELEASE`                | `commerce-os@${{ github.sha }}` |

---

## 4. Error Fingerprinting

```ts
// inside beforeSend (see §5)
event.fingerprints = fingerprintEvent(event);

function fingerprintEvent(event: Sentry.Event): string[] {
  const ex = event.exception?.values?.[0];

  if (!ex) return event.fingerprints ?? [];

  // Validation errors — group by type, not message
  if (ex.type === "BadRequestException" || ex.type === "ValidationError") {
    return ["validation-error"];
  }

  // Auth errors — group by 401 / 403
  if (ex.type === "UnauthorizedException") return ["auth-unauthorized"];
  if (ex.type === "ForbiddenException") return ["auth-forbidden"];

  // DB unique constraint — single fingerprint regardless of table
  if (ex.type === "QueryFailedError" && /duplicate key/.test(ex.value ?? "")) {
    return ["database-unique-constraint"];
  }

  return (
    event.fingerprints ??
    [ex.type ?? "unknown"].concat([ex.mechanism?.type ?? ""])
  );
}
```

| Error type        | Fingerprint                    |
| ----------------- | ------------------------------ |
| Validation / 400  | `validation-error`             |
| 401               | `auth-unauthorized`            |
| 403               | `auth-forbidden`               |
| Unique constraint | `database-unique-constraint`   |
| Everything else   | `{exception_type}-{mechanism}` |

---

## 5. Sensitive Data Scrubbing

```ts
// src/bootstrap/sentry.ts
const SENSITIVE_KEYS = new Set([
  "password",
  "password_hash",
  "passwordHash",
  "secret",
  "csrf",
  "xsrf",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "cookie",
  "ssn",
  "dob",
  "phone",
]);

const SENSITIVE_HEADERS = new Set(["authorization", "cookie", "x-csrf-token"]);

function beforeSend(event: Sentry.Event): Sentry.Event {
  // Scrub request body keys
  if (event.request?.data && typeof event.request.data === "object") {
    event.request.data = deepScrubKeys(event.request.data, SENSITIVE_KEYS);
  }

  // Scrub request headers
  if (event.request?.headers) {
    for (const [key] of Object.entries(event.request.headers)) {
      if (SENSITIVE_HEADERS.has(key.toLowerCase())) {
        (event.request.headers as Record<string, string>)[key] = "[Filtered]";
      }
    }
  }

  // Scrub extra context
  if (event.extra) {
    event.extra = deepScrubKeys(event.extra, SENSITIVE_KEYS);
  }

  // Never send user PII beyond userId
  if (event.user) {
    event.user = { id: event.user.id };
  }

  return event;
}

function deepScrubKeys(
  obj: Record<string, unknown>,
  keys: Set<string>,
): Record<string, unknown> {
  for (const [k, v] of Object.entries(obj)) {
    if (keys.has(k)) {
      obj[k] = "[Filtered]";
    } else if (v && typeof v === "object") {
      obj[k] = deepScrubKeys(v as Record<string, unknown>, keys);
    }
  }
  return obj;
}
```

| Scrubbed                          | Location                     |
| --------------------------------- | ---------------------------- |
| `password_hash` / `password`      | `request.data`, `extra`      |
| `token`, `csrf`, `secret`         | `request.data`, `extra`      |
| `Authorization`, `Cookie` headers | `request.headers`            |
| Email, phone, SSN                 | `request.data`, `extra`      |
| Full user object                  | `event.user` → `{ id }` only |

---

## 6. Performance Monitoring — Custom DB Spans

```ts
// src/common/decorators/track-db.decorator.ts
import * as Sentry from "@sentry/node";

export function TrackDbQuery(label: string) {
  return function (
    _target: unknown,
    _key: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value!;
    descriptor.value = async function (...args: unknown[]) {
      const span = Sentry.getActiveSpan();
      if (!span) return original.apply(this, args);

      return Sentry.startSpan(
        { op: "db.query", name: label, parentSpan: span },
        () => original.apply(this, args),
      );
    };
  };
}
```

Usage:

```ts
class OrderRepo {
  @TrackDbQuery("order.findActiveByTenant")
  async findActiveByTenant(tenantId: string) {
    /* … */
  }
}
```

| Sample rate | Env         |
| ----------- | ----------- |
| `1.0`       | development |
| `0.1`       | production  |

---

## 7. User Context

```ts
// src/common/middleware/sentry-user.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import * as Sentry from "@sentry/node";

@Injectable()
export class SentryUserMiddleware implements NestMiddleware {
  use(
    req: { user?: { id: string; tenantId?: string } },
    _res: unknown,
    next: () => void,
  ) {
    if (req.user) {
      Sentry.setUser({
        id: req.user.id,
        // ⚠️ NEVER set email, name, or any PII
      });
      Sentry.setTag("tenant_id", req.user.tenantId ?? "none");
    }
    next();
  }
}
```

| Field            | Value          | Stored |
| ---------------- | -------------- | ------ |
| `user.id`        | DB primary key | Yes    |
| `email` / `name` | Never set      | ❌     |
| `tenant_id`      | Sentry tag     | Yes    |

---

## 8. Pino → Sentry Transport

```ts
// src/common/logger/sentry-transport.ts
import { Transform } from "pino";
import * as Sentry from "@sentry/node";

export const sentryTransport = new Transform({
  objectMode: true,
  transform(
    chunk: { level: number; msg: string; err?: Error },
    _enc: unknown,
    cb: () => void,
  ) {
    if (chunk.level >= 50) {
      // ERROR or FATAL
      Sentry.captureException(chunk.err ?? new Error(chunk.msg));
    }
    cb();
  },
});
```

Register in Pino:

```ts
const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
  },
  sentryTransport,
);
```

| Pino level                 | Numeric | Sentry action           |
| -------------------------- | ------- | ----------------------- |
| `trace` / `debug` / `info` | < 50    | Ignored                 |
| `warn`                     | 40      | Ignored                 |
| `error`                    | 50      | Sentry.captureException |
| `fatal`                    | 60      | Sentry.captureException |

---

## 9. Alerting Rules

Configured in Sentry UI → **Alerts** → **Create Alert**.

| Rule           | Condition                  | Action            | Threshold                  |
| -------------- | -------------------------- | ----------------- | -------------------------- |
| Dev-burndown   | 5 issues in 5 min          | Email to team     | `environment = production` |
| Critical-burst | 50 issues in 5 min         | PagerDuty webhook | `level = error`            |
| User-impact    | 100+ users affected in 1 h | Slack #ops        | `environment = production` |
| Spike          | 3× baseline in 15 min      | Email + Slack     | auto                       |

**PagerDuty integration:** Sentry project → Integrations → PagerDuty → paste webhook URL. Severity maps: `error` → `critical`, `fatal` → `critical`.

---

## 10. Test Cases

```ts
// test/unit/sentry/sentry-filter.spec.ts
import { Test } from "@nestjs/testing";
import { SentryExceptionFilter } from "src/common/filters/sentry-exception.filter";
import { BadRequestException } from "@nestjs/common";

describe("SentryExceptionFilter", () => {
  let filter: SentryExceptionFilter;

  beforeEach(async () => {
    filter = new SentryExceptionFilter();
  });

  it("captures an unhandled error as a Sentry event", () => {
    const spy = vi.spyOn(Sentry, "captureException");
    const error = new Error("db connection failed");
    filter.catch(error, mockHost);
    expect(spy).toHaveBeenCalledWith(error);
  });

  it("does NOT capture 4xx exceptions (only tagged)", () => {
    const spy = vi.spyOn(Sentry, "captureException");
    filter.catch(new BadRequestException(), mockHost);
    expect(spy).not.toHaveBeenCalled();
  });

  it("strips PII from beforeSend", () => {
    const event = beforeSend({
      request: {
        data: { email: "a@b.com", password_hash: "abc" },
        headers: { authorization: "Bearer x" },
      },
      user: { id: "u1", email: "a@b.com" },
    } as any);
    expect(event.request!.data!["email"]).toBe("[Filtered]");
    expect(event.request!.data!["password_hash"]).toBe("[Filtered]");
    expect(event.request!.headers!["authorization"]).toBe("[Filtered]");
    expect(event.user).toEqual({ id: "u1" });
  });

  it("fingerprints validation errors together", () => {
    const event = fingerprintEvent({
      exception: {
        values: [
          {
            type: "ValidationError",
            value: "",
            mechanism: { type: "generic" },
          },
        ],
      },
    } as any);
    expect(event.fingerprints).toEqual(["validation-error"]);
  });
});
```

| Test                      | Assertion                                                                  |
| ------------------------- | -------------------------------------------------------------------------- |
| Unhandled error captured  | `captureException` called                                                  |
| 4xx not captured          | `captureException` not called                                              |
| PII scrubbed              | `password_hash` → `[Filtered]`, user has only `id`                         |
| Validation fingerprint    | `['validation-error']`                                                     |
| Source maps resolve (e2e) | Stack trace line matches TS source (not compiled JS) — verify in Sentry UI |
