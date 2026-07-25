# JWT Authentication (Feature 0.2)

## 1. Auth Endpoints

| Method | Path                    | Auth          | Description                           |
| ------ | ----------------------- | ------------- | ------------------------------------- |
| POST   | `/api/v1/auth/register` | Public        | Create account, return tokens         |
| POST   | `/api/v1/auth/login`    | Public        | Authenticate, return tokens           |
| POST   | `/api/v1/auth/refresh`  | Public        | Rotate refresh token, return new pair |
| POST   | `/api/v1/auth/logout`   | Authenticated | Invalidate refresh token              |
| GET    | `/api/v1/auth/me`       | Authenticated | Return current user profile           |

```
Register / Login
┌──────────┐         ┌───────────────┐        ┌─────────┐
│  Client   │         │  AuthService   │        │  DB     │
└─────┬────┘         └───────┬───────┘        └────┬────┘
      │  POST /auth/register │                      │
      │  { email, password } │                      │
      │─────────────────────→│                      │
      │                      │ validate password    │
      │                      │ check email unique   │
      │                      │─────────────────────→│
      │                      │←─────────────────────│
      │                      │ bcrypt(password, 12) │
      │                      │ create user          │
      │                      │─────────────────────→│
      │                      │←─────────────────────│
      │                      │ sign RS256 access    │
      │                      │ gen refresh token    │
      │                      │ SHA-256 → store hash │
      │                      │─────────────────────→│
      │  { accessToken,      │                      │
      │    refreshToken }    │                      │
      │←─────────────────────│                      │
```

```
Refresh Token Rotation
┌──────────┐         ┌───────────────┐        ┌─────────┐
│  Client   │         │  AuthService   │        │  DB     │
└─────┬────┘         └───────┬───────┘        └────┬────┘
      │  POST /auth/refresh  │                      │
      │  { refreshToken }    │                      │
      │─────────────────────→│                      │
      │                      │ SHA-256(req) → hash  │
      │                      │ find in refresh_tokens│
      │                      │─────────────────────→│
      │                      │←─── { user, jti } ──│
      │                      │                      │
      │                      │ 1. DELETE old token  │
      │                      │─────────────────────→│
      │                      │ 2. INSERT new token  │
      │                      │─────────────────────→│
      │                      │                      │
      │                      │ sign new access      │
      │  { accessToken,      │                      │
      │    newRefreshToken } │                      │
      │←─────────────────────│                      │
```

---

## 2. Register Flow

```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Str0ng!Pass"
}
```

**Steps:**

1. Validate DTO with `class-validator` (email format, password rules)
2. Check email uniqueness — `SELECT 1 FROM users WHERE email = $1`
3. Blacklist check — reject if password in common list
4. Hash password — `bcrypt.hash(password, 12)` (~250ms)
5. `INSERT INTO users (id, email, password_hash, created_at)`
6. Generate access token + refresh token
7. Store refresh token hash: `INSERT INTO refresh_tokens (jti, user_id, hash, expires_at)`
8. Return `{ accessToken, refreshToken, user }`

**Response (201):**

```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiJ9...",
  "refreshToken": "a1b2c3d4e5...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2026-07-25T12:00:00Z"
  }
}
```

---

## 3. Login Flow

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Str0ng!Pass"
}
```

**Steps:**

1. Validate DTO
2. Rate limit check — `5 attempts / email / 15min` (Redis sliding window)
3. `SELECT * FROM users WHERE email = $1`
4. `bcrypt.compare(password, user.password_hash)` — reject if mismatch
5. Reset rate limit counter on success
6. Generate access token + refresh token
7. Store refresh token hash in DB
8. Return `{ accessToken, refreshToken, user }`

---

## 4. Refresh Flow

```
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5..."
}
```

**Steps:**

1. `SHA-256(refreshToken)` → `hash`
2. `SELECT * FROM refresh_tokens WHERE hash = $1`
3. Validate `expires_at > NOW()` — reject if expired
4. Atomic rotation (transaction):
   - `DELETE FROM refresh_tokens WHERE jti = $1`
   - `INSERT INTO refresh_tokens (jti, user_id, hash, expires_at) VALUES (...)`
5. Sign new access token
6. Return `{ accessToken, refreshToken: newToken }`

**Rotation invariant:** Each refresh token can be used exactly once. Old token is deleted before new one is inserted. If a stolen token is used after the legitimate owner rotates, the owner's next refresh will fail — triggering revocation of all tokens for that user (forced re-login).

---

## 5. Logout Flow

```
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5..."
}
```

**Steps:**

1. Verify access token (AuthGuard)
2. `SHA-256(refreshToken)` → `hash`
3. `DELETE FROM refresh_tokens WHERE hash = $1 AND user_id = $2`
4. Return `204 No Content`

---

## 6. Access Token — RS256

```
Header:  { "alg": "RS256", "typ": "JWT", "kid": "2026-q2" }
Payload: { "sub": "uuid", "email": "user@example.com",
           "tenantId": "uuid", "roles": ["admin"],
           "type": "access", "iat": ..., "exp": ... }
