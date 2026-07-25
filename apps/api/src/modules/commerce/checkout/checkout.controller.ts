import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/checkout')
@UseGuards(TenantAuthGuard, PermissionGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @RequirePermissions('checkout.write')
  async checkout(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CheckoutDto,
  ) {
    return this.checkoutService.checkout(ctx, dto.cart_id);
  }
}
