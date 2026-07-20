import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CustomerRepository extends TenantScopedRepository<Customer> {
  constructor(prisma: PrismaService) {
    super(prisma, 'customer');
  }

  async findByIdWithOrders(ctx: { tenantId: string }, id: string) {
    const record = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { created_at: 'desc' },
          select: {
            id: true,
            status: true,
            total_cents: true,
            currency: true,
            created_at: true,
          },
        },
      },
    });
    if (record && record.tenant_id !== ctx.tenantId) return null;
    return record;
  }
}
