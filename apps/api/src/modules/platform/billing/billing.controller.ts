import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';

@Controller('v1/platform/billing')
@RequirePermissions('super_admin')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  async createCheckoutSession(@Body() dto: { tenantId: string; planId: string }) {
    return this.billingService.createCheckoutSession(dto.tenantId, dto.planId);
  }

  @Get('status/:tenantId')
  async getBillingStatus(@Param('tenantId') tenantId: string) {
    return this.billingService.getBillingStatus(tenantId);
  }
}
