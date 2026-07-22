'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function ReturnsPage() {
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We don't have a storefront API for returns yet, so mock it for the UI
    setTimeout(() => {
      setReturns([]);
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
        <h1 className="text-2xl font-bold">My Returns</h1>
        <Button>Request a Return</Button>
      </div>

      {returns.length === 0 ? (
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-8 text-center">
          <h2 className="text-lg font-medium mb-2">No returns yet</h2>
          <p className="text-neutral-500 mb-6">You haven't requested any returns.</p>
          <Link href="/account/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((rma) => (
            <div key={rma.id} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">Order #{rma.order_id}</p>
                <p className="text-sm text-neutral-500">Status: <span className="capitalize">{rma.status}</span></p>
                <p className="text-sm text-neutral-500">Reason: {rma.reason}</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
