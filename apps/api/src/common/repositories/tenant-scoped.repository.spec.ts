import { TenantScopedRepository } from './tenant-scoped.repository';
import { TenantContext } from '../../modules/platform/tenant/tenant-context';

class TestRepo extends TenantScopedRepository<any> {
  constructor(prisma: any) {
    super(prisma, 'widget');
  }
}

describe('TenantScopedRepository', () => {
  let prisma: any;
  let repo: TestRepo;

  const ctxA = new TenantContext({
    tenantId: 'tenant-a',
    domain: 'a.test',
    plan: 'enterprise',
    effectiveFlags: new Set(),
    theme: { themeBaseId: '', overrides: {} },
    locale: 'en-US',
    currency: 'USD',
    permissions: [],
    storagePrefix: 'tenant-a/',
  });

  const ctxB = new TenantContext({
    tenantId: 'tenant-b',
    domain: 'b.test',
    plan: 'basic',
    effectiveFlags: new Set(),
    theme: { themeBaseId: '', overrides: {} },
    locale: 'en-US',
    currency: 'USD',
    permissions: [],
    storagePrefix: 'tenant-b/',
  });

  beforeEach(() => {
    prisma = {
      widget: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
      },
    };
    repo = new TestRepo(prisma);
  });

  describe('findMany', () => {
    it('auto-injects tenant_id filter', async () => {
      await repo.findMany(ctxA);
      expect(prisma.widget.findMany).toHaveBeenCalledWith({ where: { tenant_id: 'tenant-a' } });
    });

    it('merges tenant_id with additional where clauses', async () => {
      await repo.findMany(ctxA, { where: { status: 'active' } });
      expect(prisma.widget.findMany).toHaveBeenCalledWith({
        where: { status: 'active', tenant_id: 'tenant-a' },
      });
    });
  });

  describe('findUnique', () => {
    it('returns record when tenant matches', async () => {
      prisma.widget.findUnique.mockResolvedValue({ id: 'w1', tenant_id: 'tenant-a' });

      const result = await repo.findUnique(ctxA, 'w1');

      expect(result).toEqual({ id: 'w1', tenant_id: 'tenant-a' });
    });

    it('returns null when record belongs to another tenant (defense in depth)', async () => {
      prisma.widget.findUnique.mockResolvedValue({ id: 'w1', tenant_id: 'tenant-b' });

      const result = await repo.findUnique(ctxA, 'w1');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('auto-assigns tenant_id', async () => {
      prisma.widget.create.mockResolvedValue({ id: 'w1', tenant_id: 'tenant-a', name: 'test' });

      const result = await repo.create(ctxA, { name: 'test' });

      expect(prisma.widget.create).toHaveBeenCalledWith({
        data: { name: 'test', tenant_id: 'tenant-a' },
      });
      expect(result.tenant_id).toBe('tenant-a');
    });
  });

  describe('update', () => {
    it('updates only when id AND tenant_id match', async () => {
      prisma.widget.updateMany.mockResolvedValue({ count: 1 });
      prisma.widget.findUnique.mockResolvedValue({ id: 'w1', tenant_id: 'tenant-a', name: 'updated' });

      await repo.update(ctxA, 'w1', { name: 'updated' });

      expect(prisma.widget.updateMany).toHaveBeenCalledWith({
        where: { id: 'w1', tenant_id: 'tenant-a' },
        data: { name: 'updated' },
      });
    });

    it('throws when record not found for tenant', async () => {
      prisma.widget.updateMany.mockResolvedValue({ count: 0 });

      await expect(repo.update(ctxA, 'w1', { name: 'x' })).rejects.toThrow('Record not found or not owned by tenant');
    });
  });
});
