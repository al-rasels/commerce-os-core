import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between relative px-2">
        <div className="absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 bg-muted overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(Math.max(0, activeIdx) / (statusOrder.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        
        {statusOrder.map((s, i) => {
          const isActive = i <= activeIdx
          const isCancelledOrRefunded = s === "cancelled" || s === "refunded"
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive && !isCancelledOrRefunded 
                    ? "var(--color-primary)" 
                    : isActive && isCancelledOrRefunded
                      ? "var(--color-destructive)"
                      : "var(--color-background)",
                  color: isActive ? "var(--color-primary-foreground)" : "var(--color-muted-foreground)",
                  borderColor: isActive ? "transparent" : "var(--color-border)"
                }}
                transition={{ duration: 0.3 }}
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold border-2 shadow-sm ${
                  isActive && !isCancelledOrRefunded
                    ? "bg-primary text-primary-foreground border-transparent"
                    : isActive && isCancelledOrRefunded
                      ? "bg-destructive text-destructive-foreground border-transparent"
                      : "bg-background text-muted-foreground border-border"
                }`}
              >
                {s === "cancelled" ? "✕" : s === "refunded" ? "↩" : i + 1}
              </motion.div>
              <span className={`text-xs font-medium capitalize absolute -bottom-6 whitespace-nowrap ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s}
              </span>
            </div>
          )
        })}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        {ORDER_VALID_TRANSITIONS[currentStatus]?.map((nextStatus) => {
          const isDestructive = DESTRUCTIVE_ACTIONS.has(nextStatus);
          const btn = (
            <Button
              key={nextStatus}
              variant={isDestructive ? "destructive" : "outline"}
              size="sm"
              disabled={isPending}
              isLoading={isPending && pendingAction === nextStatus}
              onClick={() => {
                if (isDestructive) {
                  setPendingAction(nextStatus);
                } else {
                  setPendingAction(nextStatus);
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
              <AlertDialog key={nextStatus} open={pendingAction === nextStatus} onOpenChange={(v) => !v && setPendingAction(null)}>
                <AlertDialogTrigger render={btn} />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{conf.title}</AlertDialogTitle>
                    <AlertDialogDescription>{conf.description}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Order</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Confirm Action
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            );
          }
          return btn;
        })}
        {(!ORDER_VALID_TRANSITIONS[currentStatus] || ORDER_VALID_TRANSITIONS[currentStatus].length === 0) && (
          <span className="text-sm text-muted-foreground">No further actions available for this order.</span>
        )}
      </div>
    </div>
  )
}
