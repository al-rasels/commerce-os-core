# Node Description Batch 16 of 37

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

- "repositories_cart_repository": "cart.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CartRepository]
- "repositories_category_repository": "category.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CategoryRepository]
- "repositories_product_repository": "product.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ProductRepository]
- "repositories_tenant_scoped_repository_aggregate": "aggregate()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L30 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_count": "count()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L16 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_findmany": "findMany()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L22 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_findunique": "findUnique()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L46 | neighbors=[tenant-scoped.repository.ts, update()]
- "repositories_tenant_scoped_repository_groupby": "groupBy()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L38 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_softdelete": "softDelete()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L78 | neighbors=[tenant-scoped.repository.ts, update()]
- "search_search_form_searchform": "SearchForm()" | kind=code-symbol | source=apps/storefront/src/app/search/search-form.tsx:L8 | neighbors=[page.tsx, search-form.tsx]
- "shipping_shipping_module": "shipping.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, ShippingModule]
- "slug_product_client_productclient": "ProductClient()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-client.tsx:L10 | neighbors=[section-renderer.tsx, product-client.tsx]
- "slug_product_page_client_productpageclient": "ProductPageClient()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-page-client.tsx:L6 | neighbors=[page.tsx, product-page-client.tsx]
- "src_app_service": "app.service.ts" | kind=code-symbol | source=apps/api/src/app.service.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, AppService]
- "src_app_service_appservice": "AppService" | kind=code-symbol | source=apps/api/src/app.service.ts:L4 | neighbors=[app.service.ts, .getHello()]
- "storefront_next_config": "next.config.ts" | kind=code-symbol | source=apps/storefront/next.config.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, nextConfig]
- "storefront_postcss_config": "postcss.config.mjs" | kind=code-symbol | source=apps/storefront/postcss.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, config]
- "storefront_storefront_checkout_controller_storefrontcheckoutcontroller": "StorefrontCheckoutController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L15 | neighbors=[storefront-checkout.controller.ts, .checkout()]
- "storefront_storefront_order_controller_storefrontordercontroller": "StorefrontOrderController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L6 | neighbors=[storefront-order.controller.ts, .getOrder()]
- "tax_tax_module": "tax.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, TaxModule]
- "tenant_tenant_admin_controller_tenantadmincontroller_adddomain": ".addDomain()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L121 | neighbors=[TenantAdminController, .create()]
- "tenant_tenant_admin_controller_tenantadmincontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L88 | neighbors=[TenantAdminController, .addDomain()]
- "tenant_tenant_module": "tenant.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, TenantModule]
- "tenant_tenant_service_spec": "tenant.service.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "test_tenant_isolation_e2e_spec": "tenant-isolation.e2e-spec.ts" | kind=code-symbol | source=apps/api/test/tenant-isolation.e2e-spec.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …]
- "theme_engine_index_detectconflicts": "detectConflicts()" | kind=code-symbol | source=packages/theme-engine/index.ts:L26 | neighbors=[index.ts, resolveOverride()]
- "ui_alert_alert": "Alert()" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L22 | neighbors=[alert.tsx, alertVariants]
- "ui_alert_alertvariants": "alertVariants" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L6 | neighbors=[alert.tsx, Alert()]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L30 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L6 | neighbors=[button.tsx, Button()]
- "ui_card_card": "Card()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L5 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L72 | neighbors=[page.tsx, card.tsx]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L49 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L23 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L36 | neighbors=[page.tsx, card.tsx]
- "ui_carousel_carouselcontent": "CarouselContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L135 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselitem": "CarouselItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L156 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselnext": "CarouselNext()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L204 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselprevious": "CarouselPrevious()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L174 | neighbors=[carousel.tsx, useCarousel()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-015.json

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
