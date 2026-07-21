import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { CatalogService } from '../catalog/catalog.service';
import { OrderService } from '../order/order.service';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly cartService: CartService,
    private readonly catalogService: CatalogService,
    private readonly orderService: OrderService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async checkout(ctx: TenantContext, cartId: string) {
    this.logger.log(
      `Starting checkout for cart ${cartId} (Tenant: ${ctx.tenantId})`,
    );

    const cart = await this.cartService.getWithItems(ctx, cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    if ((cart as any).status !== 'open') {
      throw new BadRequestException('Cart is not open');
    }
    if ((cart as any).items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of (cart as any).items) {
      const available =
        item.variant.stock_available - item.variant.stock_reserved;
      if (available < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for variant ${item.variant_id}`,
        );
      }
    }

    const subtotalCents = (cart as any).items.reduce(
      (sum: number, i: any) => sum + i.variant.price_cents * i.quantity,
      0,
    );
    const taxCents = 0;
    const shippingCents = 0;
    const totalCents = subtotalCents + taxCents + shippingCents;
    const currency = (cart as any).items[0]?.variant.currency || 'USD';

    this.logger.log(`Processing transaction for cart ${cartId}`);

    const order = await this.orderService.createOrder(ctx, {
      customer_id: (cart as any).customer_id!,
      status: 'pending',
      subtotal_cents: subtotalCents,
      tax_cents: taxCents,
      shipping_cents: shippingCents,
      total_cents: totalCents,
      currency,
      channel: 'online',
      items: {
        create: (cart as any).items.map((i: any) => ({
          tenant_id: ctx.tenantId,
          variant_id: i.variant_id,
          quantity: i.quantity,
          unit_price_cents: i.variant.price_cents,
        })),
      },
    });

    for (const item of (cart as any).items) {
      const reserved = await this.catalogService.reserveStock(
        ctx,
        item.variant_id,
        item.quantity,
        order.id,
      );
      if (!reserved) {
        throw new BadRequestException(
          `Failed to reserve stock for variant ${item.variant_id}`,
        );
      }
    }

    await this.cartService.convert(ctx, cartId);

    this.logger.log(`Order ${order.id} created, generating payment intent`);
    const { client_secret } = await this.paymentsService.createPaymentIntent(
      order.id,
      ctx.tenantId,
    );

    return { order, client_secret };
  }
}
