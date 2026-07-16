"use client";

import { useState } from "react";
import { cn } from "./utils";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";

export interface CartDrawerProps {
  // reads live cart state — no configurable props in Phase 1
}

export function CartDrawer(_props: CartDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative rounded-full p-2 text-muted-foreground hover:text-foreground"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          0
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-background shadow-xl",
              "animate-in slide-in-from-right",
            )}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Cart</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center px-6">
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            </div>

            <div className="border-t px-6 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
