'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Trash2, ShoppingBag, Truck, Plus } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  const FREE_SHIPPING_THRESHOLD = 15000; // $150.00
  const progressToFreeShipping = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountAwayFromFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  // Mock Cross-sells
  const crossSells = [
    { id: 'cs-1', name: 'Premium Leather Care Kit', price: 2500 },
    { id: 'cs-2', name: 'Extended 3-Year Warranty', price: 4500 },
  ];

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
            {/* Free Shipping Progress */}
            <div className="px-4 pb-4 border-b border-border/50">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                {progressToFreeShipping >= 100 ? (
                  <span className="font-semibold text-green-600 dark:text-green-400">You've unlocked free shipping!</span>
                ) : (
                  <span>
                    You're <span className="font-semibold">{formatPrice(amountAwayFromFreeShipping, currency)}</span> away from free shipping
                  </span>
                )}
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeShipping}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full ${progressToFreeShipping >= 100 ? 'bg-green-500' : 'bg-primary'}`} 
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
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

            <div className="border-t border-border/50 bg-muted/20">
              {/* Cross-Sells Section */}
              <div className="p-4 border-b border-border/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Frequently Added Together</h4>
                <div className="space-y-3">
                  {crossSells.map((cs) => (
                    <div key={cs.id} className="flex items-center justify-between p-2 rounded-lg bg-background border shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs">✨</div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{cs.name}</span>
                          <span className="text-xs text-muted-foreground">{formatPrice(cs.price, currency)}</span>
                        </div>
                      </div>
                      <button className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-6 text-base font-medium text-background shadow-lg hover:bg-foreground/90 transition-all active:scale-[0.98]"
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
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
