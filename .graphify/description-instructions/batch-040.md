# Node Description Batch 41 of 51

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "reset_password_page_resetpasswordpage": "ResetPasswordPage()" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L125 | neighbors=[page.tsx]
- "returns_page_returnspage": "ReturnsPage()" | kind=code-symbol | source=apps/storefront/src/app/account/returns/page.tsx:L8 | neighbors=[page.tsx]
- "returns_returns_controller_returnscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.controller.ts:L10 | neighbors=[ReturnsController]
- "returns_returns_controller_returnscontroller_getreturns": ".getReturns()" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.controller.ts:L13 | neighbors=[ReturnsController]
- "returns_returns_module_returnsmodule": "ReturnsModule" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.module.ts:L12 | neighbors=[returns.module.ts]
- "returns_returns_service_returnsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.service.ts:L7 | neighbors=[ReturnsService]
- "returns_returns_service_returnsservice_getreturns": ".getReturns()" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.service.ts:L9 | neighbors=[ReturnsService]
- "returns_returnslistpage_returnslistpage": "ReturnsListPage()" | kind=code-symbol | source=apps/admin/src/pages/orders/returns/ReturnsListPage.tsx:L6 | neighbors=[ReturnsListPage.tsx]
- "scripts_api_validator_rationale_19": "Find API-related files." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L19 | neighbors=[find_api_files()]
- "scripts_api_validator_rationale_38": "Check OpenAPI/Swagger specification." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L38 | neighbors=[check_openapi_spec()]
- "scripts_api_validator_rationale_95": "Check API code for common issues." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L95 | neighbors=[check_api_code()]
- "scripts_lighthouse_audit_rationale_17": "Run Lighthouse audit on URL." | kind=entity | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L17 | neighbors=[run_lighthouse()]
- "scripts_lighthouse_audit_rationale_61": "Generate summary based on scores." | kind=entity | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L61 | neighbors=[get_summary()]
- "scripts_schema_validator_rationale_30": "Find database schema files." | kind=entity | source=.agents/skills/database-design/scripts/schema_validator.py:L30 | neighbors=[find_schema_files()]
- "scripts_schema_validator_rationale_48": "Validate Prisma schema file." | kind=entity | source=.agents/skills/database-design/scripts/schema_validator.py:L48 | neighbors=[validate_prisma_schema()]
- "scripts_ts_diagnostic_rationale_112": "Check for monorepo configuration." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L112 | neighbors=[check_monorepo()]
- "scripts_ts_diagnostic_rationale_133": "Run quick type check." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L133 | neighbors=[check_type_errors()]
- "scripts_ts_diagnostic_rationale_14": "Run shell command and return output." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L14 | neighbors=[run_cmd()]
- "scripts_ts_diagnostic_rationale_146": "Check for any type usage." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L146 | neighbors=[check_any_usage()]
- "scripts_ts_diagnostic_rationale_161": "Check for type assertions." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L161 | neighbors=[check_type_assertions()]
- "scripts_ts_diagnostic_rationale_173": "Check type checking performance." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L173 | neighbors=[check_performance()]
- "scripts_ts_diagnostic_rationale_22": "Check TypeScript and Node versions." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L22 | neighbors=[check_versions()]
- "scripts_ts_diagnostic_rationale_33": "Analyze tsconfig.json settings." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L33 | neighbors=[check_tsconfig()]
- "scripts_ts_diagnostic_rationale_75": "Detect TypeScript tooling ecosystem." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L75 | neighbors=[check_tooling()]
- "search_index": "index.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/search/index.ts:L1 | neighbors=[16cea38 feat(api): Implemented Meilisea…]
- "search_page_searchpage": "SearchPage()" | kind=code-symbol | source=apps/storefront/src/app/search/page.tsx:L7 | neighbors=[page.tsx]
- "search_search_controller_searchcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.controller.ts:L9 | neighbors=[SearchController]
- "search_search_controller_searchcontroller_search": ".search()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.controller.ts:L12 | neighbors=[SearchController]
- "search_search_module_searchmodule": "SearchModule" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.module.ts:L11 | neighbors=[search.module.ts]
- "search_search_service_onmoduleinit": "OnModuleInit" | kind=code-symbol | neighbors=[SearchService]
- "search_search_service_searchservice_onmoduleinit": ".onModuleInit()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.service.ts:L9 | neighbors=[SearchService]
- "search_search_sync_worker_searchsyncworker_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search-sync.worker.ts:L18 | neighbors=[SearchSyncWorker]
- "search_search_sync_worker_searchsyncworker_process": ".process()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search-sync.worker.ts:L22 | neighbors=[SearchSyncWorker]
- "search_search_sync_worker_tenantjobpayload": "TenantJobPayload" | kind=code-symbol | neighbors=[SearchSyncJobPayload]
- "search_search_sync_worker_workerhost": "WorkerHost" | kind=code-symbol | neighbors=[SearchSyncWorker]
- "settings_pagelayouteditor_createdefaultsection": "createDefaultSection()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L40 | neighbors=[PageLayoutEditor.tsx]
- "settings_pagelayouteditor_pagelayouteditorpage": "PageLayoutEditorPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L58 | neighbors=[PageLayoutEditor.tsx]
- "settings_pagelayoutlist_knownpages": "knownPages" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutList.tsx:L20 | neighbors=[PageLayoutList.tsx]
- "settings_pagelayoutlist_pagelayoutlistpage": "PageLayoutListPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutList.tsx:L29 | neighbors=[PageLayoutList.tsx]
- "settings_shipping_shippingsettingspage": "ShippingSettingsPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/shipping.tsx:L8 | neighbors=[shipping.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-040.json

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
