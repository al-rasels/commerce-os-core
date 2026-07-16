import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/orders')
@UseGuards(TenantAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  @RequirePermissions('order.read')
  async get(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.orderService.get(ctx, id);
  }
}
