import Link from 'next/link';

export function ProductCard({ product }: { product: any }) {
  const priceCents = product.variants?.[0]?.price_cents ?? 0;
  const currency = product.variants?.[0]?.currency ?? 'USD';
  const price = (priceCents / 100).toFixed(2);

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="aspect-square rounded-lg bg-accent mb-3 flex items-center justify-center text-4xl text-muted-foreground overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          '🛍'
        )}
      </div>
      <h3 className="font-medium truncate">{product.name}</h3>
      <p className="text-sm text-muted-foreground">
        {currency} {price}
      </p>
    </Link>
  );
}
