import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PropertyPanel } from './PropertyPanel';
import { DataBindingPanel } from './DataBindingPanel';
import { ResponsiveEditor } from './ResponsiveEditor';

export default function PageBuilder() {
  const [nodes] = useState<any[]>([]); // Recursive node tree
  const [selectedNodeId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    // Implement recursive tree drop logic here
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar: Components */}
      <div className="w-64 border-r flex flex-col bg-card">
        <div className="p-4 border-b font-medium">Elements</div>
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Elements to drag into canvas */}
        </div>
      </div>

      {/* Center: Visual Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b flex items-center px-4 justify-between bg-card">
          <ResponsiveEditor />
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium px-3 py-1.5 border rounded">Preview</button>
            <button className="text-sm font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded">Publish</button>
          </div>
        </div>
        <div className="flex-1 bg-muted/30 p-8 overflow-y-auto relative">
          <div className="max-w-5xl mx-auto min-h-[500px] bg-background border shadow-sm rounded-md p-4">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={nodes.map((n) => n.id)} strategy={verticalListSortingStrategy}>
                {/* Render recursive nodes here */}
                <div />
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Property & Data Binding Panel */}
      <div className="w-80 border-l flex flex-col bg-card">
        <div className="p-4 border-b font-medium">Properties</div>
        <div className="p-4 flex flex-col gap-6 overflow-y-auto flex-1">
          <PropertyPanel selectedNodeId={selectedNodeId} />
          <DataBindingPanel selectedNodeId={selectedNodeId} />
        </div>
      </div>
    </div>
  );
}
