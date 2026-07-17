import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { TenantContext } from '../../platform/tenant/tenant-context'

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(ctx: TenantContext) {
    const tenantId = ctx.tenantId

    const [orderAgg, customerCount, recentOrders, statusBreakdown] =
      await Promise.all([
        (this.prisma as any).order.aggregate({
          where: {
            tenant_id: tenantId,
            status: { in: ['paid', 'fulfilled'] },
            deleted_at: null,
          },
          _sum: { total_cents: true },
          _count: true,
        }),
        (this.prisma as any).customer.count({
          where: { tenant_id: tenantId, deleted_at: null },
        }),
        (this.prisma as any).order.findMany({
          where: { tenant_id: tenantId, deleted_at: null },
          orderBy: { created_at: 'desc' },
          take: 10,
          include: {
            items: true,
            customer: { select: { id: true, email: true, first_name: true, last_name: true } },
          },
        }),
        (this.prisma as any).order.groupBy({
          by: ['status'],
          where: { tenant_id: tenantId, deleted_at: null },
          _count: true,
        }),
      ])

    const totalRevenue = orderAgg._sum.total_cents ?? 0
    const paidOrderCount = orderAgg._count

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
    }
  }
}
