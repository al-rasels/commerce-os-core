import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { PropertyPanel } from './PropertyPanel';
import { DataBindingPanel } from './DataBindingPanel';
import { ResponsiveEditor } from './ResponsiveEditor';
import { BuilderNode, type PageNode } from './components/BuilderNode';
import { DraggableElement } from './components/DraggableElement';

export default function PageBuilder() {
  const [nodes, setNodes] = useState<PageNode[]>([
    {
      id: 'root-1',
      component: 'flex.v1',
      props: { direction: 'column' },
      children: []
    }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Helper to find a node by ID recursively
  const findNode = (nodesList: PageNode[], id: string): PageNode | null => {
    for (const node of nodesList) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedNode = selectedNodeId ? findNode(nodes, selectedNodeId) : null;

  const handleNodeChange = (key: string, value: any) => {
    if (!selectedNodeId) return;
    setNodes(prev => {
      const updateNode = (nodesList: PageNode[]): PageNode[] => {
        return nodesList.map(node => {
          if (node.id === selectedNodeId) {
            return { ...node, props: { ...node.props, [key]: value } };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prev);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === 'new_element') {
      // Handle dropping a new element from the sidebar
      const componentKey = active.data.current.componentKey;
      const newNode: PageNode = {
        id: crypto.randomUUID(),
        component: componentKey,
        props: {},
        children: []
      };

      // Simple implementation: just append to root for now
      // A robust implementation requires traversing the tree to find the `over.id` node
      // and appending the new node to its children.
      setNodes(prev => {
        const traverse = (currentNodes: PageNode[]): PageNode[] => {
          return currentNodes.map(node => {
            if (node.id === over.id) {
              return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
              return { ...node, children: traverse(node.children) };
            }
            return node;
          });
        };
        return traverse(prev);
      });
    }
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar: Components */}
      <div className="w-64 border-r flex flex-col bg-card">
        <div className="p-4 border-b font-medium">Elements</div>
        <div className="p-4 flex-1 overflow-y-auto">
          <DraggableElement componentKey="heading.v1" label="Heading" />
          <DraggableElement componentKey="text.v1" label="Text Block" />
          <DraggableElement componentKey="button.v1" label="Button" />
          <DraggableElement componentKey="image.v1" label="Image" />
          <DraggableElement componentKey="flex.v1" label="Flex Container" />
          <DraggableElement componentKey="grid.v1" label="Grid Layout" />
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
              {nodes.map(node => (
                <BuilderNode 
                  key={node.id} 
                  node={node} 
                  selectedId={selectedNodeId} 
                  onSelect={setSelectedNodeId} 
                />
              ))}
            </DndContext>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Property & Data Binding Panel */}
      <div className="w-80 border-l flex flex-col bg-card">
        <div className="p-4 border-b font-medium">Properties</div>
        <div className="p-4 flex flex-col gap-6 overflow-y-auto flex-1">
          <PropertyPanel selectedNode={selectedNode} onChange={handleNodeChange} />
          <DataBindingPanel selectedNode={selectedNode} />
        </div>
      </div>
    </div>
  );
}
