import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/add-to-cart-button';

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg bg-accent flex items-center justify-center text-4xl text-muted-foreground">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            '🖼'
          )}
        </div>

        <div>
          {product.category && (
            <p className="text-sm text-muted-foreground mb-2">
              {product.category.name}
            </p>
          )}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">
            {currency} {price}
          </p>
          <p className="text-muted-foreground mb-6">
            {product.description || 'No description available.'}
          </p>

          {defaultVariant && (
            <AddToCartButton
              variantId={defaultVariant.id}
              disabled={!inStock}
              label={inStock ? 'Add to Cart' : 'Out of Stock'}
            />
          )}
        </div>
      </div>
    </div>
  );
}
