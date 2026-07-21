# Node Description Batch 20 of 37

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

- "catalog_catalog_controller_catalogcontroller_deleteproduct": ".deleteProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L79 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_deletevariant": ".deleteVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L148 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_getcategory": ".getCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L88 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L60 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L54 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L39 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listvariants": ".listVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L116 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updatecategory": ".updateCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L97 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updateproduct": ".updateProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L69 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_updatevariant": ".updateVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L138 | neighbors=[CatalogController]
- "catalog_catalog_module_catalogmodule": "CatalogModule" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L22 | neighbors=[catalog.module.ts]
- "catalog_catalog_service_catalogservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L20 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createcategory": ".createCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L39 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createproduct": ".createProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L27 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createvariant": ".createVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L113 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deletecategory": ".deleteCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L103 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deleteproduct": ".deleteProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L74 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deletevariant": ".deleteVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L136 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getcategory": ".getCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L80 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getlowstockvariants": ".getLowStockVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L142 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L51 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getvariant": ".getVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L150 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getvariants": ".getVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L109 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L47 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L35 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_reservestock": ".reserveStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L156 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updatecategory": ".updateCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L86 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updateproduct": ".updateProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L57 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updatevariant": ".updateVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L126 | neighbors=[CatalogService]
- "categories_categorylistpage_buildtree": "buildTree()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L180 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_categorylistpage": "CategoryListPage()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L209 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_categorynode": "CategoryNode" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L56 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_sortablecategoryrow": "SortableCategoryRow()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L65 | neighbors=[CategoryListPage.tsx]
- "change_password_page_changepasswordform": "ChangePasswordForm()" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L13 | neighbors=[page.tsx]
- "change_password_page_changepasswordpage": "ChangePasswordPage()" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L134 | neighbors=[page.tsx]
- "checkout_checkout_controller_checkoutcontroller_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L16 | neighbors=[CheckoutController]
- "checkout_checkout_controller_checkoutcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L12 | neighbors=[CheckoutController]
- "checkout_checkout_module_checkoutmodule": "CheckoutModule" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.module.ts:L13 | neighbors=[checkout.module.ts]
- "checkout_checkout_service_checkoutservice_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L24 | neighbors=[CheckoutService]
- "checkout_checkout_service_checkoutservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L17 | neighbors=[CheckoutService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-019.json

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
