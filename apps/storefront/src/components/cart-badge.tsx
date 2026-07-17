'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export function CartBadge() {
  const count = useCartStore((s) => s.itemCount);

  return (
    <Link href="/cart" className="relative text-sm font-medium hover:underline">
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
