
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DollarSign, ShoppingCart, Users, Activity,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const monthlyRevenue = [
  { month: 'Jan', revenue: 12800, orders: 142, target: 12000 },
  { month: 'Feb', revenue: 15200, orders: 168, target: 13000 },
  { month: 'Mar', revenue: 18400, orders: 195, target: 15000 },
  { month: 'Apr', revenue: 16200, orders: 178, target: 16000 },
  { month: 'May', revenue: 21900, orders: 234, target: 18000 },
  { month: 'Jun', revenue: 24800, orders: 267, target: 20000 },
  { month: 'Jul', revenue: 23200, orders: 251, target: 22000 },
  { month: 'Aug', revenue: 26100, orders: 289, target: 23000 },
  { month: 'Sep', revenue: 28500, orders: 312, target: 25000 },
  { month: 'Oct', revenue: 30200, orders: 335, target: 27000 },
  { month: 'Nov', revenue: 34100, orders: 378, target: 29000 },
  { month: 'Dec', revenue: 39800, orders: 423, target: 32000 },
]

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Garden', value: 18 },
  { name: 'Books', value: 12 },
  { name: 'Other', value: 10 },
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--muted-foreground))']

const weeklyActiveUsers = [
  { week: 'W1', visitors: 1200, returning: 450 },
  { week: 'W2', visitors: 1350, returning: 520 },
  { week: 'W3', visitors: 1100, returning: 480 },
  { week: 'W4', visitors: 1580, returning: 620 },
  { week: 'W5', visitors: 1720, returning: 710 },
  { week: 'W6', visitors: 1650, returning: 690 },
  { week: 'W7', visitors: 1890, returning: 820 },
  { week: 'W8', visitors: 2100, returning: 940 },
]

const kpiCards = [
  { title: 'Total Revenue', value: '$297,300', change: '+18.2%', trend: 'up', icon: DollarSign },
  { title: 'Orders', value: '3,172', change: '+12.5%', trend: 'up', icon: ShoppingCart },
  { title: 'Customers', value: '2,847', change: '+8.1%', trend: 'up', icon: Users },
  { title: 'Conversion', value: '3.42%', change: '-0.3%', trend: 'down', icon: Activity },
]

function KpiCard({ title, value, change, trend, icon: Icon }: typeof kpiCards[number]) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className="overflow-hidden relative shadow-sm hover:shadow-md transition-shadow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="size-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <div className={`flex items-center gap-1 mt-1 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            <span>{change} vs last period</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AnalyticsPage() {
  const formatCurrency = (val: number) => `$${val.toLocaleString()}`

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex flex-col gap-1">
        <motion.h1 variants={itemVariants} className="text-3xl font-extrabold tracking-tight">Analytics</motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground">Deep dive into your store's performance metrics.</motion.p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map(card => <KpiCard key={card.title} {...card} />)}
      </div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue vs targets for the current year.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, left: 10, right: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={formatCurrency} />
                  <Tooltip
                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null
                      return (
                        <div className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="text-muted-foreground">{entry.name}:</span>
                              <span className="font-mono font-medium">{formatCurrency(Number(entry.value))}</span>
                            </div>
                          ))}
                        </div>
                      )
                    }}
                  />
                  <Area type="monotone" dataKey="target" stroke="hsl(var(--chart-3))" fill="url(#fillTarget)" strokeDasharray="6 4" strokeWidth={2} fillOpacity={1} animationDuration={1200} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#fillRevenue)" strokeWidth={2.5} fillOpacity={1} animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Orders by Category</CardTitle>
              <CardDescription>Distribution of order volume across product categories.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={1200}
                      animationBegin={200}
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null
                        return (
                          <div className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                            <p className="font-medium">{payload[0].name}</p>
                            <p className="font-mono font-medium">{payload[0].value}% of orders</p>
                          </div>
                        )
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      content={({ payload }) => (
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                          {payload?.map((entry, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs">
                              <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                              <span className="text-muted-foreground">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader>
              <CardTitle>Weekly Visitors</CardTitle>
              <CardDescription>New vs returning visitors over the last 8 weeks.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActiveUsers} margin={{ top: 10, left: 10, right: 10, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null
                        return (
                          <div className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-muted-foreground">{entry.name}:</span>
                                <span className="font-mono font-medium">{entry.value.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        )
                      }}
                    />
                    <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} animationDuration={1200} />
                    <Bar dataKey="returning" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={300} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue vs Orders</CardTitle>
            <CardDescription>Dual-axis view comparing revenue and order volume trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line">
              <TabsList className="mb-4">
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="bar">Bar</TabsTrigger>
              </TabsList>
              <TabsContent value="line">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue} margin={{ top: 10, left: 10, right: 10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={formatCurrency} />
                      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null
                          return (
                            <div className="border-border/50 bg-background grid min-w-40 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                              <p className="font-medium">{label}</p>
                              {payload.map((entry, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                  <span className="text-muted-foreground">{entry.name}:</span>
                                  <span className="font-mono font-medium">
                                    {entry.dataKey === 'revenue' ? formatCurrency(Number(entry.value)) : entry.value.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                      />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} animationDuration={1500} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} animationDuration={1500} animationBegin={300} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="bar">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenue} margin={{ top: 10, left: 10, right: 10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={formatCurrency} />
                      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
                      <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null
                          return (
                            <div className="border-border/50 bg-background grid min-w-40 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                              <p className="font-medium">{label}</p>
                              {payload.map((entry, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                  <span className="text-muted-foreground">{entry.name}:</span>
                                  <span className="font-mono font-medium">
                                    {entry.dataKey === 'revenue' ? formatCurrency(Number(entry.value)) : entry.value.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                      />
                      <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} animationDuration={1200} />
                      <Bar yAxisId="right" dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} animationDuration={1200} animationBegin={300} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
