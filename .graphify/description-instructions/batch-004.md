# Node Description Batch 5 of 51

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "components_gallery": "gallery.tsx" | kind=code-symbol | source=packages/components/gallery.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Gallery(), GalleryProps, variantStyles, utils.ts, cn()]
- "components_product_card_productcard": "ProductCard()" | kind=code-symbol | source=packages/components/product-card.tsx:L20 | neighbors=[home-client.tsx, product-card.tsx, formatPrice(), product-grid.tsx, registry.ts, products-client.tsx]
- "components_search_bar": "search-bar.tsx" | kind=code-symbol | source=packages/components/search-bar.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, SearchBar(), SearchBarProps, utils.ts]
- "components_testimonials": "testimonials.tsx" | kind=code-symbol | source=packages/components/testimonials.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Stars(), Testimonials(), TestimonialsProps]
- "components_tooltip": "tooltip.tsx" | kind=code-symbol | source=packages/components/tooltip.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()]
- "contexts_authcontext": "AuthContext.tsx" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, AuthContext, AuthContextType, AuthProvider(), AuthUser]
- "copy_components": "copy-components.js" | kind=code-symbol | source=copy-components.js:L1 | neighbors=[efe67e9 fix(build): resolve component t…, destDir, exportedContent, files, fs, indexFile]
- "customer_customer_service_customerservice": "CustomerService" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L11 | neighbors=[customer.service.ts, .constructor(), .countActive(), .create(), .get(), .list()]
- "dashboard_dashboard_service": "dashboard.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, bdd391f feat(admin): fix ts errors in P…, DashboardService]
- "hooks_usecustomers": "useCustomers.ts" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, useCreateCustomer(), useCustomer(), useCustomers()]
- "lib_server_api": "server-api.ts" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L1 | neighbors=[layout.tsx, page.tsx, e5d6c72 feat: implement end-to-end chec…, efe67e9 fix(build): resolve component t…, ApiError, serverApi]
- "order_order_service_orderservice": "OrderService" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L19 | neighbors=[order.service.ts, .constructor(), .createOrder(), .get(), .getDashboardStats(), .list()]
- "orders_ordertimeline": "OrderTimeline.tsx" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, f1bfa47 feat: implement storefront orde…, CONFIRMATION_LABELS, DESTRUCTIVE_ACTIONS, OrderTimeline()]
- "products_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, e5d6c72 feat: implement end-to-end chec…, api.ts, api, ProductsPage()]
- "products_products_client": "products-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/products-client.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, bb279ee fix(ci): fix api tests and lint…, e5d6c72 feat: implement end-to-end chec…, f1d1a16 feat: implement storefront foun…, page.tsx, product-card.tsx]
- "promotions_promotions_controller_promotionscontroller": "PromotionsController" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L22 | neighbors=[promotions.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "redis_redis_service_redisservice": "RedisService" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L10 | neighbors=[redis.service.ts, OnModuleDestroy, OnModuleInit, .del(), .get(), .onModuleDestroy()]
- "shipping_shipping_service_shippingservice": "ShippingService" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L8 | neighbors=[shipping.service.ts, .calculateShippingOptions(), .constructor(), .createRule(), .deleteRule(), .getRule()]
- "slug_product_client": "product-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-client.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, efe67e9 fix(build): resolve component t…, f1d1a16 feat: implement storefront foun…, section-renderer.tsx, add-to-cart-button.tsx]
- "src_main": "main.ts" | kind=code-symbol | source=apps/api/src/main.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, App.tsx]
- "tax_tax_service_taxservice": "TaxService" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L8 | neighbors=[tax.service.ts, .calculateTax(), .constructor(), .createRule(), .deleteRule(), .getRule()]
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList()]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Tooltip(), TooltipContent()]
- "api_b2b": "b2b.ts" | kind=code-symbol | source=apps/admin/src/lib/api/b2b.ts:L1 | neighbors=[b2bApi, CompanyProfile, CompanyProfileInput, client.ts, api, index.ts]
- "api_returns": "returns.ts" | kind=code-symbol | source=apps/admin/src/lib/api/returns.ts:L1 | neighbors=[index.ts, client.ts, api, ReturnRequest, ReturnRequestInput, returnsApi]
- "api_subscriptions": "subscriptions.ts" | kind=code-symbol | source=apps/admin/src/lib/api/subscriptions.ts:L1 | neighbors=[index.ts, client.ts, api, Subscription, SubscriptionInput, subscriptionsApi]
- "builder_builder_service_builderservice": "BuilderService" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L11 | neighbors=[builder.service.ts, .constructor(), .getPageLayout(), .publishPageLayout(), .unpublishPageLayout(), .updatePageLayout()]
- "builder_propertypanel": "PropertyPanel.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/PropertyPanel.tsx:L1 | neighbors=[PageBuilder.tsx, PropertyPanel(), PropertyPanelProps, BuilderNode.tsx, PageNode, 0361288 feat(admin): Scaffolded Phase 2…]
- "catalog_catalog_module": "catalog.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L1 | neighbors=[CatalogModule, 21888ff feat: implement commerce, catal…, 4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, 92e2c6a feat: add checkout tenant isola…, ac49c08 chore: batch commit — catalog C…]
- "commit:repo:github.com/al-rasels/commerce-os-core@20e2f86d0895383fcd3287fe6aa034a2def59628": "20e2f86 fix(storefront): resolve import casing in customer portals" | kind=Commit | source=git | neighbors=[page.tsx, page.tsx, feat/admin-ui-refactor, c506b3c feat(api): implement database r…, page.tsx, page.tsx]
- "commit:repo:github.com/al-rasels/commerce-os-core@65feb38015ddb94aff24eb3c26f31e5019e2790a": "65feb38 feat(api): Integrated Promotions Module with Checkout State Machine" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, cart.service.ts, checkout.module.ts, checkout.service.ts, d0fde76 docs: Added full project task s…, promotions.controller.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@67df34fc5a6a8786f98267df113509623afbe7e0": "67df34f feat(api): Setup BullMQ background queues with strict tenant isolation" | kind=Commit | source=git | neighbors=[05b237f feat(admin): Implemented Page B…, feat/admin-ui-refactor, 16cea38 feat(api): Implemented Meilisea…, platform.module.ts, index.ts, queue.module.ts]
- "components_banner": "banner.tsx" | kind=code-symbol | source=packages/components/banner.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Banner(), BannerProps, utils.ts, cn(), index.ts]
- "components_buildernode": "BuilderNode.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/components/BuilderNode.tsx:L1 | neighbors=[DataBindingPanel.tsx, PageBuilder.tsx, PropertyPanel.tsx, 05b237f feat(admin): Implemented Page B…, BuilderNode(), BuilderNodeProps]
- "components_cart_drawer": "cart-drawer.tsx" | kind=code-symbol | source=packages/components/cart-drawer.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, CartDrawer(), CartDrawerProps, utils.ts, cn(), index.ts]
- "components_checkout_summary": "checkout-summary.tsx" | kind=code-symbol | source=packages/components/checkout-summary.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, CheckoutSummary(), CheckoutSummaryProps, utils.ts, cn(), index.ts]
- "components_empty_state": "empty-state.tsx" | kind=code-symbol | source=packages/components/empty-state.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, EmptyState(), EmptyStateProps, utils.ts, cn(), index.ts]
- "components_faq": "faq.tsx" | kind=code-symbol | source=packages/components/faq.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Faq(), FaqProps, utils.ts, cn(), index.ts]
- "components_floating_header": "floating-header.tsx" | kind=code-symbol | source=apps/storefront/src/components/floating-header.tsx:L1 | neighbors=[layout.tsx, efe67e9 fix(build): resolve component t…, cart-badge.tsx, CartBadge(), FloatingHeader(), search-autocomplete.tsx]
- "components_header": "header.tsx" | kind=code-symbol | source=packages/components/header.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Header(), HeaderProps, utils.ts, cn(), index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-004.json

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
