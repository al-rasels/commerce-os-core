# Node Description Batch 27 of 37

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

- "payments_payments_controller_paymentscontroller_createintent": ".createIntent()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.controller.ts:L16 | neighbors=[PaymentsController]
- "payments_payments_module_paymentsmodule": "PaymentsModule" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.module.ts:L22 | neighbors=[payments.module.ts]
- "payments_payments_service_paymentsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L15 | neighbors=[PaymentsService]
- "payments_payments_service_paymentsservice_createpaymentintent": ".createPaymentIntent()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L21 | neighbors=[PaymentsService]
- "payments_payments_webhook_controller_paymentswebhookcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L7 | neighbors=[PaymentsWebhookController]
- "payments_payments_webhook_controller_paymentswebhookcontroller_handlewebhook": ".handleWebhook()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L11 | neighbors=[PaymentsWebhookController]
- "platform_platform_module_nestmodule": "NestModule" | kind=code-symbol | neighbors=[PlatformModule]
- "platform_platform_module_platformmodule_configure": ".configure()" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L24 | neighbors=[PlatformModule]
- "prisma_prisma_module_prismamodule": "PrismaModule" | kind=code-symbol | source=apps/api/src/prisma/prisma.module.ts:L9 | neighbors=[prisma.module.ts]
- "prisma_prisma_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaclient": "PrismaClient" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L6 | neighbors=[PrismaService]
- "prisma_seed_main": "main()" | kind=code-symbol | source=apps/api/prisma/seed.ts:L6 | neighbors=[seed.ts]
- "prisma_seed_prisma": "prisma" | kind=code-symbol | source=apps/api/prisma/seed.ts:L4 | neighbors=[seed.ts]
- "products_loading_loading": "Loading()" | kind=code-symbol | source=apps/storefront/src/app/products/loading.tsx:L3 | neighbors=[loading.tsx]
- "products_page_productspage": "ProductsPage()" | kind=code-symbol | source=apps/storefront/src/app/products/page.tsx:L6 | neighbors=[page.tsx]
- "products_productformpage_productformpage": "ProductFormPage()" | kind=code-symbol | source=apps/admin/src/pages/products/ProductFormPage.tsx:L26 | neighbors=[ProductFormPage.tsx]
- "products_productlistpage_productlistpage": "ProductListPage()" | kind=code-symbol | source=apps/admin/src/pages/products/ProductListPage.tsx:L36 | neighbors=[ProductListPage.tsx]
- "promotions_promotion_repository_promotionrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotion.repository.ts:L7 | neighbors=[PromotionRepository]
- "promotions_promotion_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PromotionRepository]
- "promotions_promotions_controller_promotionscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L23 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L39 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L33 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L27 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L58 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L48 | neighbors=[PromotionsController]
- "promotions_promotions_module_promotionsmodule": "PromotionsModule" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.module.ts:L14 | neighbors=[promotions.module.ts]
- "promotions_promotions_service_promotionsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L13 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_createpromotion": ".createPromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L29 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_deletepromotion": ".deletePromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L41 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_listpromotions": ".listPromotions()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L15 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_updatepromotion": ".updatePromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L33 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_validateandapply": ".validateAndApply()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L45 | neighbors=[PromotionsService]
- "redis_redis_module_redismodule": "RedisModule" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.module.ts:L9 | neighbors=[redis.module.ts]
- "redis_redis_service_onmoduledestroy": "OnModuleDestroy" | kind=code-symbol | neighbors=[RedisService]
- "redis_redis_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[RedisService]
- "redis_redis_service_redisservice_del": ".del()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L54 | neighbors=[RedisService]
- "redis_redis_service_redisservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L47 | neighbors=[RedisService]
- "redis_redis_service_redisservice_onmoduledestroy": ".onModuleDestroy()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L34 | neighbors=[RedisService]
- "redis_redis_service_redisservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L15 | neighbors=[RedisService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-026.json

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
