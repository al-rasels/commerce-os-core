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
import { PrismaService } from '../../prisma/prisma.service';
import { CheckoutService } from '../commerce/checkout/checkout.service';

/**
 * Public storefront checkout.
 *
 * Delegates the actual order/pricing/reservation/payment work to the commerce
 * `CheckoutService` (single source of truth for tax, shipping, promotions,
 * atomic stock reservation + rollback, and Stripe intent creation). This
 * controller only validates tenant ownership, attaches a guest customer, and
 * enriches the resulting order with the shipping/billing address captured on
 * the storefront form.
 */
@Controller('v1/storefront/checkout')
export class StorefrontCheckoutController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly checkoutService: CheckoutService,
  ) {}

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
    @Body() body: Record<string, unknown> = {},
  ) {
    const prisma = this.prismaService;

    // 1. Tenant-scoped cart validation.
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { variant: true } } },
    });
    if (!cart || cart.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.status !== 'open') {
      throw new BadRequestException('Cart is not open');
    }
    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // 2. Attach (or create) the guest customer so CheckoutService can build an order.
    let customerId = cart.customer_id;
    if (!customerId && email) {
      const existing = await prisma.customer.findFirst({
        where: { tenant_id: ctx.tenantId, email },
      });
      customerId = existing
        ? existing.id
        : (
            await prisma.customer.create({
              data: { tenant_id: ctx.tenantId, email },
            })
          ).id;
      await prisma.cart.update({
        where: { id: cartId },
        data: { customer_id: customerId },
      });
    }
    if (!customerId) {
      throw new BadRequestException(
        'Customer ID or email is required to create an order',
      );
    }

    // 3. Single source of truth: reuse the commerce checkout orchestration.
    const { order, client_secret } = await this.checkoutService.checkout(
      ctx,
      cartId,
      shippingRuleId,
      promoCode,
    );

    // 4. Enrich the order with the storefront form's address / contact details.
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

    await prisma.order.update({
      where: { id: order.id },
      data: {
        customer_email: email || null,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      },
    });

    return { order, client_secret };
  }
}