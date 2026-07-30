"use client"

import { Toaster as Sonner, toast } from "sonner"
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react"

export type ToastProps = React.ComponentProps<typeof Sonner>

/**
 * Enterprise-grade toast system built on Sonner.
 * Renders at the bottom-right with semantic color coding,
 * custom icons, smooth enter/exit animations, and a close button.
 */
export function Toaster({ ...props }: ToastProps) {
  return (
    <Sonner
      position="bottom-right"
      theme="system"
      className="toaster group"
      expand
      richColors
      closeButton
      gap={8}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl pointer-events-auto group-[.toaster]:backdrop-blur-md",
          title: "group-[.toast]:text-sm group-[.toast]:font-semibold",
          description: "group-[.toast]:text-xs group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:text-xs group-[.toast]:font-medium",
          closeButton:
            "group-[.toast]:text-foreground/50 group-[.toast]:hover:text-foreground group-[.toast]:border-border/50",
          success:
            "group-[.toaster]:!bg-success/10 group-[.toaster]:!border-success/25 group-[.toaster]:!text-success dark:group-[.toaster]:!text-success",
          error:
            "group-[.toaster]:!bg-destructive/10 group-[.toaster]:!border-destructive/25 group-[.toaster]:!text-destructive",
          warning:
            "group-[.toaster]:!bg-warning/10 group-[.toaster]:!border-warning/25 group-[.toaster]:!text-warning",
          info:
            "group-[.toaster]:!bg-primary/10 group-[.toaster]:!border-primary/25 group-[.toaster]:!text-primary",
        },
      }}
      icons={{
        success: <CheckCircle2 className="size-4" />,
        error: <AlertCircle className="size-4" />,
        warning: <AlertTriangle className="size-4" />,
        info: <Info className="size-4" />,
      }}
      {...props}
    />
  )
}

export { toast }
