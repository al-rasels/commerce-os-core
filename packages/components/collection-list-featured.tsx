import React from "react";

export interface CollectionListFeaturedProps {
  heading?: string;
  columns?: "3" | "4";
}

const defaultCollections = [
  { id: "1", title: "Apparel & Fashion", count: "128 Products", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80", slug: "/products?cat=apparel" },
  { id: "2", title: "Electronics & Tech", count: "84 Products", image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80", slug: "/products?cat=tech" },
  { id: "3", title: "Home & Office Decor", count: "62 Products", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80", slug: "/products?cat=decor" },
];

export const CollectionListFeatured: React.FC<CollectionListFeaturedProps> = ({
  heading = "Shop by Category",
  columns = "3",
}) => {
  return (
    <section className="w-full py-12 bg-background border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center md:text-left">
          {heading}
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
          {defaultCollections.map((col) => (
            <a
              key={col.id}
              href={col.slug}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-md bg-slate-900 border"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary-foreground bg-primary/80 px-2 py-0.5 rounded">
                  {col.count}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                  {col.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
