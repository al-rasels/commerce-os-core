import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import { ProductClient } from './product-client';

export const revalidate = 60; // SSR cache

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await api.products.get(slug).catch(() => null);

  if (!product || product.notFound) notFound();

  const defaultVariant = product.variants?.[0];
  const priceCents = defaultVariant?.price_cents ?? 0;
  const currency = defaultVariant?.currency ?? 'USD';
  const price = (priceCents / 100).toFixed(2);
  const inStock = defaultVariant
    ? defaultVariant.stock_available - defaultVariant.stock_reserved > 0
    : false;

  return (
    <ProductClient 
      product={product} 
      currency={currency} 
      price={price} 
      inStock={inStock} 
      defaultVariant={defaultVariant} 
    />
  );
}
