# Response Serialization

## Problem

Sensitive fields leak in API responses. The `User` entity returned from services contains `password_hash`, `mfa_secret`, and nested `refresh_tokens` — all of which serialise to JSON unless explicitly stripped:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "password_hash": "$2b$10$...",
  "mfa_secret": "JBSWY3DPEHPK3PXP",
  "refresh_tokens": [{ "token": "rt_...", "expires_at": "..." }],
  "deleted_at": null
}
```

Current per-controller manual stripping is inconsistent and error-prone.

## Solution

Use NestJS `ClassSerializerInterceptor` with `class-transformer` decorators (`@Exclude`, `@Expose`) on a response DTO. The interceptor runs globally, right before the `TransformInterceptor` (envelope wrapper), and strips any field not decorated with `@Expose()` unless it has `@Exclude()`.

```
  PrismaService → Service → Controller → SerializeInterceptor → TransformInterceptor → Client
                                              │
                                              ▼
                                     class-transformer
                                     classToPlain(instance, { groups })
                                     strips @Exclude(), applies @Expose()
```

## Fields to Exclude

### Public (always excluded)

| Field            | Reason                               |
| ---------------- | ------------------------------------ |
| `password_hash`  | Credential — must never leave server |
| `mfa_secret`     | TOTP seed — root of 2FA              |
| `refresh_tokens` | Relation — tokens are credentials    |
| `internal_notes` | Operational data                     |

### Admin-only (excluded from public responses, visible with groups: ['admin'])

| Field             | Group                           |
| ----------------- | ------------------------------- |
| `deleted_at`      | `admin`                         |
| `audit_logs`      | `admin`                         |
| `metafields_json` | `admin` (on sensitive entities) |

## Whitelist Approach

Use `@Expose()` as the opt-in. Every field that should appear in a response must be explicitly decorated. All other fields (including new ones added later) are stripped by default.

```
                 ┌──────────────┐
                 │  Prisma User │
                 │              │
                 │ id           │──@Expose()──→ ✓
                 │ email        │──@Expose()──→ ✓
                 │ password_hash│──(none)─────→ ✗
                 │ mfa_secret   │──(none)─────→ ✗
                 │ deleted_at   │──@Expose({ groups: ['admin'] }) → ✓ only admin
                 │ refresh_tokens│──@Exclude()─→ ✗
                 └──────────────┘
```

## Implementation

### 1. User Response DTO

```typescript
import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roleId: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  passwordHash: string;

  @Exclude()
  mfaSecret: string;

  @Exclude()
  refreshTokens: any[];

  @Expose({ groups: ["admin"] })
  deletedAt: Date | null;

  @Expose({ groups: ["admin"] })
  auditLogs: any[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
```

### 2. Serialize Interceptor

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ClassSerializerInterceptor, PlainLiteralObject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.reflector.getAllAndOverride(
      "SERIALIZE_OPTIONS",
      [context.getHandler(), context.getClass()],
    );

    const groups = contextOptions?.groups ?? this.resolveGroups(context);

    const serializer = new ClassSerializerInterceptor(this.reflector, {
      groups,
    });

    return next
      .handle()
      .pipe(map((data) => serializer.serialize(data, {} as any)));
  }

  private resolveGroups(context: ExecutionContext): string[] {
    const req = context.switchToHttp().getRequest();
    return req.user?.role === "admin" ? ["admin"] : [];
  }
}
```

### 3. Global Registration (main.ts)

```typescript
app.useGlobalInterceptors(
  new LoggingInterceptor(),
  new RequestIdInterceptor(),
  new TenantInterceptor(),
  new SerializeInterceptor(new Reflector()),
  new TransformInterceptor(),
);
```

### 4. Controller Usage

```typescript
@Controller("auth")
export class AuthController {
  @Post("register")
  @Public()
  async register(@Body() dto: RegisterDto): Promise<UserResponseDto> {
    const user = await this.authService.register(dto);
    return new UserResponseDto(user);
  }

  @Post("login")
  @Public()
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto); // SerializeInterceptor strips mfa_secret automatically
  }
}
```

## Test Cases

```typescript
describe("Response Serialization", () => {
  it("register endpoint returns user without password_hash", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/auth/register")
      .send({ email: "test@test.com", password: "Str0ng!" });

    expect(res.status).toBe(201);
    expect(res.body.data).not.toHaveProperty("passwordHash");
    expect(res.body.data).not.toHaveProperty("password_hash");
    expect(res.body.data).toHaveProperty("email");
  });

  it("login response strips mfa_secret", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/v1/auth/login")
      .send({ email: "test@test.com", password: "Str0ng!" });

    expect(res.body.data.user).not.toHaveProperty("mfaSecret");
    expect(res.body.data.user).not.toHaveProperty("mfa_secret");
  });

  it("admin user sees deleted_at and audit_logs", async () => {
    const adminToken = await getAdminToken();
    const res = await request(app.getHttpServer())
      .get("/api/v1/platform/users/soft-deleted-user-id")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.body.data).toHaveProperty("deletedAt");
    expect(res.body.data).toHaveProperty("auditLogs");
  });

  it("regular user does not see deleted_at", async () => {
    const userToken = await getUserToken();
    const res = await request(app.getHttpServer())
      .get("/api/v1/platform/users/soft-deleted-user-id")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.body.data).not.toHaveProperty("deletedAt");
    expect(res.body.data).not.toHaveProperty("auditLogs");
  });

  it("new fields added to entity are excluded by default", async () => {
    // Safety net: any field without @Expose() is omitted
    const res = await request(app.getHttpServer())
      .post("/api/v1/auth/register")
      .send({ email: "test@test.com", password: "Str0ng!" });

    const keys = Object.keys(res.body.data);
    const safeKeys = [
      "id",
      "email",
      "firstName",
      "lastName",
      "roleId",
      "status",
      "createdAt",
    ];
    expect(keys.every((k) => safeKeys.includes(k))).toBe(true);
  });
});
```

## Error Cases

| Scenario                                   | Behaviour                                     |
| ------------------------------------------ | --------------------------------------------- |
| Field has `@Exclude()` only                | Always stripped                               |
| Field has no decorator                     | Stripped (whitelist mode)                     |
| Field has `@Expose({ groups: ['admin'] })` | Visible only when `req.user.role === 'admin'` |
| Non-admin hits admin route                 | Field absent from JSON, no error thrown       |
| Entity is `null` or `undefined`            | Passed through, no crash                      |

## Rollback Plan

1. Remove `SerializeInterceptor` from `app.useGlobalInterceptors()` in `main.ts`
2. Comment out the `@Exclude()` / `@Expose()` decorators on DTOs (or keep them — harmless without the interceptor)
3. Verify raw fields return:
   ```typescript
   const res = await request(app.getHttpServer())
     .post("/api/v1/auth/register")
     .send({ email: "test@test.com", password: "Str0ng!" });
   expect(res.body.data).toHaveProperty("passwordHash"); // passes after rollback
   ```
4. If rollback is permanent, delete `SerializeInterceptor` and remove `class-transformer` dependency from `package.json`

**Recovery time:** ~5 minutes. The change is contained to `main.ts` and the DTO files — no database migrations, no schema changes, no data loss.
