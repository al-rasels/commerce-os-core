import { Injectable, Logger } from '@nestjs/common';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { OrderService } from '../order/order.service';
import { CustomerService } from '../customer/customer.service';
import { CatalogService } from '../catalog/catalog.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly customerService: CustomerService,
    private readonly catalogService: CatalogService,
  ) {}

  async getStats(ctx: TenantContext) {
    this.logger.debug(`Fetching dashboard stats for tenant: ${ctx.tenantId}`);

    const [
      { orderAgg, recentOrders, statusBreakdown },
      customerCount,
      lowStockProducts,
    ] = await Promise.all([
      this.orderService.getDashboardStats(ctx),
      this.customerService.countActive(ctx),
      this.catalogService.getLowStockVariants(ctx),
    ]);

    const totalRevenue = orderAgg._sum?.total_cents ?? 0;
    const paidOrderCount = orderAgg._count ?? 0;

    return {
      totalRevenue,
      paidOrderCount,
      customerCount,
      orderCount: paidOrderCount,
      recentOrders,
      ordersByStatus: statusBreakdown.map(
        (s: { status: string; _count: number }) => ({
          status: s.status,
          count: s._count,
        }),
      ),
      lowStockProducts,
    };
  }
}
