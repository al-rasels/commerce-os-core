# Node Description Batch 32 of 51

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

- "components_toast_toastcontainerprops": "ToastContainerProps" | kind=code-symbol | source=packages/components/toast.tsx:L71 | neighbors=[toast.tsx]
- "components_toast_toastvariant": "ToastVariant" | kind=code-symbol | source=packages/components/toast.tsx:L7 | neighbors=[toast.tsx]
- "components_tooltip_tooltip": "Tooltip()" | kind=code-symbol | source=packages/components/tooltip.tsx:L20 | neighbors=[tooltip.tsx]
- "components_tooltip_tooltipcontent": "TooltipContent()" | kind=code-symbol | source=packages/components/tooltip.tsx:L28 | neighbors=[tooltip.tsx]
- "components_tooltip_tooltipprovider": "TooltipProvider()" | kind=code-symbol | source=packages/components/tooltip.tsx:L7 | neighbors=[tooltip.tsx]
- "components_tooltip_tooltiptrigger": "TooltipTrigger()" | kind=code-symbol | source=packages/components/tooltip.tsx:L24 | neighbors=[tooltip.tsx]
- "components_varianteditor_varianteditor": "VariantEditor()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L64 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_varianteditorprops": "VariantEditorProps" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L6 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_variantform": "VariantForm()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L38 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_variantrow": "VariantRow()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L10 | neighbors=[VariantEditor.tsx]
- "components_vitest_config": "vitest.config.ts" | kind=code-symbol | source=packages/components/vitest.config.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "components_vitest_d": "vitest.d.ts" | kind=code-symbol | source=packages/components/vitest.d.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "components_vitest_setup": "vitest.setup.ts" | kind=code-symbol | source=packages/components/vitest.setup.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "contexts_authcontext_authcontext": "AuthContext" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L23 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authcontexttype": "AuthContextType" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L14 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authprovider": "AuthProvider()" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L28 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authuser": "AuthUser" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L3 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_mfastate": "MfaState" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L8 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_useauth": "useAuth()" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L92 | neighbors=[AuthContext.tsx]
- "copy_components_destdir": "destDir" | kind=code-symbol | source=copy-components.js:L5 | neighbors=[copy-components.js]
- "copy_components_exportedcontent": "exportedContent" | kind=code-symbol | source=copy-components.js:L9 | neighbors=[copy-components.js]
- "copy_components_files": "files" | kind=code-symbol | source=copy-components.js:L8 | neighbors=[copy-components.js]
- "copy_components_fs": "fs" | kind=code-symbol | source=copy-components.js:L1 | neighbors=[copy-components.js]
- "copy_components_indexfile": "indexFile" | kind=code-symbol | source=copy-components.js:L6 | neighbors=[copy-components.js]
- "copy_components_path": "path" | kind=code-symbol | source=copy-components.js:L2 | neighbors=[copy-components.js]
- "copy_components_srcdir": "srcDir" | kind=code-symbol | source=copy-components.js:L4 | neighbors=[copy-components.js]
- "customer_customer_controller_customercontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L22 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L26 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L48 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L35 | neighbors=[CustomerController]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-031.json

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
