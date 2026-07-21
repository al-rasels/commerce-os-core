# Node Description Batch 10 of 37

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

- "dashboard_dashboard_service_dashboardservice": "DashboardService" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L8 | neighbors=[dashboard.service.ts, .constructor(), .getStats()]
- "decorators_permissions_decorator": "permissions.decorator.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/decorators/permissions.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, RequirePermissions()]
- "dto_create_product_variant_dto": "create-product-variant.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product-variant.dto.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, CreateProductVariantDto]
- "dto_create_promotion_dto": "create-promotion.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/dto/create-promotion.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, CreatePromotionDto]
- "dto_create_shipping_rule_dto": "create-shipping-rule.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/dto/create-shipping-rule.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, CreateShippingRuleDto]
- "dto_create_tax_rule_dto": "create-tax-rule.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/dto/create-tax-rule.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, CreateTaxRuleDto]
- "dto_list_orders_query_dto": "list-orders-query.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/list-orders-query.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, ListOrdersQueryDto]
- "dto_order_status_dto": "order-status.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-status.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, OrderStatusDto, VALID_STATUSES]
- "filters_prisma_client_exception_filter": "prisma-client-exception.filter.ts" | kind=code-symbol | source=apps/api/src/common/filters/prisma-client-exception.filter.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, PrismaClientExceptionFilter]
- "filters_prisma_client_exception_filter_prismaclientexceptionfilter": "PrismaClientExceptionFilter" | kind=code-symbol | source=apps/api/src/common/filters/prisma-client-exception.filter.ts:L13 | neighbors=[prisma-client-exception.filter.ts, BaseExceptionFilter, .catch()]
- "guards_permission_guard": "permission.guard.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, PermissionGuard]
- "guards_tenant_auth_guard": "tenant-auth.guard.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, TenantAuthGuard]
- "guards_tenant_auth_guard_spec": "tenant-auth.guard.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, mockCtx()]
- "health_health_controller": "health.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/health/health.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, HealthController]
- "health_health_controller_healthcontroller": "HealthController" | kind=code-symbol | source=apps/api/src/modules/platform/health/health.controller.ts:L12 | neighbors=[health.controller.ts, .check(), .constructor()]
- "hooks_use_debounce": "use-debounce.ts" | kind=code-symbol | source=apps/storefront/src/hooks/use-debounce.ts:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, search-autocomplete.tsx, useDebounce()]
- "hooks_usedashboard": "useDashboard.ts" | kind=code-symbol | source=apps/admin/src/hooks/useDashboard.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useDashboardStats()]
- "interfaces_job_payload_interface": "job-payload.interface.ts" | kind=code-symbol | source=apps/api/src/common/interfaces/job-payload.interface.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, JobPayload]
- "jetski_gemini_loader_loader_assertvalidmaxskills": "assertValidMaxSkills()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L39 | neighbors=[loader.mjs, buildModelMessages(), resolveSkillsFromMessages()]
- "jetski_gemini_loader_loader_collectreferencedskillids": "collectReferencedSkillIds()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L24 | neighbors=[loader.mjs, buildModelMessages(), resolveSkillsFromMessages()]
- "lib_api_authrequest": "authRequest()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L23 | neighbors=[api.ts, ApiError, authRequestWithToken()]
- "lib_server_api_apierror": "ApiError" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L5 | neighbors=[server-api.ts, .constructor(), serverRequest()]
- "marketing_promotions": "promotions.tsx" | kind=code-symbol | source=apps/admin/src/pages/marketing/promotions.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, PromotionsPage()]
- "middlewares_host_resolver_middleware": "host-resolver.middleware.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, HostResolverMiddleware]
- "middlewares_host_resolver_middleware_spec": "host-resolver.middleware.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, tenant-context.ts, TenantContext]
- "order_order_item_repository_orderitemrepository": "OrderItemRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order-item.repository.ts:L7 | neighbors=[order-item.repository.ts, .constructor(), TenantScopedRepository]
- "order_order_module": "order.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, OrderModule]
- "order_order_repository_spec": "order.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, TenantContext]
- "order_order_service_orderservice_todto": ".toDto()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L125 | neighbors=[OrderService, .get(), .updateStatus()]
- "orders_orderdetailpage": "OrderDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderDetailPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, OrderDetailPage()]
- "orders_orderlistpage": "OrderListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/orders/OrderListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, OrderListPage()]
- "orders_statusbadge": "StatusBadge.tsx" | kind=code-symbol | source=apps/admin/src/components/orders/StatusBadge.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, StatusBadge(), statusConfig]
- "pages_loginpage": "LoginPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/LoginPage.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, LoginPage()]
- "payments_payments_controller_paymentscontroller": "PaymentsController" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L11 | neighbors=[payments.controller.ts, .constructor(), .createIntent()]
- "payments_payments_service_paymentsservice_handlewebhook": ".handleWebhook()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L47 | neighbors=[PaymentsService, .handlePaymentFailed(), .handlePaymentSucceeded()]
- "payments_payments_webhook_controller_paymentswebhookcontroller": "PaymentsWebhookController" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L6 | neighbors=[payments.webhook.controller.ts, .constructor(), .handleWebhook()]
- "platform_platform_module_platformmodule": "PlatformModule" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L23 | neighbors=[platform.module.ts, NestModule, .configure()]
- "prisma_prisma_module": "prisma.module.ts" | kind=code-symbol | source=apps/api/src/prisma/prisma.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, PrismaModule]
- "products_loading": "loading.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/loading.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, index.ts, Loading()]
- "promotions_promotion_repository": "promotion.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotion.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, PromotionRepository]

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
