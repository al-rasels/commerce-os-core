# Node Description Batch 4 of 51

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

- "cart_cart_service": "cart.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L1 | neighbors=[CartService, tenant-context.ts, TenantContext, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…]
- "cart_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/cart/page.tsx:L1 | neighbors=[Cart, CartItem, CartPage(), api.ts, api, store.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@036128863f752146f939e9e65b35554752e283f7": "0361288 feat(admin): Scaffolded Phase 2 Drag and Drop Page Builder UI" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, DataBindingPanel.tsx, PageBuilder.tsx, PropertyPanel.tsx, ResponsiveEditor.tsx, 05b237f feat(admin): Implemented Page B…]
- "commit:repo:github.com/al-rasels/commerce-os-core@16cea3801f293721c67b6a6c7ef2655110945b33": "16cea38 feat(api): Implemented Meilisearch Engine and Sync Workers" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, commerce.module.ts, cf57e79 fix(schema): fixed cross-tenant…, index.ts, search.controller.ts, search.module.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@d26bd04cc7fd1177d438af4d8644700cd4bb668d": "d26bd04 feat(commerce): implement advanced inventory reservation algorithm" | kind=Commit | source=git | neighbors=[04d75c7 docs: update progress report an…, feat/admin-ui-refactor, checkout.module.ts, checkout.service.ts, f33b196 feat(docs): add Phase 6 profess…, inventory.module.ts]
- "components_add_to_cart_button": "add-to-cart-button.tsx" | kind=code-symbol | source=apps/storefront/src/components/add-to-cart-button.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AddToCartButton(), api.ts, api, store.ts, useCartStore]
- "components_alert": "alert.tsx" | kind=code-symbol | source=packages/components/alert.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants]
- "components_breadcrumbs": "breadcrumbs.tsx" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Breadcrumbs(), BreadcrumbsProps, Crumb, utils.ts, cn()]
- "components_button_button": "Button()" | kind=code-symbol | source=packages/components/button.tsx:L47 | neighbors=[alert-dialog.tsx, button.tsx, buttonVariants, combobox.tsx, dialog.tsx, form-renderer.tsx]
- "components_cart_badge": "cart-badge.tsx" | kind=code-symbol | source=apps/storefront/src/components/cart-badge.tsx:L1 | neighbors=[layout.tsx, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, cart-drawer.tsx, CartDrawer(), CartBadge()]
- "components_data_table": "data-table.tsx" | kind=code-symbol | source=packages/components/data-table.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, Column, DataTable(), DataTableProps, utils.ts]
- "components_hero": "hero.tsx" | kind=code-symbol | source=packages/components/hero.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, alignmentStyles, Hero(), HeroProps, variantStyles, utils.ts]
- "components_modal": "modal.tsx" | kind=code-symbol | source=packages/components/modal.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, efe67e9 fix(build): resolve component t…, index.ts, Modal(), ModalProps, utils.ts]
- "components_pagination": "pagination.tsx" | kind=code-symbol | source=packages/components/pagination.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, getPageNumbers(), Pagination(), PaginationProps, utils.ts]
- "components_progress": "progress.tsx" | kind=code-symbol | source=packages/components/progress.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Progress(), ProgressIndicator(), ProgressLabel(), ProgressTrack()]
- "components_select": "select.tsx" | kind=code-symbol | source=packages/components/select.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, form-renderer.tsx, index.ts, registry.ts, Select(), SelectOption]
- "components_sidebar": "sidebar.tsx" | kind=code-symbol | source=packages/components/sidebar.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Sidebar(), SidebarItem, SidebarProps]
- "components_tabs": "tabs.tsx" | kind=code-symbol | source=packages/components/tabs.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Tab, Tabs(), TabsProps]
- "inventory_inventory_service_inventoryservice": "InventoryService" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.service.ts:L10 | neighbors=[inventory.service.ts, .confirmReservation(), .constructor(), .getLevels(), .getLocations(), .releaseExpiredReservations()]
- "lib_store": "store.ts" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L1 | neighbors=[cart-drawer.tsx, page.tsx, page.tsx, ac49c08 chore: batch commit — catalog C…, add-to-cart-button.tsx, cart-badge.tsx]
- "order_order_service": "order.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, OrderService]
- "order_order_service_orderservice": "OrderService" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L19 | neighbors=[order.service.ts, .constructor(), .createOrder(), .get(), .getDashboardStats(), .list()]
- "orders_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L1 | neighbors=[b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, Order, OrderHistoryPage()]
- "payments_payments_service": "payments.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, bb279ee fix(ci): fix api tests and lint…, efe67e9 fix(build): resolve component t…]
- "promotions_promotions_service_promotionsservice": "PromotionsService" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L12 | neighbors=[promotions.service.ts, .constructor(), .createPromotion(), .deletePromotion(), .getPromotion(), .incrementUsage()]
- "scripts_ts_diagnostic_main": "main()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L184 | neighbors=[ts_diagnostic.py, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "src_app": "App.tsx" | kind=code-symbol | source=apps/admin/src/App.tsx:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 0361288 feat(admin): Scaffolded Phase 2…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…]
- "storefront_storefront_controller": "storefront.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L1 | neighbors=[4ece707 feat(admin): port UI components…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, prisma.service.ts]
- "ui_input_group": "input-group.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants]
- "ui_label_label": "Label()" | kind=code-symbol | source=apps/storefront/src/components/ui/label.tsx:L7 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, page.tsx, page.tsx]
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink()]
- "ui_table": "table.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Table(), TableBody(), TableCaption(), TableCell(), TableFooter()]
- "admin_admin_controller_admincontroller": "AdminController" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L18 | neighbors=[admin.controller.ts, .constructor(), .getTenant(), .listTenants(), .provisionTenant(), .suspendTenant()]
- "admin_admin_service_adminservice": "AdminService" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L11 | neighbors=[admin.service.ts, .constructor(), .getTenant(), .listTenants(), .provisionTenant(), .suspendTenant()]
- "api_pages": "pages.ts" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L1 | neighbors=[index.ts, client.ts, api, PageLayout, pagesApi, PageSection]
- "auth_auth_service_spec": "auth.service.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.spec.ts:L1 | neighbors=[tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…, 4ece707 feat(admin): port UI components…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "cart_cart_controller_cartcontroller": "CartController" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L22 | neighbors=[cart.controller.ts, .addItem(), .clearCart(), .constructor(), .create(), .get()]
- "catalog_catalog_controller": "catalog.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L1 | neighbors=[CatalogController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "commerce_commerce_module": "commerce.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L1 | neighbors=[CommerceModule, 16cea38 feat(api): Implemented Meilisea…, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "commit:repo:github.com/al-rasels/commerce-os-core@05b237ffeb2f300e5916b05c19cc2f12ac187ee1": "05b237f feat(admin): Implemented Page Builder Property and Data Binding Panels" | kind=Commit | source=git | neighbors=[0361288 feat(admin): Scaffolded Phase 2…, feat/admin-ui-refactor, DataBindingPanel.tsx, PageBuilder.tsx, PropertyPanel.tsx, 67df34f feat(api): Setup BullMQ backgro…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-003.json

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
