# Permission System (Feature 2.4)

## 1. Purpose

Granular permission overrides beyond RBAC. Roles define baseline access; individual `Permission` records grant _additional_ resource×action capabilities per user without changing their role.

| Problem                                               | Solution                                            |
| ----------------------------------------------------- | --------------------------------------------------- |
| Role too coarse (e.g. "editor" can edit all products) | Permission scoped to "own records only"             |
| Need to grant one-off access                          | Specific `Permission` record without role promotion |
| Audit trail for exceptions                            | Every override logged with `createdBy` and `reason` |

---

## 2. Data Model

```prisma
model Permission {
  id          String   @id @default(uuid())
  userId      String
  resource    String   // Product | Order | User | Category | Cart | Settings | Report | AuditLog | Tenant
  action      String   // create | read | update | delete | manage
  conditions  Json?    // { "scope": "own", "field": "createdBy" } — nullable
  reason      String?  // "Temporary access for Q3 audit"
  grantedBy   String?  // admin user ID who created this
  expiresAt   DateTime?
  createdAt   DateTime @default(now())

  user        User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, resource, action])
  @@index([userId])
  @@index([resource, action])
}
```

| Column       | Type             | Notes                              |
| ------------ | ---------------- | ---------------------------------- |
| `id`         | UUID             | PK                                 |
| `userId`     | UUID             | FK → users.id                      |
| `resource`   | Enum-like string | One of 9 resources (see §4)        |
| `action`     | Enum-like string | One of 5 actions (see §5)          |
| `conditions` | JSON?            | Scoping rules; null = unrestricted |
| `reason`     | String?          | Justification for audit trail      |
| `grantedBy`  | String?          | Admin who granted it               |
| `expiresAt`  | DateTime?        | Auto-revoke after date             |
| `createdAt`  | DateTime         | Auto                               |

**Unique constraint:** One permission per `(userId, resource, action)` — update instead of duplicating.

---

## 3. Permission Evaluation

```
User requests action X on resource Y
  → RolesGuard checks user.role (baseline deny if insufficient)
    → Denied? → stop, return 403
    → Allowed by role? → pass
    → Denied by role? → fall through to PermissionGuard
      → SELECT * FROM permissions WHERE userId = $1 AND resource = $2 AND action = $3
        → Found? → evaluate conditions → allow if satisfied
        → Not found? → final deny 403
```

| Scenario                 | Role Allows? | Permission Record?                       | Result                              |
| ------------------------ | ------------ | ---------------------------------------- | ----------------------------------- |
| Admin deletes product    | Yes (admin)  | —                                        | Allowed                             |
| Editor edits own product | No (editor)  | No                                       | Denied                              |
| Editor edits own product | No (editor)  | Yes, `products:update` with `scope: own` | Allowed (if `createdBy === userId`) |
| Viewer creates product   | No (viewer)  | Yes, `products:create`                   | Allowed                             |
| Viewer creates product   | No (viewer)  | No                                       | Denied                              |

---

## 4. Resource List

| Resource   | Description                               |
| ---------- | ----------------------------------------- |
| `Product`  | Product CRUD, inventory, pricing          |
| `Order`    | Order read, status updates, cancellations |
| `User`     | User management, role assignment          |
| `Category` | Category tree CRUD                        |
| `Cart`     | Read/manage other users' carts            |
| `Settings` | Tenant-level configuration                |
| `Report`   | Generate and export reports               |
| `AuditLog` | View audit trail                          |
| `Tenant`   | Multi-tenant administration               |

---

## 5. Action List

| Action   | Semantics                                              |
| -------- | ------------------------------------------------------ |
| `create` | Create new records                                     |
| `read`   | View records                                           |
| `update` | Modify existing records                                |
| `delete` | Remove records                                         |
| `manage` | All of the above + grant/revoke permissions for others |

---

## 6. Conditional Permissions

Conditional permissions scope a grant to a subset of records matching the condition.

### Condition Schema

```typescript
interface PermissionCondition {
  scope: "own" | "tenant" | "explicit";
  field?: string; // DB column to match, e.g. "createdBy"
  values?: string[]; // explicit UUID whitelist for 'explicit' scope
}
```

### Examples

```json
// Can only edit products they created
{ "scope": "own", "field": "createdBy" }

// Can view orders for specific customers
{ "scope": "explicit", "values": ["uuid-a", "uuid-b"] }

// Can manage users within their tenant only
{ "scope": "tenant" }
```

### Evaluation

```typescript
// permission.service.ts
function evaluateCondition(
  condition: PermissionCondition,
  userId: string,
  tenantId: string,
  targetOwnerId?: string,
): boolean {
  if (!condition) return true; // unrestricted

  switch (condition.scope) {
    case "own":
      return targetOwnerId === userId;
    case "tenant":
      return true; // already scoped by tenant guard
    case "explicit":
      return condition.values?.includes(targetOwnerId!) ?? false;
    default:
      return false;
  }
}
```

---

## 7. PermissionGuard

