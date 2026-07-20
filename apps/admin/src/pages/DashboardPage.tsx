import { Link } from "react-router-dom"
import { useDashboardStats } from "@/hooks/useDashboard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowRight, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
      <Card className="glass overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="p-2 bg-white/5 rounded-full ring-1 ring-white/10">
            <Icon className="size-4 text-white/70" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-24 bg-white/10" />
          ) : (
            <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
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
        <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight text-white">
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
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0 0% 98%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(0 0% 98%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(240 10% 3.9%)', borderColor: 'hsl(240 3.7% 15.9%)', color: '#fff' }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(0 0% 98%)" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full bg-white/5" />)}
                </div>
              ) : !data?.recentOrders?.length ? (
                <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <PackageOpen className="size-8 opacity-20" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {data.recentOrders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white truncate max-w-[120px]">
                          {order.customer?.email || 'Guest'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ${(order.total_cents / 100).toFixed(2)}
                        </span>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full mt-4 text-xs text-muted-foreground hover:text-white" asChild>
                    <Link to="/orders">View all orders <ArrowRight className="ml-2 size-3" /></Link>
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
