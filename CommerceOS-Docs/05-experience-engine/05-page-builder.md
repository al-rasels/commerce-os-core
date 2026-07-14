# Page Builder Architecture

## 1. Scope Decision (Phase 1 vs later)

Phase 1 ships **JSON-driven recursive layouts editable via a structured settings panel** (add/remove/nest components, edit props) — not a full drag-and-drop canvas. Drag-and-drop UI is a Phase 2 UX layer on top of the same underlying page-JSON model; the data model doesn't change, only the editing surface.

## 2. Page Model (Recursive Component Tree)

**Competitive Context:** Traditional platforms like Shopify use a "Sections Everywhere" approach (a flat array of sections) which prevents infinite nesting. BigCommerce uses "Regions" which are rigidly hardcoded into themes. CommerceOS uses a **Recursive Component Tree**, similar to Webflow. This allows layout primitives (Flex, Grid) to deeply nest atomic components (Text, Image) without being restricted by the theme's hardcoded constraints.

To support this "building websites from scratch" paradigm, the page structure is a recursive tree of `nodes`:

### 2.1 Dynamic Routing Engine (Headless Storefront URLs)
Custom storefronts need custom URL slugs. We utilize Next.js Catch-All routes (`[...slug].tsx`). The route resolves the URL path dynamically against the API to determine if `/summer-sale` renders a Category, a custom Page, or a Product, rendering the corresponding `page_layout` JSON.

```json
{
  "page_id": "homepage",
  "nodes": [
    { 
      "id": "node_1", 
      "component": "flex.v1", 
      "props": { "direction": "column", "gap": "16px" }, 
      "children": [
        { 
          "id": "node_2", 
          "component": "heading.v1", 
          "props": { "text": "Welcome to our store", "tag": "h1" } 
        },
        { 
          "id": "node_3", 
          "component": "product-grid.v1", 
          "props": { "source": "featured" } 
        }
      ]
    }
  ]
}
```

Stored as `template_tenant_override.pageJson` (template engine doc §5). Node `id`s are stable so reordering doesn't lose configuration.

## 3. Data Binding Protocol (Context Injection)

Because atomic components (like `Text` or `Image`) are generic, they must be able to bind to dynamic commerce data.

```json
{ 
  "id": "node_4", 
  "component": "text.v1", 
  "props": { 
    "content": { "$bind": "product.title" } 
  } 
}
```
During SSR, the Storefront Engine resolves `{ "$bind": "context_path" }` against the current page's Data Context (e.g., the current Product being viewed) before passing the prop to the React component.

## 4. Builder Architecture (Phase 2 full editor)

```
Section/Element Registry (available blocks & primitives) 
  → Drag/Drop Canvas 
  → Property Panel (schema-driven form, generated from Component Registry's PropSchema)
  → Data Binding Panel (allows users to select context variables to bind to props)
  → Responsive Editor (per-breakpoint prop overrides)
  → History (undo/redo — operational transform on the nodes tree)
  → Autosave (debounced write to pageJson)
  → Preview (renders against staging tenant context, not production cache)
  → Publish (atomic swap of pageJson version)
```

## 5. Monetization & Premium Assets (Phase 2)

To support premium business models, the builder enforces a "Live Preview but Gated Publish" workflow for premium components and templates:
- **Premium Components:** Defined in the Component Registry with a `minPlan` requirement (e.g., `"minPlan": "pro"`).
- **Premium Templates:** A template is considered premium if its pre-saved JSON tree contains any premium components.
- **Workflow (Live Preview):** Merchants on lower tiers can freely load and interact with premium templates in the builder using their real staging data, maximizing upsell potential.
- **Workflow (Gated Publish):** The `PUT /api/v1/experience/page-layout` endpoint strictly validates the incoming JSON against the `TenantContext.plan`. If unauthorized components are present, the API rejects the request with a `403 Forbidden`, prompting the UI to show an upgrade modal.

## 6. Visibility Rules & Personalization (Phase 3)

Node-level `visible` can later become a rule (`visible_if: { segment: "returning_customer" }`).

## 7. Non-Negotiables

- No page renders with unresolved component references — a missing component ID fails closed (render nothing + log) rather than crashing the whole page.
- Context injection is strictly isolated. A tenant cannot bind to another tenant's data variables.
- Publish is atomic — merchants never see a half-saved layout, even mid-edit on another tab.
- Preview must never write to the same cache key as the live published page.
