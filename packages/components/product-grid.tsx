import { cn } from "./utils";
import { ProductCard, type ProductCardProps } from "./product-card";

export interface ProductGridProps {
  source: "featured" | "category" | "collection" | "manual";
  sourceId?: string;
  productIds?: string[];
  columns?: 2 | 3 | 4;
  limit?: number;
}

const columnMap: Record<NonNullable<ProductGridProps["columns"]>, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const demoProducts: ProductCardProps[] = [
  { productId: "p1", name: "Classic T-Shirt", priceCents: 2999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p2", name: "Slim Fit Jeans", priceCents: 5999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p3", name: "Leather Jacket", priceCents: 19999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p4", name: "Running Sneakers", priceCents: 8999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p5", name: "Wool Beanie", priceCents: 1499, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p6", name: "Canvas Backpack", priceCents: 4999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p7", name: "Aviator Sunglasses", priceCents: 12999, currency: "USD", imageUrl: "/placeholder.svg" },
  { productId: "p8", name: "Cotton Hoodie", priceCents: 4499, currency: "USD", imageUrl: "/placeholder.svg" },
];

export function ProductGrid({
  source,
  sourceId,
  productIds,
  columns = 4,
  limit = 12,
}: ProductGridProps) {
  const products = source === "manual" && productIds
    ? demoProducts.filter((p) => productIds.includes(p.productId))
    : demoProducts;

  const displayed = products.slice(0, limit);

  return (
    <section className="py-12">
      <div className={cn("grid gap-6", columnMap[columns])}>
        {displayed.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
      </div>
    </section>
  );
}
