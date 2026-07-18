import { useState } from "react";
import { ORDER_VALID_TRANSITIONS } from "@/lib/api/orders"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface OrderTimelineProps {
  currentStatus: string
  onTransition: (status: string) => void
  isPending: boolean
}

const statusOrder = ["pending", "paid", "fulfilled", "cancelled", "refunded"]

const DESTRUCTIVE_ACTIONS = new Set(["cancelled", "refunded"]);

const CONFIRMATION_LABELS: Record<string, { title: string; description: string }> = {
  cancelled: {
    title: "Cancel Order",
    description: "This will cancel the order and release any reserved stock. This action cannot be undone.",
  },
  refunded: {
    title: "Refund Order",
    description: "This will refund the order and release any reserved stock. This action cannot be undone.",
  },
};

export function OrderTimeline({ currentStatus, onTransition, isPending }: OrderTimelineProps) {
  const activeIdx = statusOrder.indexOf(currentStatus)
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  async function handleConfirm() {
    if (!pendingAction) return;
    onTransition(pendingAction);
    setPendingAction(null);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-0">
        {statusOrder.map((s, i) => {
          const isActive = i <= activeIdx
          const isCancelledOrRefunded = s === "cancelled" || s === "refunded"
          return (
            <div key={s} className="flex items-center">
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  isActive && !isCancelledOrRefunded
                    ? "bg-primary text-primary-foreground"
                    : isActive && isCancelledOrRefunded
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s === "cancelled" ? "✕" : s === "refunded" ? "↩" : i + 1}
              </div>
              {i < statusOrder.length - 1 && (
                <div
                  className={`h-px flex-1 ${
                    i < activeIdx ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ORDER_VALID_TRANSITIONS[currentStatus]?.map((nextStatus) => {
          const isDestructive = DESTRUCTIVE_ACTIONS.has(nextStatus);
          const btn = (
            <Button
              key={nextStatus}
              variant={isDestructive ? "destructive" : "outline"}
              size="sm"
              disabled={isPending}
              onClick={() => {
                if (isDestructive) {
                  setPendingAction(nextStatus);
                } else {
                  onTransition(nextStatus);
                }
              }}
            >
              {nextStatus === "cancelled" ? "Cancel Order" : `Mark ${nextStatus}`}
            </Button>
          );

          if (isDestructive) {
            const conf = CONFIRMATION_LABELS[nextStatus];
            return (
              <AlertDialog key={nextStatus} open={pendingAction === nextStatus} onOpenChange={(o) => { if (!o) setPendingAction(null); }}>
                <AlertDialogTrigger>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isPending}
                    onClick={() => setPendingAction(nextStatus)}
                  >
                    {nextStatus === "cancelled" ? "Cancel Order" : `Mark ${nextStatus}`}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{conf.title}</AlertDialogTitle>
                    <AlertDialogDescription>{conf.description}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            );
          }

          return btn;
        })}
      </div>
    </div>
  )
}
