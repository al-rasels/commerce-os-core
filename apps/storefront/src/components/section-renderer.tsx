import React from 'react';
import { componentRegistry, type ComponentRegistryKey } from '@commerceos/components';
import { ProductClient } from '@/app/products/[slug]/product-client';

type Node = {
  id: string;
  component: string;
  props?: Record<string, any>;
  children?: Node[];
};

type SectionRendererProps = {
  nodes: Node[];
  dataContext?: Record<string, any>;
};

// Local registry for storefront-specific components that can't be in the generic @commerceos/components package
const localRegistry: Record<string, { component: React.ComponentType<any> }> = {
  'product-details.v1': { component: ProductClient as React.ComponentType<any> },
};

// Helper to resolve "$bind" variables via lodash-like 'get'
function resolveBind(path: string, obj: any): any {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function resolveProps(props: Record<string, any> = {}, dataContext: Record<string, any> = {}): Record<string, any> {
  const resolved = { ...props };
  for (const [key, value] of Object.entries(resolved)) {
    if (value && typeof value === 'object' && value['$bind']) {
      resolved[key] = resolveBind(value['$bind'], dataContext);
    }
  }
  return resolved;
}

export function SectionRenderer({ nodes, dataContext = {} }: SectionRendererProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <>
      {nodes.map((node) => {
        const registryEntry = localRegistry[node.component] || componentRegistry[node.component as ComponentRegistryKey];
        
        if (!registryEntry) {
          console.warn(`Component "${node.component}" not found in registry. Failing closed (skipping render).`);
          return null;
        }
        
        const Component = registryEntry.component;
        const resolvedProps = resolveProps(node.props, dataContext);

        // Render children recursively if any exist
        return (
          <Component key={node.id} {...resolvedProps}>
            {node.children && node.children.length > 0 && (
              <SectionRenderer nodes={node.children} dataContext={dataContext} />
            )}
          </Component>
        );
      })}
    </>
  );
}
