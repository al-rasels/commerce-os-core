import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { CatalogService } from '../catalog/catalog.service';
import { OrderService } from '../order/order.service';
import { InventoryService } from '../inventory/inventory.service';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PaymentsService } from '../payments/payments.service';
import { PromotionsService } from '../promotions/promotions.service';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly cartService: CartService,
    private readonly catalogService: CatalogService,
    private readonly orderService: OrderService,
    private readonly paymentsService: PaymentsService,
    private readonly promotionsService: PromotionsService,
    private readonly inventoryService: InventoryService,
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

    let subtotalCents = (cart as any).items.reduce(
      (sum: number, i: any) => sum + i.variant.price_cents * i.quantity,
      0,
    );
    const taxCents = 0;
    const shippingCents = 0;
    let discountCents = 0;
    
    // Apply promotion if attached to cart
    if ((cart as any).promotion) {
      const promo = (cart as any).promotion;
      if (promo.type === 'percentage') {
        discountCents = Math.round(subtotalCents * (promo.value / 100));
      } else if (promo.type === 'fixed_amount') {
        discountCents = promo.value;
      }
      discountCents = Math.min(discountCents, subtotalCents);
    }

    const totalCents = subtotalCents + taxCents + shippingCents - discountCents;
    const currency = (cart as any).items[0]?.variant.currency || 'USD';

    const reservationIds: string[] = [];

    // PHASE 1: Reserve all stock FIRST
    for (const item of (cart as any).items) {
      const reservationId = await this.inventoryService.reserveStock(
        ctx,
        item.variant_id,
        item.quantity,
      );
      if (!reservationId) {
        // Rollback previous reservations
        for (const resId of reservationIds) {
          await this.inventoryService.releaseReservation(ctx, resId);
        }
        throw new BadRequestException(
          `Failed to reserve stock for variant ${item.variant_id} (Out of Stock)`,
        );
      }
      reservationIds.push(reservationId);
    }

    this.logger.log(`Processing transaction for cart ${cartId}`);

    let order;
    try {
      // PHASE 2: Create Order
      order = await this.orderService.createOrder(ctx, {
        customer_id: (cart as any).customer_id!,
        status: 'pending',
        subtotal_cents: subtotalCents,
        tax_cents: taxCents,
        shipping_cents: shippingCents,
        discount_cents: discountCents,
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

      // PHASE 3: Confirm Reservations
      for (const resId of reservationIds) {
        await this.inventoryService.confirmReservation(ctx, resId, order.id);
      }
    } catch (e) {
      // Rollback on Order Creation Failure
      for (const resId of reservationIds) {
        await this.inventoryService.releaseReservation(ctx, resId);
      }
      throw e;
    }

    if ((cart as any).promotion) {
      await this.promotionsService.incrementUsage(ctx, (cart as any).promotion.id);
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
