# Node Description Batch 26 of 51

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

- "catalog_catalog_service_catalogservice_createproduct": ".createProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L29 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createvariant": ".createVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L115 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deletecategory": ".deleteCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L105 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deleteproduct": ".deleteProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L76 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_deletevariant": ".deleteVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L138 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getbundleitems": ".getBundleItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L200 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getcategory": ".getCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L82 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getlowstockvariants": ".getLowStockVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L144 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L53 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getvariant": ".getVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L152 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_getvariants": ".getVariants()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L111 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L49 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L37 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_releasereservation": ".releaseReservation()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L188 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_reservestock": ".reserveStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L158 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_setbundleitems": ".setBundleItems()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L211 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updatecategory": ".updateCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L88 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updateproduct": ".updateProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L59 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_updatevariant": ".updateVariant()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L128 | neighbors=[CatalogService]
- "categories_categorylistpage_buildtree": "buildTree()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L180 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_categorylistpage": "CategoryListPage()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L209 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_categorynode": "CategoryNode" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L56 | neighbors=[CategoryListPage.tsx]
- "categories_categorylistpage_sortablecategoryrow": "SortableCategoryRow()" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L65 | neighbors=[CategoryListPage.tsx]
- "change_password_page_changepasswordform": "ChangePasswordForm()" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L13 | neighbors=[page.tsx]
- "change_password_page_changepasswordpage": "ChangePasswordPage()" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L134 | neighbors=[page.tsx]
- "checkout_checkout_controller_checkoutcontroller_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L16 | neighbors=[CheckoutController]
- "checkout_checkout_controller_checkoutcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L12 | neighbors=[CheckoutController]
- "checkout_checkout_module_checkoutmodule": "CheckoutModule" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.module.ts:L16 | neighbors=[checkout.module.ts]
- "checkout_checkout_service_checkoutservice_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L28 | neighbors=[CheckoutService]
- "checkout_checkout_service_checkoutservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L19 | neighbors=[CheckoutService]
- "checkout_page_checkoutpage": "CheckoutPage()" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L52 | neighbors=[page.tsx]
- "checkout_page_paymentform": "PaymentForm()" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L19 | neighbors=[page.tsx]
- "checkout_page_stripepromise": "stripePromise" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L17 | neighbors=[page.tsx]
- "commerce_commerce_module_commercemodule": "CommerceModule" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L35 | neighbors=[commerce.module.ts]
- "commitlint_config": "commitlint.config.js" | kind=code-symbol | source=commitlint.config.js:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …]
- "components_alert_alertaction": "AlertAction()" | kind=code-symbol | source=packages/components/alert.tsx:L66 | neighbors=[alert.tsx]
- "components_alert_alertdescription": "AlertDescription()" | kind=code-symbol | source=packages/components/alert.tsx:L50 | neighbors=[alert.tsx]
- "components_alert_alerttitle": "AlertTitle()" | kind=code-symbol | source=packages/components/alert.tsx:L37 | neighbors=[alert.tsx]
- "components_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L7 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L142 | neighbors=[alert-dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-025.json

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
