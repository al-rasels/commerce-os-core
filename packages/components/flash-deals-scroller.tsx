import React from "react";

export interface FlashDealsScrollerProps {
  heading?: string;
  showProgressBar?: boolean;
}

const dummyDeals = [
  { id: "1", title: "4K Ultra HD Smart Monitor", price: "$299.00", originalPrice: "$450.00", claimedPercent: 82, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80" },
  { id: "2", title: "Ergonomic Mechanical Keyboard", price: "$89.00", originalPrice: "$140.00", claimedPercent: 64, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80" },
  { id: "3", title: "Precision Wireless Gaming Mouse", price: "$49.00", originalPrice: "$80.00", claimedPercent: 91, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80" },
];

export const FlashDealsScroller: React.FC<FlashDealsScrollerProps> = ({
  heading = "🔥 Hourly Flash Deals",
  showProgressBar = true,
}) => {
  return (
    <section className="w-full py-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-950 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2">
            {heading}
          </h2>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
            Limited Quantities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyDeals.map((deal) => (
            <div key={deal.id} className="bg-card border rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <img src={deal.image} alt={deal.title} className="w-24 h-24 object-cover rounded-xl bg-muted shrink-0" />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1">{deal.title}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{deal.price}</span>
                    <span className="text-xs text-muted-foreground line-through">{deal.originalPrice}</span>
                  </div>
                </div>

                {showProgressBar && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mb-1">
                      <span>Claimed: {deal.claimedPercent}%</span>
                      <span>Almost Sold Out!</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                        style={{ width: `${deal.claimedPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
