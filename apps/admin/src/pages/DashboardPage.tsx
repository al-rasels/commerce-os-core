import { Link } from "react-router-dom"
import { useDashboardStats } from "@/hooks/useDashboard"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowRight, PackageOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

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

function StatCard({ title, value, icon: Icon, loading }: { title: string; value: string; icon: React.ElementType; loading: boolean }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden relative shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
    </motion.div>
  )
}

const mockChartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 8900 },
  { name: 'Sat', revenue: 6390 },
  { name: 'Sun', revenue: 7490 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="space-y-6"
    >
      <div className="flex flex-col gap-1">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight">
          Dashboard
        </motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground">
          Your commerce performance at a glance.
        </motion.p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={data ? `$${(data.totalRevenue / 100).toFixed(2)}` : "-"} icon={DollarSign} loading={isLoading} />
        <StatCard title="Total Orders" value={data ? String(data.paidOrderCount) : "-"} icon={ShoppingCart} loading={isLoading} />
        <StatCard title="Active Customers" value={data ? String(data.customerCount) : "-"} icon={Users} loading={isLoading} />
        <StatCard title="Avg. Order Value" value={data && data.paidOrderCount > 0 ? `$${(data.totalRevenue / data.paidOrderCount / 100).toFixed(2)}` : "-"} icon={TrendingUp} loading={isLoading} />
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Showing revenue data for the past 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart accessibilityLayer data={mockChartData} margin={{ top: 10, left: 10, right: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8}
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    fill="url(#fillRevenue)" 
                    fillOpacity={1}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest completed transactions.
              </CardDescription>
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
                <div className="space-y-4">
                  {data.recentOrders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[120px]">
                          {order.customer?.email || 'Guest'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ${(order.total_cents / 100).toFixed(2)}
                        </span>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" render={<Link to="/orders" />}>
                    View all orders <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
