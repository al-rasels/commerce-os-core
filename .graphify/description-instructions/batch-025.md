# Node Description Batch 26 of 37

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

- "order_order_controller_ordercontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L22 | neighbors=[OrderController]
- "order_order_controller_ordercontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L35 | neighbors=[OrderController]
- "order_order_controller_ordercontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L26 | neighbors=[OrderController]
- "order_order_controller_ordercontroller_updatestatus": ".updateStatus()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L41 | neighbors=[OrderController]
- "order_order_item_repository_orderitemrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order-item.repository.ts:L8 | neighbors=[OrderItemRepository]
- "order_order_item_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[OrderItemRepository]
- "order_order_module_ordermodule": "OrderModule" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.module.ts:L12 | neighbors=[order.module.ts]
- "order_order_repository_orderrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L9 | neighbors=[OrderRepository]
- "order_order_repository_orderrepository_fulfillstock": ".fulfillStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L28 | neighbors=[OrderRepository]
- "order_order_repository_orderrepository_releasestock": ".releaseStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L44 | neighbors=[OrderRepository]
- "order_order_repository_orderrepository_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L13 | neighbors=[OrderRepository]
- "order_order_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[OrderRepository]
- "order_order_service_orderservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L20 | neighbors=[OrderService]
- "order_order_service_orderservice_createorder": ".createOrder()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L121 | neighbors=[OrderService]
- "order_order_service_orderservice_getdashboardstats": ".getDashboardStats()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L86 | neighbors=[OrderService]
- "order_order_service_orderservice_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L32 | neighbors=[OrderService]
- "order_order_service_valid_transitions": "VALID_TRANSITIONS" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L10 | neighbors=[order.service.ts]
- "orders_orderdetailpage_orderdetailpage": "OrderDetailPage()" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderDetailPage.tsx:L23 | neighbors=[OrderDetailPage.tsx]
- "orders_orderlistpage_orderlistpage": "OrderListPage()" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderListPage.tsx:L25 | neighbors=[OrderListPage.tsx]
- "orders_ordertimeline_confirmation_labels": "CONFIRMATION_LABELS" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L26 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_destructive_actions": "DESTRUCTIVE_ACTIONS" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L24 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_ordertimeline": "OrderTimeline()" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L37 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_ordertimelineprops": "OrderTimelineProps" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L16 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_statusorder": "statusOrder" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L22 | neighbors=[OrderTimeline.tsx]
- "orders_page_order": "Order" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L16 | neighbors=[page.tsx]
- "orders_page_orderhistorypage": "OrderHistoryPage()" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L25 | neighbors=[page.tsx]
- "orders_page_orderitem": "OrderItem" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L10 | neighbors=[page.tsx]
- "orders_statusbadge_statusbadge": "StatusBadge()" | kind=code-symbol | source=apps/admin/src/components/orders/StatusBadge.tsx:L11 | neighbors=[StatusBadge.tsx]
- "orders_statusbadge_statusconfig": "statusConfig" | kind=code-symbol | source=apps/admin/src/components/orders/StatusBadge.tsx:L3 | neighbors=[StatusBadge.tsx]
- "page_editor_addsectionpanel_addsectionpanelprops": "AddSectionPanelProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L10 | neighbors=[AddSectionPanel.tsx]
- "page_editor_addsectionpanel_sectionoption": "SectionOption()" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L47 | neighbors=[AddSectionPanel.tsx]
- "page_editor_propeditor_propeditorprops": "PropEditorProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L13 | neighbors=[PropEditor.tsx]
- "page_editor_sectioncard_sectioncardprops": "SectionCardProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L13 | neighbors=[SectionCard.tsx]
- "pages_dashboardpage_containervariants": "containerVariants" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L10 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_dashboardpage": "DashboardPage()" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L56 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_itemvariants": "itemVariants" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L18 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_mockchartdata": "mockChartData" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L46 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_statcard": "StatCard()" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L23 | neighbors=[DashboardPage.tsx]
- "pages_loginpage_loginpage": "LoginPage()" | kind=code-symbol | source=apps/admin/src/pages/LoginPage.tsx:L14 | neighbors=[LoginPage.tsx]
- "payments_payments_controller_paymentscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L12 | neighbors=[PaymentsController]

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
