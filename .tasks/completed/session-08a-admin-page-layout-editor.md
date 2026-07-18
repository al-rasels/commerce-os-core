# Session 08a — Admin UI: Page Layout Editor

## Status: NEXT

## Dependencies
- [x] Session 8 — Page Layout API (completed — backend CRUD in `apps/api`)
- [ ] Session 06a — Storefront Components Library (for section component registry)

## Objective
Build the admin settings-panel UI for editing page layouts — add/remove/reorder sections, edit props via schema-driven forms, and publish changes.

## Deliverables
- [ ] Page layout editor for each page key (homepage, category, product, checkout)
- [ ] Section list with drag-to-reorder
- [ ] Add section panel (pick from registered component registry)
- [ ] Schema-driven inline prop editor for each section
- [ ] Toggle visibility per section
- [ ] Publish / unpublish buttons
- [ ] Preview indicator showing published vs. draft state

## Acceptance Criteria
- [ ] Adding a section to homepage and publishing reflects on save
- [ ] Removing a section hides it from the published page
- [ ] Prop edits persist correctly in `sections_json`
- [ ] Missing/invalid component IDs are marked with a warning badge (not crash)
- [ ] Draft changes never affect the published "page" without explicit publish

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
