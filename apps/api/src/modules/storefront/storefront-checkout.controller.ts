import { Controller, Post, Body, Param, HttpCode, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';

@Controller('v1/storefront/checkout')
export class StorefrontCheckoutController {
  @Post(':cartId')
  @HttpCode(HttpStatus.OK)
  async checkout(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Body('email') email?: string,
    @Body('session_id') sessionId?: string,
  ) {
    const { PrismaService } = await import('../../prisma/prisma.service');
    const prisma = new PrismaService();

    const cart = await (prisma as any).cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { variant: true } } },
    });

    if (!cart || cart.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.status !== 'open') throw new BadRequestException('Cart is not open');
    if (cart.items.length === 0) throw new BadRequestException('Cart is empty');

    for (const item of cart.items) {
      const available = item.variant.stock_available - item.variant.stock_reserved;
      if (available < item.quantity) {
        throw new BadRequestException(`Insufficient stock for variant ${item.variant_id}`);
      }
    }

    const subtotalCents = cart.items.reduce(
      (sum: number, i: any) => sum + i.variant.price_cents * i.quantity,
      0,
    );
    const totalCents = subtotalCents;
    const currency = cart.items[0]?.variant.currency || 'USD';

    let customerId = cart.customer_id;
    if (!customerId && email) {
      const existing = await (prisma as any).customer.findFirst({
        where: { tenant_id: ctx.tenantId, email },
      });
      if (existing) {
        customerId = existing.id;
      } else {
        const created = await (prisma as any).customer.create({
          data: { tenant_id: ctx.tenantId, email },
        });
        customerId = created.id;
      }
    }

    const order = await (prisma as any).$transaction(async (tx: any) => {
      const created = await tx.order.create({
        data: {
          tenant_id: ctx.tenantId,
          customer_id: customerId,
          status: 'pending',
          subtotal_cents: subtotalCents,
          tax_cents: 0,
          shipping_cents: 0,
          total_cents: totalCents,
          currency,
          channel: 'online',
          items: {
            create: cart.items.map((i: any) => ({
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
      return { order, client_secret: paymentIntent.client_secret };
    } catch {
      return { order, client_secret: null };
    }
  }
}
