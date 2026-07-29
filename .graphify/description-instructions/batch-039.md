# Node Description Batch 40 of 51

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "repositories_bundle_repository_bundlerepository_setbundleitems": ".setBundleItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/bundle.repository.ts:L13 | neighbors=[BundleRepository]
- "repositories_bundle_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[BundleRepository]
- "repositories_cart_item_repository_cartitemrepository_clearbycartid": ".clearByCartId()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart-item.repository.ts:L13 | neighbors=[CartItemRepository]
- "repositories_cart_item_repository_cartitemrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart-item.repository.ts:L9 | neighbors=[CartItemRepository]
- "repositories_cart_item_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CartItemRepository]
- "repositories_cart_repository_cartrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.ts:L8 | neighbors=[CartRepository]
- "repositories_cart_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CartRepository]
- "repositories_category_repository_categoryrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L8 | neighbors=[CategoryRepository]
- "repositories_category_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CategoryRepository]
- "repositories_company_profile_repository_companyprofilerepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/repositories/company-profile.repository.ts:L8 | neighbors=[CompanyProfileRepository]
- "repositories_company_profile_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CompanyProfileRepository]
- "repositories_inventory_level_repository_inventorylevelrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/repositories/inventory-level.repository.ts:L8 | neighbors=[InventoryLevelRepository]
- "repositories_inventory_level_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[InventoryLevelRepository]
- "repositories_inventory_location_repository_inventorylocationrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/repositories/inventory-location.repository.ts:L8 | neighbors=[InventoryLocationRepository]
- "repositories_inventory_location_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[InventoryLocationRepository]
- "repositories_page_layout_repository_pagelayoutrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L9 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_pagelayoutrepository_findbypagekey": ".findByPageKey()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L14 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PageLayoutRepository]
- "repositories_price_list_repository_pricelistrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/repositories/price-list.repository.ts:L8 | neighbors=[PriceListRepository]
- "repositories_price_list_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PriceListRepository]
- "repositories_product_repository_productrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L8 | neighbors=[ProductRepository]
- "repositories_product_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ProductRepository]
- "repositories_product_variant_repository_productvariantrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product-variant.repository.ts:L9 | neighbors=[ProductVariantRepository]
- "repositories_product_variant_repository_productvariantrepository_incrementreservedstock": ".incrementReservedStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product-variant.repository.ts:L13 | neighbors=[ProductVariantRepository]
- "repositories_product_variant_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ProductVariantRepository]
- "repositories_returns_repository_returnsrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/repositories/returns.repository.ts:L8 | neighbors=[ReturnsRepository]
- "repositories_returns_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ReturnsRepository]
- "repositories_stock_reservation_repository_stockreservationrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/stock-reservation.repository.ts:L8 | neighbors=[StockReservationRepository]
- "repositories_stock_reservation_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[StockReservationRepository]
- "repositories_subscriptions_repository_subscriptionsrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/repositories/subscriptions.repository.ts:L8 | neighbors=[SubscriptionsRepository]
- "repositories_subscriptions_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[SubscriptionsRepository]
- "repositories_tenant_scoped_repository_constructor": "constructor()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L7 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_create": "create()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L59 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_delete": "delete()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L82 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_spec_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[TestRepo]
- "repositories_tenant_scoped_repository_spec_testrepo_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.spec.ts:L5 | neighbors=[TestRepo]
- "repositories_tenant_scoped_repository_updatebytenant": "updateByTenant()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L92 | neighbors=[tenant-scoped.repository.ts]
- "repositories_theme_override_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ThemeTenantOverrideRepository]
- "repositories_theme_override_repository_themetenantoverriderepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L8 | neighbors=[ThemeTenantOverrideRepository]
- "reset_password_page_resetpasswordform": "ResetPasswordForm()" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L12 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-039.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:

```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
