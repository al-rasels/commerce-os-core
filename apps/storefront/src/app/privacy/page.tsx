import { StaticPageLayout } from '@/components/static-page-layout';

export const metadata = { title: 'Privacy Policy | CommerceOS' };

export default function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <p className="text-lg">Last updated: July 2026</p>
      <div className="space-y-6 mt-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>We collect information you provide directly to us, including your name, email address, shipping address, and payment information when you make a purchase. Payment information is processed securely by Stripe and is never stored on our servers.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <p>We use your information to process orders, communicate with you about your purchases, and improve our services. We do not sell your personal information to third parties.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Data Security</h2>
          <p>We implement industry-standard security measures including SSL encryption and secure tokenization of payment data. Your account information is protected by encryption at rest and in transit.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Cookies</h2>
          <p>We use essential cookies to maintain your session and shopping cart. Analytics cookies help us understand how you interact with our store so we can improve your experience.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
          <p>If you have questions about this policy, contact us at privacy@commerceos.com.</p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
