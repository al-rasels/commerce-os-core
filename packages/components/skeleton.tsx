import { cn } from "./utils";

export interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "image";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const base = "animate-pulse bg-muted rounded-md";

  const variants: Record<string, string> = {
    text: "h-4 w-full",
    card: "h-40 w-full rounded-xl",
    avatar: "h-10 w-10 rounded-full",
    image: "aspect-video w-full rounded-lg",
  };

  return <div className={cn(base, variants[variant], className)} aria-hidden="true" />;
}
