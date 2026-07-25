# Role-Based Access Control (Feature 2.3)

## 1. Role Hierarchy

```
SuperAdmin (cross-tenant)
  └── Admin (tenant)
        └── Manager (tenant)
              └── Viewer (tenant)
```

| Role         | Scope  | Description                                                               |
| ------------ | ------ | ------------------------------------------------------------------------- |
| `superadmin` | Global | Platform operator — manage tenants, bypass all tenant-scoped restrictions |
| `admin`      | Tenant | Full control within a tenant (users, products, orders, settings, reports) |
| `manager`    | Tenant | Operational — create/edit products, manage orders, view settings/reports  |
| `viewer`     | Tenant | Read-only — browse products, orders, settings; no reports access          |

---

## 2. Capability Matrix

| Role       | Users | Products    | Orders | Settings | Reports |
| ---------- | ----- | ----------- | ------ | -------- | ------- |
| SuperAdmin | full  | full        | full   | full     | full    |
| Admin      | full  | full        | full   | full     | full    |
| Manager    | view  | create/edit | full   | view     | view    |
| Viewer     | view  | view        | view   | view     | none    |

**full** = create, read, update, delete. **view** = read only.

---

## 3. Data Model

### Role Enum

```typescript
// src/modules/auth/enums/role.enum.ts
export enum Role {
  SUPER_ADMIN = "superadmin",
  ADMIN = "admin",
  MANAGER = "manager",
  VIEWER = "viewer",
}
```

### User Model (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(VIEWER)
  tenantId  String?
  tenant    Tenant?  @relation(fields: [tenantId], references: [id])

  permissions Permission[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Resource-Level Override

```prisma
model Permission {
  id       String @id @default(uuid())
  userId   String
  user     User   @relation(fields: [userId], references: [id])
  resource String // e.g. "product:uuid", "order:uuid"
  action   String // "create" | "read" | "update" | "delete"
  grant    Boolean // true = allow, false = deny

  @@unique([userId, resource, action])
}
```

```
Permission resolution:
  1. If Permission record exists for {userId, resource, action} → use grant
  2. Otherwise → fall back to role-based capability matrix
```

---

## 4. Guards

### Guard Chain

```
Incoming Request
  → JwtAuthGuard (verify token, populate req.user)
    → TenantGuard (scope request to tenant)
      → RolesGuard (check role capability)
        → Controller
```

### `@Roles()` Decorator

```typescript
// src/common/decorators/roles.decorator.ts
import { SetMetadata } from "@nestjs/common";
import { Role } from "../../modules/auth/enums/role.enum";

export const ROLES_KEY = "roles";

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

### RolesGuard

```typescript
// src/common/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../modules/auth/enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No roles required → allow
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException({
        code: "INSUFFICIENT_ROLE",
        message: "Authentication required",
      });
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    // SuperAdmin bypasses all role checks
    if (user.role === Role.SUPER_ADMIN) {
      return true;
    }

    if (!hasRole) {
      throw new ForbiddenException({
        code: "INSUFFICIENT_ROLE",
        message: `Requires one of: ${requiredRoles.join(", ")}`,
        details: { required: requiredRoles, actual: user.role },
      });
    }

    return true;
  }
}
```

---

## 5. Role Verification Logic

```
checkRole(user, requiredRoles):
  if user.role === SUPER_ADMIN → PASS (bypass)
  if user.role in requiredRoles → PASS
  if Permission record grants action on resource → PASS
  if Permission record denies action on resource → FAIL
  → FAIL → throw 403 INSUFFICIENT_ROLE
```

### Capability Lookup

```typescript
// src/modules/auth/services/role-checker.service.ts
import { Injectable } from "@nestjs/common";
import { Role } from "../enums/role.enum";

interface Capability {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

const MATRIX: Record<string, Record<Role, Capability>> = {
  users: {
    [Role.SUPER_ADMIN]: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    [Role.ADMIN]: { create: true, read: true, update: true, delete: true },
    [Role.MANAGER]: { create: false, read: true, update: false, delete: false },
    [Role.VIEWER]: { create: false, read: true, update: false, delete: false },
  },
  products: {
    [Role.SUPER_ADMIN]: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    [Role.ADMIN]: { create: true, read: true, update: true, delete: true },
    [Role.MANAGER]: { create: true, read: true, update: true, delete: false },
    [Role.VIEWER]: { create: false, read: true, update: false, delete: false },
  },
  orders: {
    [Role.SUPER_ADMIN]: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    [Role.ADMIN]: { create: true, read: true, update: true, delete: true },
    [Role.MANAGER]: { create: true, read: true, update: true, delete: true },
    [Role.VIEWER]: { create: false, read: true, update: false, delete: false },
  },
};

@Injectable()
export class RoleCheckerService {
  can(role: Role, resource: string, action: keyof Capability): boolean {
    return MATRIX[resource]?.[role]?.[action] ?? false;
  }
}
```

---

## 6. Controller Usage

```typescript
// src/modules/products/products.controller.ts
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('products')
@Roles(Role.VIEWER, Role.MANAGER, Role.ADMIN) // class-level default
export class ProductsController {
  @Post()
  @Roles(Role.MANAGER, Role.ADMIN) // method-specific override
  async create(@Body() dto: CreateProductDto) { ... }