```

| Property         | Value                               |
| ---------------- | ----------------------------------- |
| Algorithm        | RS256 (asymmetric RSA 2048-bit)     |
| Expiry           | 15 minutes                          |
| Payload claims   | `sub`, `email`, `tenantId`, `roles` |
| Stateless        | Yes — no DB lookup on verify        |
| Signing key      | `JWT_PRIVATE_KEY` (PEM)             |
| Verification key | `JWT_PUBLIC_KEY` (PEM)              |

```typescript
// token.service.ts
interface AccessTokenPayload {
  sub: string; // user UUID
  email: string;
  tenantId: string;
  roles: string[];
  type: "access";
  iat: number;
  exp: number;
}
```

---

## 7. Refresh Token — Opaque

```
Format:     crypto.randomBytes(48).toString('hex')
Length:     96 hex characters (48 bytes entropy)
Storage:    SHA-256 hash in refresh_tokens table
Expiry:     7 days (table TTL + application check)
```

**`refresh_tokens` table:**

| Column       | Type         | Notes                       |
| ------------ | ------------ | --------------------------- |
| `jti`        | UUID         | Unique token ID             |
| `user_id`    | UUID         | FK → users.id               |
| `hash`       | VARCHAR(64)  | `SHA-256(raw_token)`        |
| `expires_at` | TIMESTAMPTZ  | `NOW() + INTERVAL '7 days'` |
| `created_at` | TIMESTAMPTZ  | Auto                        |
| `revoked_at` | TIMESTAMPTZ? | Nullable — set on logout    |

```typescript
// token.service.ts
import { randomBytes, createHash } from "node:crypto";

function generateRefreshToken(): { raw: string; hash: string } {
  const raw = randomBytes(48).toString("hex");
  const hash = createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}
```

---

## 8. AuthGuard

```
Incoming Request
  → Extract Authorization header
    → Match /^Bearer\s+(.+)$/
      → Decode + verify RS256 signature
        → Check exp (reject if expired)
          → Populate req.user = { sub, email, tenantId, roles }
            → Pass to controller
