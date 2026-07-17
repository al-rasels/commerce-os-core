# Session 07a — Admin Theme Editor

## Objective

Build the admin theme editor UI so merchants can customize their storefront's appearance — colors, typography, spacing, borders, and shadows — with a live preview panel. Overrides are persisted per-tenant via the existing `PUT /api/v1/experience/theme/override` endpoint.

## Dependencies

- Backend: `GET /api/v1/experience/theme` and `PUT /api/v1/experience/theme/override` — DONE
- Design tokens package `@commerceos/design-tokens` — DONE
- Admin app with shadcn/ui, TanStack Query, React Router — DONE

## Files to create/edit

### 1. `apps/admin/src/lib/api/experience.ts` (new)

Theme API client (follow pattern from `catalog.ts`):

```ts
import { api } from './client';

export interface ResolvedTheme {
  version: string;
  tokens: Record<string, unknown>;
  conflicts: string[];
}

export const themeApi = {
  get: () => api.get<ResolvedTheme>('/api/v1/experience/theme'),
  updateOverride: (themeBaseId: string, overridesJson: Record<string, unknown>) =>
    api.put<{ version: string; tokens: Record<string, unknown>; conflicts: string[] }>(
      '/api/v1/experience/theme/override',
      { themeBaseId, overridesJson },
    ),
};
```

### 2. `apps/admin/src/hooks/useTheme.ts` (new)

TanStack Query hooks (follow pattern from `useProducts.ts`):

- `useTheme()` — GET resolved theme
- `useSaveThemeOverride()` — PUT override, invalidates `['theme']`, toast on success/error

```ts
export function useTheme() { ... }
export function useSaveThemeOverride() { ... }
```

### 3. `apps/admin/src/pages/theme/ThemeEditorPage.tsx` (new)

The main editor page. This is the novel component. Structure:

#### Layout (same Card-in-layout pattern as products)

```
+---------------------------------------------------+
| Theme Editor                          [Reset] Save |
+---------------------------------------------------+
|  +------------+  +-----------------------------+  |
|  | Color Mode |  |      Preview Panel          |  |
|  |  [Light]   |  |  (rendered with live        |  |
|  |  [Dark]    |  |   tokens via CSS vars)      |  |
|  |            |  |                             |  |
|  | Colors:    |  |  Header                     |  |
|  |  surface   |  |  ┌────────────────────┐    |  |
|  |  text      |  |  │ Button Button     │    |  |
|  |  primary   |  |  └────────────────────┘    |  |
|  |  accent    |  |                             |  |
|  |  success   |  |  Card in the preview        |  |
|  |  warning   |  |  with text and a button     |  |
|  |  error     |  |                             |  |
|  |            |  |                             |  |
|  | Typography |  |                             |  |
|  |  ...       |  |                             |  |
|  |            |  |                             |  |
|  | Spacing    |  |                             |  |
|  |  ...       |  |                             |  |
|  +------------+  +-----------------------------+  |
+---------------------------------------------------+
```

#### Editor Panel (left side, scrollable)

Sections using `Card` components, each collapsible with `disclosure` pattern:

**a) Color Mode Toggle**
- `Tabs` component with "Light" / "Dark" tabs — live-switches which color set is shown in the color section AND in the preview

**b) Colors** (visible colors for the current mode tab)
- 10 color inputs, each as a `Label` + native `<input type="color">` pair in a flex row
- Show hex value in a text Input next to the color picker so users can type exact values
- Color list: `surface`, `surfaceMuted`, `text`, `textMuted`, `border`, `primary`, `primaryContrast`, `accent`, `accentContrast`, `success`, `successContrast`, `warning`, `warningContrast`, `error`, `errorContrast`
- Swatch: a small square showing current color, updates live on change

**c) Typography**
- Font families: 3 text inputs (sans, mon, heading)
- Font size scale: a compact table with label + pixel readout + number input
- Font weights: small grid of select dropdowns
- Line heights, letter spacings: small number inputs

**d) Spacing**
- Compact table: key pairs (16 items) with number inputs

**e) Radii**
- 7 radius inputs with a visual square preview showing the border-radius effect

**f) Shadows**
- 6 shadow inputs with text inputs for the shadow value

#### Preview Panel (right side, sticky)

A self-contained preview that re-renders when any token changes:

- Uses CSS custom properties injected via inline style on the preview container
- Maps DesignToken keys to CSS vars: `--color-surface`, `--color-primary`, `--font-sans`, `--radius-md`, etc.
- Renders sample UI elements:
  - Nav bar (dark primary bg + white text + accent button)
  - Hero section (large heading, body text, CTA buttons — primary + outline)
  - Cards grid (3 cards with shadow, border, radius, text)
  - Form elements (input, label, button pair)
  - Alert badges (success, warning, error)
  - Badge/pill components
- Preview area should have a subtle inner border to distinguish it from live environment

#### Conflict Warning

If `conflicts` array is non-empty from the API response, show a warning banner at the top:
> ⚠ "Some overrides reference tokens that don't exist in the base theme: colors.customBrand, spacing.extra" etc.

#### State Management

- Keep local `draftOverride` state as a partial `DesignTokens` object
- On mount, fetch theme and initialize `draftOverride` from existing overrides (empty object = using base theme)
- All editor controls mutate `draftOverride`
- "Save" button calls `useSaveThemeOverride` with `draftOverride` as `overridesJson` — serializes to JSON
- "Reset" button clears `draftOverride` to `{}` and saves immediately (merchant wants to go back to base theme)

### 4. `apps/admin/src/App.tsx` (edit)

Add route: `<Route path="theme" element={<ThemeEditorPage />} />`

Also add a "Theme" navigation link in `AdminLayout.tsx`.

## Implementation Order

1. Create `lib/api/experience.ts`
2. Create `hooks/useTheme.ts`
3. Create `ThemeEditorPage.tsx` — start with colors section + preview, then add typography/spacing/radii/shadows
4. Register route in `App.tsx` and nav link in `AdminLayout.tsx`
5. Test: load the page, verify theme loads, change a color, save, refresh — override should persist

## Verification

1. Navigate to `/theme` — editor loads with current theme tokens
2. Change `colors.light.primary` via the color picker — preview panel updates live
3. Switch to "Dark" mode tab — dark color set shows, preview switches to dark mode
4. Change font family in typography — preview text updates
5. Click Save — toast "Theme saved", refresh page — values persist
6. Click Reset — all overrides cleared, preview reverts to base theme
7. Re-navigate back after reset — values match base theme defaults
