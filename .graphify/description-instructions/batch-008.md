# Node Description Batch 9 of 37

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

- "builder_builder_module": "builder.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.module.ts:L1 | neighbors=[BuilderModule, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…] | lang=en
- "cache_tenant_cache_service": "tenant-cache.service.ts" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L1 | neighbors=[TenantCacheService, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …] | lang=en
- "cart_cart_drawer_cartdrawer": "CartDrawer()" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L28 | neighbors=[cart-drawer.tsx, formatPrice(), cart-badge.tsx] | lang=en
- "catalog_catalog_e2e_spec": "catalog.e2e-spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.e2e-spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …] | lang=en
- "checkout_checkout_controller_checkoutcontroller": "CheckoutController" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L11 | neighbors=[checkout.controller.ts, .checkout(), .constructor()] | lang=en
- "checkout_checkout_service_checkoutservice": "CheckoutService" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L14 | neighbors=[checkout.service.ts, .checkout(), .constructor()] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@24a34d045a14d261a746ac5d5928be948832036d": "24a34d0 docs: initialize enterprise plan, system design documentation, and API …" | kind=Commit | source=git | neighbors=[main, 57631e5 docs: add UI specifications, ag…, b6a4088 docs: add initial implementatio…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@39bac8e1aa8ff382bccf8de537230e7af6e9d136": "39bac8e docs: initialize architecture, data contracts, and project documentatio…" | kind=Commit | source=git | neighbors=[21888ff feat: implement commerce, catal…, main, 8edc82c docs: initialize core architect…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@57631e5a33eb718d94b3ec80adf15fc46eef1268": "57631e5 docs: add UI specifications, agent skills, and architectural documentat…" | kind=Commit | source=git | neighbors=[24a34d0 docs: initialize enterprise pla…, main, 3d66d0f feat: implement payments module…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@7bea885374b1d9def6a02713ebf8470ee5510cfe": "7bea885 feat: implement full-stack authentication flow and admin entity managem…" | kind=Commit | source=git | neighbors=[6ffba43 feat: add MFA auth flow, super …, main, 92e2c6a feat: add checkout tenant isola…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8c8bb73c781df0b5c493de636341d14ba2b0fd2e": "8c8bb73 docs: add UI component creation epic and architecture analysis document…" | kind=Commit | source=git | neighbors=[main, c160e7d add agent configuration and cod…, 8edc82c docs: initialize core architect…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8edc82ce07af07520560980aef5fe84913c0ecd3": "8edc82c docs: initialize core architectural, entity contract, and experience en…" | kind=Commit | source=git | neighbors=[39bac8e docs: initialize architecture, …, main, 8c8bb73 docs: add UI component creation…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@b6a408835974e7bb71f06fe095f291264451d065": "b6a4088 docs: add initial implementation roadmap, component data contracts, pro…" | kind=Commit | source=git | neighbors=[main, 24a34d0 docs: initialize enterprise pla…, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c160e7dc51311a70f4b4edda6a3e255344275842": "c160e7d add agent configuration and coding convention documentation" | kind=Commit | source=git | neighbors=[8c8bb73 docs: add UI component creation…, main, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c2b0240558914e3794c0d851e8f6c88f6e2052b0": "c2b0240 chore: initialize project documentation and agent configuration files" | kind=Commit | source=git | neighbors=[c160e7d add agent configuration and cod…, main, b6a4088 docs: add initial implementatio…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c6b41a4ae01e1072f63af1ee782316962506a011": "c6b41a4 docs: upload -docs" | kind=Commit | source=git | neighbors=[main, 028709f chore: scaffold monorepo with a…, e425b0f docs: upload -docs] | lang=pt
- "components_auth_guard": "auth-guard.tsx" | kind=code-symbol | source=apps/storefront/src/components/auth-guard.tsx:L1 | neighbors=[page.tsx, 6ffba43 feat: add MFA auth flow, super …, AuthGuard()] | lang=en
- "components_breadcrumbs_breadcrumbs": "Breadcrumbs()" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L17 | neighbors=[breadcrumbs.tsx, breadcrumbs.spec.tsx, registry.ts] | lang=en
- "components_button_button": "Button()" | kind=code-symbol | source=packages/components/button.tsx:L24 | neighbors=[button.tsx, form-renderer.tsx, registry.ts] | lang=en
- "components_input_input": "Input()" | kind=code-symbol | source=packages/components/input.tsx:L9 | neighbors=[form-renderer.tsx, input.tsx, registry.ts] | lang=en
- "components_json_ld": "json-ld.tsx" | kind=code-symbol | source=apps/storefront/src/components/json-ld.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, JsonLd(), page.tsx] | lang=en
- "components_mediauploadwidget": "MediaUploadWidget.tsx" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, MediaUploadWidget(), MediaUploadWidgetProps] | lang=en
- "components_modal_modal": "Modal()" | kind=code-symbol | source=packages/components/modal.tsx:L15 | neighbors=[modal.tsx, modal.spec.tsx, registry.ts] | lang=en
- "components_modal_spec": "modal.spec.tsx" | kind=code-symbol | source=packages/components/modal.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, modal.tsx, Modal()] | lang=en
- "components_pagination_spec": "pagination.spec.tsx" | kind=code-symbol | source=packages/components/pagination.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, pagination.tsx, Pagination()] | lang=en
- "components_richtexteditor": "RichTextEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, RichTextEditor(), RichTextEditorProps] | lang=en
- "components_search_bar_searchbar": "SearchBar()" | kind=code-symbol | source=packages/components/search-bar.tsx:L13 | neighbors=[registry.ts, search-bar.tsx, search-bar.spec.tsx] | lang=en
- "components_search_bar_spec": "search-bar.spec.tsx" | kind=code-symbol | source=packages/components/search-bar.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, search-bar.tsx, SearchBar()] | lang=en
- "components_section_renderer_sectionrenderer": "SectionRenderer()" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L37 | neighbors=[page.tsx, section-renderer.tsx, product-page-client.tsx] | lang=en
- "components_select_select": "Select()" | kind=code-symbol | source=packages/components/select.tsx:L19 | neighbors=[form-renderer.tsx, registry.ts, select.tsx] | lang=en
- "components_sidebar_sidebar": "Sidebar()" | kind=code-symbol | source=packages/components/sidebar.tsx:L23 | neighbors=[registry.ts, sidebar.tsx, sidebar.spec.tsx] | lang=en
- "components_tabs_tabs": "Tabs()" | kind=code-symbol | source=packages/components/tabs.tsx:L18 | neighbors=[registry.ts, tabs.tsx, tabs.spec.tsx] | lang=en
- "components_textarea_textarea": "Textarea()" | kind=code-symbol | source=packages/components/textarea.tsx:L9 | neighbors=[form-renderer.tsx, registry.ts, textarea.tsx] | lang=en
- "components_theme_provider": "theme-provider.tsx" | kind=code-symbol | source=apps/storefront/src/components/theme-provider.tsx:L1 | neighbors=[layout.tsx, 3571d3a feat(storefront): overhaul UI/U…, ThemeProvider()] | lang=en
- "customer_customer_module": "customer.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 92e2c6a feat: add checkout tenant isola…, CustomerModule] | lang=en
- "customer_customer_repository_spec": "customer.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, TenantContext] | lang=en
- "customer_customer_service_customerservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L53 | neighbors=[CustomerService, .remove(), .update()] | lang=en
- "customers_customerformpage": "CustomerFormPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerFormPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerFormPage()] | lang=en
- "customers_customerlistpage": "CustomerListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerListPage()] | lang=en
- "dashboard_dashboard_controller_dashboardcontroller": "DashboardController" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L10 | neighbors=[dashboard.controller.ts, .constructor(), .stats()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-008.json

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
