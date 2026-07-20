import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';

@Controller('v1/storefront/orders')
export class StorefrontOrderController {
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
