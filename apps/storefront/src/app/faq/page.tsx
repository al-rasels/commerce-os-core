import { StaticPageLayout } from '@/components/static-page-layout';

export const metadata = { title: 'FAQ | CommerceOS' };

const faqs = [
  { q: 'How do I place an order?', a: 'Browse our products, add items to your cart, and proceed to checkout. You can pay with credit card via our secure Stripe payment processor.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe, our secure payment processor.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is available for an additional fee and takes 2-3 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for unused items in original packaging. Contact our support team to initiate a return.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Contact support as soon as possible to make changes.' },
  { q: 'Do you ship internationally?', a: 'We currently ship to select countries. International shipping rates and times vary by destination.' },
];

export default function FaqPage() {
  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <p className="text-lg">Find answers to common questions about our products, shipping, and policies.</p>
      <div className="space-y-8 mt-8">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h2>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
}
