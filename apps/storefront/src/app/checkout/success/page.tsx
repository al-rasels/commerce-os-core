'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    api.orders
      .get(orderId)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-muted-foreground">Thank you for your purchase.</p>
      </div>

      {order && (
        <div className="border rounded-lg p-6 space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="capitalize font-medium">{order.status}</span>
          </div>
          {order.customer_email && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span>{order.customer_email}</span>
            </div>
          )}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Items</h3>
            {(order.items ?? []).map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>
                  {item.variant?.name || 'Item'} x{item.quantity}
                </span>
                <span>
                  {item.currency}{' '}
                  {(((item.variant?.price_cents ?? 0) * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>
                {order.currency} {(order.total_cents / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
        >
          Continue Shopping
        </Link>
      </div>
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
