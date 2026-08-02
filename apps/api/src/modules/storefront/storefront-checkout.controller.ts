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

@Controller('v1/storefront/checkout')
export class StorefrontCheckoutController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(':cartId')
  @HttpCode(HttpStatus.OK)
  async checkout(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Body('email') email?: string,
    @Body('session_id') sessionId?: string,
    @Body('shipping_first_name') shippingFirstName?: string,
    @Body('shipping_last_name') shippingLastName?: string,
    @Body('shipping_address_line1') shippingAddressLine1?: string,
    @Body('shipping_address_line2') shippingAddressLine2?: string,
    @Body('shipping_city') shippingCity?: string,
    @Body('shipping_state') shippingState?: string,
    @Body('shipping_postal_code') shippingPostalCode?: string,
    @Body('shipping_country') shippingCountry?: string,
    @Body('shipping_phone') shippingPhone?: string,
    @Body('billing_same_as_shipping') billingSameAsShipping?: boolean,
  ) {
    const prisma = this.prismaService;

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { variant: true } } },
    });

    if (!cart || cart.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.status !== 'open')
      throw new BadRequestException('Cart is not open');
    if (cart.items.length === 0) throw new BadRequestException('Cart is empty');

    for (const item of cart.items) {
      const available =
        item.variant.stock_available - item.variant.stock_reserved;
      if (available < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for variant ${item.variant_id}`,
        );
      }
    }

    const subtotalCents = cart.items.reduce(
      (sum: number, i) => sum + i.variant.price_cents * i.quantity,
      0,
    );
    const totalCents = subtotalCents;
    const currency = cart.items[0]?.variant.currency || 'USD';

    let customerId = cart.customer_id;
    if (!customerId && email) {
      const existing = await prisma.customer.findFirst({
        where: { tenant_id: ctx.tenantId, email },
      });
      if (existing) {
        customerId = existing.id;
      } else {
        const created = await prisma.customer.create({
          data: { tenant_id: ctx.tenantId, email },
        });
        customerId = created.id;
      }
    }

    if (!customerId) {
      throw new BadRequestException(
        'Customer ID or email is required to create an order',
      );
    }

    const shippingAddress = {
      first_name: shippingFirstName || null,
      last_name: shippingLastName || null,
      address_line1: shippingAddressLine1 || null,
      address_line2: shippingAddressLine2 || null,
      city: shippingCity || null,
      state: shippingState || null,
      postal_code: shippingPostalCode || null,
      country: shippingCountry || null,
      phone: shippingPhone || null,
    };

    const billingAddress = billingSameAsShipping ? shippingAddress : {};

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          tenant_id: ctx.tenantId,
          customer_id: customerId,
          customer_email: email || null,
          status: 'pending',
          subtotal_cents: subtotalCents,
          tax_cents: 0,
          shipping_cents: 0,
          total_cents: totalCents,
          currency,
          channel: 'online',
          shipping_address: shippingAddress,
          billing_address: billingAddress,
          items: {
            create: cart.items.map((i) => ({
              tenant_id: ctx.tenantId,
              variant_id: i.variant_id,
              quantity: i.quantity,
              unit_price_cents: i.variant.price_cents,
            })),
          },
        },
        include: { items: true },
      });

      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variant_id },
          data: { stock_reserved: { increment: item.quantity } },
        });
        await tx.stockReservation.create({
          data: {
            tenant_id: ctx.tenantId,
            variant_id: item.variant_id,
            order_id: created.id,
            quantity: item.quantity,
            expires_at: new Date(Date.now() + 30 * 60 * 1000),
          },
        });
      }

      await tx.cartItem.deleteMany({ where: { cart_id: cartId } });
      await tx.cart.update({
        where: { id: cartId },
        data: { status: 'converted' },
      });

      return created;
    });

    try {
      const Stripe = require('stripe');
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia',
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCents,
        currency: currency.toLowerCase(),
        metadata: { order_id: order.id, tenant_id: ctx.tenantId },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripe_payment_intent_id: paymentIntent.id },
      });

      return { order, client_secret: paymentIntent.client_secret };
    } catch {
      return { order, client_secret: null };
    }
  }
}
