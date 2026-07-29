import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { format } from "date-fns";

export default function SubscriptionsListPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Subscriptions</h1>
          <p className="text-sm text-muted-foreground">Manage recurring billing and subscription contracts.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Subscription
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : subscriptions?.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No subscriptions found.</p>
            <p className="text-xs">Click "Create Subscription" to create one.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-sm">
                <th className="py-2 px-3 font-medium">Customer ID</th>
                <th className="py-2 px-3 font-medium">Plan</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium text-right">Current Period End</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions?.map((sub) => (
                <tr key={sub.id} className="border-b">
                  <td className="py-2 px-3">{sub.customer_id}</td>
                  <td className="py-2 px-3">{sub.plan_code}</td>
                  <td className="py-2 px-3 capitalize">{sub.status.replace('_', ' ')}</td>
                  <td className="py-2 px-3 text-right">
                    {format(new Date(sub.current_period_end), "MMM d, yyyy")}
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
