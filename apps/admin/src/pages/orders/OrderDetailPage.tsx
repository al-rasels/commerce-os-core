import { useParams, useNavigate } from "react-router-dom"
import { useOrder, useUpdateOrderStatus } from "@/hooks/useOrders"
import { StatusBadge } from "@/components/orders/StatusBadge"
import { OrderTimeline } from "@/components/orders/OrderTimeline"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { ArrowLeft, Download, Loader2 } from "lucide-react"
import { downloadInvoice } from "@/lib/invoice"

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: order, isLoading } = useOrder(id)
  const updateStatus = useUpdateOrderStatus()

  async function handleTransition(nextStatus: string) {
    if (!id) return
    await updateStatus.mutateAsync({ id, status: nextStatus })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Order not found
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/orders")}>
          <ArrowLeft className="size-4" />
          Back to Orders
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order {order.id.slice(0, 8)}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => downloadInvoice(order)}>
                  <Download data-icon="inline-start" />
                  Invoice
                </Button>
                <StatusBadge status={order.status} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Customer</div>
                <div className="font-medium">{order.customer_id ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Channel</div>
                <div className="font-medium capitalize">{order.channel}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Date</div>
                <div className="font-medium">{new Date(order.created_at).toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTimeline
              currentStatus={order.status}
              onTransition={handleTransition}
              isPending={updateStatus.isPending}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {(item.unit_price / 100).toFixed(2)} {order.currency}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {((item.unit_price * item.quantity) / 100).toFixed(2)} {order.currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-1 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{(order.total / 100).toFixed(2)} {order.currency}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{(order.total / 100).toFixed(2)} {order.currency}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
