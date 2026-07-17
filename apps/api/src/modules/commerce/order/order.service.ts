import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PrismaService } from '../../../prisma/prisma.service';

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilled', 'refunded', 'cancelled'],
  fulfilled: ['refunded'],
  cancelled: [],
  refunded: [],
};

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly prisma: PrismaService,
  ) {}

  async get(ctx: TenantContext, id: string) {
    const order = await (this.prisma as any).order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order || order.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async list(
    ctx: TenantContext,
    filters: { status?: string; customer_id?: string; page?: number; limit?: number },
  ) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (filters.status) where.status = filters.status;
    if (filters.customer_id) where.customer_id = filters.customer_id;

    const [data, total] = await Promise.all([
      this.orderRepo.findMany(ctx, {
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: { items: true },
      }),
      this.orderRepo.count(ctx, where),
    ]);

    return { data, total, page, limit };
  }

  async updateStatus(ctx: TenantContext, id: string, newStatus: string) {
    const order = await this.get(ctx, id);

    const allowed = VALID_TRANSITIONS[order.status];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition order from '${order.status}' to '${newStatus}'`,
      );
    }

    return (this.prisma as any).order.update({
      where: { id },
      data: { status: newStatus },
      include: { items: true },
    });
  }
}
