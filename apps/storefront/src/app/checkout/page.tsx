'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [orderId, setOrderId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

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

  const handlePlaceOrder = async () => {
    if (!cartId || !email) return;
    setSubmitting(true);
    setError('');
    try {
      const result = await api.checkout.submit(cartId, email, sessionId);
      setOrderId(result.order?.id);
      setClientSecret(result.client_secret);
    } catch (e: any) {
      setError(e.message || 'Checkout failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = useCallback(() => {
    setCartId('');
    setItemCount(0);
    router.push(`/checkout/success?order_id=${orderId}`);
  }, [orderId, router, setCartId, setItemCount]);

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

  if (items.length === 0 && !clientSecret) {
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
              disabled={!!clientSecret}
              required
            />
          </div>
        </div>

        {!clientSecret ? (
          <>
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
              onClick={handlePlaceOrder}
              disabled={submitting || !email}
              className="w-full"
              size="lg"
            >
              {submitting ? 'Processing...' : 'Place Order'}
            </Button>
          </>
        ) : (
          <StripePaymentWrapper
            clientSecret={clientSecret}
            orderId={orderId}
            onSuccess={handlePaymentSuccess}
            onError={setError}
          />
        )}
      </div>
    </div>
  );
}

function StripePaymentWrapper({
  clientSecret,
  orderId,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  orderId: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  const [stripeComponents, setStripeComponents] = useState<{
    Elements: any;
    PaymentElement: any;
    useStripe: any;
    useElements: any;
  } | null>(null);
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const [{ loadStripe }, rs] = await Promise.all([
        import('@stripe/stripe-js'),
        import('@stripe/react-stripe-js'),
      ]);
      setStripePromise(loadStripe(pk));
      setStripeComponents(rs);
    })();
  }, [pk]);

  if (!stripeComponents || !stripePromise) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Loading payment form...
      </div>
    );
  }

  const { Elements } = stripeComponents;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm
        stripeComponents={stripeComponents}
        orderId={orderId}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}

function StripePaymentForm({
  stripeComponents,
  orderId,
  onSuccess,
  onError,
}: {
  stripeComponents: { PaymentElement: any; useStripe: any; useElements: any };
  orderId: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const { PaymentElement, useStripe, useElements } = stripeComponents;
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
      },
    });

    if (error) {
      onError(error.message || 'Payment failed.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Payment</h2>
        <PaymentElement />
        <Button
          type="submit"
          disabled={!stripe || !elements || submitting}
          className="w-full"
          size="lg"
        >
          {submitting ? 'Processing Payment...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
}
