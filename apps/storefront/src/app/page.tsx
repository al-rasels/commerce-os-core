import { api } from '@/lib/api';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {categories.length > 0 && (
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}`}
              className="rounded-full border px-4 py-1.5 text-sm hover:bg-accent"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-muted-foreground">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
