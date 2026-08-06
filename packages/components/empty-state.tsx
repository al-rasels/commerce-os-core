import * as React from "react"
import { cn } from "./utils"
import { motion } from "framer-motion"
import {
  Inbox,
  Package,
  Users,
  FileText,
  Search,
  ShoppingCart,
  AlertCircle,
  WifiOff,
  type LucideIcon,
} from "lucide-react"

/* ─── Preset illustrations ─── */
const ILLUSTRATIONS: Record<string, LucideIcon> = {
  inbox: Inbox,
  products: Package,
  customers: Users,
  documents: FileText,
  search: Search,
  orders: ShoppingCart,
  error: AlertCircle,
  offline: WifiOff,
}

export interface EmptyStateProps {
  /** Lucide icon or a preset name like "products", "orders", "search" */
  icon?: LucideIcon | keyof typeof ILLUSTRATIONS
  title: string
  description?: string
  /** Primary action as ReactNode */
  action?: React.ReactNode
  /** Quick action link — renders <a> tag */
  actionLabel?: string
  /** Quick action href — used with actionLabel */
  actionHref?: string
  /** Secondary action */
  secondaryAction?: React.ReactNode
  className?: string
  /** Visual style — "default" is centered, "compact" is inline for embedded use */
  variant?: "default" | "compact"
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
  actionHref,
  secondaryAction,
  className,
  variant = "default",
}: EmptyStateProps) {
  // Resolve icon
  const IconComponent: LucideIcon = typeof icon === "string"
    ? ILLUSTRATIONS[icon] ?? Inbox
    : icon ?? Inbox

  // Build action from label/href if provided
  const primaryAction = actionLabel && actionHref ? (
    <a
      href={actionHref}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {actionLabel}
    </a>
  ) : action

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-4 py-6 px-4", className)}>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground">
          <IconComponent className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
          )}
        </div>
        {primaryAction}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-20 text-center",
        className,
      )}
    >
      {/* Decorative ring behind icon */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md" />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="relative flex size-16 items-center justify-center rounded-2xl bg-muted/80 border border-border/60 text-muted-foreground shadow-sm"
        >
          <IconComponent className="size-7" strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-2 mt-2">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </motion.div>
  )
}
