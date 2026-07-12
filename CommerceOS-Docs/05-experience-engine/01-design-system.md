# Design System (Foundation Layer)

Never customized directly by merchants — every component and theme consumes these tokens. This is what keeps every storefront "on-brand for the platform" while still looking distinct per tenant.

## 1. Token Categories

```
spacing:      8-point scale (4, 8, 12, 16, 24, 32, 48, 64, 96)
typography:   scale (xs, sm, base, lg, xl, 2xl, 3xl, 4xl) + font-family slots (heading/body)
color:        semantic tokens (primary, secondary, accent, surface, text, border, success, warning, danger)
  — NOT raw hex in components; components reference `color.primary`, tenant theme resolves the hex
radius:       none / sm / md / lg / full
shadow:       none / sm / md / lg (elevation scale)
grid:         12-column, responsive breakpoints (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536)
motion:       duration tokens (fast 150ms / base 250ms / slow 400ms) + easing curves
icons:        single icon set, consistent stroke width
```

## 2. Token Resolution Chain

```
Design System (base tokens, platform-owned, immutable)
  → Theme (tenant-selected palette/typography mapped onto semantic tokens)
    → Component (consumes semantic tokens only, never hardcoded values)
      → Rendered Storefront
```

A component that hardcodes a hex color or a pixel spacing value is a bug — reject in review.

## 3. Accessibility Rules (baseline, enforced not optional)

- Minimum contrast ratio 4.5:1 for text (checked against resolved theme colors, not just base tokens — a bad merchant color choice must be flagged, not silently allowed)
- All interactive components keyboard-navigable, focus-visible states from the token set (not browser default)
- Motion respects `prefers-reduced-motion`

## 4. Governance

Only the **Design System Team** (or equivalent single owner) can add/modify base tokens. Component authors and template designers consume tokens — they don't invent new ones ad hoc, or the system fragments (this is the failure mode Doc 3 explicitly warns against).
