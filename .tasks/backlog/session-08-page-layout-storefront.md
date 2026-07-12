# Session 8 — Page Layout + Storefront Rendering

## Status: BACKLOG

## Dependencies
- [ ] Session 6 — Design Tokens + Components
- [ ] Session 7 — Theme Engine

## Objective
Admin edits a homepage via settings-panel UI, storefront reflects changes after publish.

## Key Deliverables
- Page JSON shape: `{ sections: [{ id, component, variant, props, visible }] }`
- Admin settings-panel UI: add/remove/reorder sections, edit props via schema-driven forms
- Storefront renderer: fetch published `sections_json`, resolve component IDs against registry, render
- Publish = atomic write to `sections_json` + `published_at`
