import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { format } from "date-fns";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function DraftOrdersTable() {
  const { data: response } = useOrders({ status: 'pending' });
  const orders = response?.data || [];

  if (orders.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <p>No draft orders found.</p>
          <p className="text-xs">Click "Create Draft" to create one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left text-sm">
            <th className="py-2 px-3 font-medium">Draft ID</th>
            <th className="py-2 px-3 font-medium">Customer</th>
            <th className="py-2 px-3 font-medium">Date</th>
            <th className="py-2 px-3 font-medium text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-3">{order.id}</td>
              <td className="py-2 px-3">{order.customer_id}</td>
              <td className="py-2 px-3">
                {format(new Date(order.created_at), "MMM d, yyyy")}
              </td>
              <td className="py-2 px-3 text-right">
                ${(order.total / 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DraftOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Draft Orders</h1>
          <p className="text-sm text-muted-foreground">Manage B2B wholesale order approvals and quotes.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Draft
        </Button>
      </div>
      <Suspense fallback={<div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
        <DraftOrdersTable />
      </Suspense>
    </div>
  );
}
