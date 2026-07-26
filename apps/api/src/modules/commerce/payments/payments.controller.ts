import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreateRefundDto } from './dto/create-refund.dto';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/payments')
@UseGuards(TenantAuthGuard, PermissionGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @RequirePermissions('payment.write')
  async createIntent(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreatePaymentIntentDto,
  ) {
    return this.paymentsService.createPaymentIntent(dto.order_id, ctx.tenantId);
  }

  @Post('refund')
  @RequirePermissions('payment.write')
  async refund(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateRefundDto,
  ) {
    return this.paymentsService.refund(
      dto.order_id,
      ctx.tenantId,
      dto.amount_cents,
    );
  }
}
