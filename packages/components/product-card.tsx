import { cn } from "./utils";

export interface ProductCardProps {
  productId: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string;
  variant?: "default" | "compact";
  LinkComponent?: React.ElementType;
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function ProductCard({
  productId,
  name,
  priceCents,
  currency,
  imageUrl,
  variant = "default",
  LinkComponent = "a",
}: ProductCardProps) {
  return (
    <LinkComponent
      href={`/products/${productId}`}
      className={cn(
        "group block rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        variant === "compact" && "flex items-center gap-4",
      )}
    >
      <div
        className={cn(
          "overflow-hidden",
          variant === "default" && "aspect-square",
          variant === "compact" && "h-20 w-20 shrink-0",
        )}
      >
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className={cn("p-4", variant === "compact" && "flex-1 p-0")}>
        <h3 className="text-sm font-medium text-foreground line-clamp-2">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">
          {formatPrice(priceCents, currency)}
        </p>
        {variant === "default" && (
          <button
            type="button"
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
          >
            Add to Cart
          </button>
        )}
      </div>
    </LinkComponent>
  );
}
