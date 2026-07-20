'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: string;
  variant?: { name: string; price_cents: number; currency: string };
  quantity: number;
}

interface Cart {
  id?: string;
  items?: CartItem[];
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { cartId, sessionId, setItemCount } = useCartStore();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!open) return;
    setLoading(true);
    try {
      const data = cartId
        ? await api.cart.get(cartId)
        : await api.cart.get(sessionId);
      setCart(data);
      setItemCount(data.items?.length ?? 0);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [open, cartId]);

  const handleRemove = async (itemId: string) => {
    if (!cartId) return;
    await api.cart.removeItem(cartId, itemId);
    loadCart();
  };

  const handleUpdate = async (itemId: string, quantity: number) => {
    if (!cartId) return;
    if (quantity === 0) {
      await handleRemove(itemId);
      return;
    }
    await api.cart.updateItem(cartId, itemId, quantity);
    loadCart();
  };

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum: number, i: CartItem) => sum + (i.variant?.price_cents ?? 0) * i.quantity,
    0,
  );
  const currency = items[0]?.variant?.currency ?? 'USD';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              href="/"
              className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-4 space-y-4">
              {items.map((item: CartItem) => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-16 w-16 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 text-lg">
                    🛍
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.variant?.name || 'Product'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.variant?.price_cents ?? 0, currency)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdate(item.id, Number(e.target.value))
                        }
                        className="h-7 rounded border px-1 text-xs"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">
                    {formatPrice(
                      (item.variant?.price_cents ?? 0) * item.quantity,
                      currency,
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatPrice(total, currency)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-8 w-full items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
              >
                Checkout
              </Link>
              <div className="text-center">
                <Link
                  href="/cart"
                  onClick={() => onOpenChange(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View full cart
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
