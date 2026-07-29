# Session 08a — Admin UI: Page Layout Editor

## Status: NEXT

## Dependencies

- [x] Session 8 — Page Layout API (completed — backend CRUD in `apps/api`)
- [x] Session 06a — Storefront Components Library (for section component registry)

## Objective

Build the admin settings-panel UI for editing page layouts — add/remove/reorder sections, edit props via schema-driven forms, and publish changes.

## Deliverables

- [x] Page layout editor for each page key (homepage, category, product, checkout)
- [x] Section list with drag-to-reorder
- [x] Add section panel (pick from registered component registry)
- [x] Schema-driven inline prop editor for each section
- [x] Toggle visibility per section
- [x] Publish / unpublish buttons
- [x] Preview indicator showing published vs. draft state

## Acceptance Criteria

- [x] Adding a section to homepage and publishing reflects on save
- [x] Removing a section hides it from the published page
- [x] Prop edits persist correctly in `sections_json`
- [x] Missing/invalid component IDs are marked with a warning badge (not crash)
- [x] Draft changes never affect the published "page" without explicit publish

## Files to Touch

- `apps/admin/src/pages/settings/pages.tsx` — page layout list
- `apps/admin/src/pages/settings/pages/[key].tsx` — editor for specific page
- `apps/admin/src/components/page-editor/` — SectionList, SectionCard, AddSectionPanel, PropEditor
- `apps/admin/src/lib/api/pages.ts` — API client for page layout endpoints
- `packages/components/registry.ts` — component registry reference

## Notes

- Backend page endpoints exist at `/api/pages`
- Section schema defines which props each component accepts (type, default, label)
- Drag-and-drop can use `@dnd-kit/core` for reorder
