import React from "react";

export interface TierPriceBreak {
  minQty: number;
  maxQty?: number;
  unitPrice: number;
  savings: string;
}

export interface B2bTierPricingTableProps {
  title?: string;
  showSavingsBadge?: boolean;
}

const defaultBreaks: TierPriceBreak[] = [
  { minQty: 1, maxQty: 9, unitPrice: 149.00, savings: "Base MSRP" },
  { minQty: 10, maxQty: 49, unitPrice: 125.00, savings: "Save 16%" },
  { minQty: 50, maxQty: 99, unitPrice: 105.00, savings: "Save 29%" },
  { minQty: 100, unitPrice: 89.00, savings: "Save 40% (VIP Tier)" },
];

export const B2bTierPricingTable: React.FC<B2bTierPricingTableProps> = ({
  title = "Volume Tier Discounts",
  showSavingsBadge = true,
}) => {
  return (
    <div className="w-full py-6 px-6 bg-card border rounded-2xl my-6">
      <h4 className="text-sm font-bold text-foreground mb-4">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {defaultBreaks.map((tb, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border flex flex-col justify-between text-center transition-all ${
              idx === defaultBreaks.length - 1 ? "bg-primary/5 border-primary shadow-xs" : "bg-muted/40"
            }`}
          >
            <span className="text-[11px] font-semibold text-muted-foreground uppercase">
              {tb.maxQty ? `${tb.minQty} - ${tb.maxQty} Units` : `${tb.minQty}+ Units`}
            </span>
            <span className="text-lg font-black text-foreground my-1">${tb.unitPrice.toFixed(2)}</span>
            {showSavingsBadge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${idx === defaultBreaks.length - 1 ? "bg-primary text-primary-foreground" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}`}>
                {tb.savings}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
