# Node Description Batch 6 of 37

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

- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/scroll-area.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), ScrollArea(), ScrollBar()]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()]
- "users_users_controller_userscontroller": "UsersController" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L20 | neighbors=[users.controller.ts, .constructor(), .getById(), .list(), .update(), .updateStatus()]
- "users_users_repository": "users.repository.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext, UsersRepository]
- "20260716164323_init_migration_categories": "categories" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L114 | neighbors=[migration.sql, categories, tenants, products]
- "20260716164323_init_migration_orders": "orders" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L160 | neighbors=[migration.sql, order_items, customers, tenants, stock_reservations]
- "app_home_client": "home-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/home-client.tsx:L1 | neighbors=[HomeClient(), product-card.tsx, ProductCard(), 3571d3a feat(storefront): overhaul UI/U…, f1d1a16 feat: implement storefront foun…]
- "auth_auth_service_authservice_generatetokens": ".generateTokens()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L283 | neighbors=[AuthService, .login(), .mfaVerify(), .refresh(), .register()]
- "auth_auth_service_spec": "auth.service.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.spec.ts:L1 | neighbors=[tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "cart_cart_controller": "cart.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L1 | neighbors=[CartController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "catalog_catalog_module": "catalog.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L1 | neighbors=[CatalogModule, 21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, 92e2c6a feat: add checkout tenant isola…, ac49c08 chore: batch commit — catalog C…]
- "categories_categorylistpage": "CategoryListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L1 | neighbors=[buildTree(), CategoryListPage(), CategoryNode, SortableCategoryRow(), ac49c08 chore: batch commit — catalog C…]
- "components_breadcrumbs_spec": "breadcrumbs.spec.tsx" | kind=code-symbol | source=packages/components/breadcrumbs.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, breadcrumbs.tsx, Breadcrumbs(), Crumb, defaultItems]
- "components_sidebar_spec": "sidebar.spec.tsx" | kind=code-symbol | source=packages/components/sidebar.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, sidebar.tsx, Sidebar(), SidebarItem, items]
- "components_tabs_spec": "tabs.spec.tsx" | kind=code-symbol | source=packages/components/tabs.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, tabs.tsx, tabs, Tab, Tabs()]
- "components_varianteditor": "VariantEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, VariantEditor(), VariantEditorProps, VariantForm(), VariantRow()]
- "dto_order_response_dto": "order-response.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-response.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, OrderItemDto, OrderResponseDto]
- "guards_tenant_auth_guard_tenantauthguard": "TenantAuthGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L12 | neighbors=[tenant-auth.guard.ts, CanActivate, .canActivate(), .constructor(), .extractTokenFromHeader()]
- "hooks_useorders": "useOrders.ts" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useOrder(), useOrders(), useUpdateOrderStatus()]
- "jetski_gemini_loader_loader_buildmodelmessages": "buildModelMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L118 | neighbors=[loader.mjs, assertValidMaxSkills(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()]
- "order_order_controller_ordercontroller": "OrderController" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L21 | neighbors=[order.controller.ts, .constructor(), .get(), .list(), .updateStatus()]
- "page_editor_addsectionpanel": "AddSectionPanel.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AddSectionPanel(), AddSectionPanelProps, SectionOption(), index.ts]
- "promotions_promotions_controller": "promotions.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, PromotionsController, tenant-context.ts, TenantContext]
- "promotions_promotions_service": "promotions.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, PromotionsService, tenant-context.ts, TenantContext]
- "repositories_catalog_repository_spec": "catalog.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/catalog.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, tenant-context.ts, TenantContext]
- "repositories_tenant_scoped_repository_scope": "scope()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L12 | neighbors=[tenant-scoped.repository.ts, aggregate(), count(), findMany(), groupBy()]
- "repositories_tenant_scoped_repository_spec": "tenant-scoped.repository.spec.ts" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, TestRepo, tenant-context.ts, TenantContext]
- "scripts_api_validator": "api_validator.py" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_api_code(), check_openapi_spec(), find_api_files(), main()]
- "shipping_shipping_controller": "shipping.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ShippingController, tenant-context.ts, TenantContext]
- "shipping_shipping_service": "shipping.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ShippingService, tenant-context.ts, TenantContext]
- "slug_product_page_client": "product-page-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-page-client.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, page.tsx, section-renderer.tsx, SectionRenderer(), ProductPageClient()]
- "src_app_module": "app.module.ts" | kind=code-symbol | source=apps/api/src/app.module.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, AppModule]
- "super_admin_provisiontenantdialog": "ProvisionTenantDialog.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/ProvisionTenantDialog.tsx:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, PLANS, Props, ProvisionTenantDialog()]
- "tax_tax_controller": "tax.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, TaxController, tenant-context.ts, TenantContext]
- "tax_tax_service": "tax.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, TaxService, tenant-context.ts, TenantContext]
- "tenant_tenant_service": "tenant.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, tenant-context.ts, TenantContext, TenantService]
- "theme_theme_controller": "theme.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, tenant-context.ts, TenantContext, ThemeController]
- "ui_carousel_usecarousel": "useCarousel()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L35 | neighbors=[carousel.tsx, CarouselContent(), CarouselItem(), CarouselNext(), CarouselPrevious()]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/checkbox.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Checkbox()]
- "ui_data_table": "data-table.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/data-table.tsx:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, DataTable(), DataTableProps, TanStackColumn]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-005.json

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
