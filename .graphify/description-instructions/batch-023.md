# Node Description Batch 24 of 37

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

- "dto_order_response_dto_orderresponsedto": "OrderResponseDto" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-response.dto.ts:L26 | neighbors=[order-response.dto.ts]
- "dto_order_status_dto_orderstatusdto": "OrderStatusDto" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-status.dto.ts:L5 | neighbors=[order-status.dto.ts]
- "dto_order_status_dto_valid_statuses": "VALID_STATUSES" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-status.dto.ts:L3 | neighbors=[order-status.dto.ts]
- "dto_register_dto_registerdto": "RegisterDto" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/register.dto.ts:L3 | neighbors=[register.dto.ts]
- "dto_update_category_dto_updatecategorydto": "UpdateCategoryDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-category.dto.ts:L3 | neighbors=[update-category.dto.ts]
- "dto_update_item_dto_updateitemdto": "UpdateItemDto" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/update-item.dto.ts:L3 | neighbors=[update-item.dto.ts]
- "dto_update_product_dto_updateproductdto": "UpdateProductDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-product.dto.ts:L3 | neighbors=[update-product.dto.ts]
- "dto_update_product_variant_dto_updateproductvariantdto": "UpdateProductVariantDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-product-variant.dto.ts:L3 | neighbors=[update-product-variant.dto.ts]
- "dto_update_promotion_dto_updatepromotiondto": "UpdatePromotionDto" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/dto/update-promotion.dto.ts:L4 | neighbors=[update-promotion.dto.ts]
- "dto_update_shipping_rule_dto_updateshippingruledto": "UpdateShippingRuleDto" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/dto/update-shipping-rule.dto.ts:L4 | neighbors=[update-shipping-rule.dto.ts]
- "dto_update_tax_rule_dto_updatetaxruledto": "UpdateTaxRuleDto" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/dto/update-tax-rule.dto.ts:L4 | neighbors=[update-tax-rule.dto.ts]
- "dto_update_user_dto_updateuserdto": "UpdateUserDto" | kind=code-symbol | source=apps/api/src/modules/platform/users/dto/update-user.dto.ts:L3 | neighbors=[update-user.dto.ts]
- "dto_update_user_status_dto_updateuserstatusdto": "UpdateUserStatusDto" | kind=code-symbol | source=apps/api/src/modules/platform/users/dto/update-user-status.dto.ts:L3 | neighbors=[update-user-status.dto.ts]
- "e2e_checkout_spec": "checkout.spec.ts" | kind=code-symbol | source=tests/e2e/checkout.spec.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…]
- "experience_experience_module_experiencemodule": "ExperienceModule" | kind=code-symbol | source=apps/api/src/modules/experience/experience.module.ts:L8 | neighbors=[experience.module.ts]
- "filters_prisma_client_exception_filter_baseexceptionfilter": "BaseExceptionFilter" | kind=code-symbol | neighbors=[PrismaClientExceptionFilter]
- "filters_prisma_client_exception_filter_prismaclientexceptionfilter_catch": ".catch()" | kind=code-symbol | source=apps/api/src/common/filters/prisma-client-exception.filter.ts:L16 | neighbors=[PrismaClientExceptionFilter]
- "forgot_password_page_forgotpasswordpage": "ForgotPasswordPage()" | kind=code-symbol | source=apps/storefront/src/app/account/forgot-password/page.tsx:L11 | neighbors=[page.tsx]
- "guards_permission_guard_canactivate": "CanActivate" | kind=code-symbol | neighbors=[PermissionGuard]
- "guards_permission_guard_permissionguard_canactivate": ".canActivate()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L9 | neighbors=[PermissionGuard]
- "guards_permission_guard_permissionguard_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L7 | neighbors=[PermissionGuard]
- "guards_tenant_auth_guard_canactivate": "CanActivate" | kind=code-symbol | neighbors=[TenantAuthGuard]
- "guards_tenant_auth_guard_spec_mockctx": "mockCtx()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.spec.ts:L5 | neighbors=[tenant-auth.guard.spec.ts]
- "guards_tenant_auth_guard_tenantauthguard_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L13 | neighbors=[TenantAuthGuard]
- "health_health_controller_healthcontroller_check": ".check()" | kind=code-symbol | source=apps/api/src/modules/platform/health/health.controller.ts:L22 | neighbors=[HealthController]
- "health_health_controller_healthcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/health/health.controller.ts:L13 | neighbors=[HealthController]
- "hooks_usecategories_usecategories": "useCategories()" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L5 | neighbors=[useCategories.ts]
- "hooks_usecategories_usecreatecategory": "useCreateCategory()" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L12 | neighbors=[useCategories.ts]
- "hooks_usecategories_usedeletecategory": "useDeleteCategory()" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L36 | neighbors=[useCategories.ts]
- "hooks_usecategories_useupdatecategory": "useUpdateCategory()" | kind=code-symbol | source=apps/admin/src/hooks/useCategories.ts:L24 | neighbors=[useCategories.ts]
- "hooks_usecustomers_usecreatecustomer": "useCreateCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L20 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_usecustomer": "useCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L12 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_usecustomers": "useCustomers()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L5 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_usedeletecustomer": "useDeleteCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L44 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_useupdatecustomer": "useUpdateCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L32 | neighbors=[useCustomers.ts]
- "hooks_usedashboard_usedashboardstats": "useDashboardStats()" | kind=code-symbol | source=apps/admin/src/hooks/useDashboard.ts:L4 | neighbors=[useDashboard.ts]
- "hooks_useorders_useorder": "useOrder()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L12 | neighbors=[useOrders.ts]
- "hooks_useorders_useorders": "useOrders()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L5 | neighbors=[useOrders.ts]
- "hooks_useorders_useupdateorderstatus": "useUpdateOrderStatus()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L20 | neighbors=[useOrders.ts]
- "hooks_usepages_usepagelayout": "usePageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L5 | neighbors=[usePages.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-023.json

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
