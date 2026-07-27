import { StaticPageLayout } from '@/components/static-page-layout';

export const metadata = { title: 'Shipping & Returns | CommerceOS' };

export default function ShippingPage() {
  return (
    <StaticPageLayout title="Shipping &amp; Returns">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Shipping Policy</h2>
          <p>We offer free standard shipping on orders over $150. Standard shipping typically takes 5-7 business days. Express shipping is available for an additional fee and delivers in 2-3 business days.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Processing Time</h2>
          <p>Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">International Shipping</h2>
          <p>We ship to select international destinations. International orders may be subject to customs duties and taxes, which are the responsibility of the buyer.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Return Policy</h2>
          <p>We accept returns within 30 days of delivery for unused items in original packaging. To initiate a return, contact our support team. Refunds are processed within 5-7 business days after we receive the returned item.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exchanges</h2>
          <p>We offer exchanges for defective or damaged items. Please contact support within 7 days of receiving your order to arrange an exchange.</p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
