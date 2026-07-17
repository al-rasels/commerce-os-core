import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { TenantContext } from '../tenant/tenant-context';

@Injectable()
export class UsersRepository extends TenantScopedRepository<any> {
  private readonly include = {
    role: { select: { id: true, name: true } },
  };

  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findManyWithRole(ctx: TenantContext, args: any = {}) {
    return this.findMany(ctx, { ...args, include: this.include });
  }

  async findUniqueWithRole(ctx: TenantContext, id: string) {
    return super.findUnique(ctx, id);
  }

  async findUniqueWithRoleFull(ctx: TenantContext, id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ...this.include,
        tenant: { select: { id: true, name: true } },
      },
    });
    if (record && record.tenant_id !== ctx.tenantId) return null;
    return record;
  }

  async updateUser(ctx: TenantContext, id: string, data: any) {
    return this.update(ctx, id, data);
  }
}
