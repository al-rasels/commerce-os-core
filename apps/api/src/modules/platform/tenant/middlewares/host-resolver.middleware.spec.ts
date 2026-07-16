import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { HostResolverMiddleware } from './host-resolver.middleware';
import { TenantContext } from '../tenant-context';

describe('HostResolverMiddleware', () => {
  let middleware: HostResolverMiddleware;
  let tenantService: Record<string, jest.Mock>;

  const mockTenantService = {
    resolveTenant: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HostResolverMiddleware,
        { provide: TenantService, useValue: mockTenantService },
      ],
    }).compile();

    middleware = module.get<HostResolverMiddleware>(HostResolverMiddleware);
    tenantService = mockTenantService as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('resolves tenant and attaches context to request', async () => {
    const ctx = new TenantContext({
      tenantId: 't1',
      domain: 'test.local',
      plan: 'enterprise',
      effectiveFlags: new Set(),
      theme: { themeBaseId: '', overrides: {} },
      locale: 'en-US',
      currency: 'USD',
      permissions: [],
      storagePrefix: 'tenant-t1/',
    });

    mockTenantService.resolveTenant.mockResolvedValueOnce(ctx);

    const req = { hostname: 'test.local' } as any;
    const res = {} as any;
    const next = jest.fn();

    await middleware.use(req, res, next);

    expect(req.resolvedTenantId).toBe('t1');
    expect(req.resolvedDomain).toBe('test.local');
    expect(req.tenantContext).toBe(ctx);
    expect(next).toHaveBeenCalled();
  });
});
