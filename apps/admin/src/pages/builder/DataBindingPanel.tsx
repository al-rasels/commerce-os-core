import { Database } from 'lucide-react';

export function DataBindingPanel({ selectedNodeId }: { selectedNodeId: string | null }) {
  if (!selectedNodeId) return null;

  return (
    <div className="flex flex-col gap-4 border-t pt-6 mt-2">
      <div className="flex items-center gap-2">
        <Database className="w-4 h-4" />
        <h3 className="text-sm font-semibold">Data Binding</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        Connect component properties to dynamic commerce data like product titles or prices.
      </p>
      {/* Data binding selection interface will go here */}
    </div>
  );
}
