'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

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
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading cart...</p>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex gap-4 border rounded-lg p-4"
              >
                <div className="w-20 h-20 rounded bg-accent flex items-center justify-center flex-shrink-0">
                  🛍
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {item.variant?.name || 'Product'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currency}{' '}
                    {((item.variant?.price_cents ?? 0) / 100).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdate(item.id, Number(e.target.value))
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-medium">
                  {currency}{' '}
                  {(
                    ((item.variant?.price_cents ?? 0) * item.quantity) /
                    100
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>
                {currency} {(total / 100).toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {currency} {(total / 100).toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground mt-6"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
