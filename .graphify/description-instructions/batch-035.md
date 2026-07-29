# Node Description Batch 36 of 51

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

- "layouts_adminlayout_adminlayout": "AdminLayout()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L197 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_appsidebar": "AppSidebar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L56 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_commandmenu": "CommandMenu()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L133 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_navitems": "navItems" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L40 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_sidebar": "Sidebar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L33 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_topbar": "Topbar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L117 | neighbors=[AdminLayout.tsx]
- "lib_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L5 | neighbors=[ApiError]
- "lib_image_loader_customimageloader": "customImageLoader()" | kind=code-symbol | source=apps/storefront/src/lib/image-loader.ts:L1 | neighbors=[image-loader.ts]
- "lib_server_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L7 | neighbors=[ApiError]
- "lib_store_cartstore": "CartStore" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L4 | neighbors=[store.ts]
- "lib_store_gensessionid": "genSessionId()" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L12 | neighbors=[store.ts]
- "load_checkout_options": "options" | kind=code-symbol | source=tests/load/checkout.js:L4 | neighbors=[checkout.js]
- "locations_locationslistpage_locationslistpage": "LocationsListPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/locations/LocationsListPage.tsx:L5 | neighbors=[LocationsListPage.tsx]
- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=apps/storefront/src/app/account/login/page.tsx:L11 | neighbors=[page.tsx]
- "marketing_promotions_promotionspage": "PromotionsPage()" | kind=code-symbol | source=apps/admin/src/pages/marketing/promotions.tsx:L8 | neighbors=[promotions.tsx]
- "mfa_page_mfaform": "MfaForm()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L12 | neighbors=[page.tsx]
- "mfa_page_mfapage": "MfaPage()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L90 | neighbors=[page.tsx]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L7 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L9 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[HostResolverMiddleware]
- "middlewares_tenant_context_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L8 | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L10 | neighbors=[TenantContextMiddleware]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-035.json

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
