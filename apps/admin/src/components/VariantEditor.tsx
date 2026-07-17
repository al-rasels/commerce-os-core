import { useState } from 'react';
import { useVariants, useCreateVariant, useUpdateVariant, useDeleteVariant } from '@/hooks/useVariants';
import type { ProductVariant, ProductVariantInput } from '@/lib/api/catalog';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface VariantEditorProps {
  productId: string;
}

function VariantRow({
  variant,
  onEdit,
  onDelete,
}: {
  variant: ProductVariant;
  onEdit: (v: ProductVariant) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-b text-sm">
      <td className="py-2 px-3">{variant.sku}</td>
      <td className="py-2 px-3">{variant.name}</td>
      <td className="py-2 px-3">{variant.option_label || '-'}</td>
      <td className="py-2 px-3">{variant.price != null ? `$${variant.price.toFixed(2)}` : '-'}</td>
      <td className="py-2 px-3">{variant.stock}</td>
      <td className="py-2 px-3 text-right">
        <button type="button" onClick={() => onEdit(variant)} className="p-1 hover:text-primary">
          <Pencil className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => onDelete(variant.id)} className="p-1 hover:text-destructive ml-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

function VariantForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<ProductVariantInput>;
  onSave: (data: ProductVariantInput) => void;
  onCancel: () => void;
}) {
  const [sku, setSku] = useState(initial?.sku || '');
  const [name, setName] = useState(initial?.name || '');
  const [optionLabel, setOptionLabel] = useState(initial?.option_label || '');
  const [price, setPrice] = useState(initial?.price?.toString() || '');

  return (
    <div className="flex items-end gap-2 py-2 border-b">
      <input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" className="flex-1 border rounded px-2 py-1 text-sm" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="flex-1 border rounded px-2 py-1 text-sm" />
      <input value={optionLabel} onChange={(e) => setOptionLabel(e.target.value)} placeholder="Option label" className="flex-1 border rounded px-2 py-1 text-sm" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" step="0.01" className="w-24 border rounded px-2 py-1 text-sm" />
      <button type="button" onClick={() => onSave({ sku, name, option_label: optionLabel || undefined, price: price ? parseFloat(price) : undefined })} className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">Save</button>
      <button type="button" onClick={onCancel} className="px-3 py-1 border rounded text-sm">Cancel</button>
    </div>
  );
}

export function VariantEditor({ productId }: VariantEditorProps) {
  const { data: variants, isLoading } = useVariants(productId);
  const createVariant = useCreateVariant(productId);
  const updateVariant = useUpdateVariant(productId);
  const deleteVariant = useDeleteVariant(productId);

  const [showForm, setShowForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

  const handleSave = (data: ProductVariantInput) => {
    if (editingVariant) {
      updateVariant.mutate({ id: editingVariant.id, data });
    } else {
      createVariant.mutate(data);
    }
    setShowForm(false);
    setEditingVariant(null);
  };

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading variants...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Variants</h4>
        <button type="button" onClick={() => { setShowForm(true); setEditingVariant(null); }} className="flex items-center gap-1 text-sm text-primary hover:underline">
          <Plus className="w-3 h-3" /> Add variant
        </button>
      </div>

      {showForm && (
        <VariantForm
          initial={editingVariant as Partial<ProductVariantInput> | undefined}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingVariant(null); }}
        />
      )}

      {variants && variants.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b">
              <th className="py-1 px-3 font-medium">SKU</th>
              <th className="py-1 px-3 font-medium">Name</th>
              <th className="py-1 px-3 font-medium">Option</th>
              <th className="py-1 px-3 font-medium">Price</th>
              <th className="py-1 px-3 font-medium">Stock</th>
              <th className="py-1 px-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <VariantRow
                key={v.id}
                variant={v}
                onEdit={(variant) => { setEditingVariant(variant); setShowForm(true); }}
                onDelete={(id) => deleteVariant.mutate(id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-xs text-muted-foreground">No variants yet.</p>
      )}
    </div>
  );
}
