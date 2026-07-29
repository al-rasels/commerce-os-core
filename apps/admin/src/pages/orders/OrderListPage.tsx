import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useOrders } from "@/hooks/useOrders"
import { Button } from "@/components/ui/button"
import { DataTable, type Column } from "@commerceos/components"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { Eye, Calendar, Filter } from "lucide-react"

export default function OrderListPage() {
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(0)

  const params = useMemo(() => {
    const p: Record<string, string | number> = {
      page: page + 1,
      limit: 100, // Load more for client side search in this MVP
    }
    if (statusFilter) p.status = statusFilter
    if (dateFrom) p.date_from = dateFrom
    if (dateTo) p.date_to = dateTo
    return p as { status?: string; date_from?: string; date_to?: string; page?: number; limit?: number }
  }, [statusFilter, dateFrom, dateTo, page])

  const { data, isLoading } = useOrders(params)

  const columns: Column<any>[] = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      render: (o) => <span className="font-mono text-xs">{o.id.slice(0, 8)}…</span>,
    },
    {
      key: "customer_id",
      label: "Customer",
      sortable: true,
      render: (o) => <span className="text-muted-foreground">{o.customer_id ? `${o.customer_id.slice(0, 8)}…` : "-"}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (o) => <StatusBadge status={o.status} />,
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      className: "text-right",
      render: (o) => <span className="font-medium">{(o.total / 100).toFixed(2)} {o.currency}</span>,
    },
    {
      key: "created_at",
      label: "Date",
      sortable: true,
      render: (o) => <span className="text-muted-foreground text-sm">{new Date(o.created_at).toLocaleDateString()}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right w-20",
      render: (o) => (
        <div className="flex justify-end">
          <Link to={`/orders/${o.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
              <Eye className="size-4" />
              <span className="sr-only">View</span>
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-xl font-semibold">Orders</CardTitle>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1 border border-border">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                className="h-9 w-[140px] rounded-md bg-transparent pl-8 pr-2 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(0) }}
                title="From date"
              />
            </div>
            <span className="text-muted-foreground/50">-</span>
            <div className="relative">
              <input
                type="date"
                className="h-9 w-[130px] rounded-md bg-transparent px-2 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(0) }}
                title="To date"
              />
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className="h-10 w-[140px] appearance-none rounded-lg border border-border bg-background pl-8 pr-8 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0) }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Loading orders...</div>
        ) : (
          <DataTable 
            columns={columns} 
            data={data?.data || []} 
            keyField="id" 
            searchable 
            searchPlaceholder="Search orders by ID or customer..."
            pageSize={10}
            emptyMessage="No orders match your filters."
          />
        )}
      </CardContent>
    </Card>
  )
}
