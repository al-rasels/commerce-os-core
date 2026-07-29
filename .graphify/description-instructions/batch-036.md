# Node Description Batch 37 of 51

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

- "orders_orderdetailpage_orderdetailpage": "OrderDetailPage()" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderDetailPage.tsx:L23 | neighbors=[OrderDetailPage.tsx]
- "orders_orderlistpage_orderlistpage": "OrderListPage()" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderListPage.tsx:L15 | neighbors=[OrderListPage.tsx]
- "orders_ordertimeline_confirmation_labels": "CONFIRMATION_LABELS" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L27 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_destructive_actions": "DESTRUCTIVE_ACTIONS" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L25 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_ordertimeline": "OrderTimeline()" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L38 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_ordertimelineprops": "OrderTimelineProps" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L17 | neighbors=[OrderTimeline.tsx]
- "orders_ordertimeline_statusorder": "statusOrder" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L23 | neighbors=[OrderTimeline.tsx]
- "orders_page_order": "Order" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L16 | neighbors=[page.tsx]
- "orders_page_orderhistorypage": "OrderHistoryPage()" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L25 | neighbors=[page.tsx]
- "orders_page_orderitem": "OrderItem" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L10 | neighbors=[page.tsx]
- "orders_statusbadge_statusbadge": "StatusBadge()" | kind=code-symbol | source=apps/admin/src/components/orders/StatusBadge.tsx:L11 | neighbors=[StatusBadge.tsx]
- "orders_statusbadge_statusconfig": "statusConfig" | kind=code-symbol | source=apps/admin/src/components/orders/StatusBadge.tsx:L3 | neighbors=[StatusBadge.tsx]
- "page_editor_addsectionpanel_addsectionpanelprops": "AddSectionPanelProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L12 | neighbors=[AddSectionPanel.tsx]
- "page_editor_addsectionpanel_sectionoption": "SectionOption()" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L49 | neighbors=[AddSectionPanel.tsx]
- "page_editor_propeditor_propeditorprops": "PropEditorProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L13 | neighbors=[PropEditor.tsx]
- "page_editor_sectioncard_sectioncardprops": "SectionCardProps" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L13 | neighbors=[SectionCard.tsx]
- "pages_dashboardpage_containervariants": "containerVariants" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L12 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_dashboardpage": "DashboardPage()" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L56 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_itemvariants": "itemVariants" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L20 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_mockchartdata": "mockChartData" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L46 | neighbors=[DashboardPage.tsx]
- "pages_dashboardpage_statcard": "StatCard()" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L25 | neighbors=[DashboardPage.tsx]
- "pages_loginpage_loginpage": "LoginPage()" | kind=code-symbol | source=apps/admin/src/pages/LoginPage.tsx:L14 | neighbors=[LoginPage.tsx]
- "payments_payments_controller_paymentscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L12 | neighbors=[PaymentsController]
- "payments_payments_controller_paymentscontroller_createintent": ".createIntent()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L16 | neighbors=[PaymentsController]
- "payments_payments_module_paymentsmodule": "PaymentsModule" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.module.ts:L25 | neighbors=[payments.module.ts]
- "payments_payments_service_paymentsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L16 | neighbors=[PaymentsService]
- "payments_payments_service_paymentsservice_createpaymentintent": ".createPaymentIntent()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L23 | neighbors=[PaymentsService]
- "payments_payments_webhook_controller_paymentswebhookcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L7 | neighbors=[PaymentsWebhookController]
- "payments_payments_webhook_controller_paymentswebhookcontroller_handlewebhook": ".handleWebhook()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L11 | neighbors=[PaymentsWebhookController]
- "platform_platform_module_nestmodule": "NestModule" | kind=code-symbol | neighbors=[PlatformModule]
- "platform_platform_module_platformmodule_configure": ".configure()" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L26 | neighbors=[PlatformModule]
- "prisma_prisma_module_prismamodule": "PrismaModule" | kind=code-symbol | source=apps/api/src/prisma/prisma.module.ts:L9 | neighbors=[prisma.module.ts]
- "prisma_prisma_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaclient": "PrismaClient" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L6 | neighbors=[PrismaService]
- "prisma_seed_main": "main()" | kind=code-symbol | source=apps/api/prisma/seed.ts:L6 | neighbors=[seed.ts]
- "prisma_seed_prisma": "prisma" | kind=code-symbol | source=apps/api/prisma/seed.ts:L4 | neighbors=[seed.ts]
- "products_loading_loading": "Loading()" | kind=code-symbol | source=apps/storefront/src/app/products/loading.tsx:L3 | neighbors=[loading.tsx]
- "products_page_productspage": "ProductsPage()" | kind=code-symbol | source=apps/storefront/src/app/products/page.tsx:L6 | neighbors=[page.tsx]
- "products_productformpage_productformpage": "ProductFormPage()" | kind=code-symbol | source=apps/admin/src/pages/products/ProductFormPage.tsx:L26 | neighbors=[ProductFormPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-036.json

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
