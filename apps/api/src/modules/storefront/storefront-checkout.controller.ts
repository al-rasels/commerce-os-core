import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { CheckoutService } from '../commerce/checkout/checkout.service';

/**
 * Public storefront checkout.
 *
 * Delegates the actual order/pricing/reservation/payment work to the commerce
 * `CheckoutService` (single source of truth for tax, shipping, promotions,
 * atomic stock reservation + rollback, and Stripe intent creation).
 */
@Controller('v1/storefront/checkout')
export class StorefrontCheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post(':cartId/preview')
  @HttpCode(HttpStatus.OK)
  async preview(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Body('shipping_rule_id') shippingRuleId?: string,
    @Body('promo_code') promoCode?: string,
    @Body('shipping_state') shippingState?: string,
  ) {
    return this.checkoutService.preview(ctx, cartId, {
      shippingRuleId,
      promoCode,
      shippingState,
    });
  }

  @Post(':cartId')
  @HttpCode(HttpStatus.OK)
  async checkout(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Body('email') email?: string,
    @Body('session_id') sessionId?: string,
    @Body('shipping_rule_id') shippingRuleId?: string,
    @Body('promo_code') promoCode?: string,
    @Body('billing_same_as_shipping') billingSameAsShipping?: boolean,
    @Body() body: Record<string, any> = {},
  ) {
    const shippingAddress = {
      first_name: body.shipping_first_name ?? null,
      last_name: body.shipping_last_name ?? null,
      address_line1: body.shipping_address_line1 ?? null,
      address_line2: body.shipping_address_line2 ?? null,
      city: body.shipping_city ?? null,
      state: body.shipping_state ?? null,
      postal_code: body.shipping_postal_code ?? null,
      country: body.shipping_country ?? null,
      phone: body.shipping_phone ?? null,
    };

    const billingAddress = billingSameAsShipping
      ? shippingAddress
      : {
          first_name: body.billing_first_name ?? null,
          last_name: body.billing_last_name ?? null,
          address_line1: body.billing_address_line1 ?? null,
          address_line2: body.billing_address_line2 ?? null,
          city: body.billing_city ?? null,
          state: body.billing_state ?? null,
          postal_code: body.billing_postal_code ?? null,
          country: body.billing_country ?? null,
        };

    return this.checkoutService.checkout(ctx, cartId, {
      shippingRuleId,
      promoCode,
      email,
      shippingAddress,
      billingAddress,
    });
  }
}