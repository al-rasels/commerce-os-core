import Link from 'next/link';
import { ProductCard as SharedProductCard } from '@commerceos/components';

export function ProductCard({ product, variant = "default" }: { product: any, variant?: "default" | "compact" }) {
  const priceCents = product.variants?.[0]?.price_cents ?? 0;
  const currency = product.variants?.[0]?.currency ?? 'USD';

  return (
    <SharedProductCard
      productId={product.slug} // We use slug for URL routing in storefront
      name={product.name}
      priceCents={priceCents}
      currency={currency}
      imageUrl={product.images?.[0] || ''}
      variant={variant}
      LinkComponent={(props: any) => <Link prefetch={true} {...props} />}
    />
  );
}