```

```typescript
// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException("Missing token");

    try {
      const payload = this.jwtService.verify<AccessTokenPayload>(token, {
        algorithms: ["RS256"],
        issuer: "commerce-os",
      });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  private extractToken(req: Request): string | undefined {
    const auth = req.headers.authorization;
    if (!auth) return undefined;
    const [type, token] = auth.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
```

**Error responses:**

| Scenario          | Status | Body                                                   |
| ----------------- | ------ | ------------------------------------------------------ |
| Missing header    | 401    | `{ "code": "AUTH_MISSING_TOKEN", "message": "..." }`   |
| Malformed token   | 401    | `{ "code": "AUTH_MALFORMED_TOKEN", "message": "..." }` |
| Expired token     | 401    | `{ "code": "AUTH_TOKEN_EXPIRED", "message": "..." }`   |
| Invalid signature | 401    | `{ "code": "AUTH_INVALID_TOKEN", "message": "..." }`   |

---

## 9. Auth Module Structure

```
src/
└── modules/
    └── auth/
        ├── auth.module.ts          ← Module definition
        ├── auth.controller.ts      ← Route handlers
        ├── auth.service.ts         ← Business logic
        ├── token.service.ts        ← JWT sign/verify + refresh gen
        ├── guards/
        │   ├── jwt-auth.guard.ts   ← Bearer token extraction + verify
        │   └── optional-auth.guard.ts  ← Optional auth (public + user if token)
        ├── strategies/
        │   └── jwt.strategy.ts     ← PassportStrategy (if using passport)
        ├── dto/
        │   ├── register.dto.ts     ← email, password
        │   ├── login.dto.ts        ← email, password
        │   ├── refresh.dto.ts      ← refreshToken
        │   └── logout.dto.ts       ← refreshToken
        ├── interfaces/
        │   ├── token-payload.interface.ts
        │   └── auth-request.interface.ts  ← Express Request extension
        └── constants/
            └── password-blacklist.ts  ← Top 10k common passwords
```

**Module wiring:**

```typescript
// auth.module.ts
@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        signOptions: {
          algorithm: "RS256",
          issuer: "commerce-os",
          expiresIn: "15m",
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
```

---

## 10. Password Validation

| Rule                    | Enforcement                     | Error Code                |
| ----------------------- | ------------------------------- | ------------------------- |
| Min 8 chars             | `@MinLength(8)`                 | `PASSWORD_TOO_SHORT`      |
| Max 64 chars            | `@MaxLength(64)`                | `PASSWORD_TOO_LONG`       |
| At least 1 uppercase    | Custom validator                | `PASSWORD_NO_UPPER`       |
| At least 1 lowercase    | Custom validator                | `PASSWORD_NO_LOWER`       |
| At least 1 digit        | Custom validator                | `PASSWORD_NO_DIGIT`       |
| At least 1 special char | Custom validator                | `PASSWORD_NO_SPECIAL`     |
| Not in blacklist        | Custom validator (array lookup) | `PASSWORD_COMMON`         |
| No email substring      | Custom validator                | `PASSWORD_CONTAINS_EMAIL` |

```typescript
// dto/register.dto.ts
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(64)
  @Matches(/[A-Z]/, { message: "Must contain uppercase" })
  @Matches(/[a-z]/, { message: "Must contain lowercase" })
  @Matches(/[0-9]/, { message: "Must contain digit" })
  @Matches(/[^A-Za-z0-9]/, { message: "Must contain special character" })
  @NotIn(PASSWORD_BLACKLIST, { message: "Password is too common" })
  @NotContainsEmail("email", { message: "Password must not contain email" })
  password: string;
}
```

---

## 11. Rate Limit on Auth

```
┌─────────┐     ┌───────────┐     ┌─────────┐
│  Client  │     │  Throttler │     │  Redis  │
└────┬────┘     └─────┬─────┘     └────┬────┘
     │ POST /login    │                 │
     │ { email, pass }│                 │
     │───────────────→│                 │
     │                │ INCR auth:email:user@ex.com
     │                │────────────────→│
     │                │  EXPIRE 900     │
     │                │←──── count: 1 ──│
     │                │                 │
     │                │ count > 5?      │
     │                │   → 429         │
     │  429 Too Many  │                 │
     │←───────────────│                 │
```

| Scope     | Key Pattern                    | Limit | Window | Storage |
| --------- | ------------------------------ | ----- | ------ | ------- |
| Per email | `ratelimit:auth:login:{email}` | 5     | 15 min | Redis   |
| Per IP    | `ratelimit:auth:register:{ip}` | 3     | 60 min | Redis   |
| Global    | `ratelimit:auth:refresh:{ip}`  | 20    | 15 min | Redis   |

**Implementation:**

```typescript
// Custom throttle guard for auth endpoints
// Uses Redis INCR + EXPIRE (not ThrottlerModule) for per-email granularity

async checkRateLimit(email: string): Promise<void> {
  const key = `ratelimit:auth:login:${email}`;
  const count = await this.redis.incr(key);
  if (count === 1) await this.redis.expire(key, 900); // 15 min
  if (count > 5) throw new TooManyRequestsException('Too many attempts');
}
```

---

## 12. Test Cases

```typescript
describe("AuthController", () => {
  describe("POST /auth/register", () => {
    it("returns 201 + tokens on valid registration");
    it("returns 409 on duplicate email");
    it("returns 400 on password < 8 chars");
    it("returns 400 on missing uppercase");
    it('returns 400 on common password ("Password123!")');
    it("returns 400 on password containing email substring");
    it("returns 400 on malformed email");
  });

  describe("POST /auth/login", () => {
    it("returns 200 + tokens on valid credentials");
    it("returns 401 on wrong password");
    it("returns 401 on non-existent email");
    it("returns 429 after 5 failed attempts per email");
    it("resets rate limit counter on successful login");
  });

  describe("POST /auth/refresh", () => {
    it("returns 200 + new token pair");
    it("returns 401 on revoked token (after logout)");
    it("returns 401 on expired token (7d+)");
    it("rotates: old token becomes invalid after refresh");
    it("rejects reused old token after rotation (replay detection)");
  });

  describe("POST /auth/logout", () => {
    it("returns 204 and invalidates refresh token");
    it("returns 401 without access token");
    it("refreshing after logout returns 401");
  });

  describe("GET /auth/me", () => {
    it("returns 200 + user profile with valid token");
    it("returns 401 with expired access token");
    it("returns 401 with tampered token (wrong signature)");
  });
});
```

**Key invariants verified in tests:**

```
Login ─→ access(15m) + refresh(7d)
           │
           ├→ Access expired → /refresh ─→ new pair (old refresh dead)
           │                                    │
           │                                    ├→ /refresh again with old token → 401
           │                                    └→ /refresh again with new token → 200
           │
           └→ Logout → refresh token deleted → /refresh with old token → 401
```
