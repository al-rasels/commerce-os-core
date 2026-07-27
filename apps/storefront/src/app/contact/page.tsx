import { StaticPageLayout } from '@/components/static-page-layout';
import Link from 'next/link';

export const metadata = { title: 'Contact Us | CommerceOS' };

export default function ContactPage() {
  return (
    <StaticPageLayout title="Contact Us">
      <p className="text-lg">We&apos;d love to hear from you. Get in touch with our team.</p>
      <div className="space-y-6 mt-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Email</h2>
          <p>support@commerceos.com</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Phone</h2>
          <p>+1 (555) 123-4567</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Business Hours</h2>
          <p>Monday - Friday, 9:00 AM - 6:00 PM EST</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Address</h2>
          <p>123 Commerce Street, Suite 100<br />San Francisco, CA 94102</p>
        </div>
        <div className="pt-4">
          <Link href="/" className="text-sm text-primary hover:underline">Return to home</Link>
        </div>
      </div>
    </StaticPageLayout>
  );
}
