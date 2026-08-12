'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface CheckoutPaymentFormProps {
  orderId: string;
  clientSecret?: string;
  onSuccess: () => void;
}

export default function CheckoutPaymentForm({
  orderId,
  clientSecret,
  onSuccess,
}: CheckoutPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe is still loading. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError('');

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm font-medium rounded-lg p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">!</div>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-muted/30 border border-border/50 rounded-xl p-4 md:p-6">
        <PaymentElement
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: false,
            },
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full h-12 text-base font-semibold rounded-xl"
      >
        {isProcessing ? (
          'Processing...'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Pay Now
          </span>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your payment information is encrypted and processed securely by Stripe.
      </p>
    </form>
  );
}
