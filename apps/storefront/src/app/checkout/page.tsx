'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import { getStripe } from '@/lib/stripe';
import CheckoutPaymentForm from '@/components/checkout-payment-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ShieldCheck, CheckCircle2, ShoppingCart } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Image from 'next/image';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    const { error: err } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (err) {
      setError(err.message || 'Payment failed');
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-destructive text-sm font-medium">{error}</div>}
      <Button type="submit" disabled={!stripe || processing} className="w-full h-12 bg-primary text-primary-foreground rounded-xl">
        {processing ? 'Processing...' : 'Pay now'}
      </Button>
    </form>
  );
}

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
  const [shippingMethod, setShippingMethod] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [previewData, setPreviewData] = useState<any>(null);

  // Simple email validation
  useEffect(() => {
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  // Address fields
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingAddressLine1, setShippingAddressLine1] = useState('');
  const [shippingAddressLine2, setShippingAddressLine2] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('US');
  const [shippingPhone, setShippingPhone] = useState('');
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!cartId) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.cart.get(cartId);
        setCart(data);
        const preview = await api.checkout.preview(cartId, {});
        setPreviewData(preview);
        if (preview.shipping_options?.length > 0) {
          setShippingMethod(preview.shipping_options[0].id);
        }
      } catch {
        setCart(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cartId]);

  useEffect(() => {
    if (!cartId || step < 2) return;
    const fetchPreview = async () => {
      try {
        const preview = await api.checkout.preview(cartId, {
          shipping_state: shippingState,
          shipping_rule_id: shippingMethod || undefined,
          promo_code: promoCode || undefined,
        });
        setPreviewData(preview);
      } catch (e) {
        console.error('Preview error', e);
      }
    };
    const timer = setTimeout(fetchPreview, 300);
    return () => clearTimeout(timer);
  }, [cartId, shippingState, shippingMethod, promoCode, step]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && emailValid) {
      setStep(2); // Go to shipping
      return;
    }
    if (step === 2) {
      if (!cartId || !email) return;
      setSubmitting(true);
      setError('');
      try {
        const result = await api.checkout.submit(cartId, email, sessionId, {
          shipping_first_name: shippingFirstName,
          shipping_last_name: shippingLastName,
          shipping_address_line1: shippingAddressLine1,
          shipping_address_line2: shippingAddressLine2,
          shipping_city: shippingCity,
          shipping_state: shippingState,
          shipping_postal_code: shippingPostalCode,
          shipping_country: shippingCountry,
          shipping_phone: shippingPhone,
          billing_same_as_shipping: billingSameAsShipping,
          shipping_rule_id: shippingMethod || undefined,
          promo_code: promoCode || undefined,
        });
        setOrderId(result.order?.id);
        setClientSecret(result.client_secret);
        setStep(3); // Move to payment step
      } catch (e: any) {
        setError(e.message || 'Checkout failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
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
  const currency = items[0]?.variant?.currency ?? 'USD';
  const subtotal = previewData?.subtotal_cents ?? 0;
  const tax = previewData?.tax_cents ?? 0;
  const shipping = previewData?.shipping_cents ?? 0;
  const discount = previewData?.discount_cents ?? 0;
  const total = previewData?.total_cents ?? 0;
  const shippingOptions = previewData?.shipping_options ?? [];

  if (items.length === 0 && !clientSecret) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md text-center">Looks like you haven&apos;t added anything yet. Discover our premium collection and find something you love.</p>
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
    <div className="bg-muted/10 min-h-screen pb-24 lg:pb-0">
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
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 mb-8 transition-all overflow-hidden ${step !== 1 && 'opacity-60 grayscale-[50%]'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'}`}>1</span>
                  Contact Information
                </h2>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-sm font-medium text-primary hover:underline">Edit</button>
                )}
              </div>

              <motion.div animate={{ height: step === 1 ? "auto" : 0 }} className="overflow-hidden">
                <form onSubmit={handlePlaceOrder}>
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm font-medium rounded-lg p-4 mb-6 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">!</div>
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4 mb-8">
                    <div className="space-y-2 relative">
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={`h-12 bg-muted/50 focus:bg-background pr-10 transition-colors ${email.length > 0 ? (emailValid ? 'border-green-500/50 focus-visible:ring-green-500' : 'border-destructive/50 focus-visible:ring-destructive') : 'border-border/50'}`}
                        />
                        {email.length > 0 && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {emailValid ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-destructive text-destructive flex items-center justify-center text-xs font-bold">!</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-base font-semibold mb-4">Shipping Address</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shipping_first_name">First name</Label>
                          <Input
                            id="shipping_first_name"
                            placeholder="John"
                            value={shippingFirstName}
                            onChange={(e) => setShippingFirstName(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping_last_name">Last name</Label>
                          <Input
                            id="shipping_last_name"
                            placeholder="Doe"
                            value={shippingLastName}
                            onChange={(e) => setShippingLastName(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="shipping_address_line1">Address line 1</Label>
                        <Input
                          id="shipping_address_line1"
                          placeholder="123 Main St"
                          value={shippingAddressLine1}
                          onChange={(e) => setShippingAddressLine1(e.target.value)}
                          required
                          className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                        />
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="shipping_address_line2">Address line 2 (optional)</Label>
                        <Input
                          id="shipping_address_line2"
                          placeholder="Apt 4B"
                          value={shippingAddressLine2}
                          onChange={(e) => setShippingAddressLine2(e.target.value)}
                          className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="shipping_city">City</Label>
                          <Input
                            id="shipping_city"
                            placeholder="New York"
                            value={shippingCity}
                            onChange={(e) => setShippingCity(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping_state">State</Label>
                          <Input
                            id="shipping_state"
                            placeholder="NY"
                            value={shippingState}
                            onChange={(e) => setShippingState(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping_postal_code">ZIP code</Label>
                          <Input
                            id="shipping_postal_code"
                            placeholder="10001"
                            value={shippingPostalCode}
                            onChange={(e) => setShippingPostalCode(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="shipping_country">Country</Label>
                          <Input
                            id="shipping_country"
                            placeholder="US"
                            value={shippingCountry}
                            onChange={(e) => setShippingCountry(e.target.value)}
                            required
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping_phone">Phone (optional)</Label>
                          <Input
                            id="shipping_phone"
                            type="tel"
                            placeholder="+1 555-123-4567"
                            value={shippingPhone}
                            onChange={(e) => setShippingPhone(e.target.value)}
                            className="h-11 bg-muted/50 border-border/50 focus:bg-background"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <input
                          id="billing_same_as_shipping"
                          type="checkbox"
                          checked={billingSameAsShipping}
                          onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <Label htmlFor="billing_same_as_shipping" className="text-sm font-normal cursor-pointer">
                          Billing address is the same as shipping
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold rounded-xl" 
                    disabled={submitting || !emailValid}
                  >
                    Continue to Shipping
                  </Button>
                </form>
              </motion.div>
              {step > 1 && (
                <div className="pl-9 space-y-2 mt-4">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {email}
                  </div>
                  <div className="text-sm text-muted-foreground pl-6">
                    {shippingFirstName} {shippingLastName}
                    <br />
                    {shippingAddressLine1}
                    {shippingAddressLine2 && <>, {shippingAddressLine2}</>}
                    <br />
                    {shippingCity}, {shippingState} {shippingPostalCode}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Step 2: Shipping */}
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 mb-8 transition-all overflow-hidden ${step < 2 ? 'opacity-50 pointer-events-none' : step > 2 ? 'opacity-60 grayscale-[50%]' : ''}`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-primary text-primary-foreground' : step > 2 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>2</span>
                  Shipping Method
                </h2>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-sm font-medium text-primary hover:underline">Edit</button>
                )}
              </div>

              <motion.div animate={{ height: step === 2 ? "auto" : 0 }} className="overflow-hidden">
                <form onSubmit={handlePlaceOrder}>
                  <div className="space-y-3 mb-8">
                    {shippingOptions.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No shipping options available for the selected address.</p>
                    ) : (
                      shippingOptions.map((option: any) => (
                        <label key={option.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${shippingMethod === option.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border/50 hover:border-foreground/30'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === option.id ? 'border-primary' : 'border-muted-foreground'}`}>
                              {shippingMethod === option.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <p className="font-medium">{option.name}</p>
                            </div>
                          </div>
                          <span className="font-semibold">{option.price_cents === 0 ? 'Free' : `${currency} ${(option.price_cents / 100).toFixed(2)}`}</span>
                          <input type="radio" name="shipping" value={option.id} checked={shippingMethod === option.id} onChange={(e) => setShippingMethod(e.target.value)} className="hidden" />
                        </label>
                      ))
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold rounded-xl" 
                    disabled={submitting || shippingOptions.length === 0}
                  >
                    {submitting ? 'Preparing Order...' : 'Continue to Payment'}
                  </Button>
                </form>
              </motion.div>
              {step > 2 && (
                <div className="pl-9 text-sm text-muted-foreground flex items-center gap-2 mt-4">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {shippingOptions.find((o: any) => o.id === shippingMethod)?.name || 'Selected Shipping'}
                </div>
              )}
            </motion.div>

            {/* Step 3: Payment */}
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 overflow-hidden ${step < 3 && 'opacity-50 pointer-events-none'}`}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>3</span>
                  Payment Details
                </h2>
                <p className="text-sm text-muted-foreground mt-2 pl-9">All transactions are secure and encrypted.</p>
              </div>

              <motion.div animate={{ height: step === 3 ? "auto" : 0 }} className="overflow-hidden">
              {step === 3 && clientSecret && !stripePublishableKey && (
                <div className="pl-9">
                  <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                    <div className="flex justify-center mb-4">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-100 rounded-lg p-4 text-sm">
                      <p className="font-medium">Payments are not configured</p>
                      <p className="mt-1">
                        Your order was created but could not be charged because the storefront
                        has no Stripe publishable key. Set{' '}
                        <code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to
                        complete the payment flow.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && clientSecret && stripePromise && (
                <div className="pl-9">
                  <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                    <div className="flex justify-center mb-4">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#000000',
                            colorBackground: '#ffffff',
                            colorText: '#000000',
                            colorDanger: '#dc2626',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: '8px',
                          },
                        },
                      }}
                    >
                      <CheckoutPaymentForm
                        orderId={orderId}
                        clientSecret={clientSecret}
                        onSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  </div>
                </div>
              )}
              </motion.div>
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
                        <Image src={item.variant.product.images[0]} alt="" fill className="object-cover" />
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

              <div className="border-t border-border/50 pt-4 mb-4">
                <Label htmlFor="promoCode" className="text-sm font-semibold mb-2 block">Promo Code</Label>
                <div className="flex gap-2">
                  <Input 
                    id="promoCode" 
                    placeholder="Enter code" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="h-10 bg-muted/50 border-border/50 focus:bg-background"
                  />
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{currency} {(subtotal / 100).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-{currency} {(discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">{shipping === 0 ? 'Free' : `${currency} ${(shipping / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes</span>
                  <span className="font-medium text-foreground">{tax === 0 ? '-' : `${currency} ${(tax / 100).toFixed(2)}`}</span>
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
      
      {/* Mobile Sticky Summary */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total due</span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            {currency} {(total / 100).toFixed(2)}
          </span>
        </div>
        <Button 
          onClick={() => {
            // Smooth scroll to the current active step form
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="rounded-full px-6"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
