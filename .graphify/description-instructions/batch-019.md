# Node Description Batch 20 of 51

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

- "lib_invoice_generateinvoicehtml": "generateInvoiceHtml()" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L5 | neighbors=[invoice.ts, downloadInvoice()]
- "lib_server_api_serverrequest": "serverRequest()" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L13 | neighbors=[server-api.ts, ApiError]
- "load_checkout": "checkout.js" | kind=code-symbol | source=tests/load/checkout.js:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, options]
- "order_order_item_repository": "order-item.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order-item.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, OrderItemRepository]
- "order_order_service_orderservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L22 | neighbors=[OrderService, .toDto()]
- "order_order_service_orderservice_updatepaymentintentid": ".updatePaymentIntentId()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L86 | neighbors=[OrderService, .toDto()]
- "order_order_service_orderservice_updatestatus": ".updateStatus()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L61 | neighbors=[OrderService, .toDto()]
- "page_editor_addsectionpanel_addsectionpanel": "AddSectionPanel()" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L16 | neighbors=[AddSectionPanel.tsx, index.ts]
- "page_editor_propeditor_propeditor": "PropEditor()" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L19 | neighbors=[index.ts, PropEditor.tsx]
- "page_editor_sectioncard_sectioncard": "SectionCard()" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L21 | neighbors=[index.ts, SectionCard.tsx]
- "payments_payments_service_paymentsservice_handlepaymentfailed": ".handlePaymentFailed()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L127 | neighbors=[PaymentsService, .handleWebhook()]
- "payments_payments_service_paymentsservice_handlepaymentsucceeded": ".handlePaymentSucceeded()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L95 | neighbors=[PaymentsService, .handleWebhook()]
- "payments_payments_webhook_controller": "payments.webhook.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, PaymentsWebhookController]
- "products_productlistpage": "ProductListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/products/ProductListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, ProductListPage()]
- "products_products_client_productsclient": "ProductsClient()" | kind=code-symbol | source=apps/storefront/src/app/products/products-client.tsx:L9 | neighbors=[page.tsx, products-client.tsx]
- "promotions_promotions_module": "promotions.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, PromotionsModule]
- "promotions_promotions_service_promotionsservice_getpromotion": ".getPromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L21 | neighbors=[PromotionsService, .incrementUsage()]
- "promotions_promotions_service_promotionsservice_incrementusage": ".incrementUsage()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L90 | neighbors=[PromotionsService, .getPromotion()]
- "queue_index": "index.ts" | kind=code-symbol | source=apps/api/src/modules/platform/queue/index.ts:L1 | neighbors=[67df34f feat(api): Setup BullMQ backgro…, search-sync.worker.ts]
- "queue_queue_module": "queue.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/queue/queue.module.ts:L1 | neighbors=[67df34f feat(api): Setup BullMQ backgro…, QueueModule]
- "redis_redis_module": "redis.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, RedisModule]
- "repositories_cart_repository": "cart.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CartRepository]
- "repositories_category_repository": "category.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CategoryRepository]
- "repositories_company_profile_repository": "company-profile.repository.ts" | kind=code-symbol | source=apps/api/src/modules/business/b2b/repositories/company-profile.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, CompanyProfileRepository]
- "repositories_inventory_level_repository": "inventory-level.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/repositories/inventory-level.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, InventoryLevelRepository]
- "repositories_inventory_location_repository": "inventory-location.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/repositories/inventory-location.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, InventoryLocationRepository]
- "repositories_price_list_repository": "price-list.repository.ts" | kind=code-symbol | source=apps/api/src/modules/business/b2b/repositories/price-list.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, PriceListRepository]
- "repositories_product_repository": "product.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ProductRepository]
- "repositories_returns_repository": "returns.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/repositories/returns.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, ReturnsRepository]
- "repositories_stock_reservation_repository": "stock-reservation.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/stock-reservation.repository.ts:L1 | neighbors=[4029d6f fix(commerce): resolve architec…, StockReservationRepository]
- "repositories_subscriptions_repository": "subscriptions.repository.ts" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/repositories/subscriptions.repository.ts:L1 | neighbors=[c506b3c feat(api): implement database r…, SubscriptionsRepository]
- "repositories_tenant_scoped_repository_aggregate": "aggregate()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L30 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_count": "count()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L16 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_findmany": "findMany()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L22 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_findunique": "findUnique()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L46 | neighbors=[tenant-scoped.repository.ts, update()]
- "repositories_tenant_scoped_repository_groupby": "groupBy()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L38 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_softdelete": "softDelete()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L78 | neighbors=[tenant-scoped.repository.ts, update()]
- "search_search_controller": "search.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.controller.ts:L1 | neighbors=[16cea38 feat(api): Implemented Meilisea…, SearchController]
- "search_search_form_searchform": "SearchForm()" | kind=code-symbol | source=apps/storefront/src/app/search/search-form.tsx:L8 | neighbors=[page.tsx, search-form.tsx]
- "search_search_module": "search.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.module.ts:L1 | neighbors=[16cea38 feat(api): Implemented Meilisea…, SearchModule]

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
