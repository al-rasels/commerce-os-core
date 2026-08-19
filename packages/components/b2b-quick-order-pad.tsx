"use client";

import React, { useState } from "react";

export interface QuickOrderRow {
  sku: string;
  qty: number;
  price: number;
  title: string;
}

export interface B2bQuickOrderPadProps {
  title?: string;
  enableCsvUpload?: boolean;
}

export const B2bQuickOrderPad: React.FC<B2bQuickOrderPadProps> = ({
  title = "Wholesale Bulk Quick Order Pad",
  enableCsvUpload = true,
}) => {
  const [rows, setRows] = useState<QuickOrderRow[]>([
    { sku: "SKU-BACKPACK-01", qty: 10, price: 120.00, title: "Minimalist Leather Backpack" },
    { sku: "SKU-HEADSET-02", qty: 5, price: 240.00, title: "Wireless Noise-Canceling Headphones" },
    { sku: "", qty: 1, price: 0, title: "" },
  ]);

  const updateRow = (idx: number, field: keyof QuickOrderRow, value: any) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [field]: value };
    setRows(next);
  };

  const addRow = () => {
    setRows((prev) => [...prev, { sku: "", qty: 1, price: 0, title: "" }]);
  };

  const total = rows.reduce((acc, r) => acc + (r.qty || 0) * (r.price || 0), 0);

  return (
    <div className="w-full py-8 px-6 bg-card border rounded-2xl my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">High-speed bulk ordering table for registered wholesale partners.</p>
        </div>
        {enableCsvUpload && (
          <button className="px-4 py-2 border border-input bg-background hover:bg-accent text-foreground text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5">
            <span>📥</span> Upload CSV Order Matrix
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b bg-muted/40 text-muted-foreground font-semibold">
              <th className="p-3">Item #</th>
              <th className="p-3">SKU / Code</th>
              <th className="p-3">Description</th>
              <th className="p-3 w-28">Quantity</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td className="p-3 font-mono text-muted-foreground">{idx + 1}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={row.sku}
                    placeholder="Enter SKU..."
                    onChange={(e) => updateRow(idx, "sku", e.target.value)}
                    className="w-full bg-background border px-2 py-1.5 rounded font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="p-3 text-foreground font-medium">{row.title || "-"}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={row.qty}
                    onChange={(e) => updateRow(idx, "qty", parseInt(e.target.value) || 0)}
                    className="w-full bg-background border px-2 py-1.5 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="p-3 text-muted-foreground">${row.price.toFixed(2)}</td>
                <td className="p-3 font-bold text-foreground">${(row.qty * row.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t gap-4">
        <button
          onClick={addRow}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          + Add Line Item
        </button>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Order Total:</span>
            <span className="block text-2xl font-black text-foreground">${total.toFixed(2)}</span>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md">
            Add All to Wholesale Order &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
