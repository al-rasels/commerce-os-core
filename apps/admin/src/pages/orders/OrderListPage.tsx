import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useOrders } from "@/hooks/useOrders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react"

const PAGE_SIZE = 15

export default function OrderListPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(0)

  const params = useMemo(() => {
    const p: Record<string, string | number> = {
      page: page + 1,
      limit: PAGE_SIZE,
    }
    if (statusFilter) p.status = statusFilter
    return p as { status?: string; page?: number; limit?: number }
  }, [statusFilter, page])

  const { data, isLoading } = useOrders(params)

  const filtered = useMemo(() => {
    if (!data?.data) return []
    if (!search) return data.data
    const q = search.toLowerCase()
    return data.data.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customer_id?.toLowerCase().includes(q)
    )
  }, [data, search])

  const pageCount = data ? Math.ceil(data.total / PAGE_SIZE) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0) }}
          >
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}…</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.customer_id ? `${order.customer_id.slice(0, 8)}…` : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {(order.total / 100).toFixed(2)} {order.currency}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/orders/${order.id}`}>
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="size-3.5" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pageCount > 1 && (
          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <span>{data?.total ?? 0} order{(data?.total ?? 0) !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="px-2">{page + 1} / {pageCount}</span>
              <Button variant="ghost" size="icon-sm" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
