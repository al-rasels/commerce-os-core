# Node Description Batch 31 of 37

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

- "shipping_shipping_rule_repository_shippingrulerepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L7 | neighbors=[ShippingRuleRepository]
- "shipping_shipping_rule_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ShippingRuleRepository]
- "shipping_shipping_service_shippingservice_calculateshippingoptions": ".calculateShippingOptions()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L42 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L9 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_createrule": ".createRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L25 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_deleterule": ".deleteRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L37 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_getrule": ".getRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L17 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_listrules": ".listRules()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L11 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_updaterule": ".updateRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L29 | neighbors=[ShippingService]
- "slug_loading_loading": "Loading()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/loading.tsx:L3 | neighbors=[loading.tsx]
- "slug_page_categorypage": "CategoryPage()" | kind=code-symbol | source=apps/storefront/src/app/categories/[slug]/page.tsx:L19 | neighbors=[page.tsx]
- "slug_page_generatemetadata": "generateMetadata()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L10 | neighbors=[page.tsx]
- "slug_page_productpage": "ProductPage()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L25 | neighbors=[page.tsx]
- "src_app_app": "App()" | kind=code-symbol | source=apps/admin/src/App.tsx:L32 | neighbors=[App.tsx]
- "src_app_controller_appcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L6 | neighbors=[AppController]
- "src_app_controller_appcontroller_gethello": ".getHello()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L9 | neighbors=[AppController]
- "src_app_controller_appcontroller_whoami": ".whoami()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L14 | neighbors=[AppController]
- "src_app_controller_spec": "app.controller.spec.ts" | kind=code-symbol | source=apps/api/src/app.controller.spec.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "src_app_module_appmodule": "AppModule" | kind=code-symbol | source=apps/api/src/app.module.ts:L41 | neighbors=[app.module.ts]
- "src_app_protectedroute": "ProtectedRoute()" | kind=code-symbol | source=apps/admin/src/App.tsx:L26 | neighbors=[App.tsx]
- "src_app_service_appservice_gethello": ".getHello()" | kind=code-symbol | source=apps/api/src/app.service.ts:L5 | neighbors=[AppService]
- "src_main_bootstrap": "bootstrap()" | kind=code-symbol | source=apps/api/src/main.ts:L8 | neighbors=[main.ts]
- "src_main_queryclient": "queryClient" | kind=code-symbol | source=apps/admin/src/main.tsx:L8 | neighbors=[main.ts]
- "src_middleware_config": "config" | kind=code-symbol | source=apps/storefront/src/middleware.ts:L24 | neighbors=[middleware.ts]
- "src_middleware_middleware": "middleware()" | kind=code-symbol | source=apps/storefront/src/middleware.ts:L4 | neighbors=[middleware.ts]
- "storefront_eslint_config_eslintconfig": "eslintConfig" | kind=code-symbol | source=apps/storefront/eslint.config.mjs:L5 | neighbors=[eslint.config.mjs]
- "storefront_next_config_nextconfig": "nextConfig" | kind=code-symbol | source=apps/storefront/next.config.ts:L3 | neighbors=[next.config.ts]
- "storefront_postcss_config_config": "config" | kind=code-symbol | source=apps/storefront/postcss.config.mjs:L1 | neighbors=[postcss.config.mjs]
- "storefront_storefront_cart_controller_storefrontcartcontroller_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L54 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_createcart": ".createCart()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L21 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_getcart": ".getCart()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L38 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L120 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L97 | neighbors=[StorefrontCartController]
- "storefront_storefront_checkout_controller_storefrontcheckoutcontroller_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L18 | neighbors=[StorefrontCheckoutController]
- "storefront_storefront_controller_storefrontcontroller_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L74 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L94 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L8 | neighbors=[StorefrontController]
- "storefront_storefront_module_storefrontmodule": "StorefrontModule" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.module.ts:L19 | neighbors=[storefront.module.ts]
- "storefront_storefront_order_controller_storefrontordercontroller_getorder": ".getOrder()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L8 | neighbors=[StorefrontOrderController]
- "success_page_checkoutsuccesspage": "CheckoutSuccessPage()" | kind=code-symbol | source=apps/storefront/src/app/checkout/success/page.tsx:L94 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-030.json

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
