import { api } from './client'
import type { Order } from './orders'

export interface DashboardStats {
  totalRevenue: number
  paidOrderCount: number
  customerCount: number
  orderCount: number
  recentOrders: Order[]
  ordersByStatus: { status: string; count: number }[]
}

export const dashboardApi = {
  stats: () => api.get<DashboardStats>('/api/v1/commerce/dashboard'),
}
