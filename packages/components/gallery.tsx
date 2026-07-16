import { cn } from "./utils";

export interface GalleryProps {
  variant: "grid" | "masonry" | "carousel";
  images: { url: string; alt: string }[];
}

const variantStyles: Record<GalleryProps["variant"], string> = {
  grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  masonry: "columns-1 gap-4 sm:columns-2 lg:columns-3",
  carousel: "flex gap-4 overflow-x-auto snap-x snap-mandatory",
};

export function Gallery({ variant, images }: GalleryProps) {
  return (
    <section className="py-12">
      <div className={cn(variantStyles[variant])}>
        {images.map((img, i) => (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-lg",
              variant === "carousel" && "min-w-[80vw] snap-center sm:min-w-[400px]",
            )}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
