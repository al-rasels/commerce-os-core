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

- "hooks_usevariants_usevariants": "useVariants()" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L5 | neighbors=[useVariants.ts]
- "interfaces_job_payload_interface_jobpayload": "JobPayload" | kind=code-symbol | source=apps/api/src/common/interfaces/job-payload.interface.ts:L5 | neighbors=[job-payload.interface.ts]
- "inventory_inventory_controller_inventorycontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.controller.ts:L10 | neighbors=[InventoryController]
- "inventory_inventory_controller_inventorycontroller_getlevels": ".getLevels()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.controller.ts:L18 | neighbors=[InventoryController]
- "inventory_inventory_controller_inventorycontroller_getlocations": ".getLocations()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.controller.ts:L13 | neighbors=[InventoryController]
- "inventory_inventory_module_inventorymodule_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.module.ts:L28 | neighbors=[InventoryModule]
- "inventory_inventory_module_inventorymodule_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.module.ts:L30 | neighbors=[InventoryModule]
- "inventory_inventory_module_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[InventoryModule]
- "inventory_inventory_service_inventoryservice_confirmreservation": ".confirmReservation()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L68 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L11 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_getlevels": ".getLevels()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L23 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_getlocations": ".getLocations()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L17 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_releaseexpiredreservations": ".releaseExpiredReservations()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L53 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_releasereservation": ".releaseReservation()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L75 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_reservestock": ".reserveStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L30 | neighbors=[InventoryService]
- "inventory_inventory_service_inventoryservice_restock": ".restock()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L90 | neighbors=[InventoryService]
- "inventory_inventory_worker_inventoryworker_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.worker.ts:L10 | neighbors=[InventoryWorker]
- "inventory_inventory_worker_inventoryworker_process": ".process()" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.worker.ts:L14 | neighbors=[InventoryWorker]
- "inventory_inventory_worker_workerhost": "WorkerHost" | kind=code-symbol | neighbors=[InventoryWorker]
- "jetski_gemini_loader_loader_loadskillindex": "loadSkillIndex()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L47 | neighbors=[loader.mjs]
- "layouts_adminlayout_adminlayout": "AdminLayout()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L208 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_appsidebar": "AppSidebar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L67 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_commandmenu": "CommandMenu()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L144 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_globalloader": "GlobalLoader()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L42 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_navitems": "navItems" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L51 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_sidebar": "Sidebar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L33 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_topbar": "Topbar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L128 | neighbors=[AdminLayout.tsx]
- "lib_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L5 | neighbors=[ApiError]
- "lib_image_loader_customimageloader": "customImageLoader()" | kind=code-symbol | source=apps/storefront/src/lib/image-loader.ts:L1 | neighbors=[image-loader.ts]
- "lib_server_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L7 | neighbors=[ApiError]
- "lib_store_cartstore": "CartStore" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L4 | neighbors=[store.ts]
- "lib_store_gensessionid": "genSessionId()" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L12 | neighbors=[store.ts]
- "load_checkout_options": "options" | kind=code-symbol | source=tests/load/checkout.js:L4 | neighbors=[checkout.js]
- "locations_locationslistpage_locationslistpage": "LocationsListPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/locations/LocationsListPage.tsx:L5 | neighbors=[LocationsListPage.tsx]
- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=apps/storefront/src/app/account/login/page.tsx:L13 | neighbors=[page.tsx]
- "marketing_promotions_promotionspage": "PromotionsPage()" | kind=code-symbol | source=apps/admin/src/pages/marketing/promotions.tsx:L8 | neighbors=[promotions.tsx]
- "mfa_page_mfaform": "MfaForm()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L12 | neighbors=[page.tsx]
- "mfa_page_mfapage": "MfaPage()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L90 | neighbors=[page.tsx]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L7 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L9 | neighbors=[HostResolverMiddleware]

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
