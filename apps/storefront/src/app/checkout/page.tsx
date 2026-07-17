'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, sessionId, setItemCount, setCartId } = useCartStore();
  const [cart, setCart] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!cartId) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.cart.get(cartId);
        setCart(data);
      } catch {
        setCart(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cartId]);

  const handleSubmit = async () => {
    if (!cartId || !email) return;
    setSubmitting(true);
    setError('');
    try {
      const result = await api.checkout.submit(cartId, email, sessionId);
      setCartId('');
      setItemCount(0);
      const params = new URLSearchParams({
        order_id: result.order?.id ?? '',
        client_secret: result.client_secret ?? '',
      });
      router.push(`/checkout/success?${params}`);
    } catch (e: any) {
      setError(e.message || 'Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum: number, i: any) => sum + (i.variant?.price_cents ?? 0) * i.quantity,
    0,
  );
  const currency = items[0]?.variant?.currency ?? 'USD';

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.variant?.name || 'Product'} x{item.quantity}
              </span>
              <span>
                {currency}{' '}
                {(
                  ((item.variant?.price_cents ?? 0) * item.quantity) /
                  100
                ).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {currency} {(total / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting || !email}
          className="w-full"
          size="lg"
        >
          {submitting ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}
