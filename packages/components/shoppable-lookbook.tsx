"use client";

import React, { useState } from "react";

export interface HotspotPin {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  price: string;
  href: string;
}

export interface ShoppableLookbookProps {
  heading?: string;
  imageUrl?: string;
  hotspots?: HotspotPin[];
}

const defaultHotspots: HotspotPin[] = [
  { id: "1", xPercent: 35, yPercent: 40, title: "Oversized Denim Jacket", price: "$120.00", href: "/products" },
  { id: "2", xPercent: 60, yPercent: 75, title: "Classic White Sneakers", price: "$95.00", href: "/products" },
];

export const ShoppableLookbook: React.FC<ShoppableLookbookProps> = ({
  heading = "Shop the Outfit",
  imageUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80",
  hotspots = defaultHotspots,
}) => {
  const [activePin, setActivePin] = useState<HotspotPin | null>(null);

  return (
    <section className="w-full py-12 bg-background border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">{heading}</h2>
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-muted aspect-16/9">
          <img src={imageUrl} alt={heading} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />

          {hotspots.map((pin) => (
            <div
              key={pin.id}
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              <button
                onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
                className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg ring-4 ring-white/40 hover:scale-110 transition-transform animate-pulse cursor-pointer"
              >
                +
              </button>

              {activePin?.id === pin.id && (
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-48 bg-card border text-card-foreground p-3 rounded-xl shadow-xl z-30 text-xs">
                  <h4 className="font-semibold text-foreground">{pin.title}</h4>
                  <p className="font-bold text-primary my-1">{pin.price}</p>
                  <a
                    href={pin.href}
                    className="block text-center bg-primary text-primary-foreground py-1 rounded font-medium hover:bg-primary/90"
                  >
                    Quick Buy
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
