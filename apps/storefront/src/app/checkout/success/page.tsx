'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order_id');

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-md">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
      <p className="text-muted-foreground mb-2">
        Thank you for your purchase.
      </p>
      {orderId && (
        <p className="text-sm text-muted-foreground mb-6">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}
      <Link
        href="/"
        className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
