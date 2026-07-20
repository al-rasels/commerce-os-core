import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { ListOrdersQueryDto } from './dto/list-orders-query.dto';
import { OrderStatusDto } from './dto/order-status.dto';

@Controller('v1/commerce/orders')
@UseGuards(TenantAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @RequirePermissions('order.read')
  async list(
    @GetTenantContext() ctx: TenantContext,
    @Query() query: ListOrdersQueryDto,
  ) {
    return this.orderService.list(ctx, query);
  }

  @Get(':id')
  @RequirePermissions('order.read')
  async get(@GetTenantContext() ctx: TenantContext, @Param('id') id: string) {
    return this.orderService.get(ctx, id);
  }

  @Patch(':id/status')
  @RequirePermissions('order.write')
  async updateStatus(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: OrderStatusDto,
  ) {
    return this.orderService.updateStatus(ctx, id, dto.status);
  }
}
