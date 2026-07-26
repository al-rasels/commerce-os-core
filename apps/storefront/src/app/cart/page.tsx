'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import { EmptyState } from '@/components/empty-state';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  variant?: { name: string; price_cents: number; currency: string };
  quantity: number;
}

interface Cart {
  id?: string;
  items?: CartItem[];
}

export default function CartPage() {
  const { cartId, sessionId, setItemCount } = useCartStore();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    setLoading(true);
    try {
      if (cartId) {
        const data = await api.cart.get(cartId);
        setCart(data);
        setItemCount(data.items?.length ?? 0);
      } else {
        const data = await api.cart.get(sessionId);
        setCart(data);
      }
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [cartId]);

  const handleRemove = async (itemId: string) => {
    if (!cartId) return;
    await api.cart.removeItem(cartId, itemId);
    loadCart();
  };

  const handleUpdate = async (itemId: string, quantity: number) => {
    if (!cartId) return;
    await api.cart.updateItem(cartId, itemId, quantity);
    loadCart();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-28 bg-muted rounded-xl" />
              ))}
            </div>
            <div className="h-48 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum: number, i: CartItem) => sum + (i.variant?.price_cents ?? 0) * i.quantity,
    0,
  );
  const currency = items[0]?.variant?.currency ?? 'USD';

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="size-full p-2.5" />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Discover our premium collection."
          size="lg"
          action={
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
            >
              Explore Products
            </Link>
          }
        />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex gap-4 bg-background rounded-xl p-4 border border-border/50 shadow-sm"
              >
                <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="size-8 text-muted-foreground/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {item.variant?.name || 'Product'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {currency}{' '}
                    {((item.variant?.price_cents ?? 0) / 100).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdate(item.id, Number(e.target.value))
                      }
                      aria-label="Quantity"
                      className="h-8 rounded-lg border border-border/50 bg-muted/50 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-medium shrink-0">
                  {currency}{' '}
                  {(
                    ((item.variant?.price_cents ?? 0) * item.quantity) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-xl p-6 border border-border/50 shadow-sm h-fit sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{currency} {(total / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-border/50 pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{currency} {(total / 100).toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] mt-6"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
