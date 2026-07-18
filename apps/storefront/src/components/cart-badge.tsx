'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function CartBadge() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.itemCount);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative text-sm font-medium hover:underline cursor-pointer"
      >
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {count}
          </span>
        )}
      </button>
      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
