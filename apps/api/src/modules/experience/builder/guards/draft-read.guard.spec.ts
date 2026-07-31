import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DraftReadGuard } from './draft-read.guard';

function mockCtx(
  draft: string | undefined,
  secretHeader: string | undefined,
  tokenPayload: any,
  tenantId: string | undefined,
) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        query: draft ? { draft } : {},
        headers: {
          'x-preview-secret': secretHeader,
          authorization: tokenPayload ? `Bearer mock-token` : undefined,
        },
        tenantContext: tenantId ? { tenantId } : undefined,
      }),
    }),
  } as any;
}

describe('DraftReadGuard', () => {
  let guard: DraftReadGuard;
  let jwtService: { verifyAsync: jest.Mock };

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() };
    guard = new DraftReadGuard(jwtService as any);
    process.env.PREVIEW_SECRET = 'test-preview-secret';
  });

  afterEach(() => {
    delete process.env.PREVIEW_SECRET;
  });

  it('allows published reads without any auth', async () => {
    const ctx = mockCtx(undefined, undefined, undefined, 't1');

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).not.toHaveBeenCalled();
  });

  it('allows draft reads with a matching x-preview-secret', async () => {
    const ctx = mockCtx('true', 'test-preview-secret', undefined, 't1');

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).not.toHaveBeenCalled();
  });

  it('rejects draft reads with wrong secret and no token', async () => {
    const ctx = mockCtx('true', 'wrong-secret', undefined, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('allows draft reads with a valid JWT matching the tenant', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'u1',
      tenant_id: 't1',
      role: 'Store Owner',
    });
    const ctx = mockCtx('true', 'wrong-secret', { sub: 'u1' }, 't1');

    const result = await guard.canActivate(ctx);

    expect(result).toBe(true);
  });

  it('rejects draft reads when JWT tenant differs from request tenant', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'u1',
      tenant_id: 't1',
      role: 'Store Owner',
    });
    const ctx = mockCtx('true', 'wrong-secret', { sub: 'u1' }, 't2');

    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('rejects draft reads with an invalid JWT', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('bad token'));
    const ctx = mockCtx('true', 'wrong-secret', { sub: 'u1' }, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });

  it('rejects draft reads when JWT has no tenant_id but request has tenantId', async () => {
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'u1',
      tenant_id: null,
      role: 'Super Admin',
    });
    const ctx = mockCtx('true', 'wrong-secret', { sub: 'u1' }, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('fails closed when PREVIEW_SECRET is unset even with a matching header', async () => {
    delete process.env.PREVIEW_SECRET;
    const ctx = mockCtx('true', 'test-preview-secret', undefined, 't1');

    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });
});
