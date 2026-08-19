import React from "react";

export interface ProductCarouselProps {
  heading?: string;
  subheading?: string;
  source?: "featured" | "new" | "bestsellers";
  limit?: number;
}

const dummyProducts = [
  { id: "1", title: "Minimalist Leather Backpack", price: "$149.00", category: "Bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80" },
  { id: "2", title: "Wireless Noise-Canceling Headphones", price: "$299.00", category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" },
  { id: "3", title: "Organic Cotton Oversized Hoodie", price: "$85.00", category: "Apparel", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80" },
  { id: "4", title: "Smart Ergonomic Desk Lamp", price: "$79.00", category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80" },
];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  heading = "Trending Now",
  subheading = "Handpicked items our customers are loving right now.",
  limit = 8,
}) => {
  return (
    <section className="w-full py-12 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{heading}</h2>
            {subheading && <p className="text-xs md:text-sm text-muted-foreground mt-1">{subheading}</p>}
          </div>
          <a href="/products" className="text-xs font-semibold text-primary hover:underline">
            View All Products &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dummyProducts.slice(0, limit).map((p) => (
            <div key={p.id} className="group flex flex-col bg-card border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  {p.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground mt-1">{p.price}</p>
                </div>
                <button className="w-full mt-2 py-2 bg-primary/10 text-primary font-semibold text-xs rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
