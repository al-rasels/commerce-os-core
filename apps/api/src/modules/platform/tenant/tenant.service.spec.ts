import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { TenantService } from './tenant.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('TenantService', () => {
  let service: TenantService;
  let prisma: Record<string, jest.Mock>;
  let cacheManager: Record<string, jest.Mock>;

  const mockPrisma = {
    tenantDomain: {
      findUnique: jest.fn(),
    },
  };

  const mockCache = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
    prisma = mockPrisma as any;
    cacheManager = mockCache as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('resolveTenant', () => {
    it('returns cached context when cache hit', async () => {
      const cached = JSON.stringify({ tenantId: 't1', domain: 'test.local' });
      mockCache.get.mockResolvedValueOnce(cached);

      const result = await service.resolveTenant('test.local');

      expect(result.tenantId).toBe('t1');
      expect(mockCache.get).toHaveBeenCalledWith('tenant:domain:test.local');
      expect(mockPrisma.tenantDomain.findUnique).not.toHaveBeenCalled();
    });

    it('fetches from DB and caches on cache miss', async () => {
      mockCache.get.mockResolvedValueOnce(null);
      mockPrisma.tenantDomain.findUnique.mockResolvedValueOnce({
        domain: 'test.local',
        tenant_id: 't1',
        tenant: {
          id: 't1',
          plan_id: 'enterprise',
          flags: [
            { flag_key: 'dark_mode', enabled: true },
            { flag_key: 'beta', enabled: false },
          ],
          theme_overrides: [],
        },
      });

      const result = await service.resolveTenant('test.local');

      expect(result.tenantId).toBe('t1');
      expect(result.plan).toBe('enterprise');
      expect(result.hasFeature('dark_mode')).toBe(true);
      expect(result.hasFeature('beta')).toBe(false);
      expect(mockCache.set).toHaveBeenCalled();
    });

    it('throws NotFoundException when domain not found', async () => {
      mockCache.get.mockResolvedValueOnce(null);
      mockPrisma.tenantDomain.findUnique.mockResolvedValueOnce(null);

      await expect(service.resolveTenant('unknown.local')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('invalidateCache', () => {
    it('deletes cache entry for domain', async () => {
      await service.invalidateCache('test.local');
      expect(mockCache.del).toHaveBeenCalledWith('tenant:domain:test.local');
    });
  });
});
