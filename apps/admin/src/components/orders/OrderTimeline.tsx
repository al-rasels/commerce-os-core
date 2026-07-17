import { ORDER_VALID_TRANSITIONS } from "@/lib/api/orders"
import { Button } from "@/components/ui/button"

interface OrderTimelineProps {
  currentStatus: string
  onTransition: (status: string) => void
  isPending: boolean
}

const statusOrder = ["pending", "paid", "fulfilled", "cancelled", "refunded"]

export function OrderTimeline({ currentStatus, onTransition, isPending }: OrderTimelineProps) {
  const activeIdx = statusOrder.indexOf(currentStatus)

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
        {ORDER_VALID_TRANSITIONS[currentStatus]?.map((nextStatus) => (
          <Button
            key={nextStatus}
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => onTransition(nextStatus)}
          >
            {nextStatus === "cancelled" ? "Cancel Order" : `Mark ${nextStatus}`}
          </Button>
        ))}
      </div>
    </div>
  )
}
