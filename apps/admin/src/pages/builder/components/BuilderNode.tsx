import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export interface PageNode {
  id: string;
  component: string;
  props: Record<string, any>;
  children?: PageNode[];
}

interface BuilderNodeProps {
  node: PageNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BuilderNode({ node, selectedId, onSelect }: BuilderNodeProps) {
  // A node can be dragged
  const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
    id: node.id,
    data: { type: 'node', node },
  });

  // A node can also have things dropped into it (if it's a layout primitive like flex/grid)
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: node.id,
    data: { type: 'node', node },
  });

  const isSelected = selectedId === node.id;
  
  // Combine refs (dirty hack for basic dnd, ideally you want separate drag handles)
  const setRef = (el: HTMLElement | null) => {
    setDraggableRef(el);
    setDroppableRef(el);
  };

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      className={`
        relative p-4 m-2 border-2 rounded min-h-[50px] bg-background
        ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-dashed border-border hover:border-primary/50'}
        ${isOver ? 'bg-primary/5' : ''}
      `}
    >
      <div className="text-xs font-mono text-muted-foreground absolute top-1 left-2">
        {node.component}
      </div>
      
      {/* Recursively render children if any */}
      <div className="mt-4 flex flex-col gap-2 min-h-[20px]">
        {node.children?.map(child => (
          <BuilderNode
            key={child.id}
            node={child}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
