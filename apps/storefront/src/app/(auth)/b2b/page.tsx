'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function B2BPortalPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking B2B profile check for UI wiring
    setTimeout(() => {
      setProfile(null); // Set to null to simulate no approved B2B profile yet
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

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Wholesale Portal</h1>
          <p className="text-neutral-500 mb-8 max-w-lg mx-auto">
            Apply for a wholesale account to unlock volume discounts, net-terms purchasing, and bulk ordering tools.
          </p>
          <Button size="lg">Apply for Wholesale Account</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Wholesale Portal</h1>
        <div className="flex gap-4">
          <Button variant="outline">Quick Order Form</Button>
          <Button>View Draft Orders</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Wholesale Orders</h2>
          <p className="text-neutral-500">No recent orders found.</p>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-500">Company Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Payment Terms</p>
              <p className="font-medium">{profile.payment_terms}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Available Credit</p>
              <p className="font-medium">${(profile.credit_limit_cents / 100).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
