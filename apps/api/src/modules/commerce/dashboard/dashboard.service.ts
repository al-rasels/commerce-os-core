import { Injectable, Logger } from '@nestjs/common';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { OrderRepository } from '../order/order.repository';
import { CustomerRepository } from '../customer/customer.repository';
import { ProductVariantRepository } from '../catalog/repositories/product-variant.repository';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly customerRepo: CustomerRepository,
    private readonly variantRepo: ProductVariantRepository,
  ) {}

  async getStats(ctx: TenantContext) {
    this.logger.debug(`Fetching dashboard stats for tenant: ${ctx.tenantId}`);

    const [orderAgg, customerCount, recentOrders, statusBreakdown, lowStockProducts] =
      await Promise.all([
        this.orderRepo.aggregate(ctx, {
          where: {
            status: { in: ['paid', 'fulfilled'] },
            deleted_at: null,
          },
          _sum: { total_cents: true },
          _count: true,
        }),
        this.customerRepo.count(ctx, {
          where: { deleted_at: null },
        }),
        this.orderRepo.findMany(ctx, {
          where: { deleted_at: null },
          orderBy: { created_at: 'desc' },
          take: 10,
          include: {
            items: true,
            customer: { select: { id: true, email: true, first_name: true, last_name: true } },
          },
        }),
        this.orderRepo.groupBy(ctx, {
          by: ['status'],
          where: { deleted_at: null },
          _count: true,
        }),
        this.variantRepo.findMany(ctx, {
          where: { inventory_quantity: { lt: 5 }, deleted_at: null },
          include: { product: { select: { title: true } } },
          take: 5,
        }),
      ]);

    const totalRevenue = orderAgg._sum?.total_cents ?? 0;
    const paidOrderCount = orderAgg._count ?? 0;

    return {
      totalRevenue,
      paidOrderCount,
      customerCount,
      orderCount: paidOrderCount,
      recentOrders,
      ordersByStatus: statusBreakdown.map((s: { status: string; _count: number }) => ({
        status: s.status,
        count: s._count,
      })),
      lowStockProducts,
    };
  }
}
