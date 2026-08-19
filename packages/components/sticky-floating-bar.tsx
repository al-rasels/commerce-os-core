import React from "react";

export interface StickyFloatingBarProps {
  ctaLabel?: string;
  showPrice?: boolean;
}

export const StickyFloatingBar: React.FC<StickyFloatingBarProps> = ({
  ctaLabel = "Add to Cart",
  showPrice = true,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t p-3 shadow-xl md:hidden flex items-center justify-between gap-4">
      <div>
        <span className="text-[10px] text-muted-foreground uppercase font-bold block">Selected Item</span>
        {showPrice && <span className="text-base font-extrabold text-foreground">$149.00</span>}
      </div>
      <button className="flex-1 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded-lg hover:bg-primary/90 transition-colors shadow-md">
        {ctaLabel} &rarr;
      </button>
    </div>
  );
};
