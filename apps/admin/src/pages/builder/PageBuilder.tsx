import { useState } from 'react';
import { toast } from 'sonner';
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
    } else if (active.data.current?.type === 'node') {
      // Handle moving an existing node
      if (active.id === over.id) return; // Dropped on itself

      setNodes(prev => {
        let draggedNode: PageNode | null = null;

        // 1. Find and remove the dragged node from its current position
        const removeNode = (nodesList: PageNode[]): PageNode[] => {
          const list = [...nodesList];
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === active.id) {
              draggedNode = list[i];
              list.splice(i, 1);
              return list;
            }
            if (list[i].children) {
              const updatedChildren = removeNode(list[i].children!);
              if (draggedNode) {
                 list[i] = { ...list[i], children: updatedChildren };
                 return list;
              }
            }
          }
          return list;
        };

        const intermediateState = removeNode(prev);
        if (!draggedNode) return prev; // Safety check

        // 2. Insert the dragged node into the new parent container
        const insertNode = (nodesList: PageNode[]): PageNode[] => {
          return nodesList.map(node => {
            if (node.id === over.id) {
              return { ...node, children: [...(node.children || []), draggedNode!] };
            }
            if (node.children) {
              return { ...node, children: insertNode(node.children) };
            }
            return node;
          });
        };

        return insertNode(intermediateState);
      });
    }
  }

  const [isPublishing, setIsPublishing] = useState(false);
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Mock API call for MVP. In reality, POST `nodes` to the backend layout endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Page layout published successfully!");
    } catch (err) {
      toast.error("Failed to publish page layout.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar: Components */}
      <div className="w-64 border-r flex flex-col bg-card">
        <div className="p-4 border-b font-medium">Elements</div>
        <div className="p-4 flex-1 overflow-y-auto space-y-6">
          
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">E-Commerce Sections</h3>
            <div className="space-y-1">
              <DraggableElement componentKey="hero.v1" label="Hero Banner" />
              <DraggableElement componentKey="product-grid.v1" label="Featured Products" />
              <DraggableElement componentKey="gallery.v1" label="Image Gallery" />
              <DraggableElement componentKey="testimonials.v1" label="Testimonials" />
              <DraggableElement componentKey="newsletter.v1" label="Newsletter" />
              <DraggableElement componentKey="faq.v1" label="FAQ Section" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Basic Layouts</h3>
            <div className="space-y-1">
              <DraggableElement componentKey="flex.v1" label="Flex Container" />
              <DraggableElement componentKey="grid.v1" label="Grid Layout" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primitives</h3>
            <div className="space-y-1">
              <DraggableElement componentKey="heading.v1" label="Heading" />
              <DraggableElement componentKey="text.v1" label="Text Block" />
              <DraggableElement componentKey="button.v1" label="Button" />
              <DraggableElement componentKey="image.v1" label="Image" />
            </div>
          </div>

        </div>
      </div>

      {/* Center: Visual Canvas */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b flex items-center px-4 justify-between bg-card">
          <ResponsiveEditor />
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="text-sm font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded disabled:opacity-50"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
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
