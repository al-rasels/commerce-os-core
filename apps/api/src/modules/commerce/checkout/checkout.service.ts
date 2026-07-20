import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async checkout(ctx: TenantContext, cartId: string) {
    this.logger.log(
      `Starting checkout for cart ${cartId} (Tenant: ${ctx.tenantId})`,
    );

    const cart = await this.prisma.cart.findFirst({
      where: { id: cartId, tenant_id: ctx.tenantId },
      include: { items: { include: { variant: true } } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.status !== 'open') {
      throw new BadRequestException('Cart is not open');
    }
    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

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
      (sum: number, i: any) => sum + i.variant.price_cents * i.quantity,
      0,
    );
    const taxCents = 0;
    const shippingCents = 0;
    const totalCents = subtotalCents + taxCents + shippingCents;
    const currency = cart.items[0]?.variant.currency || 'USD';

    this.logger.log(`Processing transaction for cart ${cartId}`);

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          tenant_id: ctx.tenantId,
          customer_id: cart.customer_id!,
          status: 'pending',
          subtotal_cents: subtotalCents,
          tax_cents: taxCents,
          shipping_cents: shippingCents,
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
        await tx.productVariant.updateMany({
          where: { id: item.variant_id, tenant_id: ctx.tenantId },
          data: { stock_reserved: { increment: item.quantity } },
        });

        await tx.stockReservation.create({
          data: {
            tenant_id: ctx.tenantId,
            variant_id: item.variant_id,
            order_id: created.id,
            quantity: item.quantity,
            expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 mins
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { cart_id: cartId, tenant_id: ctx.tenantId },
      });

      await tx.cart.updateMany({
        where: { id: cartId, tenant_id: ctx.tenantId },
        data: { status: 'converted' },
      });

      return created;
    });

    this.logger.log(`Order ${order.id} created, generating payment intent`);
    const { client_secret } = await this.paymentsService.createPaymentIntent(
      order.id,
      ctx.tenantId,
    );

    return { order, client_secret };
  }
}
