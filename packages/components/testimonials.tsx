import { cn } from "./utils";

export interface TestimonialsProps {
  variant: "grid" | "carousel";
  items: { quote: string; authorName: string; authorImage?: string; rating?: 1 | 2 | 3 | 4 | 5 }[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={cn("h-4 w-4", i < rating ? "text-amber-400" : "text-muted-foreground/30")}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ variant, items }: TestimonialsProps) {
  return (
    <section className="py-16">
      <div
        className={cn(
          variant === "grid" && "mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3",
          variant === "carousel" && "mx-auto max-w-2xl overflow-x-auto",
        )}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            {item.rating && (
              <div className="mb-3">
                <Stars rating={item.rating} />
              </div>
            )}
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              {item.authorImage && (
                <img
                  src={item.authorImage}
                  alt={item.authorName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{item.authorName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
