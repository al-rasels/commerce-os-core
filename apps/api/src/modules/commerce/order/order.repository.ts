import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class OrderRepository extends TenantScopedRepository<Order> {
  constructor(prisma: PrismaService) {
    super(prisma, 'order');
  }

  async update(ctx: TenantContext, id: string, data: any): Promise<Order> {
    const result = await this.prisma.order.updateMany({
      where: { id, tenant_id: ctx.tenantId },
      data,
    });

    if (result.count === 0) {
      throw new Error('Order not found or not owned by tenant');
    }

    return this.findUnique(ctx, id, { include: { items: true } }) as Promise<Order>;
  }

  async fulfillStock(ctx: TenantContext, orderId: string): Promise<void> {
    const items = await this.prisma.orderItem.findMany({
      where: { order_id: orderId, tenant_id: ctx.tenantId },
    });

    for (const item of items) {
      await this.prisma.productVariant.updateMany({
        where: { id: item.variant_id, tenant_id: ctx.tenantId },
        data: {
          stock_reserved: { decrement: item.quantity },
          stock_available: { decrement: item.quantity },
        },
      });
    }
  }

  async releaseStock(ctx: TenantContext, orderId: string): Promise<void> {
    const items = await this.prisma.orderItem.findMany({
      where: { order_id: orderId, tenant_id: ctx.tenantId },
    });

    for (const item of items) {
      await this.prisma.productVariant.updateMany({
        where: { id: item.variant_id, tenant_id: ctx.tenantId },
        data: {
          stock_reserved: { decrement: item.quantity },
        },
      });

      await this.prisma.stockReservation.deleteMany({
        where: { 
          order_id: orderId, 
          variant_id: item.variant_id, 
          tenant_id: ctx.tenantId 
        },
      });
    }
  }
}
