# Feature 0.3 — Prisma Hidden Fields for Secrets

## 1. Problem

`password_hash` and `mfa_secret` on the `User` model are returned by Prisma queries even when DTOs exclude them. A developer error — forgetting to `.select()` or using a raw `findFirst()` — can leak bcrypt password hashes and TOTP secrets into API responses.

Defense-in-depth requires that these fields never leave the Prisma query layer, regardless of controller or serializer logic.

## 2. Solution — Prisma `@hidden` (Preferred)

Prisma **5.19+** supports the `hideAll()` preview feature. Fields annotated with `@hidden` are stripped from query results at the engine level — DTOs, interceptors, and middlewares never see them.

| Approach            | Prisma version | Enforcement level            | Maintenance              |
| ------------------- | -------------- | ---------------------------- | ------------------------ |
| `@hidden` attribute | 5.19+          | Engine — zero runtime cost   | Declared once in schema  |
| Select-exclusion    | Any            | Application — easy to forget | Every query must opt out |

## 3. Fields to Hide

| Model  | Field           | Type      | Reason                                   |
| ------ | --------------- | --------- | ---------------------------------------- |
| `User` | `password_hash` | `String`  | bcrypt hash — offline cracking if leaked |
| `User` | `mfa_secret`    | `String?` | TOTP seed — account takeover if leaked   |

## 4. Alternative — Middleware Fallback

If the project is pinned to Prisma < 5.19 or `hideAll()` causes issues, use a `PrismaMiddleware` that strips fields after every query:

```
User query → PrismaMiddleware → password_hash/mfa_secret removed → Controller/Service
```

## 5. Implementation

### 5a. Schema — `@hidden` (Preferred)

```prisma
// schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["hideAll"]
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password_hash String   @hidden
  mfa_secret    String?  @hidden
  name          String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 5b. Middleware — Fallback (Prisma < 5.19)

```typescript
// src/common/prisma/prisma.middleware.ts

import { Prisma } from "@prisma/client";

const HIDDEN_FIELDS: Record<string, string[]> = {
  User: ["password_hash", "mfa_secret"],
};

export function createHiddenFieldMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const result = await next(params);
    if (!result) return result;

    const hidden = HIDDEN_FIELDS[params.model];
    if (!hidden) return result;

    if (Array.isArray(result)) {
      result.forEach(strip(result, hidden));
    } else if (typeof result === "object") {
      strip(hidden)(result);
    }

    return result;
  };
}

function strip(hidden: string[]) {
  return (obj: Record<string, unknown>) => {
    for (const field of hidden) {
      delete obj[field];
    }
  };
}
```

Apply in the Prisma service constructor:

```typescript
constructor() {
  this.prisma = new PrismaClient();
  this.prisma.$use(createHiddenFieldMiddleware());
}
```

## 6. Verification

```
npx prisma studio
```

1. Open the `User` model.
2. Confirm `password_hash` and `mfa_secret` columns are absent.
3. Run a query in code: `prisma.user.findFirst()` and log the result — confirm fields are missing.

| Step          | Expected                          | Actual         |
| ------------- | --------------------------------- | -------------- |
| Prisma Studio | No `password_hash` column visible | Column hidden  |
| `findFirst()` | Object without `password_hash`    | Field stripped |

## 7. Defense-in-Depth Diagram

```
┌─────────────────────────────────────────────────────────┐
│                 API Response Pipeline                    │
├──────────────┬──────────────────┬────────────────────────┤
│    1         │       2          │         3              │
│  Prisma      │  Serialize       │  Auth / Role          │
│  @hidden     │  Interceptor     │  Guard                │
│              │                  │                        │
│  Engine-     │  DTO-level       │  Authorization        │
│  level strip │  exclude (bonus) │  (last resort)        │
│              │                  │                        │
│  password_   │  class-trans-    │  401 / 403 if         │
│  hash never  │  former          │  somehow reached      │
│  leaves Prisma│ @Exclude()      │  this far             │
└──────────────┴──────────────────┴────────────────────────┘
```

### Layer responsibilities

| Layer                       | Mechanism              | Failure mode                                          |
| --------------------------- | ---------------------- | ----------------------------------------------------- |
| **1. Prisma `@hidden`**     | Engine-level exclusion | Developer upgrades Prisma and loses `hideAll` preview |
| **2. SerializeInterceptor** | `@Exclude()` on DTO    | Developer adds a new query path without the DTO       |
| **3. AuthGuard**            | Access control         | Roles/permissions misconfiguration                    |

If any single layer is bypassed, the remaining two still prevent secret exposure. This satisfies the principle of **defense in depth** for sensitive user fields.
