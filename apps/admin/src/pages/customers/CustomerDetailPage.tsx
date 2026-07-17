import { useParams, Link } from "react-router-dom"
import { useCustomer } from "@/hooks/useCustomers"
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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  paid: "default",
  fulfilled: "default",
  cancelled: "outline",
  refunded: "destructive",
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: customer, isLoading, isError } = useCustomer(id)

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (isError) return <div className="text-sm text-destructive">Failed to load customer</div>
  if (!customer) return <div className="text-sm text-muted-foreground">Customer not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/customers">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{customer.email}</h1>
          <p className="text-sm text-muted-foreground">
            {[customer.first_name, customer.last_name].filter(Boolean).join(" ") || "—"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!customer.orders || customer.orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No orders yet
                  </TableCell>
                </TableRow>
              ) : (
                customer.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <Link to={`/orders/${order.id}`} className="hover:underline">
                        {order.id.slice(0, 8)}...
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[order.status] ?? "outline"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {((order.total_cents ?? 0) / 100).toFixed(2)} {order.currency}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
