import React from "react";

export interface HeroSplitProps {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  mediaPosition?: "left" | "right";
}

export const HeroSplit: React.FC<HeroSplitProps> = ({
  heading = "Engineered for Excellence",
  subheading = "Experience next-level performance, craftsmanship, and aesthetic balance in every detail.",
  ctaLabel = "Explore Collection",
  ctaHref = "/products",
  secondaryCtaLabel = "Learn More",
  secondaryCtaHref = "/about",
  imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
  mediaPosition = "right",
}) => {
  return (
    <section className="w-full py-12 md:py-20 bg-background border-b">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={`flex flex-col gap-4 ${mediaPosition === "left" ? "md:order-2" : ""}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Featured Product</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {heading}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {subheading}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={ctaHref}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-md"
            >
              {ctaLabel} &rarr;
            </a>
            {secondaryCtaLabel && (
              <a
                href={secondaryCtaHref}
                className="px-6 py-3 border border-input bg-card text-foreground font-semibold text-sm rounded-lg hover:bg-accent transition-colors"
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
        <div className={`relative ${mediaPosition === "left" ? "md:order-1" : ""}`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-muted aspect-4/3">
            <img
              src={imageUrl}
              alt={heading}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
