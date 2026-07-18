import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { TenantContext } from '../tenant/tenant-context';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository extends TenantScopedRepository<User> {
  private readonly include = {
    role: { select: { id: true, name: true } },
  };

  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findManyWithRole(ctx: TenantContext, args: any = {}): Promise<Array<User & { role: { id: string, name: string } }>> {
    return this.prisma.user.findMany({
      ...args,
      where: { ...args.where, tenant_id: ctx.tenantId },
      include: this.include,
    }) as any;
  }

  async findUniqueWithRole(ctx: TenantContext, id: string): Promise<User & { role: { id: string, name: string } } | null> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: this.include,
    }) as any;
    if (record && record.tenant_id !== ctx.tenantId) return null;
    return record;
  }

  async findUniqueWithRoleFull(ctx: TenantContext, id: string): Promise<User & { role: { id: string, name: string }, tenant: { id: string, name: string } | null } | null> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ...this.include,
        tenant: { select: { id: true, name: true } },
      },
    }) as any;
    if (record && record.tenant_id !== ctx.tenantId) return null;
    return record;
  }

  async updateUser(ctx: TenantContext, id: string, data: any) {
    return this.update(ctx, id, data);
  }
}
