import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TenantAuthGuard } from './tenant-auth.guard';

function mockCtx(tokenPayload: any, tenantId: string | undefined) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          authorization: tokenPayload ? `Bearer mock-token` : undefined,
        },
        tenantContext: tenantId ? { tenantId } : undefined,
      }),
    }),
  } as any;
}

describe('TenantAuthGuard', () => {
  let guard: TenantAuthGuard;
  let jwtService: { verifyAsync: jest.Mock };

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() };
    guard = new TenantAuthGuard(jwtService as any);
  });

  it('allows when token tenant matches request tenant', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1', tenant_id: 't1', role: 'Store Owner' });
    const ctx = mockCtx({ sub: 'u1' }, 't1');

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
  });

  it('rejects when token tenant differs from request tenant (cross-tenant)', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1', tenant_id: 't1', role: 'Store Owner' });
    const ctx = mockCtx({ sub: 'u1' }, 't2');

    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('rejects when token has no tenant_id but request has tenantId', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1', tenant_id: null, role: 'Super Admin' });
    const ctx = mockCtx({ sub: 'u1' }, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('throws UnauthorizedException when no token provided', async () => {
    const ctx = mockCtx(null, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('bad token'));
    const ctx = mockCtx({ sub: 'u1' }, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });
});
