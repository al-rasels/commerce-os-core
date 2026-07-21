import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { ListOrdersQueryDto } from './dto/list-orders-query.dto';

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilled', 'refunded', 'cancelled'],
  fulfilled: ['refunded'],
  cancelled: [],
  refunded: [],
};

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async get(ctx: TenantContext, id: string) {
    const order = await this.orderRepo.findUnique(ctx, id, {
      include: { items: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.toDto(order);
  }

  async list(ctx: TenantContext, filters: ListOrdersQueryDto) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (filters.status) where.status = filters.status;
    if (filters.customer_id) where.customer_id = filters.customer_id;
    if (filters.date_from || filters.date_to) {
      const createdAt: Record<string, Date> = {};
      if (filters.date_from) createdAt.gte = new Date(filters.date_from);
      if (filters.date_to) createdAt.lte = new Date(filters.date_to);
      where.created_at = createdAt;
    }

    const [data, total] = await Promise.all([
      this.orderRepo.findMany(ctx, {
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: { items: true },
      }),
      this.orderRepo.count(ctx, where),
    ]);

    return { data: data.map((o) => this.toDto(o)), total, page, limit };
  }

  async updateStatus(ctx: TenantContext, id: string, newStatus: string) {
    const order = await this.orderRepo.findUnique(ctx, id, {
      include: { items: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const allowed = VALID_TRANSITIONS[order.status];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition order from '${order.status}' to '${newStatus}'`,
      );
    }

    if (newStatus === 'fulfilled') {
      await this.orderRepo.fulfillStock(ctx, id);
    } else if (newStatus === 'cancelled' || newStatus === 'refunded') {
      await this.orderRepo.releaseStock(ctx, id);
    }

    const updated = await this.orderRepo.update(ctx, id, { status: newStatus });
    return this.toDto(updated);
  }

  async getDashboardStats(ctx: TenantContext) {
    const [orderAgg, recentOrders, statusBreakdown] = await Promise.all([
      this.orderRepo.aggregate(ctx, {
        where: {
          status: { in: ['paid', 'fulfilled'] },
          deleted_at: null,
        },
        _sum: { total_cents: true },
        _count: true,
      }),
      this.orderRepo.findMany(ctx, {
        where: { deleted_at: null },
        orderBy: { created_at: 'desc' },
        take: 10,
        include: {
          items: true,
          customer: {
            select: {
              id: true,
              email: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      }),
      this.orderRepo.groupBy(ctx, {
        by: ['status'],
        where: { deleted_at: null },
        _count: true,
      }),
    ]);
    return { orderAgg, recentOrders, statusBreakdown };
  }

  async createOrder(ctx: TenantContext, data: any) {
    return this.orderRepo.create(ctx, data);
  }

  private toDto(order: any) {
    return {
      id: order.id,
      tenant_id: order.tenant_id,
      customer_id: order.customer_id,
      status: order.status,
      subtotal: order.subtotal_cents,
      tax: order.tax_cents,
      shipping: order.shipping_cents,
      total: order.total_cents,
      currency: order.currency,
      channel: order.channel,
      items: (order.items ?? []).map((item: any) => ({
        id: item.id,
        variant_id: item.variant_id,
        sku: item.sku,
        quantity: item.quantity,
        unit_price: item.unit_price_cents,
      })),
      created_at: order.created_at,
    };
  }
}
