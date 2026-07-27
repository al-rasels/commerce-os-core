import { Link } from "react-router-dom"
import { useDashboardStats } from "@/hooks/useDashboard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowRight, PackageOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const CHART_COLORS = [
  "oklch(0.6 0.18 270)",
  "oklch(0.5 0.12 260)",
  "oklch(0.4 0.08 250)",
  "oklch(0.7 0.15 280)",
  "oklch(0.45 0.1 240)",
]

function StatCard({ title, value, icon: Icon, loading }: { title: string; value: string; icon: React.ElementType; loading: boolean }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="p-2 bg-muted rounded-full">
            <Icon className="size-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold tracking-tight">{value}</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight">
          Overview
        </motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground">
          Your commerce performance at a glance.
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={data ? `$${(data.totalRevenue / 100).toFixed(2)}` : "-"} icon={DollarSign} loading={isLoading} />
        <StatCard title="Total Orders" value={data ? String(data.paidOrderCount) : "-"} icon={ShoppingCart} loading={isLoading} />
        <StatCard title="Active Customers" value={data ? String(data.customerCount) : "-"} icon={Users} loading={isLoading} />
        <StatCard title="Avg. Order Value" value={data && data.paidOrderCount > 0 ? `$${(data.totalRevenue / data.paidOrderCount / 100).toFixed(2)}` : "-"} icon={TrendingUp} loading={isLoading} />
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-5">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Orders by Status</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.ordersByStatus?.length ? (
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.ordersByStatus} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="status" stroke="oklch(0.65 0.015 260)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="oklch(0.65 0.015 260)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'oklch(0.15 0.015 270)', borderColor: 'oklch(0.25 0.015 270)', color: 'oklch(0.96 0.005 260)', borderRadius: '8px', border: '1px solid' }}
                        cursor={{ fill: 'oklch(1 0 0 / 0.05)' }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
                        {data.ordersByStatus.map((_: any, i: number) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No order data available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-gradient-to-br from-card to-card/80 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !data?.recentOrders?.length ? (
                <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <PackageOpen className="size-8 opacity-20" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {data.recentOrders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 transition-colors hover:bg-muted/50">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[120px]">
                          {order.customer?.email || 'Guest'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ${(order.total / 100).toFixed(2)}
                        </span>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  ))}
                  <Link to="/orders" className="inline-flex items-center justify-center w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    View all orders <ArrowRight className="ml-2 size-3" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
