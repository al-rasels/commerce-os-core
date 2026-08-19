"use client";

import React, { useState } from "react";

export interface ProductBundleBuilderProps {
  heading?: string;
  discountPercent?: number;
  ctaLabel?: string;
}

const bundleItems = [
  { id: "1", title: "Minimalist Leather Backpack", price: 149.00, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&auto=format&fit=crop&q=80" },
  { id: "2", title: "Matching Leather Passport Holder", price: 45.00, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80" },
];

export const ProductBundleBuilder: React.FC<ProductBundleBuilderProps> = ({
  heading = "Frequently Bought Together",
  discountPercent = 15,
  ctaLabel = "Add Selected Bundle to Cart",
}) => {
  const [selected, setSelected] = useState<string[]>(["1", "2"]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const rawTotal = bundleItems
    .filter((i) => selected.includes(i.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const discountedTotal = rawTotal * (1 - discountPercent / 100);

  return (
    <div className="w-full py-8 px-6 bg-card border rounded-2xl my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">{heading}</h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Save {discountPercent}% when bought together
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          {bundleItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div
                onClick={() => toggleSelect(item.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selected.includes(item.id) ? "border-primary bg-primary/5 shadow-xs" : "opacity-60 bg-muted/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => {}}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg bg-muted" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground max-w-44 line-clamp-1">{item.title}</h4>
                  <p className="text-xs font-bold text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
              </div>
              {idx < bundleItems.length - 1 && <span className="text-xl font-bold text-muted-foreground">+</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-muted/50 p-4 rounded-xl flex flex-col justify-between gap-3 border">
          <div>
            <span className="text-xs text-muted-foreground">Total Bundle Price:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-foreground">${discountedTotal.toFixed(2)}</span>
              {discountPercent > 0 && selected.length > 1 && (
                <span className="text-xs text-muted-foreground line-through">${rawTotal.toFixed(2)}</span>
              )}
            </div>
          </div>
          <button
            disabled={selected.length === 0}
            className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {ctaLabel} ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
};
