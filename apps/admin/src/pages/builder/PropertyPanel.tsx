export function PropertyPanel({ selectedNodeId }: { selectedNodeId: string | null }) {
  if (!selectedNodeId) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        Select a component to edit its properties.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Component Settings</h3>
      {/* Dynamic schema-driven form will go here */}
      <div className="text-sm">Editing: {selectedNodeId}</div>
    </div>
  );
}
