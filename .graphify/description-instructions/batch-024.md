# Node Description Batch 25 of 51

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

- "cache_tenant_cache_service_tenantcacheservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L7 | neighbors=[TenantCacheService]
- "cart_cart_controller_cartcontroller_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L42 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_clearcart": ".clearCart()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L73 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L23 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L27 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L36 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L63 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L52 | neighbors=[CartController]
- "cart_cart_drawer_cart": "Cart" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L17 | neighbors=[cart-drawer.tsx]
- "cart_cart_drawer_cartitem": "CartItem" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L11 | neighbors=[cart-drawer.tsx]
- "cart_cart_module_cartmodule": "CartModule" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.module.ts:L14 | neighbors=[cart.module.ts]
- "cart_cart_service_cartservice_clearcart": ".clearCart()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L130 | neighbors=[CartService]
- "cart_cart_service_cartservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L20 | neighbors=[CartService]
- "cart_cart_service_cartservice_convert": ".convert()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L140 | neighbors=[CartService]
- "cart_cart_service_cartservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L35 | neighbors=[CartService]
- "cart_cart_service_cartservice_getwithitems": ".getWithItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L41 | neighbors=[CartService]
- "cart_page_cart": "Cart" | kind=code-symbol | source=apps/storefront/src/app/cart/page.tsx:L15 | neighbors=[page.tsx]
- "cart_page_cartitem": "CartItem" | kind=code-symbol | source=apps/storefront/src/app/cart/page.tsx:L9 | neighbors=[page.tsx]
- "cart_page_cartpage": "CartPage()" | kind=code-symbol | source=apps/storefront/src/app/cart/page.tsx:L20 | neighbors=[page.tsx]
- "catalog_catalog_controller_catalogcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L26 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_createcategory": ".createCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L45 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_createproduct": ".createProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L30 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_createvariant": ".createVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L125 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_deletecategory": ".deleteCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L107 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_deleteproduct": ".deleteProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L79 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_deletevariant": ".deleteVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L148 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_getbundleitems": ".getBundleItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L157 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_getcategory": ".getCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L88 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L60 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L54 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L39 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listvariants": ".listVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L116 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_setbundleitems": ".setBundleItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L166 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updatecategory": ".updateCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L97 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updateproduct": ".updateProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L69 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updatevariant": ".updateVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L138 | neighbors=[CatalogController]
- "catalog_catalog_module_catalogmodule": "CatalogModule" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L24 | neighbors=[catalog.module.ts]
- "catalog_catalog_service_catalogservice_confirmreservation": ".confirmReservation()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L182 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L21 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createcategory": ".createCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L41 | neighbors=[CatalogService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-024.json

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
