"use client";

import { type ReactNode } from "react";
import { cn } from "./utils";
import { X } from "lucide-react";

export interface SidebarItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  className?: string;
}

export function Sidebar({ items, open, onClose, title, className }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-background transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          {title && <span className="text-sm font-semibold">{title}</span>}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <span className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground">
                    {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
