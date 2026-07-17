import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" }> = {
  pending: { label: "Pending", variant: "secondary" },
  paid: { label: "Paid", variant: "default" },
  fulfilled: { label: "Fulfilled", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  refunded: { label: "Refunded", variant: "outline" },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? { label: status, variant: "outline" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
