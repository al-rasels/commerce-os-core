# Template Engine

## 1. Principle

Templates contain **zero business logic** — only layout, component arrangement, default config, and sample content. Business logic always lives in the platform/commerce modules.

## 2. Template Package Structure

```
template/
├── manifest.json       (id, name, version, author, category, compatible_platform_version, dependencies)
├── theme.json           (default theme_base tokens for this template)
├── homepage.json         } page layouts — each is an ordered array of
├── category.json         } { component: "id", variant, props } blocks
├── product.json           } referencing the Component Registry
├── checkout.json
├── preview.png / thumbnail.png
└── version.json
```

## 3. Rendering Flow

```
Tenant → installed template_id → page JSON (homepage/category/product/...)
  → Component Registry resolves each block's component ID
  → Theme tokens (theme_base + tenant overrides) applied
  → Merchant page-level overrides applied (see §5)
  → Store Renderer → final HTML
```

## 4. Template Inheritance

```
Base Template
  ├── Fashion
  ├── Grocery
  ├── Electronics
  ├── Pharmacy
  └── Furniture
```

Industry templates extend a base (shared header/footer/checkout patterns), overriding only what's industry-specific (hero style, product grid density). Base-level fixes propagate to children where not overridden.

## 5. Safe Updates (the override-preservation mechanism)

Identical pattern to Theme Engine:
```
template_base (platform, versioned)
template_tenant_override (tenant's page-level edits: reordered sections, swapped components, custom content)
rendered_page = merge(template_base.pageJson, template_tenant_override.pageJson, strategy: "override-wins")
```
Updating `template_base` to v1.2 never touches `template_tenant_override` — a merchant who dragged sections around keeps their layout even after a platform template update. Conflicts (platform removes a component the merchant customized) are flagged for merchant review, never silently dropped or silently overwritten.

## 6. Versioning & Marketplace Readiness

```
Fashion v1.0 → v1.1 → v1.2 → v2.0
```
Tenants get an update notification, not a forced update. `manifest.json`'s `compatible_platform_version` gates whether an update is even offered. Marketplace (Official/Premium/Free/Partner/Community tiers) is a Phase 4 distribution layer on top of this same package format — no format change needed later.
