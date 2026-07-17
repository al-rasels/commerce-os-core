import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "./utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-primary-foreground shadow hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:brightness-110",
  ghost: "hover:bg-muted text-foreground",
  outline: "border border-border bg-background hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground hover:brightness-110",
};

const sizeStyles: Record<string, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
