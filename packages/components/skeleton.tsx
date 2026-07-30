import * as React from "react"
import { cn } from "./utils"

/**
 * A premium skeleton loader with shimmer effect.
 * Use compositionally to build loading states that mirror real layouts.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/80",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

/* ─── Skeleton Presets ─── */

/** Skeleton that mirrors a stat card (icon + title + value) */
function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  )
}

/** Skeleton that mirrors a table row */
function SkeletonTableRow({ columns = 4, className }: { columns?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 px-4 py-3", className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === 0 ? "w-32" : "w-20")}
        />
      ))}
    </div>
  )
}

/** Skeleton for a full data table (header + N rows) */
function SkeletonTable({ rows = 5, columns = 4, className }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
      {/* header */}
      <div className="border-b bg-muted/40 px-4 py-3 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-20" />
        ))}
      </div>
      {/* rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} columns={columns} className={i < rows - 1 ? "border-b border-border/50" : ""} />
      ))}
    </div>
  )
}

/** Skeleton for a chart area */
function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 space-y-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="h-[250px] w-full flex items-end gap-1.5 pt-8">
        {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 68].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

/** Skeleton for a form (N fields + submit) */
function SkeletonForm({ fields = 3, className }: { fields?: number; className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      <Skeleton className="h-10 w-28 rounded-md" />
    </div>
  )
}

/** Skeleton for a detail page (breadcrumb + title + cards) */
function SkeletonDetailPage({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-24" />
      </div>
      {/* title row */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
      {/* body cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <SkeletonForm fields={4} />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export {
  Skeleton,
  SkeletonStatCard,
  SkeletonTableRow,
  SkeletonTable,
  SkeletonChart,
  SkeletonForm,
  SkeletonDetailPage,
}
