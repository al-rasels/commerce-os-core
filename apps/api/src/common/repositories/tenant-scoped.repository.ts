import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TenantContext } from '../../modules/platform/tenant/tenant-context';

@Injectable()
export abstract class TenantScopedRepository<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  private scope(ctx: TenantContext, where: object = {}) {
    return { ...where, tenant_id: ctx.tenantId };
  }

  async count(ctx: TenantContext, where: object = {}): Promise<number> {
    return (this.prisma as any)[this.modelName].count({
      where: this.scope(ctx, where),
    });
  }

  async findMany(ctx: TenantContext, args: any = {}): Promise<T[]> {
    const { where, ...rest } = args;
    return (this.prisma as any)[this.modelName].findMany({
      where: this.scope(ctx, where),
      ...rest,
    });
  }

  async findUnique(ctx: TenantContext, id: string): Promise<T | null> {
    const record = await (this.prisma as any)[this.modelName].findUnique({
      where: { id },
    });
    if (record && record.tenant_id !== ctx.tenantId) return null; // defense in depth
    return record;
  }

  async create(ctx: TenantContext, data: any): Promise<T> {
    return (this.prisma as any)[this.modelName].create({
      data: { ...data, tenant_id: ctx.tenantId },
    });
  }

  async update(ctx: TenantContext, id: string, data: any): Promise<T> {
    const result = await (this.prisma as any)[this.modelName].updateMany({
      where: { id, tenant_id: ctx.tenantId },
      data,
    });
    
    if (result.count === 0) {
      throw new Error('Record not found or not owned by tenant');
    }
    
    return this.findUnique(ctx, id) as Promise<T>;
  }

  async softDelete(ctx: TenantContext, id: string): Promise<T> {
    return this.update(ctx, id, { deleted_at: new Date() });
  }
}