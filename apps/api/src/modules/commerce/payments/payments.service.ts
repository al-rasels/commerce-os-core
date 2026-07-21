import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrderService } from '../order/order.service';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @Inject('STRIPE_CLIENT') private readonly stripe: any,
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
  ) {}

  async createPaymentIntent(orderId: string, tenantId: string) {
    const dummyCtx = { tenantId } as TenantContext;
    let order;
    try {
      order = await this.orderService.get(dummyCtx, orderId);
    } catch {
      throw new BadRequestException('Order not found');
    }

    if (order.status !== 'pending') {
      throw new BadRequestException('Order is not pending');
    }

    const paymentIntent = await this.stripe.paymentIntents.create(
      {
        amount: order.total,
        currency: (order.currency || 'USD').toLowerCase(),
        client_reference_id: orderId,
        metadata: { order_id: orderId, tenant_id: tenantId },
      },
      { idempotency_key: `create_intent_${orderId}` },
    );

    return { client_secret: paymentIntent.client_secret };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch {
      this.logger.warn('Webhook signature verification failed');
      throw new BadRequestException('Invalid signature');
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object);
        break;
    }

    return { received: true };
  }

  private async handlePaymentSucceeded(intent: any) {
    const orderId = intent.client_reference_id || intent.metadata?.order_id;
    const tenantId = intent.metadata?.tenant_id;

    if (!orderId || !tenantId) {
      this.logger.warn(
        `Missing order/tenant reference in PaymentIntent ${intent.id}`,
      );
      return;
    }

    const dummyCtx = { tenantId } as TenantContext;
    let order;
    try {
      order = await this.orderService.get(dummyCtx, orderId);
    } catch {
      this.logger.warn(
        `Order ${orderId} not found for PaymentIntent ${intent.id}`,
      );
      return;
    }

    if (order.status === 'paid') {
      this.logger.log(`Order ${orderId} already paid, skipping`);
      return;
    }

    await this.orderService.updateStatus(dummyCtx, orderId, 'paid');

    this.logger.log(`Order ${orderId} marked as paid`);
  }

  private async handlePaymentFailed(intent: any) {
    const orderId = intent.client_reference_id || intent.metadata?.order_id;
    const tenantId = intent.metadata?.tenant_id;

    if (!orderId || !tenantId) return;

    const dummyCtx = { tenantId } as TenantContext;
    await this.orderService.updateStatus(dummyCtx, orderId, 'cancelled');

    this.logger.warn(`Order ${orderId} payment failed, marked cancelled`);
  }
}
