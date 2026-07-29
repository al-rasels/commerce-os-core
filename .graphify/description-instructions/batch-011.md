# Node Description Batch 12 of 51

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "builder_responsiveeditor": "ResponsiveEditor.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/ResponsiveEditor.tsx:L1 | neighbors=[PageBuilder.tsx, ResponsiveEditor(), 0361288 feat(admin): Scaffolded Phase 2…]
- "cache_tenant_cache_service": "tenant-cache.service.ts" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L1 | neighbors=[TenantCacheService, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …]
- "cart_cart_drawer_cartdrawer": "CartDrawer()" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L29 | neighbors=[cart-drawer.tsx, formatPrice(), cart-badge.tsx]
- "cart_cart_module": "cart.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.module.ts:L1 | neighbors=[CartModule, 3d66d0f feat: implement payments module…, efe67e9 fix(build): resolve component t…]
- "catalog_catalog_e2e_spec": "catalog.e2e-spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.e2e-spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "checkout_checkout_controller_checkoutcontroller": "CheckoutController" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L11 | neighbors=[checkout.controller.ts, .checkout(), .constructor()]
- "checkout_checkout_service_checkoutservice": "CheckoutService" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L15 | neighbors=[checkout.service.ts, .checkout(), .constructor()]
- "commit:repo:github.com/al-rasels/commerce-os-core@cf57e798ebc8e04f2a2744ecdf8c12b680428001": "cf57e79 fix(schema): fixed cross-tenant promotion code uniqueness leak" | kind=Commit | source=git | neighbors=[16cea38 feat(api): Implemented Meilisea…, feat/admin-ui-refactor, 65feb38 feat(api): Integrated Promotion…]
- "commit:repo:github.com/al-rasels/commerce-os-core@d0fde76553f92a0022462d829d545811c4570bfa": "d0fde76 docs: Added full project task specs for remaining phases" | kind=Commit | source=git | neighbors=[65feb38 feat(api): Integrated Promotion…, feat/admin-ui-refactor, efe67e9 fix(build): resolve component t…]
- "commit:repo:github.com/al-rasels/commerce-os-core@e425b0fe05c57b1d70b777d9bf2ad1286a3a0a59": "e425b0f docs: upload -docs" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, c6b41a4 docs: upload -docs]
- "components_auth_guard": "auth-guard.tsx" | kind=code-symbol | source=apps/storefront/src/components/auth-guard.tsx:L1 | neighbors=[page.tsx, 6ffba43 feat: add MFA auth flow, super …, AuthGuard()]
- "components_breadcrumbs_breadcrumbs": "Breadcrumbs()" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L17 | neighbors=[breadcrumbs.tsx, breadcrumbs.spec.tsx, registry.ts]
- "components_cart_badge_cartbadge": "CartBadge()" | kind=code-symbol | source=apps/storefront/src/components/cart-badge.tsx:L8 | neighbors=[layout.tsx, cart-badge.tsx, floating-header.tsx]
- "components_chart_usechart": "useChart()" | kind=code-symbol | source=packages/components/chart.tsx:L31 | neighbors=[chart.tsx, ChartLegendContent(), ChartTooltipContent()]
- "components_draggableelement": "DraggableElement.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/components/DraggableElement.tsx:L1 | neighbors=[PageBuilder.tsx, 05b237f feat(admin): Implemented Page B…, DraggableElement()]
- "components_input_group_inputgroup": "InputGroup()" | kind=code-symbol | source=packages/components/input-group.tsx:L11 | neighbors=[combobox.tsx, command.tsx, input-group.tsx]
- "components_input_group_inputgroupbutton": "InputGroupButton()" | kind=code-symbol | source=packages/components/input-group.tsx:L86 | neighbors=[combobox.tsx, input-group.tsx, inputGroupButtonVariants]
- "components_json_ld": "json-ld.tsx" | kind=code-symbol | source=apps/storefront/src/components/json-ld.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, JsonLd(), page.tsx]
- "components_mediauploadwidget": "MediaUploadWidget.tsx" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, MediaUploadWidget(), MediaUploadWidgetProps]
- "components_modal_modal": "Modal()" | kind=code-symbol | source=packages/components/modal.tsx:L16 | neighbors=[modal.tsx, modal.spec.tsx, registry.ts]
- "components_modal_spec": "modal.spec.tsx" | kind=code-symbol | source=packages/components/modal.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, modal.tsx, Modal()]
- "components_pagination_spec": "pagination.spec.tsx" | kind=code-symbol | source=packages/components/pagination.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, pagination.tsx, Pagination()]
- "components_richtexteditor": "RichTextEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, RichTextEditor(), RichTextEditorProps]
- "components_search_autocomplete_searchautocomplete": "SearchAutocomplete()" | kind=code-symbol | source=apps/storefront/src/components/search-autocomplete.tsx:L11 | neighbors=[layout.tsx, floating-header.tsx, search-autocomplete.tsx]
- "components_search_bar_searchbar": "SearchBar()" | kind=code-symbol | source=packages/components/search-bar.tsx:L13 | neighbors=[registry.ts, search-bar.tsx, search-bar.spec.tsx]
- "components_search_bar_spec": "search-bar.spec.tsx" | kind=code-symbol | source=packages/components/search-bar.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, search-bar.tsx, SearchBar()]
- "components_section_renderer_sectionrenderer": "SectionRenderer()" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L43 | neighbors=[page.tsx, section-renderer.tsx, product-page-client.tsx]
- "components_select_select": "Select()" | kind=code-symbol | source=packages/components/select.tsx:L19 | neighbors=[form-renderer.tsx, registry.ts, select.tsx]
- "components_sidebar_sidebar": "Sidebar()" | kind=code-symbol | source=packages/components/sidebar.tsx:L23 | neighbors=[registry.ts, sidebar.tsx, sidebar.spec.tsx]
- "components_tabs_tabs": "Tabs()" | kind=code-symbol | source=packages/components/tabs.tsx:L18 | neighbors=[registry.ts, tabs.tsx, tabs.spec.tsx]
- "components_theme_provider": "theme-provider.tsx" | kind=code-symbol | source=apps/storefront/src/components/theme-provider.tsx:L1 | neighbors=[layout.tsx, 3571d3a feat(storefront): overhaul UI/U…, ThemeProvider()]
- "customer_customer_module": "customer.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 92e2c6a feat: add checkout tenant isola…, CustomerModule]
- "customer_customer_service_customerservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L53 | neighbors=[CustomerService, .remove(), .update()]
- "customers_customerformpage": "CustomerFormPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerFormPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerFormPage()]
- "customers_customerlistpage": "CustomerListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerListPage()]
- "dashboard_dashboard_controller_dashboardcontroller": "DashboardController" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L10 | neighbors=[dashboard.controller.ts, .constructor(), .stats()]
- "dashboard_dashboard_service_dashboardservice": "DashboardService" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L8 | neighbors=[dashboard.service.ts, .constructor(), .getStats()]
- "decorators_permissions_decorator": "permissions.decorator.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/decorators/permissions.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, RequirePermissions()]
- "dto_create_product_variant_dto": "create-product-variant.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product-variant.dto.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, CreateProductVariantDto]
- "dto_create_promotion_dto": "create-promotion.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/dto/create-promotion.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, CreatePromotionDto]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-011.json

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
