"use client";

import { useState } from "react";
import { cn } from "./utils";
import { Menu, Search, ShoppingCart, X } from "lucide-react";

export interface HeaderProps {
  variant: "minimal" | "mega-menu" | "sticky" | "transparent";
  logoUrl: string;
  navItems: { label: string; href: string; children?: { label: string; href: string }[] }[];
  showSearch?: boolean;
  showCart?: boolean;
}

export function Header({
  variant,
  logoUrl,
  navItems,
  showSearch = true,
  showCart = true,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        variant === "sticky" && "sticky top-0 z-50",
        variant === "transparent" && "absolute border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logoUrl} alt="Logo" className="h-8 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {showSearch && (
            <button type="button" className="rounded-full p-2 text-muted-foreground hover:text-foreground" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
          )}
          {showCart && (
            <button type="button" className="rounded-full p-2 text-muted-foreground hover:text-foreground" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            className="rounded-full p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t px-6 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
