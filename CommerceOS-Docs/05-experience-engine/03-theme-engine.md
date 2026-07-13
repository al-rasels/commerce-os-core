# Theme Engine

## 1. Purpose

Maps merchant-facing settings (brand color, font choice, corner radius, button style) onto Design System semantic tokens, without merchants ever touching raw CSS.

## 2. Data Model (ties to database doc §5)

```
theme_base (platform, versioned)      — default token mapping
theme_tenant_override (tenant-owned)  — merchant's chosen values
resolved_theme = deepMerge(theme_base.tokens, theme_tenant_override.overrides)
```

## 3. Merchant-Facing Settings Surface

```
Brand colors (primary/secondary/accent)
Typography (heading/body font pair, from a curated licensed set — not arbitrary uploads at Phase 1)
Corner radius (sharp / rounded / pill)
Shadow intensity (flat / soft / elevated)
Button style (solid / outline / ghost defaults)
Layout width (contained / full-bleed)
Animation intensity (none / subtle / expressive)
Header/footer behavior (sticky, transparent-on-hero, etc.)
```

Each setting writes to `theme_tenant_override.overrides_json` — never a new column, so the schema doesn't grow per setting added.

## 4. Rendering (Dynamic SSR CSS Variables)

Theme resolution happens once per tenant, cached (`tenantId:theme:resolved`), invalidated on any override write. 

To ensure instantaneous rendering and high Lighthouse scores, the Storefront renderer injects the resolved theme as a `<style>` block containing CSS Custom Properties (`:root { --color-primary: #hex; ... }`) in the SSR head. Components use standard `var(--color-primary)` instead of JS runtime styling (e.g., styled-components). This guarantees zero UI flicker and no build-step required when a merchant changes a color.

## 5. Dark Mode / Multi-Palette (Phase 2)

Token structure already supports a `mode` dimension (`tokens.light`, `tokens.dark`) — not built in Phase 1, but the schema doesn't need to change to add it later.

## 6. Theme Export/Import & Marketplace (Phase 4)

`theme_tenant_override.overrides_json` is portable JSON by design — export is a direct dump, import is a validate-and-merge. This makes a future theme marketplace a distribution problem, not an architecture problem.
