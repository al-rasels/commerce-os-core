import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useReturns } from "@/hooks/useReturns";
import { format } from "date-fns";

export default function ReturnsListPage() {
  const { data: returns, isLoading } = useReturns();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Returns (RMA)</h1>
          <p className="text-sm text-muted-foreground">Manage customer return requests and condition grading.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Return
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : returns?.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No returns found.</p>
            <p className="text-xs">Click "Create Return" to create one.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-sm">
                <th className="py-2 px-3 font-medium">Order ID</th>
                <th className="py-2 px-3 font-medium">Customer ID</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Reason</th>
                <th className="py-2 px-3 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {returns?.map((rma) => (
                <tr key={rma.id} className="border-b">
                  <td className="py-2 px-3">{rma.order_id}</td>
                  <td className="py-2 px-3">{rma.customer_id}</td>
                  <td className="py-2 px-3 capitalize">{rma.status}</td>
                  <td className="py-2 px-3">{rma.reason}</td>
                  <td className="py-2 px-3 text-right">
                    {format(new Date(rma.created_at), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
