# Page Builder

## 1. Scope Decision (Phase 1 vs later)

Phase 1 ships **JSON-driven layouts editable via a structured settings panel** (add/remove/reorder sections, edit props) — not a full drag-and-drop canvas. Drag-and-drop UI is a Phase 2 UX layer on top of the same underlying page-JSON model; the data model doesn't change, only the editing surface.

## 2. Page Model

```json
{
  "page_id": "homepage",
  "sections": [
    { "id": "sec_1", "component": "hero.v1", "variant": "luxury", "props": {...}, "visible": true },
    { "id": "sec_2", "component": "product-grid.v1", "props": { "source": "featured" } }
  ]
}
```

Stored as `template_tenant_override.pageJson` (template engine doc §5). Section `id`s are stable so reordering doesn't lose configuration.

## 3. Builder Architecture (Phase 2 full editor)

```
Section Registry (available blocks) 
  → Drag/Drop Canvas 
  → Property Panel (schema-driven form, generated from Component Registry's PropSchema)
  → Responsive Editor (per-breakpoint prop overrides)
  → History (undo/redo — operational transform on the sections array)
  → Autosave (debounced write to pageJson)
  → Preview (renders against staging tenant context, not production cache)
  → Publish (atomic swap of pageJson version)
```

## 4. Visibility Rules & Personalization (Phase 3)

Section-level `visible` can later become a rule (`visible_if: { segment: "returning_customer" }`) — schema already supports a boolean today, extending to a rule object is additive, not breaking.

## 5. Non-Negotiables

- No page renders with unresolved component references — a missing component ID fails closed (render nothing + log) rather than crashing the whole page.
- Publish is atomic — merchants never see a half-saved layout, even mid-edit on another tab.
- Preview must never write to the same cache key as the live published page.