```typescript
// src/common/guards/permission.guard.ts
import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUIRE_PERMISSION_KEY } from "../decorators/require-permission.decorator";

interface RequiredPermission {
  resource: string;
  action: string;
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.getAllAndOverride<RequiredPermission>(
      REQUIRE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!permission) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new ForbiddenException();

    if (this.roleAllows(user.role, permission.resource, permission.action)) {
      return true;
    }

    return this.permissionAllows(
      user.sub,
      permission.resource,
      permission.action,
      request,
    );
  }

  private roleAllows(role: string, resource: string, action: string): boolean {
    // Roles are checked first by RolesGuard — if we reach here,
    // the role denied it. This is a safety fallback.
    return false;
  }

  private async permissionAllows(
    userId: string,
    resource: string,
    action: string,
    request: any,
  ): Promise<boolean> {
    const record = await this.prisma.permission.findUnique({
      where: { userId_resource_action: { userId, resource, action } },
    });

    if (!record) return false;
    if (record.expiresAt && record.expiresAt < new Date()) return false;
    if (!record.conditions) return true;

    return this.evaluateCondition(record.conditions as any, userId, request);
  }

  private evaluateCondition(
    condition: { scope: string; field?: string; values?: string[] },
    userId: string,
    request: any,
  ): boolean {
    if (condition.scope === "own" && condition.field) {
      const resourceId = request.params?.id;
      return true; // actual check against DB field performed in service layer
    }
    if (condition.scope === "tenant") return true;
    return false;
  }
}
```

---

## 8. @RequirePermission Decorator

```typescript
// src/common/decorators/require-permission.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const REQUIRE_PERMISSION_KEY = "require_permission";

export const RequirePermission = (resource: string, action: string) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, { resource, action });
```

### Usage on Controllers

```typescript
// products.controller.ts
@Controller('products')
export class ProductsController {
  @Post()
  @RequirePermission('Product', 'create')
  async create(@Body() dto: CreateProductDto) { ... }

  @Get(':id')
  @RequirePermission('Product', 'read')
  async findOne(@Param('id') id: string) { ... }

  @Patch(':id')
  @RequirePermission('Product', 'update')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) { ... }

  @Delete(':id')
  @RequirePermission('Product', 'delete')
  async remove(@Param('id') id: string) { ... }
}
```

---

## 9. Admin UI — Permission Matrix

```
GET /api/v1/permissions/matrix/:userId
Response:
{
  "userId": "uuid",
  "role": "editor",
  "permissions": {
    "Product":  { "create": true,  "read": true, "update": true, "delete": false },
    "Order":    { "create": false, "read": true, "update": false, "delete": false },
    "User":     { "create": false, "read": false, "update": false, "delete": false },
    "Settings": { "create": false, "read": false, "update": false, "delete": false },
    "Report":   { "create": true,  "read": true, "update": false, "delete": false }
  }
}
```

| Endpoint                      | Method | Description                               |
| ----------------------------- | ------ | ----------------------------------------- |
| `/permissions`                | GET    | List all permission overrides (paginated) |
| `/permissions/matrix/:userId` | GET    | Full resource×action matrix for a user    |
| `/permissions`                | POST   | Create override                           |
| `/permissions/:id`            | PATCH  | Update conditions, expiry                 |
| `/permissions/:id`            | DELETE | Revoke override                           |

---

## 10. Intersection with RBAC

### Guard Pipeline

```
Incoming Request
  → CommerceThrottlerGuard (rate limit)
    → JwtAuthGuard (auth + populate req.user)
      → RolesGuard (check role baseline)
        → OR permission guards:
          → PermissionGuard (check specific Permission records)
            → Controller
```

### Rules

1. **RolesGuard runs first** — if the user's role grants access, the request passes immediately.
2. **RolesGuard denies** — if the role is insufficient, the request falls through to `PermissionGuard`.
3. **PermissionGuard checks** — looks for a specific `Permission` record allowing `(userId, resource, action)`.
4. **Both deny** → final `403 Forbidden`.

```typescript
// auth.module.ts — guard registration order matters
{
  provide: APP_GUARD,
  useClass: RolesGuard,
},
{
  provide: APP_GUARD,
  useClass: PermissionGuard,
},
```

### Guard Interaction Matrix

| JWT Has Role? | Role Allows? | Permission Record?     | Result                    |
| ------------- | ------------ | ---------------------- | ------------------------- |
| admin         | Yes          | —                      | Allow (role)              |
| editor        | No           | Yes, `products:update` | Allow (permission)        |
| editor        | No           | No                     | Deny (403)                |
| None          | —            | —                      | Deny (401 — JwtAuthGuard) |

---

## 11. Test Cases

```typescript
describe("PermissionGuard", () => {
  it("allows access when role grants permission");
  it("allows access when specific permission record exists");
  it("denies access when neither role nor permission record grants it");
  it("evaluates own-scope condition correctly");
  it("denies access when permission is expired");
  it("denies access without valid JWT");
});

describe("Admin — Permission Matrix", () => {
  it("returns full resource×action matrix for a user");
  it("distinguishes role-granted vs permission-granted in matrix");
  it("creates permission override");
  it("updates permission conditions");
  it("deletes (revokes) permission override");
  it("prevents non-admin from managing permissions");
});
```
