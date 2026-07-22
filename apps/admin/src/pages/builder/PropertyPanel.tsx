import { sectionSchemas } from '@commerceos/components';
import { PropEditor } from '@/components/page-editor/PropEditor';
import { type PageNode } from './components/BuilderNode';

interface PropertyPanelProps {
  selectedNode: PageNode | null;
  onChange: (key: string, value: any) => void;
}

export function PropertyPanel({ selectedNode, onChange }: PropertyPanelProps) {
  if (!selectedNode) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        Select an element on the canvas to edit its properties.
      </div>
    );
  }

  const schema = sectionSchemas[selectedNode.component];

  if (!schema) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        No schema found for component "{selectedNode.component}".
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold">{schema.name}</h3>
        <p className="text-xs text-muted-foreground">{schema.description}</p>
      </div>
      
      <div className="space-y-4">
        {schema.props.map(propSchema => (
          <PropEditor
            key={propSchema.key}
            schema={propSchema}
            value={selectedNode.props[propSchema.key]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
