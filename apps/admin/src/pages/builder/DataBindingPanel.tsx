import { Database, Link2 } from 'lucide-react';
import { type PageNode } from './components/BuilderNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DataBindingPanel({ selectedNode }: { selectedNode: PageNode | null }) {
  if (!selectedNode) return null;

  // Mock available context variables for MVP
  const availableBindings = [
    { label: 'None', value: 'none' },
    { label: 'Product Title', value: 'product.title' },
    { label: 'Product Price', value: 'product.price' },
    { label: 'Product Image', value: 'product.imageUrl' },
    { label: 'Category Name', value: 'category.name' },
  ];

  return (
    <div className="flex flex-col gap-4 border-t pt-6 mt-2">
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4" />
        <h3 className="text-sm font-semibold">Data Binding</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        Connect component properties to dynamic commerce data.
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium flex items-center gap-2">
            <Link2 className="w-3 h-3" /> Content Binding
          </label>
          <Select defaultValue="none">
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select context variable" />
            </SelectTrigger>
            <SelectContent>
              {availableBindings.map(binding => (
                <SelectItem key={binding.value} value={binding.value} className="text-xs">
                  {binding.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
