# Node Description Batch 6 of 8

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

- "references_utility_types_isunknown": "IsUnknown" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L288 | neighbors=[utility-types.ts]
- "references_utility_types_join": "Join" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L216 | neighbors=[utility-types.ts]
- "references_utility_types_jsonarray": "JsonArray" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L302 | neighbors=[utility-types.ts]
- "references_utility_types_jsonify": "Jsonify" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L309 | neighbors=[utility-types.ts]
- "references_utility_types_jsonobject": "JsonObject" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L303 | neighbors=[utility-types.ts]
- "references_utility_types_jsonprimitive": "JsonPrimitive" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L301 | neighbors=[utility-types.ts]
- "references_utility_types_jsonvalue": "JsonValue" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L304 | neighbors=[utility-types.ts]
- "references_utility_types_keysoftype": "KeysOfType" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L105 | neighbors=[utility-types.ts]
- "references_utility_types_merge": "Merge" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L137 | neighbors=[utility-types.ts]
- "references_utility_types_none": "None" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L59 | neighbors=[utility-types.ts]
- "references_utility_types_nonemptyarray": "NonEmptyArray" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L164 | neighbors=[utility-types.ts]
- "references_utility_types_ok": "ok()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L39 | neighbors=[utility-types.ts]
- "references_utility_types_omitbytype": "OmitByType" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L117 | neighbors=[utility-types.ts]
- "references_utility_types_option": "Option" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L56 | neighbors=[utility-types.ts]
- "references_utility_types_partialby": "PartialBy" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L122 | neighbors=[utility-types.ts]
- "references_utility_types_pathof": "PathOf" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L228 | neighbors=[utility-types.ts]
- "references_utility_types_pickbytype": "PickByType" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L112 | neighbors=[utility-types.ts]
- "references_utility_types_positivenumber": "PositiveNumber" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L26 | neighbors=[utility-types.ts]
- "references_utility_types_promisify": "Promisify" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L197 | neighbors=[utility-types.ts]
- "references_utility_types_readonlyby": "ReadonlyBy" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L132 | neighbors=[utility-types.ts]
- "references_utility_types_requiredby": "RequiredBy" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L127 | neighbors=[utility-types.ts]
- "references_utility_types_result": "Result" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L35 | neighbors=[utility-types.ts]
- "references_utility_types_some": "Some" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L58 | neighbors=[utility-types.ts]
- "references_utility_types_split": "Split" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L208 | neighbors=[utility-types.ts]
- "references_utility_types_timestamp": "Timestamp" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L25 | neighbors=[utility-types.ts]
- "references_utility_types_tuple": "Tuple" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L151 | neighbors=[utility-types.ts]
- "references_utility_types_tupleof": "_TupleOf" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L157 | neighbors=[utility-types.ts]
- "references_utility_types_unionlast": "UnionLast" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L241 | neighbors=[utility-types.ts]
- "references_utility_types_uniontointersection": "UnionToIntersection" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L250 | neighbors=[utility-types.ts]
- "references_utility_types_uniontotuple": "UnionToTuple" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L259 | neighbors=[utility-types.ts]
- "references_utility_types_userid": "UserId" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L22 | neighbors=[utility-types.ts]
- "references_utility_types_uuid": "UUID" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L24 | neighbors=[utility-types.ts]
- "repositories_catalog_repository_spec": "catalog.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/catalog.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…]
- "repositories_category_repository_categoryrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L8 | neighbors=[CategoryRepository]
- "repositories_category_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CategoryRepository]
- "repositories_page_layout_repository_pagelayoutrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L8 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_pagelayoutrepository_findbypagekey": ".findByPageKey()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L13 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_spec": "page-layout.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…]
- "repositories_page_layout_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PageLayoutRepository]
- "repositories_product_repository_productrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L8 | neighbors=[ProductRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-005.json

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
