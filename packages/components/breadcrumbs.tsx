import type { ReactNode } from "react";
import { cn } from "./utils";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  homeHref?: string;
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, homeHref = "/", showHome = true, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}>
      {showHome && (
        <>
          <a href={homeHref} className="hover:text-foreground transition-colors" aria-label="Home">
            <Home className="h-4 w-4" />
          </a>
          <ChevronRight className="h-4 w-4" />
        </>
      )}
      {items.map((crumb, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {crumb.href && !isLast ? (
              <a href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </a>
            ) : (
              <span className={cn(isLast && "text-foreground font-medium")}>{crumb.label}</span>
            )}
            {!isLast && <ChevronRight className="h-4 w-4" />}
          </span>
        );
      })}
    </nav>
  );
}
