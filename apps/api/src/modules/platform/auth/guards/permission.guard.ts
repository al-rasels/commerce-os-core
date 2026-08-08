import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

/**
 * Enforces `@RequirePermissions(...)` on controller handlers.
 *
 * The tenant JWT minted by AuthService carries a `permissions` claim derived
 * from the role's `permissions` column. This guard is strict: every required
 * permission must be present in the token's claim.
 *
 * If a protected route is reached but the token carries no `permissions` claim
 * at all, that is a misconfiguration (role not seeded, or token from an older
 * flow) — we deny explicitly and log so it is discoverable instead of failing
 * silently.
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userPermissions: string[] =
      Array.isArray(user?.permissions) && user.permissions.length > 0
        ? user.permissions
        : [];

    if (userPermissions.length === 0) {
      this.logger.warn(
        `Denying protected route (missing permissions claim). Required: ${requiredPermissions.join(
          ', ',
        )}`,
      );
      return false;
    }

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}