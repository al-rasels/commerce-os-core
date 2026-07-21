# Node Description Batch 5 of 37

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

- "storefront_storefront_cart_controller": "storefront-cart.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, prisma.service.ts, StorefrontCartController, tenant-context.ts]
- "storefront_storefront_checkout_controller": "storefront-checkout.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, prisma.service.ts, StorefrontCheckoutController, tenant-context.ts]
- "tax_tax_controller_taxcontroller": "TaxController" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L22 | neighbors=[tax.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, utils.ts, cn(), Accordion(), AccordionContent(), AccordionItem()]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount()]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()]
- "users_users_repository_usersrepository": "UsersRepository" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.ts:L8 | neighbors=[users.repository.ts, TenantScopedRepository, .constructor(), .findManyWithRole(), .findUniqueWithRole(), .findUniqueWithRoleFull()]
- "20260716164323_init_migration_product_variants": "product_variants" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L99 | neighbors=[migration.sql, cart_items, order_items, products, tenants, stock_reservations]
- "api_experience": "experience.ts" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L1 | neighbors=[client.ts, api, ResolvedTheme, themeApi, index.ts, ac49c08 chore: batch commit — catalog C…]
- "api_promotions": "promotions.ts" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L1 | neighbors=[index.ts, client.ts, api, Promotion, promotionsApi, 6ffba43 feat: add MFA auth flow, super …]
- "api_shipping": "shipping.ts" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L1 | neighbors=[index.ts, client.ts, api, shippingApi, ShippingRule, 6ffba43 feat: add MFA auth flow, super …]
- "api_tax": "tax.ts" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L1 | neighbors=[index.ts, client.ts, api, taxApi, TaxRule, 6ffba43 feat: add MFA auth flow, super …]
- "builder_builder_controller_buildercontroller": "BuilderController" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L17 | neighbors=[builder.controller.ts, .constructor(), .getPageLayout(), .publishPageLayout(), .unpublishPageLayout(), .updatePageLayout()]
- "builder_builder_service_builderservice": "BuilderService" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L6 | neighbors=[builder.service.ts, .constructor(), .getPageLayout(), .publishPageLayout(), .unpublishPageLayout(), .updatePageLayout()]
- "cache_tenant_cache_service_tenantcacheservice": "TenantCacheService" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L6 | neighbors=[tenant-cache.service.ts, .constructor(), .del(), .generateKey(), .get(), .set()]
- "cart_cart_service": "cart.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L1 | neighbors=[CartService, tenant-context.ts, TenantContext, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "checkout_checkout_service": "checkout.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L1 | neighbors=[CheckoutService, tenant-context.ts, TenantContext, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "commerce_commerce_module": "commerce.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L1 | neighbors=[CommerceModule, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…]
- "components_section_schema": "section-schema.ts" | kind=code-symbol | source=packages/components/section-schema.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, PropSchema, PropType, SectionSchema, sectionSchemas]
- "customer_customer_controller": "customer.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerController, tenant-context.ts, TenantContext]
- "customer_customer_service": "customer.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerService, tenant-context.ts, TenantContext]
- "dashboard_dashboard_controller": "dashboard.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, DashboardController, tenant-context.ts, TenantContext]
- "dashboard_dashboard_service": "dashboard.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, DashboardService, tenant-context.ts, TenantContext]
- "hooks_usecategories": "useCategories.ts" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCategories(), useCreateCategory(), useDeleteCategory(), useUpdateCategory()]
- "hooks_usepages": "usePages.ts" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, usePageLayout(), usePublishPageLayout(), useSavePageLayout(), useUnpublishPageLayout()]
- "lib_store_usecartstore": "useCartStore" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L15 | neighbors=[cart-drawer.tsx, page.tsx, page.tsx, add-to-cart-button.tsx, cart-badge.tsx, store.ts]
- "middlewares_tenant_context_middleware": "tenant-context.middleware.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, TenantContextMiddleware, tenant-context.ts, TenantContext]
- "order_order_controller": "order.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, OrderController, tenant-context.ts, TenantContext]
- "order_order_repository_orderrepository": "OrderRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L8 | neighbors=[order.repository.ts, .constructor(), .fulfillStock(), .releaseStock(), .update(), TenantScopedRepository]
- "payments_payments_service": "payments.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, PaymentsService, tenant-context.ts, TenantContext]
- "payments_payments_service_paymentsservice": "PaymentsService" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L12 | neighbors=[payments.service.ts, .constructor(), .createPaymentIntent(), .handlePaymentFailed(), .handlePaymentSucceeded(), .handleWebhook()]
- "platform_platform_module": "platform.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, PlatformModule]
- "storefront_storefront_cart_controller_storefrontcartcontroller": "StorefrontCartController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L18 | neighbors=[storefront-cart.controller.ts, .addItem(), .createCart(), .getCart(), .removeItem(), .updateItem()]
- "storefront_storefront_order_controller": "storefront-order.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, prisma.service.ts, StorefrontOrderController, tenant-context.ts, TenantContext]
- "success_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/checkout/success/page.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, api.ts, api, CheckoutSuccessPage(), SuccessContent()]
- "tenant_tenant_admin_controller": "tenant-admin.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, b121f53 some-things, d6163bc docs: update PROGRESS_REPORT.md…, TenantAdminController, tenant-context.ts, TenantContext]
- "ui_alert": "alert.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Badge(), badgeVariants]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Progress(), ProgressIndicator(), ProgressLabel(), ProgressTrack(), ProgressValue()]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/radio-group.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), RadioGroup(), RadioGroupItem()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-004.json

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
