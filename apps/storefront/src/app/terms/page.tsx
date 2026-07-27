import { StaticPageLayout } from '@/components/static-page-layout';
import Link from 'next/link';

export const metadata = { title: 'Terms of Service | CommerceOS' };

export default function TermsPage() {
  return (
    <StaticPageLayout title="Terms of Service">
      <p className="text-lg">Last updated: July 2026</p>
      <div className="space-y-6 mt-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">General Terms</h2>
          <p>By accessing and using CommerceOS, you agree to these terms. If you do not agree, please do not use our services.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Orders and Payments</h2>
          <p>All orders are subject to acceptance and availability. Prices are subject to change without notice. Payment is due at the time of ordering via our secure payment processor.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Shipping and Returns</h2>
          <p>Shipping times are estimates and not guaranteed. Please refer to our <Link href="/shipping" className="text-primary hover:underline">Shipping Policy</Link> for details. Returns must be initiated within 30 days of delivery.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Limitation of Liability</h2>
          <p>CommerceOS shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Changes</h2>
          <p>We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
