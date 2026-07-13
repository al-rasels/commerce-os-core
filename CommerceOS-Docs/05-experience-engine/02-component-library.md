# Component Library

## 1. Principle

One component, many variants — never a new component per visual style. Example: `Hero` supports `variant: modern | luxury | minimal | editorial`, not four separate Hero components. This is the rule that prevents the 150+ component target from becoming 600+ near-duplicates.

## 2. Component Contract (every component must define)

```ts
Component {
  id: string                 // stable registry ID, e.g. "hero.v1"
  props: PropSchema          // typed, validated
  variants: string[]
  responsiveOverrides: bool  // supports per-breakpoint prop overrides
  dataSource: 'static' | 'catalog' | 'cms' | 'custom'
  themeTokensUsed: string[]  // declared, for design-system audit tooling
  a11y: { role, keyboardNav, ariaPattern }
}
```

## 3. Phase 1 Component Set (curated for "from scratch" building)

To support the Page Builder's recursive tree and data-binding architecture, Phase 1 includes both layout primitives and standard eCommerce blocks.

```
Layout Primitives: Flex, Grid, Box, Stack, Container
Atomic Elements:   Text, Heading, Button, Image, Spacer, Divider
Navigation:        Header (minimal, mega-menu, sticky variants), Footer
Hero:              single component, 4 variants
Commerce:          ProductCard, ProductGrid, CartDrawer, CheckoutSummary
Marketing:         Testimonials, Newsletter, FAQ
Content:           RichText, Gallery, Banner
```

~30 components covers a real MVP storefront that can be assembled either via large pre-built sections (Hero) or from scratch (Flex > Image + Heading). Expand toward 150+ only after Phase 1 proves the registry/variant pattern holds under real template pressure (roadmap Phase 2).

## 4. Component Registry (why templates reference IDs, not code)

```
Template JSON → { component: "hero.v1", variant: "luxury", props: {...} }
  → Registry resolves "hero.v1" → actual component implementation
  → Theme tokens applied
  → Rendered
```

Templates never embed component code. This is what makes template updates safe (component bug fixes propagate to every template automatically) and what prevents template-specific forks of shared components.

## 5. Versioning

Breaking prop changes require a new registry ID (`hero.v2`), not a mutation of `hero.v1` — existing templates referencing `hero.v1` must keep rendering identically forever, or merchant customizations silently break.

## 6. Testing Requirement

Every component: unit test (prop→render), visual regression snapshot (per variant), a11y automated check (axe-core or equivalent). No component ships to the registry without all three.
