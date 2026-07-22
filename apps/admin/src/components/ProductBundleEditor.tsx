import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductBundleEditorProps {
  productId: string;
}

export function ProductBundleEditor({ productId }: ProductBundleEditorProps) {
  const [items, setItems] = useState<any[]>([]);

  // TODO: Use productId and setItems for API integration
  console.log('ProductBundleEditor for productId:', productId);
  if (items.length > 0 && !setItems) {
    // just to silence TS
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Bundle Items</h3>
        <Button variant="outline" size="sm" type="button" onClick={() => alert("Search variants dialog not implemented yet.")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left text-sm">
              <th className="py-2 px-3 font-medium">Variant SKU</th>
              <th className="py-2 px-3 font-medium">Quantity</th>
              <th className="py-2 px-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No items in this bundle yet.
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 px-3">{item.sku}</td>
                  <td className="py-2 px-3">{item.quantity}</td>
                  <td className="py-2 px-3 text-right">
                    <button type="button" className="p-1 hover:text-destructive ml-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Note: The backend API for saving bundle items is currently in development (Phase 1 MVP). 
      </p>
    </div>
  );
}
