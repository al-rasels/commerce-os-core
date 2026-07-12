# Session 7 — Theme Engine

## Status: BACKLOG

## Dependencies
- [ ] Session 6 — Design Tokens + Components

## Objective
Tenant-level theme overrides work without touching platform defaults. Cache resolved themes per tenant, invalidate on override write.

## Key Deliverables
- Seed one `theme_base` row (default token set from Session 6)
- Build merge function using `packages/theme-engine` `resolveOverride()`
- Cache resolved theme per tenant (`tenantId:theme:resolved`), invalidate on write
- Simple admin UI: color pickers / font selectors writing to `overrides_json`
