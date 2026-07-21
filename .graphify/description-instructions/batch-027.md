# Node Description Batch 28 of 37

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
- "references_utility_types_email": "Email" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L23 | neighbors=[utility-types.ts]
- "references_utility_types_err": "err()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L44 | neighbors=[utility-types.ts]
- "references_utility_types_exhaustivecheck": "exhaustiveCheck()" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L333 | neighbors=[utility-types.ts]
- "references_utility_types_firstargument": "FirstArgument" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L183 | neighbors=[utility-types.ts]
- "references_utility_types_isany": "IsAny" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L283 | neighbors=[utility-types.ts]
- "references_utility_types_isnever": "IsNever" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L278 | neighbors=[utility-types.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-027.json

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
