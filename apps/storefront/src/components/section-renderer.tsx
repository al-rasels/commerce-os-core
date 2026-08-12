import React from 'react';
import { componentRegistry, type ComponentRegistryKey } from '@commerceos/components';
import { ProductClient } from '@/app/products/[slug]/product-client';
import {
  evaluateRules,
  resolveDataPath,
  type BuilderNode,
} from '@commerceos/shared-types';

// Local registry for storefront-specific components
const localRegistry: Record<string, { component: React.ComponentType<any> }> = {
  'product-details.v1': { component: ProductClient as React.ComponentType<any> },
};

type SectionRendererProps = {
  nodes: (BuilderNode | any)[];
  dataContext?: Record<string, unknown>;
};

// Resolve "$bind" props (e.g. { $bind: "product.title" }) against the data context
function resolveProps(
  props: Record<string, unknown> = {},
  dataContext: Record<string, unknown> = {},
): Record<string, unknown> {
  const resolved = { ...props };
  for (const [key, value] of Object.entries(resolved)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      (value as { $bind?: string }).$bind
    ) {
      resolved[key] = resolveDataPath(
        (value as { $bind: string }).$bind,
        dataContext,
      );
    }
  }
  return resolved;
}

export function SectionRenderer({ nodes, dataContext = {} }: SectionRendererProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <>
      {nodes.map((node) => {
        // Honor `visible: false` and evaluate dynamic visibility rules
        if (!evaluateRules(node, dataContext)) return null;

        const registryEntry =
          localRegistry[node.component] ||
          componentRegistry[node.component as ComponentRegistryKey];

        if (!registryEntry) {
          console.warn(
            `Component "${node.component}" not found in registry. Failing closed (skipping render).`,
          );
          return null;
        }

        const Component = registryEntry.component;
        const resolvedProps = resolveProps(node.props, dataContext);

        const deviceTarget = node.props?.deviceTarget || 'all';
        let deviceClass = '';
        if (deviceTarget === 'desktop') deviceClass = 'hidden md:block';
        if (deviceTarget === 'mobile') deviceClass = 'block md:hidden';

        const customStyles = node.options?.styles || {};
        const inlineStyles = {
          paddingTop: customStyles.paddingTop || undefined,
          paddingBottom: customStyles.paddingBottom || undefined,
          backgroundColor: customStyles.backgroundColor || undefined,
        };
        const customClass = customStyles.customCssClass || '';

        return (
          <div key={node.id} className={`${deviceClass} ${customClass}`.trim() || undefined} style={inlineStyles}>
            <Component {...resolvedProps}>
              {node.children && node.children.length > 0 && (
                <SectionRenderer nodes={node.children} dataContext={dataContext} />
              )}
            </Component>
          </div>
        );
      })}
    </>
  );
}