  @Get()
  async findAll() { ... } // inherits class-level roles

  @Delete(':id')
  @Roles(Role.ADMIN) // only admin can delete
  async remove(@Param('id') id: string) { ... }
}
```

**Resolution:** Method-level `@Roles()` overrides class-level. If neither is set, no role check is applied (guard passes).

---

## 7. Default Role & Promotion

| Event               | Action                                                                          |
| ------------------- | ------------------------------------------------------------------------------- |
| User registers      | `role` set to `viewer` in User create                                           |
| Admin promotes user | `PATCH /api/v1/users/:id/role` with `{ role: "manager" }`                       |
| Audit log           | Every role change recorded with `actor_id`, `target_id`, `old_role`, `new_role` |

```typescript
// src/modules/users/users.service.ts
async updateRole(actorId: string, targetId: string, newRole: Role): Promise<User> {
  const target = await this.prisma.user.findUniqueOrThrow({ where: { id: targetId } });
  const oldRole = target.role;

  const updated = await this.prisma.user.update({
    where: { id: targetId },
    data: { role: newRole },
  });

  await this.auditService.log({
    actorId,
    targetId,
    action: 'ROLE_CHANGE',
    metadata: { oldRole, newRole },
  });

  return updated;
}
```

---

## 8. Error Handling

| Scenario                   | Status | Code                 | Body                                               |
| -------------------------- | ------ | -------------------- | -------------------------------------------------- |
| No auth                    | 401    | `AUTH_MISSING_TOKEN` | Standard auth error                                |
| Wrong role                 | 403    | `INSUFFICIENT_ROLE`  | `{ code, message, details: { required, actual } }` |
| Resource permission denied | 403    | `PERMISSION_DENIED`  | `{ code, message, details: { resource, action } }` |

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_ROLE",
    "message": "Requires one of: admin",
    "details": {
      "required": ["admin"],
      "actual": "viewer"
    }
  }
}
```

---

## 9. Audit Logging

### Role Change Event

| Field              | Value                                  |
| ------------------ | -------------------------------------- |
| `action`           | `ROLE_CHANGE`                          |
| `actorId`          | UUID of the admin who changed the role |
| `targetId`         | UUID of the user whose role changed    |
| `metadata.oldRole` | Previous role value                    |
| `metadata.newRole` | New role value                         |

```
INSERT INTO audit_logs (actor_id, target_id, action, metadata)
VALUES ($1, $2, 'ROLE_CHANGE', '{"oldRole":"viewer","newRole":"manager"}');
```

---

## 10. Test Cases

```typescript
describe("RolesGuard", () => {
  describe("Viewer restrictions", () => {
    it("returns 403 when viewer tries to create a product");
    it("returns 403 when viewer tries to delete an order");
    it("returns 200 when viewer lists products (read-only)");
    it("returns 200 when viewer views their own profile");
  });

  describe("Manager capabilities", () => {
    it("returns 201 when manager creates a product");
    it("returns 200 when manager updates a product");
    it("returns 403 when manager deletes a product");
    it("returns 200 when manager processes an order");
  });

  describe("Admin capabilities", () => {
    it("returns 200 when admin deletes any product");
    it("returns 200 when admin promotes user to manager");
    it("returns 200 when admin updates tenant settings");
  });

  describe("SuperAdmin bypass", () => {
    it("returns 200 when superadmin accesses any tenant resource");
    it("returns 200 when superadmin lists all tenants");
    it("bypasses tenant guard entirely");
  });

  describe("Resource-level overrides", () => {
    it("allows viewer with Permission grant to create a specific product");
    it("denies admin with Permission deny on a specific product");
  });

  describe("Error responses", () => {
    it("returns 403 with code INSUFFICIENT_ROLE on role mismatch");
    it("includes required and actual roles in error details");
  });
});
```

---

## 11. Module Wiring

```typescript
// app.module.ts (global guard registration)
import { APP_GUARD } from "@nestjs/core";

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: TenantGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
```

Guard order matches provider array order — Nest applies `APP_GUARD` in declaration sequence.
