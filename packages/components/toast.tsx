"use client";

import { useState, useEffect, type ReactNode } from "react";
import { cn } from "./utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastData {
  id: string;
  variant: ToastVariant;
  message: string;
  description?: string;
}

export interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

const iconMap: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-destructive" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
};

const borderMap: Record<ToastVariant, string> = {
  success: "border-l-green-500",
  error: "border-l-destructive",
  info: "border-l-blue-500",
  warning: "border-l-amber-500",
};

export function Toast({ id, variant, message, description, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, []);

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-lg transition-all duration-300",
        "border-l-4",
        borderMap[variant],
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
      )}
    >
      <span className="mt-0.5 shrink-0">{iconMap[variant]}</span>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-foreground">{message}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="shrink-0 rounded-md p-1 hover:bg-muted transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  className?: string;
}

export function ToastContainer({ toasts, onDismiss, className }: ToastContainerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2",
        className,
      )}
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
