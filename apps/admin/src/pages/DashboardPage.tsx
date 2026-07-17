import { Link } from "react-router-dom"
import { useDashboardStats } from "@/hooks/useDashboard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function StatCard({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string
  value: string
  icon: React.ElementType
  loading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  )
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  paid: "bg-green-500",
  fulfilled: "bg-blue-500",
  cancelled: "bg-red-500",
  refunded: "bg-gray-400",
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()

  const currency = "USD"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Store performance overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={data ? `${(data.totalRevenue / 100).toFixed(2)} ${currency}` : "-"}
          icon={DollarSign}
          loading={isLoading}
        />
        <StatCard
          title="Orders"
          value={data ? String(data.paidOrderCount) : "-"}
          icon={ShoppingCart}
          loading={isLoading}
        />
        <StatCard
          title="Customers"
          value={data ? String(data.customerCount) : "-"}
          icon={Users}
          loading={isLoading}
        />
        <StatCard
          title="Revenue per Order"
          value={data && data.paidOrderCount > 0 ? `${(data.totalRevenue / data.paidOrderCount / 100).toFixed(2)} ${currency}` : "-"}
          icon={TrendingUp}
          loading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            ) : !data?.ordersByStatus.length ? (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {data.ordersByStatus.map((s) => (
                  <div key={s.status} className="flex items-center gap-2">
                    <div className={`size-2.5 rounded-full ${statusColors[s.status] ?? "bg-gray-400"}`} />
                    <span className="flex-1 text-sm capitalize">{s.status}</span>
                    <span className="text-sm font-medium">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : !data?.recentOrders.length ? (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {data.recentOrders.slice(0, 5).map((order) => (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-muted"
                  >
                    <span className="flex-1 truncate font-mono text-xs">
                      {order.id.slice(0, 8)}…
                    </span>
                    <StatusBadge status={order.status} />
                    <span className="text-sm font-medium">
                      {(order.total / 100).toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
