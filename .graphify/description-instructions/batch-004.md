# Node Description Batch 5 of 8

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

- "dto_create_product_dto_createproductdto": "CreateProductDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product.dto.ts:L3 | neighbors=[create-product.dto.ts]
- "experience_experience_e2e_spec": "experience.e2e-spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/experience.e2e-spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…]
- "experience_experience_module_experiencemodule": "ExperienceModule" | kind=code-symbol | source=apps/api/src/modules/experience/experience.module.ts:L8 | neighbors=[experience.module.ts]
- "guards_permission_guard_canactivate": "CanActivate" | kind=code-symbol | neighbors=[PermissionGuard]
- "guards_permission_guard_permissionguard_canactivate": ".canActivate()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L9 | neighbors=[PermissionGuard]
- "guards_permission_guard_permissionguard_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L7 | neighbors=[PermissionGuard]
- "guards_tenant_auth_guard_canactivate": "CanActivate" | kind=code-symbol | neighbors=[TenantAuthGuard]
- "guards_tenant_auth_guard_tenantauthguard_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L13 | neighbors=[TenantAuthGuard]
- "jetski_gemini_loader_loader_loadskillindex": "loadSkillIndex()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L47 | neighbors=[loader.mjs]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L7 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L9 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[HostResolverMiddleware]
- "middlewares_tenant_context_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L8 | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L10 | neighbors=[TenantContextMiddleware]
- "platform_platform_module_nestmodule": "NestModule" | kind=code-symbol | neighbors=[PlatformModule]
- "platform_platform_module_platformmodule_configure": ".configure()" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L7 | neighbors=[PlatformModule]
- "prisma_prisma_module_prismamodule": "PrismaModule" | kind=code-symbol | source=apps/api/src/prisma/prisma.module.ts:L9 | neighbors=[prisma.module.ts]
- "prisma_prisma_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaclient": "PrismaClient" | kind=code-symbol | neighbors=[PrismaService]
- "prisma_prisma_service_prismaservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L6 | neighbors=[PrismaService]
- "prisma_seed_main": "main()" | kind=code-symbol | source=apps/api/prisma/seed.ts:L6 | neighbors=[seed.ts]
- "prisma_seed_prisma": "prisma" | kind=code-symbol | source=apps/api/prisma/seed.ts:L4 | neighbors=[seed.ts]
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
- "references_utility_types_email": "Email" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L23 | neighbors=[utility-types.ts]
- "references_utility_types_err": "err()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L44 | neighbors=[utility-types.ts]
- "references_utility_types_exhaustivecheck": "exhaustiveCheck()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L333 | neighbors=[utility-types.ts]
- "references_utility_types_firstargument": "FirstArgument" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L183 | neighbors=[utility-types.ts]
- "references_utility_types_isany": "IsAny" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L283 | neighbors=[utility-types.ts]
- "references_utility_types_isnever": "IsNever" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L278 | neighbors=[utility-types.ts]

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
