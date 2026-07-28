import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';

@Controller('v1/storefront/orders')
export class StorefrontOrderController {
  @Get('by-email')
  async getOrdersByEmail(
    @GetTenantContext() ctx: TenantContext,
    @Query('email') email: string,
  ) {
    const { PrismaService } = await import('../../prisma/prisma.service.js');
    const prisma = new PrismaService();
    const service = prisma as any;

    const orders = await service.order.findMany({
      where: { tenant_id: ctx.tenantId, customer: { email } },
      include: { items: { include: { variant: true } } },
      orderBy: { created_at: 'desc' },
    });

    return orders;
  }

  @Get(':id')
  async getOrder(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    const { PrismaService } = await import('../../prisma/prisma.service.js');
    const prisma = new PrismaService();
    const service = prisma as any;

    const order = await service.order.findUnique({
      where: { id },
      include: { items: { include: { variant: true } } },
    });

    if (!order || order.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
