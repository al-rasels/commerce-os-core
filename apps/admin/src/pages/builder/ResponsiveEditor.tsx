import { Monitor, Tablet, Smartphone } from 'lucide-react';

export function ResponsiveEditor() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-2">Preview:</span>
      <div className="flex border rounded overflow-hidden">
        <button className="px-3 py-1.5 bg-muted/50 hover:bg-muted" aria-label="Desktop">
          <Monitor className="h-4 w-4" />
        </button>
        <button className="px-3 py-1.5 hover:bg-muted" aria-label="Tablet">
          <Tablet className="h-4 w-4" />
        </button>
        <button className="px-3 py-1.5 hover:bg-muted" aria-label="Mobile">
          <Smartphone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
