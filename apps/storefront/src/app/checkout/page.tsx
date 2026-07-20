'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
  const [step, setStep] = useState(1);

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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId || !email) return;
    setSubmitting(true);
    setError('');
    try {
      const result = await api.checkout.submit(cartId, email, sessionId);
      setOrderId(result.order?.id);
      setClientSecret(result.client_secret);
      setStep(2); // Move to payment step
    } catch (e: any) {
      setError(e.message || 'Checkout failed. Please try again.');
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
      <div className="bg-muted/10 min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex gap-12">
            <div className="w-full lg:w-3/5 space-y-8 animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-64 bg-muted rounded-xl"></div>
            </div>
            <div className="w-full lg:w-2/5 animate-pulse">
              <div className="h-96 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (sum: number, i: any) => sum + (i.variant?.price_cents ?? 0) * i.quantity,
    0,
  );
  const currency = items[0]?.variant?.currency ?? 'USD';
  const tax = 0;
  const shipping = subtotal > 15000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  if (items.length === 0 && !clientSecret) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCartIcon className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md text-center">Looks like you haven't added anything yet. Discover our premium collection and find something you love.</p>
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-muted/10 min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Cart
          </Link>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Forms */}
          <div className="w-full lg:w-[55%]">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Secure Checkout</h1>
            
            {/* Step 1: Customer Info */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 mb-8 transition-all ${step !== 1 && 'opacity-60 grayscale-[50%]'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                  Contact Information
                </h2>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-sm font-medium text-primary hover:underline">Edit</button>
                )}
              </div>

              {step === 1 ? (
                <form onSubmit={handlePlaceOrder}>
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm font-medium rounded-lg p-4 mb-6 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">!</div>
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-muted/50 border-border/50 focus:bg-background"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold rounded-xl" 
                    disabled={submitting || !email}
                  >
                    {submitting ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                </form>
              ) : (
                <div className="pl-9 text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {email}
                </div>
              )}
            </motion.div>

            {/* Step 2: Payment */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 ${step === 1 && 'opacity-50 pointer-events-none'}`}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</span>
                  Payment Details
                </h2>
                <p className="text-sm text-muted-foreground mt-2 pl-9">All transactions are secure and encrypted.</p>
              </div>

              {step === 2 && clientSecret && (
                <div className="pl-9">
                  <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center">
                    <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium mb-4">Secure Payment Gateway Simulated</p>
                    <Button onClick={handlePaymentSuccess} className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl">
                      Simulate Successful Payment
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 hide-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="relative w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0 border border-border/50">
                      {item.variant?.product?.images?.[0] ? (
                        <img src={item.variant.product.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">🖼</div>
                      )}
                      <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-foreground text-background text-xs font-bold rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.variant?.product?.name || 'Product'}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.variant?.sku || 'Default Title'}</p>
                    </div>
                    <div className="font-semibold text-sm shrink-0">
                      {currency} {((item.variant?.price_cents ?? 0) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{currency} {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">{shipping === 0 ? 'Free' : `${currency} ${(shipping / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes</span>
                  <span className="font-medium text-foreground">Calculated at next step</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-sm font-normal text-muted-foreground mr-1">{currency}</span>
                  {(total / 100).toFixed(2)}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

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
