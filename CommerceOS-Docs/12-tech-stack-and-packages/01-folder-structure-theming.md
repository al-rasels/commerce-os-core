# Folder Structure & Theming (Light/Dark Mode)

## 1. Full Monorepo Structure

```
commerceos/
├── apps/
│   ├── api/                      NestJS backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── platform/       (tenant, auth, rbac, billing, flags)
│   │   │   │   ├── commerce/       (catalog, cart, orders, checkout)
│   │   │   │   ├── experience/     (theme, template, pages)
│   │   │   │   ├── business/       (empty scaffold — Phase 3)
│   │   │   │   └── intelligence/   (empty scaffold — Phase 4)
│   │   │   ├── common/             (guards, interceptors, decorators, pipes)
│   │   │   ├── database/           (migrations, seeds)
│   │   │   └── main.ts
│   │   └── test/
│   │
│   ├── storefront/                Next.js (tenant-facing, SSR)
│   │   ├── app/
│   │   │   ├── [locale]/           (i18n routing, Phase 2)
│   │   │   ├── layout.tsx           (ThemeProvider wraps here)
│   │   │   └── globals.css          (CSS variable definitions, light+dark)
│   │   ├── components/              (storefront-specific composition only;
│   │   │                             shared components come from packages/components)
│   │   └── lib/
│   │
│   └── admin/                      React + Vite (merchant/staff dashboard)
│       ├── src/
│       │   ├── routes/
│       │   ├── features/           (catalog, orders, theme-editor, page-builder, billing)
│       │   └── lib/
│       └── ...
│
├── packages/
│   ├── design-tokens/               Platform-owned base tokens (light + dark)
│   │   ├── tokens.light.json
│   │   ├── tokens.dark.json
│   │   └── build/                    (style-dictionary output: CSS vars, TS, Tailwind config)
│   │
│   ├── components/                  Shared component registry (storefront + admin)
│   │   ├── src/
│   │   │   ├── hero/
│   │   │   ├── product-card/
│   │   │   ├── header/
│   │   │   └── ...
│   │   └── registry.ts              (component ID → implementation map)
│   │
│   ├── theme-engine/                 merge logic (theme_base + tenant override), shared by API + frontends
│   │
│   ├── shared-types/                  TS types/DTOs shared across apps (generated or hand-kept in sync)
│   │
│   ├── ui-config/                     Tailwind preset, ESLint config, tsconfig base
│   │
│   └── sdk-client/                    Typed API client (generated from OpenAPI, Phase 2+)
│
├── infra/                             Docker, CI configs, IaC (Phase 2+)
├── docs/                              This documentation set
├── turbo.json
└── package.json
```

## 2. Why This Shape

- `packages/design-tokens` and `packages/components` are consumed by **both** `storefront` and `admin` — one visual language, one place to fix bugs (per component library doc §1).
- `packages/theme-engine` is shared so the merge logic (`theme_base` + `tenant override`) is identical whether resolved server-side (API, for SSR) or client-side (admin theme editor preview) — no logic duplication/drift.
- `apps/*/components` only contains **composition** (arranging shared components into a specific page), never new base components — if something reusable emerges there, promote it to `packages/components`.

## 3. Light/Dark Mode Architecture

### Token structure (extends design system doc §1)

```json
// packages/design-tokens/tokens.light.json
{
  "color": {
    "surface": "#ffffff",
    "surfaceMuted": "#f5f5f5",
    "text": "#111111",
    "textMuted": "#555555",
    "border": "#e2e2e2",
    "primary": "{tenant.primary}",
    "primaryContrast": "#ffffff"
  }
}
```
```json
// packages/design-tokens/tokens.dark.json
{
  "color": {
    "surface": "#0f0f0f",
    "surfaceMuted": "#1a1a1a",
    "text": "#f5f5f5",
    "textMuted": "#a0a0a0",
    "border": "#2a2a2a",
    "primary": "{tenant.primary}",
    "primaryContrast": "#111111"
  }
}
```

Semantic token **names** are identical across modes — only values differ. Components never branch on mode; they just consume `color.surface`, `color.text`, etc., and the active CSS variable set determines the result. This is what makes dark mode "free" for every component built correctly.

### Resolution chain (extends theme-engine doc)

```
design-tokens (light.json / dark.json, platform base)
  → theme_base (tenant's chosen palette mapped onto both light+dark token sets)
    → theme_tenant_override (tenant's brand color, etc. — applied to both modes)
      → mode selector (system / light / dark, user or tenant default)
        → CSS variables injected at runtime
```

### Implementation

- Compile tokens to CSS custom properties via **Style Dictionary**: `--color-surface`, `--color-text`, etc., scoped under `[data-theme="light"]` and `[data-theme="dark"]` attribute selectors.
- Storefront: `next-themes` sets `data-theme` on `<html>`, respects `prefers-color-scheme`, persists user choice (cookie, not localStorage — SSR needs to read it before first paint to avoid flash-of-wrong-theme).
- Admin: same pattern, independent of storefront's mode (a merchant's dashboard preference is not a customer's storefront preference).
- Tenant-level default: `theme_tenant_override` can set `defaultMode: "light" | "dark" | "system"` — a merchant can force their storefront to one mode if brand requires it, while still allowing per-visitor override unless `allowModeToggle: false`.

### Database addition (extends database doc)

```sql
-- add to theme_tenant_override.overrides_json, no new table needed:
{
  "defaultMode": "system",
  "allowModeToggle": true,
  "colorOverrides": { "primary": "#1a1a2e" }
}
```

No schema change required — this is exactly why the JSONB override pattern was chosen (database doc §5).

### Component contract addition

Component library doc's `themeTokensUsed` declaration now implicitly covers both modes automatically, since token *names* don't change — a component audited for token-only usage is dark-mode-safe by construction, no separate dark-mode audit needed.

## 4. Non-Negotiable

Never hardcode a color that isn't a token reference, and never write `if (mode === 'dark')` inside a component. If a component needs different behavior (not just color) per mode, that's a design system gap — raise it, don't patch around it locally.
