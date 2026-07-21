# Node Description Batch 3 of 37

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

- "cart_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/cart/page.tsx:L1 | neighbors=[Cart, CartItem, CartPage(), api.ts, api, store.ts]
- "components_add_to_cart_button": "add-to-cart-button.tsx" | kind=code-symbol | source=apps/storefront/src/components/add-to-cart-button.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AddToCartButton(), api.ts, api, store.ts, useCartStore]
- "components_breadcrumbs": "breadcrumbs.tsx" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Breadcrumbs(), BreadcrumbsProps, Crumb, utils.ts, cn()]
- "components_hero": "hero.tsx" | kind=code-symbol | source=packages/components/hero.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, alignmentStyles, Hero(), HeroProps, variantStyles, utils.ts]
- "components_pagination": "pagination.tsx" | kind=code-symbol | source=packages/components/pagination.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, getPageNumbers(), Pagination(), PaginationProps, utils.ts]
- "components_select": "select.tsx" | kind=code-symbol | source=packages/components/select.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, form-renderer.tsx, index.ts, registry.ts, Select(), SelectOption]
- "components_sidebar": "sidebar.tsx" | kind=code-symbol | source=packages/components/sidebar.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Sidebar(), SidebarItem, SidebarProps]
- "components_tabs": "tabs.tsx" | kind=code-symbol | source=packages/components/tabs.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Tab, Tabs(), TabsProps]
- "lib_store": "store.ts" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L1 | neighbors=[cart-drawer.tsx, page.tsx, page.tsx, ac49c08 chore: batch commit — catalog C…, add-to-cart-button.tsx, cart-badge.tsx]
- "orders_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/orders/page.tsx:L1 | neighbors=[b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, Order, OrderHistoryPage()]
- "promotions_promotions_service_promotionsservice": "PromotionsService" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L12 | neighbors=[promotions.service.ts, .constructor(), .createPromotion(), .deletePromotion(), .getPromotion(), .incrementUsage()]
- "scripts_ts_diagnostic_main": "main()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L184 | neighbors=[ts_diagnostic.py, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "ui_input_group": "input-group.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants]
- "ui_label_label": "Label()" | kind=code-symbol | source=apps/storefront/src/components/ui/label.tsx:L7 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, page.tsx, page.tsx]
- "ui_table": "table.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Table(), TableBody(), TableCaption(), TableCell(), TableFooter()]
- "admin_admin_controller_admincontroller": "AdminController" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L18 | neighbors=[admin.controller.ts, .constructor(), .getTenant(), .listTenants(), .provisionTenant(), .suspendTenant()]
- "admin_admin_service_adminservice": "AdminService" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L11 | neighbors=[admin.service.ts, .constructor(), .getTenant(), .listTenants(), .provisionTenant(), .suspendTenant()]
- "api_dashboard": "dashboard.ts" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L1 | neighbors=[client.ts, api, dashboardApi, DashboardStats, orders.ts, Order]
- "builder_builder_controller": "builder.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L1 | neighbors=[BuilderController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6eb89d7 chore(tech-debt): resolve techn…]
- "cart_cart_controller_cartcontroller": "CartController" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L22 | neighbors=[cart.controller.ts, .addItem(), .clearCart(), .constructor(), .create(), .get()]
- "components_cart_badge": "cart-badge.tsx" | kind=code-symbol | source=apps/storefront/src/components/cart-badge.tsx:L1 | neighbors=[layout.tsx, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, cart-drawer.tsx, CartDrawer(), CartBadge()]
- "components_data_table": "data-table.tsx" | kind=code-symbol | source=packages/components/data-table.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Column, DataTable(), DataTableProps, utils.ts, cn()]
- "components_footer": "footer.tsx" | kind=code-symbol | source=packages/components/footer.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Footer(), FooterProps, socialIconLabels, utils.ts, cn()]
- "components_gallery": "gallery.tsx" | kind=code-symbol | source=packages/components/gallery.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Gallery(), GalleryProps, variantStyles, utils.ts, cn()]
- "components_input": "input.tsx" | kind=code-symbol | source=packages/components/input.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, form-renderer.tsx, index.ts, Input(), InputProps, utils.ts]
- "components_modal": "modal.tsx" | kind=code-symbol | source=packages/components/modal.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, Modal(), ModalProps, utils.ts, cn()]
- "components_product_card_productcard": "ProductCard()" | kind=code-symbol | source=packages/components/product-card.tsx:L20 | neighbors=[home-client.tsx, product-card.tsx, formatPrice(), product-grid.tsx, registry.ts, products-client.tsx]
- "components_search_bar": "search-bar.tsx" | kind=code-symbol | source=packages/components/search-bar.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, SearchBar(), SearchBarProps, utils.ts]
- "components_testimonials": "testimonials.tsx" | kind=code-symbol | source=packages/components/testimonials.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, Stars(), Testimonials(), TestimonialsProps]
- "components_textarea": "textarea.tsx" | kind=code-symbol | source=packages/components/textarea.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, form-renderer.tsx, index.ts, registry.ts, Textarea(), TextareaProps]
- "contexts_authcontext": "AuthContext.tsx" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, AuthContext, AuthContextType, AuthProvider(), AuthUser]
- "customer_customer_service_customerservice": "CustomerService" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L11 | neighbors=[customer.service.ts, .constructor(), .countActive(), .create(), .get(), .list()]
- "hooks_usecustomers": "useCustomers.ts" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, useCreateCustomer(), useCustomer(), useCustomers()]
- "order_order_service": "order.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, OrderService, VALID_TRANSITIONS]
- "order_order_service_orderservice": "OrderService" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L19 | neighbors=[order.service.ts, .constructor(), .createOrder(), .get(), .getDashboardStats(), .list()]
- "pages_dashboardpage": "DashboardPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, containerVariants, DashboardPage(), itemVariants]
- "products_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, e5d6c72 feat: implement end-to-end chec…, api.ts, api, ProductsPage()]
- "redis_redis_service_redisservice": "RedisService" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L10 | neighbors=[redis.service.ts, OnModuleDestroy, OnModuleInit, .del(), .get(), .onModuleDestroy()]
- "shipping_shipping_service_shippingservice": "ShippingService" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L8 | neighbors=[shipping.service.ts, .calculateShippingOptions(), .constructor(), .createRule(), .deleteRule(), .getRule()]
- "src_main": "main.ts" | kind=code-symbol | source=apps/api/src/main.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, App.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-002.json

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
