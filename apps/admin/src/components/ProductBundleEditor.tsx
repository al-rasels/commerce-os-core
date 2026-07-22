import { useState, useEffect } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVariants } from '@/hooks/useVariants';
import { useBundleItems, useSetBundleItems } from '@/hooks/useBundles';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

interface ProductBundleEditorProps {
  productId: string;
}

export function ProductBundleEditor({ productId }: ProductBundleEditorProps) {
  const { data: variants } = useVariants(productId);
  const defaultVariant = variants?.[0]; // Bundle products usually have 1 default variant

  const { data: bundleItems, isLoading } = useBundleItems(defaultVariant?.id);
  const { mutate: saveItems, isPending } = useSetBundleItems(defaultVariant?.id);
  
  const [items, setItems] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sync with backend
  useEffect(() => {
    if (bundleItems) {
      setItems(
        bundleItems.map((b) => ({
          child_variant_id: b.child_variant_id,
          sku: b.child_variant.sku,
          name: b.child_variant.product?.name || b.child_variant.name,
          quantity: b.quantity,
        }))
      );
    }
  }, [bundleItems]);

  const handleSave = () => {
    if (!defaultVariant) {
      toast.error('Default variant not found for this product');
      return;
    }
    saveItems(items.map(i => ({ child_variant_id: i.child_variant_id, quantity: i.quantity })));
  };

  const handleRemove = (childVariantId: string) => {
    setItems((prev) => prev.filter((i) => i.child_variant_id !== childVariantId));
  };

  const handleUpdateQuantity = (childVariantId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.child_variant_id === childVariantId ? { ...i, quantity: qty } : i))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Bundle Items</h3>
          <p className="text-sm text-muted-foreground">Select the items that make up this bundle.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" type="button" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button size="sm" type="button" onClick={handleSave} disabled={isPending || isLoading}>
            Save Bundle
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left text-sm">
              <th className="py-2 px-3 font-medium">Item</th>
              <th className="py-2 px-3 font-medium">SKU</th>
              <th className="py-2 px-3 font-medium w-24">Qty</th>
              <th className="py-2 px-3 font-medium text-right w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No items in this bundle yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.child_variant_id} className="border-b">
                  <td className="py-2 px-3 font-medium">{item.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">{item.sku}</td>
                  <td className="py-2 px-3">
                    <Input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      className="h-8 w-16"
                      onChange={(e) => handleUpdateQuantity(item.child_variant_id, parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <button type="button" onClick={() => handleRemove(item.child_variant_id)} className="p-1 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <VariantSearchDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSelect={(v: any, p: any) => {
          if (!items.find(i => i.child_variant_id === v.id)) {
            setItems([...items, { child_variant_id: v.id, sku: v.sku, name: p.name, quantity: 1 }]);
          }
          setIsDialogOpen(false);
        }} 
      />
    </div>
  );
}

function VariantSearchDialog({ open, onOpenChange, onSelect }: any) {
  const { data: products } = useProducts();
  const [search, setSearch] = useState('');

  // Very basic client-side filtering for demo
  const filteredProducts = products?.filter(p => 
    p.product_type === 'physical' && 
    p.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border rounded-md px-3 mt-2">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <Input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 shadow-none px-0" 
            placeholder="Search by product name..." 
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto mt-4 flex flex-col gap-2">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No physical products found.</p>
          ) : (
            filteredProducts.map(p => (
              <ProductVariantSelector key={p.id} product={p} onSelect={onSelect} />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductVariantSelector({ product, onSelect }: any) {
  const { data: variants } = useVariants(product.id);
  
  if (!variants || variants.length === 0) return null;

  return (
    <div className="border rounded-md p-3">
      <div className="font-medium text-sm mb-2">{product.name}</div>
      <div className="flex flex-col gap-1">
        {variants.map(v => (
          <div key={v.id} className="flex justify-between items-center text-sm py-1 border-t border-dashed first:border-0 pt-2 first:pt-0">
            <div>
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground mr-2">{v.sku}</span>
              {v.option_label || 'Default Title'}
            </div>
            <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => onSelect(v, product)}>
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
