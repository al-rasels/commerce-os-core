# Node Description Batch 23 of 37

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

- "customer_customer_controller_customercontroller_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L64 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L54 | neighbors=[CustomerController]
- "customer_customer_module_customermodule": "CustomerModule" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.module.ts:L11 | neighbors=[customer.module.ts]
- "customer_customer_repository_customerrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L8 | neighbors=[CustomerRepository]
- "customer_customer_repository_customerrepository_findbyidwithorders": ".findByIdWithOrders()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L12 | neighbors=[CustomerRepository]
- "customer_customer_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CustomerRepository]
- "customer_customer_service_customerservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L12 | neighbors=[CustomerService]
- "customer_customer_service_customerservice_countactive": ".countActive()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L73 | neighbors=[CustomerService]
- "customer_customer_service_customerservice_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L14 | neighbors=[CustomerService]
- "customer_customer_service_customerservice_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L24 | neighbors=[CustomerService]
- "customers_customerdetailpage_customerdetailpage": "CustomerDetailPage()" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerDetailPage.tsx:L29 | neighbors=[CustomerDetailPage.tsx]
- "customers_customerdetailpage_statusvariant": "statusVariant" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerDetailPage.tsx:L21 | neighbors=[CustomerDetailPage.tsx]
- "customers_customerformpage_customerformpage": "CustomerFormPage()" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerFormPage.tsx:L15 | neighbors=[CustomerFormPage.tsx]
- "customers_customerlistpage_customerlistpage": "CustomerListPage()" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerListPage.tsx:L24 | neighbors=[CustomerListPage.tsx]
- "dashboard_dashboard_controller_dashboardcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L11 | neighbors=[DashboardController]
- "dashboard_dashboard_controller_dashboardcontroller_stats": ".stats()" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.controller.ts:L15 | neighbors=[DashboardController]
- "dashboard_dashboard_module_dashboardmodule": "DashboardModule" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.module.ts:L14 | neighbors=[dashboard.module.ts]
- "dashboard_dashboard_service_dashboardservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L11 | neighbors=[DashboardService]
- "dashboard_dashboard_service_dashboardservice_getstats": ".getStats()" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.service.ts:L17 | neighbors=[DashboardService]
- "decorators_current_user_decorator_currentuser": "CurrentUser" | kind=code-symbol | source=apps/api/src/common/decorators/current-user.decorator.ts:L3 | neighbors=[current-user.decorator.ts]
- "decorators_permissions_decorator_requirepermissions": "RequirePermissions()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/decorators/permissions.decorator.ts:L4 | neighbors=[permissions.decorator.ts]
- "decorators_tenant_context_decorator_gettenantcontext": "GetTenantContext" | kind=code-symbol | source=apps/api/src/common/decorators/tenant-context.decorator.ts:L4 | neighbors=[tenant-context.decorator.ts]
- "design_tokens_index_tokens": "tokens" | kind=code-symbol | source=packages/design-tokens/index.ts:L2 | neighbors=[index.ts]
- "dto_add_item_dto_additemdto": "AddItemDto" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/add-item.dto.ts:L3 | neighbors=[add-item.dto.ts]
- "dto_checkout_dto_checkoutdto": "CheckoutDto" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/dto/checkout.dto.ts:L3 | neighbors=[checkout.dto.ts]
- "dto_create_cart_dto_createcartdto": "CreateCartDto" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/create-cart.dto.ts:L3 | neighbors=[create-cart.dto.ts]
- "dto_create_category_dto_createcategorydto": "CreateCategoryDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-category.dto.ts:L3 | neighbors=[create-category.dto.ts]
- "dto_create_customer_dto_createcustomerdto": "CreateCustomerDto" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/dto/create-customer.dto.ts:L3 | neighbors=[create-customer.dto.ts]
- "dto_create_payment_intent_dto_createpaymentintentdto": "CreatePaymentIntentDto" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/dto/create-payment-intent.dto.ts:L3 | neighbors=[create-payment-intent.dto.ts]
- "dto_create_product_dto_createproductdto": "CreateProductDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product.dto.ts:L9 | neighbors=[create-product.dto.ts]
- "dto_create_product_variant_dto_createproductvariantdto": "CreateProductVariantDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product-variant.dto.ts:L10 | neighbors=[create-product-variant.dto.ts]
- "dto_create_promotion_dto_createpromotiondto": "CreatePromotionDto" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/dto/create-promotion.dto.ts:L10 | neighbors=[create-promotion.dto.ts]
- "dto_create_shipping_rule_dto_createshippingruledto": "CreateShippingRuleDto" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/dto/create-shipping-rule.dto.ts:L9 | neighbors=[create-shipping-rule.dto.ts]
- "dto_create_tax_rule_dto_createtaxruledto": "CreateTaxRuleDto" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/dto/create-tax-rule.dto.ts:L9 | neighbors=[create-tax-rule.dto.ts]
- "dto_invite_dto_invitedto": "InviteDto" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/invite.dto.ts:L3 | neighbors=[invite.dto.ts]
- "dto_list_orders_query_dto_listordersquerydto": "ListOrdersQueryDto" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/list-orders-query.dto.ts:L4 | neighbors=[list-orders-query.dto.ts]
- "dto_login_dto_logindto": "LoginDto" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/login.dto.ts:L3 | neighbors=[login.dto.ts]
- "dto_mfa_disable_dto_mfadisabledto": "MfaDisableDto" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/mfa-disable.dto.ts:L3 | neighbors=[mfa-disable.dto.ts]
- "dto_mfa_verify_dto_mfaverifydto": "MfaVerifyDto" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/mfa-verify.dto.ts:L3 | neighbors=[mfa-verify.dto.ts]
- "dto_order_response_dto_orderitemdto": "OrderItemDto" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-response.dto.ts:L11 | neighbors=[order-response.dto.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-022.json

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
