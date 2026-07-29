import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function DraggableElement({ componentKey, label }: { componentKey: string, label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `new-${componentKey}`,
    data: { type: 'new_element', componentKey },
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-2 p-2 border rounded bg-background shadow-sm cursor-grab hover:border-primary transition-colors mb-2"
    >
      <GripVertical className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
