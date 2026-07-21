# Node Description Batch 25 of 37

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

- "hooks_usepages_usepublishpagelayout": "usePublishPageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L29 | neighbors=[usePages.ts]
- "hooks_usepages_usesavepagelayout": "useSavePageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L12 | neighbors=[usePages.ts]
- "hooks_usepages_useunpublishpagelayout": "useUnpublishPageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L41 | neighbors=[usePages.ts]
- "hooks_useproducts_usecreateproduct": "useCreateProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L20 | neighbors=[useProducts.ts]
- "hooks_useproducts_usedeleteproduct": "useDeleteProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L44 | neighbors=[useProducts.ts]
- "hooks_useproducts_useproduct": "useProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L12 | neighbors=[useProducts.ts]
- "hooks_useproducts_useproducts": "useProducts()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L5 | neighbors=[useProducts.ts]
- "hooks_useproducts_useupdateproduct": "useUpdateProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L32 | neighbors=[useProducts.ts]
- "hooks_usetheme_usesavethemeoverride": "useSaveThemeOverride()" | kind=code-symbol | source=apps/admin/src/hooks/useTheme.ts:L12 | neighbors=[useTheme.ts]
- "hooks_usetheme_usetheme": "useTheme()" | kind=code-symbol | source=apps/admin/src/hooks/useTheme.ts:L5 | neighbors=[useTheme.ts]
- "hooks_useusers_useinviteuser": "useInviteUser()" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L20 | neighbors=[useUsers.ts]
- "hooks_useusers_useupdateuser": "useUpdateUser()" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L32 | neighbors=[useUsers.ts]
- "hooks_useusers_useupdateuserstatus": "useUpdateUserStatus()" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L44 | neighbors=[useUsers.ts]
- "hooks_useusers_useuser": "useUser()" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L12 | neighbors=[useUsers.ts]
- "hooks_useusers_useusers": "useUsers()" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L5 | neighbors=[useUsers.ts]
- "hooks_usevariants_usecreatevariant": "useCreateVariant()" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L13 | neighbors=[useVariants.ts]
- "hooks_usevariants_usedeletevariant": "useDeleteVariant()" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L38 | neighbors=[useVariants.ts]
- "hooks_usevariants_useupdatevariant": "useUpdateVariant()" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L25 | neighbors=[useVariants.ts]
- "hooks_usevariants_usevariants": "useVariants()" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L5 | neighbors=[useVariants.ts]
- "interfaces_job_payload_interface_jobpayload": "JobPayload" | kind=code-symbol | source=apps/api/src/common/interfaces/job-payload.interface.ts:L5 | neighbors=[job-payload.interface.ts]
- "jetski_gemini_loader_loader_loadskillindex": "loadSkillIndex()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L47 | neighbors=[loader.mjs]
- "layouts_adminlayout_adminlayout": "AdminLayout()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L91 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_navitems": "navItems" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L21 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_sidebar": "Sidebar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L33 | neighbors=[AdminLayout.tsx]
- "layouts_adminlayout_topbar": "Topbar()" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L76 | neighbors=[AdminLayout.tsx]
- "lib_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L5 | neighbors=[ApiError]
- "lib_server_api_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L7 | neighbors=[ApiError]
- "lib_store_cartstore": "CartStore" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L4 | neighbors=[store.ts]
- "lib_store_gensessionid": "genSessionId()" | kind=code-symbol | source=apps/storefront/src/lib/store.ts:L12 | neighbors=[store.ts]
- "load_checkout_options": "options" | kind=code-symbol | source=tests/load/checkout.js:L4 | neighbors=[checkout.js]
- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=apps/storefront/src/app/account/login/page.tsx:L11 | neighbors=[page.tsx]
- "marketing_promotions_promotionspage": "PromotionsPage()" | kind=code-symbol | source=apps/admin/src/pages/marketing/promotions.tsx:L8 | neighbors=[promotions.tsx]
- "mfa_page_mfaform": "MfaForm()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L12 | neighbors=[page.tsx]
- "mfa_page_mfapage": "MfaPage()" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L90 | neighbors=[page.tsx]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L7 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_hostresolvermiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L9 | neighbors=[HostResolverMiddleware]
- "middlewares_host_resolver_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[HostResolverMiddleware]
- "middlewares_tenant_context_middleware_nestmiddleware": "NestMiddleware" | kind=code-symbol | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L8 | neighbors=[TenantContextMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware_use": ".use()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L10 | neighbors=[TenantContextMiddleware]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-024.json

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
