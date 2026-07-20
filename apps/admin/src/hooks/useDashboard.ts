import { useSuspenseQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api/dashboard'

export function useDashboardStats() {
  return useSuspenseQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardApi.stats(),
  })
}
