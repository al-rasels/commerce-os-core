import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ReturnsRepository } from './repositories/returns.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PaymentsService } from '../payments/payments.service';
import { InventoryService } from '../inventory/inventory.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class ReturnsService {
  constructor(
    private readonly returnsRepo: ReturnsRepository,
    private readonly paymentsService: PaymentsService,
    private readonly inventoryService: InventoryService,
    private readonly orderService: OrderService,
  ) {}

  async getReturns(ctx: TenantContext) {
    return this.returnsRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
      include: { order: true },
    });
  }

  async createReturnRequest(
    ctx: TenantContext,
    orderId: string,
    reason: string,
  ) {
    const order = await this.orderService.get(ctx, orderId);
    if (order.status !== 'paid' && order.status !== 'fulfilled') {
      throw new BadRequestException('Can only return paid or fulfilled orders');
    }

    return this.returnsRepo.create(ctx, {
      order_id: orderId,
      reason,
      status: 'pending',
    });
  }

  async approveReturnRequest(ctx: TenantContext, id: string) {
    const returnReq = await this.returnsRepo.findUnique(ctx, id);
    if (!returnReq) throw new NotFoundException('Return request not found');
    if (returnReq.status !== 'pending') {
      throw new BadRequestException(
        `Cannot approve return in status ${returnReq.status}`,
      );
    }

    return this.returnsRepo.update(ctx, id, { status: 'approved' });
  }

  async receiveReturnItem(ctx: TenantContext, id: string) {
    const returnReq = await this.returnsRepo.findUnique(ctx, id);
    if (!returnReq) throw new NotFoundException('Return request not found');
    if (returnReq.status !== 'approved') {
      throw new BadRequestException(
        `Cannot receive return in status ${returnReq.status}`,
      );
    }

    const order = await this.orderService.get(ctx, returnReq.order_id);

    // Restock items
    for (const item of order.items) {
      await this.inventoryService.restock(ctx, item.variant_id, item.quantity);
    }

    return this.returnsRepo.update(ctx, id, { status: 'received' });
  }

  async processRefund(ctx: TenantContext, id: string) {
    const returnReq = await this.returnsRepo.findUnique(ctx, id);
    if (!returnReq) throw new NotFoundException('Return request not found');
    if (returnReq.status !== 'received') {
      throw new BadRequestException(
        `Cannot refund return in status ${returnReq.status}. Must receive items first.`,
      );
    }

    const order = await this.orderService.get(ctx, returnReq.order_id);

    // Call Payments service
    await this.paymentsService.initiateRefund(ctx, order.id, order.total);

    // Update Order status
    await this.orderService.updateStatus(ctx, order.id, 'refunded');

    return this.returnsRepo.update(ctx, id, { status: 'refunded' });
  }
}
