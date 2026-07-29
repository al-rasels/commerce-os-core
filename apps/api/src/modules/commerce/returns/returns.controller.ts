import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { ReturnsService } from './returns.service';

@Controller('v1/commerce/returns')
@UseGuards(TenantAuthGuard)
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Get()
  async getReturns(@GetTenantContext() ctx: TenantContext) {
    return this.returnsService.getReturns(ctx);
  }

  @Post(':orderId')
  async createReturnRequest(
    @GetTenantContext() ctx: TenantContext,
    @Param('orderId') orderId: string,
    @Body('reason') reason: string,
  ) {
    return this.returnsService.createReturnRequest(ctx, orderId, reason);
  }

  @Post(':id/approve')
  async approveReturnRequest(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.returnsService.approveReturnRequest(ctx, id);
  }

  @Post(':id/receive')
  async receiveReturnItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.returnsService.receiveReturnItem(ctx, id);
  }

  @Post(':id/refund')
  async processRefund(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.returnsService.processRefund(ctx, id);
  }
}
