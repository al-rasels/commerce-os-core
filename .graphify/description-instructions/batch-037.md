# Node Description Batch 38 of 51

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

- "products_productlistpage_productlistpage": "ProductListPage()" | kind=code-symbol | source=apps/admin/src/pages/products/ProductListPage.tsx:L36 | neighbors=[ProductListPage.tsx]
- "promotions_promotion_repository_promotionrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotion.repository.ts:L7 | neighbors=[PromotionRepository]
- "promotions_promotion_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PromotionRepository]
- "promotions_promotions_controller_promotionscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L23 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L39 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L33 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L27 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L58 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L48 | neighbors=[PromotionsController]
- "promotions_promotions_controller_promotionscontroller_validate": ".validate()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L66 | neighbors=[PromotionsController]
- "promotions_promotions_module_promotionsmodule": "PromotionsModule" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.module.ts:L14 | neighbors=[promotions.module.ts]
- "promotions_promotions_service_promotionsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L13 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_createpromotion": ".createPromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L29 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_deletepromotion": ".deletePromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L41 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_listpromotions": ".listPromotions()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L15 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_updatepromotion": ".updatePromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L33 | neighbors=[PromotionsService]
- "promotions_promotions_service_promotionsservice_validateandapply": ".validateAndApply()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L45 | neighbors=[PromotionsService]
- "queue_queue_module_queuemodule": "QueueModule" | kind=code-symbol | source=apps/api/src/modules/platform/queue/queue.module.ts:L30 | neighbors=[queue.module.ts]
- "queue_queue_service_queueservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/queue/queue.service.ts:L14 | neighbors=[QueueService]
- "queue_queue_service_queueservice_enqueuetenantjob": ".enqueueTenantJob()" | kind=code-symbol | source=apps/api/src/modules/platform/queue/queue.service.ts:L20 | neighbors=[QueueService]
- "queue_queue_service_tenantjobpayload": "TenantJobPayload" | kind=code-symbol | source=apps/api/src/modules/platform/queue/queue.service.ts:L5 | neighbors=[queue.service.ts]
- "redis_redis_module_redismodule": "RedisModule" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.module.ts:L9 | neighbors=[redis.module.ts]
- "redis_redis_service_onmoduledestroy": "OnModuleDestroy" | kind=code-symbol | neighbors=[RedisService]
- "redis_redis_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[RedisService]
- "redis_redis_service_redisservice_del": ".del()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L54 | neighbors=[RedisService]
- "redis_redis_service_redisservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L47 | neighbors=[RedisService]
- "redis_redis_service_redisservice_onmoduledestroy": ".onModuleDestroy()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L34 | neighbors=[RedisService]
- "redis_redis_service_redisservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L15 | neighbors=[RedisService]
- "redis_redis_service_redisservice_set": ".set()" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L38 | neighbors=[RedisService]
- "references_utility_types_arguments": "Arguments" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L178 | neighbors=[utility-types.ts]
- "references_utility_types_assertequal": "AssertEqual" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L270 | neighbors=[utility-types.ts]
- "references_utility_types_assertnever": "assertNever()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L326 | neighbors=[utility-types.ts]
- "references_utility_types_asyncfunction": "AsyncFunction" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L190 | neighbors=[utility-types.ts]
- "references_utility_types_atleast": "AtLeast" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L169 | neighbors=[utility-types.ts]
- "references_utility_types_brand": "Brand" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L19 | neighbors=[utility-types.ts]
- "references_utility_types_deepmutable": "DeepMutable" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L94 | neighbors=[utility-types.ts]
- "references_utility_types_deeppartial": "DeepPartial" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L80 | neighbors=[utility-types.ts]
- "references_utility_types_deepreadonly": "DeepReadonly" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L71 | neighbors=[utility-types.ts]
- "references_utility_types_deeprequired": "DeepRequired" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L87 | neighbors=[utility-types.ts]
- "references_utility_types_elementof": "ElementOf" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L146 | neighbors=[utility-types.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-037.json

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
