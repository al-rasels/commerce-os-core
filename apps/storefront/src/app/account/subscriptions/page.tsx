'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We don't have a storefront API for subscriptions yet, so mock it for the UI
    setTimeout(() => {
      setSubscriptions([]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Subscriptions</h1>
      </div>

      {subscriptions.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-8 text-center">
          <h2 className="text-lg font-medium mb-2">No active subscriptions</h2>
          <p className="text-neutral-500 mb-6">You aren't subscribed to any recurring products.</p>
          <Link href="/products">
            <Button variant="outline">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">Plan: {sub.plan_code}</p>
                <p className="text-sm text-neutral-500">Status: <span className="capitalize">{sub.status}</span></p>
                <p className="text-sm text-neutral-500">Next Billing: {new Date(sub.current_period_end).toLocaleDateString()}</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
