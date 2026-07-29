# Node Description Batch 7 of 51

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

- "api_tax": "tax.ts" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L1 | neighbors=[index.ts, client.ts, api, taxApi, TaxRule, 6ffba43 feat: add MFA auth flow, super …]
- "app_home_client": "home-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/home-client.tsx:L1 | neighbors=[HomeClient(), product-card.tsx, ProductCard(), 3571d3a feat(storefront): overhaul UI/U…, efe67e9 fix(build): resolve component t…, f1d1a16 feat: implement storefront foun…]
- "b2b_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/(auth)/b2b/page.tsx:L1 | neighbors=[B2BPortalPage(), api.ts, api, button.tsx, Button(), 20e2f86 fix(storefront): resolve import…]
- "builder_builder_controller_buildercontroller": "BuilderController" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L18 | neighbors=[builder.controller.ts, .constructor(), .getPageLayout(), .publishPageLayout(), .unpublishPageLayout(), .updatePageLayout()]
- "builder_databindingpanel": "DataBindingPanel.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/DataBindingPanel.tsx:L1 | neighbors=[DataBindingPanel(), BuilderNode.tsx, PageNode, PageBuilder.tsx, 0361288 feat(admin): Scaffolded Phase 2…, 05b237f feat(admin): Implemented Page B…]
- "cache_tenant_cache_service_tenantcacheservice": "TenantCacheService" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L6 | neighbors=[tenant-cache.service.ts, .constructor(), .del(), .generateKey(), .get(), .set()]
- "components_badge": "badge.tsx" | kind=code-symbol | source=packages/components/badge.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Badge(), badgeVariants, utils.ts, cn(), index.ts]
- "components_productbundleeditor": "ProductBundleEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/ProductBundleEditor.tsx:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, bdd391f feat(admin): fix ts errors in P…, ProductBundleEditor(), ProductBundleEditorProps, ProductVariantSelector(), VariantSearchDialog()]
- "components_radio_group": "radio-group.tsx" | kind=code-symbol | source=packages/components/radio-group.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, RadioGroup(), RadioGroupItem(), utils.ts, cn()]
- "components_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=packages/components/scroll-area.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, ScrollArea(), ScrollBar(), utils.ts, cn()]
- "components_section_schema": "section-schema.ts" | kind=code-symbol | source=packages/components/section-schema.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, PropSchema, PropType, SectionSchema, sectionSchemas]
- "customer_customer_controller": "customer.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerController, tenant-context.ts, TenantContext]
- "dashboard_dashboard_controller": "dashboard.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, DashboardController, tenant-context.ts, TenantContext]
- "hooks_usecategories": "useCategories.ts" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCategories(), useCreateCategory(), useDeleteCategory(), useUpdateCategory()]
- "hooks_usepages": "usePages.ts" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, usePageLayout(), usePublishPageLayout(), useSavePageLayout(), useUnpublishPageLayout()]
- "inventory_inventory_service": "inventory.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, d26bd04 feat(commerce): implement advan…, InventoryService, tenant-context.ts, TenantContext]
- "lib_store_usecartstore": "useCartStore" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L15 | neighbors=[cart-drawer.tsx, page.tsx, page.tsx, add-to-cart-button.tsx, cart-badge.tsx, store.ts]
- "middlewares_tenant_context_middleware": "tenant-context.middleware.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, TenantContextMiddleware, tenant-context.ts, TenantContext]
- "order_order_controller": "order.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, OrderController, tenant-context.ts, TenantContext]
- "order_order_repository_orderrepository": "OrderRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L8 | neighbors=[order.repository.ts, .constructor(), .fulfillStock(), .releaseStock(), .update(), TenantScopedRepository]
- "page_editor_addsectionpanel": "AddSectionPanel.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, ac49c08 chore: batch commit — catalog C…, AddSectionPanel(), AddSectionPanelProps, SectionOption(), index.ts]
- "promotions_promotions_controller": "promotions.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 65feb38 feat(api): Integrated Promotion…, 6ffba43 feat: add MFA auth flow, super …, PromotionsController, tenant-context.ts, TenantContext]
- "repositories_product_variant_repository": "product-variant.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product-variant.repository.ts:L1 | neighbors=[4029d6f fix(commerce): resolve architec…, ac49c08 chore: batch commit — catalog C…, bb279ee fix(ci): fix api tests and lint…, ProductVariantRepository, tenant-context.ts, TenantContext]
- "returns_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/returns/page.tsx:L1 | neighbors=[20e2f86 fix(storefront): resolve import…, api.ts, api, ReturnsPage(), button.tsx, Button()]
- "storefront_storefront_cart_controller_storefrontcartcontroller": "StorefrontCartController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L18 | neighbors=[storefront-cart.controller.ts, .addItem(), .createCart(), .getCart(), .removeItem(), .updateItem()]
- "storefront_storefront_controller_storefrontcontroller": "StorefrontController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L6 | neighbors=[storefront.controller.ts, .getOrder(), .getProduct(), .listCategories(), .listOrdersByEmail(), .listProducts()]
- "storefront_storefront_order_controller": "storefront-order.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, prisma.service.ts, StorefrontOrderController, tenant-context.ts, TenantContext]
- "subscriptions_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/subscriptions/page.tsx:L1 | neighbors=[20e2f86 fix(storefront): resolve import…, api.ts, api, SubscriptionsPage(), button.tsx, Button()]
- "success_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/checkout/success/page.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, api.ts, api, CheckoutSuccessPage(), SuccessContent()]
- "tax_tax_service": "tax.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, bb279ee fix(ci): fix api tests and lint…, TaxService, tenant-context.ts, TenantContext]
- "ui_alert": "alert.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Badge(), badgeVariants]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Progress(), ProgressIndicator(), ProgressLabel(), ProgressTrack(), ProgressValue()]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/radio-group.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), RadioGroup(), RadioGroupItem()]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/scroll-area.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), ScrollArea(), ScrollBar()]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()]
- "users_users_controller_userscontroller": "UsersController" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L20 | neighbors=[users.controller.ts, .constructor(), .getById(), .list(), .update(), .updateStatus()]
- "users_users_repository": "users.repository.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext, UsersRepository]
- "20260716164323_init_migration_categories": "categories" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L114 | neighbors=[migration.sql, categories, tenants, products]
- "20260716164323_init_migration_orders": "orders" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L160 | neighbors=[migration.sql, order_items, customers, tenants, stock_reservations]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-006.json

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
