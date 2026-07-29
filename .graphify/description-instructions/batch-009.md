# Node Description Batch 10 of 51

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/al-rasels/commerce-os-core@4a91873404bd4be9cc50866ad56e211c7be01ebd": "4a91873 chore: add .graphify directory to git" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 4029d6f fix(commerce): resolve architec…, 4ddc1b9 fix(build): resolve type and im…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@57631e5a33eb718d94b3ec80adf15fc46eef1268": "57631e5 docs: add UI specifications, agent skills, and architectural documentat…" | kind=Commit | source=git | neighbors=[24a34d0 docs: initialize enterprise pla…, feat/admin-ui-refactor, main, 3d66d0f feat: implement payments module…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@7bea885374b1d9def6a02713ebf8470ee5510cfe": "7bea885 feat: implement full-stack authentication flow and admin entity managem…" | kind=Commit | source=git | neighbors=[6ffba43 feat: add MFA auth flow, super …, feat/admin-ui-refactor, main, 92e2c6a feat: add checkout tenant isola…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8c8bb73c781df0b5c493de636341d14ba2b0fd2e": "8c8bb73 docs: add UI component creation epic and architecture analysis document…" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, c160e7d add agent configuration and cod…, 8edc82c docs: initialize core architect…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8edc82ce07af07520560980aef5fe84913c0ecd3": "8edc82c docs: initialize core architectural, entity contract, and experience en…" | kind=Commit | source=git | neighbors=[39bac8e docs: initialize architecture, …, feat/admin-ui-refactor, main, 8c8bb73 docs: add UI component creation…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@b6a408835974e7bb71f06fe095f291264451d065": "b6a4088 docs: add initial implementation roadmap, component data contracts, pro…" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 24a34d0 docs: initialize enterprise pla…, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c160e7dc51311a70f4b4edda6a3e255344275842": "c160e7d add agent configuration and coding convention documentation" | kind=Commit | source=git | neighbors=[8c8bb73 docs: add UI component creation…, feat/admin-ui-refactor, main, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c2b0240558914e3794c0d851e8f6c88f6e2052b0": "c2b0240 chore: initialize project documentation and agent configuration files" | kind=Commit | source=git | neighbors=[c160e7d add agent configuration and cod…, feat/admin-ui-refactor, main, b6a4088 docs: add initial implementatio…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c6b41a4ae01e1072f63af1ee782316962506a011": "c6b41a4 docs: upload -docs" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 028709f chore: scaffold monorepo with a…, e425b0f docs: upload -docs] | lang=pt
- "components_buildernode_pagenode": "PageNode" | kind=code-symbol | source=apps/admin/src/pages/builder/components/BuilderNode.tsx:L4 | neighbors=[DataBindingPanel.tsx, PageBuilder.tsx, PropertyPanel.tsx, BuilderNode.tsx] | lang=en
- "components_input_group_inputgroupaddon": "InputGroupAddon()" | kind=code-symbol | source=packages/components/input-group.tsx:L46 | neighbors=[combobox.tsx, command.tsx, input-group.tsx, inputGroupAddonVariants] | lang=en
- "components_input_input": "Input()" | kind=code-symbol | source=packages/components/input.tsx:L6 | neighbors=[form-renderer.tsx, input.tsx, input-group.tsx, registry.ts] | lang=en
- "components_pagination_pagination": "Pagination()" | kind=code-symbol | source=packages/components/pagination.tsx:L25 | neighbors=[pagination.tsx, getPageNumbers(), pagination.spec.tsx, registry.ts] | lang=en
- "components_tenant_theme_provider": "tenant-theme-provider.tsx" | kind=code-symbol | source=apps/storefront/src/components/tenant-theme-provider.tsx:L1 | neighbors=[layout.tsx, e5d6c72 feat: implement end-to-end chec…, ResolvedTheme, TenantThemeProvider()] | lang=en
- "components_textarea_textarea": "Textarea()" | kind=code-symbol | source=packages/components/textarea.tsx:L5 | neighbors=[form-renderer.tsx, input-group.tsx, registry.ts, textarea.tsx] | lang=en
- "customer_customer_repository": "customer.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerRepository] | lang=en
- "customer_customer_repository_customerrepository": "CustomerRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L7 | neighbors=[customer.repository.ts, .constructor(), .findByIdWithOrders(), TenantScopedRepository] | lang=en
- "customers_customerdetailpage": "CustomerDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerDetailPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerDetailPage(), statusVariant] | lang=en
- "dashboard_dashboard_module": "dashboard.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.module.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, 92e2c6a feat: add checkout tenant isola…, ac49c08 chore: batch commit — catalog C…, DashboardModule] | lang=en
- "decorators_tenant_context_decorator": "tenant-context.decorator.ts" | kind=code-symbol | source=apps/api/src/common/decorators/tenant-context.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, GetTenantContext, tenant-context.ts, TenantContext] | lang=en
- "design_tokens_index": "index.ts" | kind=code-symbol | source=packages/design-tokens/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, tokens] | lang=en
- "dto_create_product_dto": "create-product.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, CreateProductDto] | lang=en
- "guards_permission_guard_permissionguard": "PermissionGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L6 | neighbors=[permission.guard.ts, CanActivate, .canActivate(), .constructor()] | lang=en
- "hooks_usetheme": "useTheme.ts" | kind=code-symbol | source=apps/admin/src/hooks/useTheme.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useSaveThemeOverride(), useTheme()] | lang=en
- "inventory_inventory_controller_inventorycontroller": "InventoryController" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.controller.ts:L9 | neighbors=[inventory.controller.ts, .constructor(), .getLevels(), .getLocations()] | lang=en
- "inventory_inventory_module": "inventory.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.module.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, d26bd04 feat(commerce): implement advan…, InventoryModule] | lang=en
- "inventory_inventory_module_inventorymodule": "InventoryModule" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.module.ts:L27 | neighbors=[inventory.module.ts, .constructor(), .onModuleInit(), OnModuleInit] | lang=en
- "inventory_inventory_worker_inventoryworker": "InventoryWorker" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.worker.ts:L7 | neighbors=[inventory.worker.ts, .constructor(), .process(), WorkerHost] | lang=en
- "jetski_gemini_loader_loader_resolveskillsfrommessages": "resolveSkillsFromMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L59 | neighbors=[loader.mjs, buildModelMessages(), assertValidMaxSkills(), collectReferencedSkillIds()] | lang=en
- "lib_api_apierror": "ApiError" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L3 | neighbors=[api.ts, .constructor(), authRequest(), request()] | lang=en
- "lib_server_api_serverapi": "serverApi" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L33 | neighbors=[layout.tsx, page.tsx, server-api.ts, page.tsx] | lang=en
- "middlewares_host_resolver_middleware_hostresolvermiddleware": "HostResolverMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L6 | neighbors=[host-resolver.middleware.ts, .constructor(), .use(), NestMiddleware] | lang=en
- "middlewares_tenant_context_middleware_tenantcontextmiddleware": "TenantContextMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L9 | neighbors=[tenant-context.middleware.ts, NestMiddleware, .use(), .constructor()] | lang=en
- "order_order_service_orderservice_todto": ".toDto()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L130 | neighbors=[OrderService, .get(), .updatePaymentIntentId(), .updateStatus()] | lang=en
- "orders_orderlistpage": "OrderListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, f1bfa47 feat: implement storefront orde…, OrderListPage()] | lang=en
- "page_editor_propeditor": "PropEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, PropEditor(), PropEditorProps] | lang=en
- "page_editor_sectioncard": "SectionCard.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, SectionCard(), SectionCardProps] | lang=en
- "payments_payments_controller": "payments.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, PaymentsController, tenant-context.ts, TenantContext] | lang=en
- "payments_payments_module": "payments.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 4ece707 feat(admin): port UI components…, efe67e9 fix(build): resolve component t…, PaymentsModule] | lang=en
- "prisma_prisma_service_prismaservice": "PrismaService" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L5 | neighbors=[prisma.service.ts, OnModuleInit, PrismaClient, .onModuleInit()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-009.json

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
