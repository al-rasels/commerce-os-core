import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PrismaService } from '../../../prisma/prisma.service';

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
}
