import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('v1/storefront/orders')
export class StorefrontOrderController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get('by-email')
  async getOrdersByEmail(
    @GetTenantContext() ctx: TenantContext,
    @Query('email') email: string,
  ) {
    const service = this.prismaService as any;

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
    const service = this.prismaService as any;

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
