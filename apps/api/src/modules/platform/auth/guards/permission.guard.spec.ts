import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionGuard } from './permission.guard';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

function makeCtx(permissions?: string[]): ExecutionContext {
  const handler = () => {};
  const req = { user: permissions ? { permissions } : {} };
  return {
    getHandler: () => handler,
    getClass: () => class {},
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

function makeGuard(required: string[] | undefined) {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(required),
  } as unknown as Reflector;
  return new PermissionGuard(reflector);
}

describe('PermissionGuard', () => {
  it('allows when no permissions are required', () => {
    const guard = makeGuard(undefined);
    expect(guard.canActivate(makeCtx([]))).toBe(true);
    expect(guard.canActivate(makeCtx(['anything']))).toBe(true);
  });

  it('allows when the user holds every required permission', () => {
    const guard = makeGuard(['catalog.read', 'catalog.write']);
    expect(
      guard.canActivate(makeCtx(['catalog.read', 'catalog.write', 'order.read'])),
    ).toBe(true);
  });

  it('denies when the user is missing a required permission', () => {
    const guard = makeGuard(['catalog.read', 'builder.write']);
    expect(guard.canActivate(makeCtx(['catalog.read']))).toBe(false);
  });

  it('denies and logs when the token carries no permissions claim', () => {
    const guard = makeGuard(['builder.write']);
    expect(guard.canActivate(makeCtx(undefined))).toBe(false);
  });
});