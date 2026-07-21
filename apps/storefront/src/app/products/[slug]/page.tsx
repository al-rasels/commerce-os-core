import { serverApi } from '@/lib/server-api';
import { ProductPageClient } from './product-page-client';
import { JsonLd } from '@/components/json-ld';
import { notFound } from 'next/navigation';

export const revalidate = 60; // SSR cache

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const productResponse = await serverApi.products.get(slug).catch(() => null);
  
  if (!productResponse || !productResponse.data) {
    return { title: 'Product Not Found | CommerceOS Storefront' };
  }
  
  const product = productResponse.data;
  return {
    title: `${product.name} | CommerceOS Storefront`,
    description: product.description || `Buy ${product.name} on CommerceOS Storefront.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const [page, productResponse] = await Promise.all([
    serverApi.experience.getPage('product').catch(() => null),
    serverApi.products.get(slug).catch(() => null),
  ]);

  if (!productResponse || !productResponse.data || productResponse.notFound) {
    return notFound();
  }

  if (!page || !page.data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground text-lg">Product layout not found or not published.</p>
      </div>
    );
  }

  const product = productResponse.data;

  // Enhance product data with derived fields
  const defaultVariant = product.variants?.[0];
  const priceCents = defaultVariant?.price_cents ?? 0;
  const currency = defaultVariant?.currency ?? 'USD';
  const price = (priceCents / 100).toFixed(2);
  const inStock = defaultVariant
    ? defaultVariant.stock_available - defaultVariant.stock_reserved > 0
    : false;

  const enrichedProduct = {
    ...product,
    price,
    currency,
    inStock,
    defaultVariant
  };

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0] || '',
    description: product.description || '',
    sku: defaultVariant?.sku || '',
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <ProductPageClient nodes={page.data.sections || page.data.sections_json} initialProduct={enrichedProduct} />
    </>
  );
}
