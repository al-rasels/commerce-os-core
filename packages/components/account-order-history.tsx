import React from "react";

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  total: string;
  status: "Delivered" | "Processing" | "Shipped";
  trackingUrl?: string;
}

export interface AccountOrderHistoryProps {
  title?: string;
  showTracking?: boolean;
}

const dummyOrders: OrderItem[] = [
  { id: "1", orderNumber: "ORD-9921", date: "Aug 14, 2026", total: "$194.00", status: "Delivered", trackingUrl: "#" },
  { id: "2", orderNumber: "ORD-9844", date: "Jul 28, 2026", total: "$85.00", status: "Shipped", trackingUrl: "#" },
];

export const AccountOrderHistory: React.FC<AccountOrderHistoryProps> = ({
  title = "My Orders",
  showTracking = true,
}) => {
  return (
    <div className="w-full py-8 px-6 bg-card border rounded-2xl my-6">
      <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      <div className="space-y-4">
        {dummyOrders.map((ord) => (
          <div key={ord.id} className="p-4 border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/20">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-foreground">{ord.orderNumber}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  ord.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {ord.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Placed on {ord.date} &bull; Total: <span className="font-semibold text-foreground">{ord.total}</span></p>
            </div>
            <div className="flex items-center gap-2">
              {showTracking && ord.trackingUrl && (
                <a href={ord.trackingUrl} className="px-3 py-1.5 border border-input bg-background text-xs font-semibold rounded-md hover:bg-accent">
                  Track Shipment 🚚
                </a>
              )}
              <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:bg-primary/90">
                Invoice PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
