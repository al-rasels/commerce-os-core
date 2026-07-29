# Node Description Batch 35 of 51

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

- "hooks_usecustomers_usecustomers": "useCustomers()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L5 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_usedeletecustomer": "useDeleteCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L44 | neighbors=[useCustomers.ts]
- "hooks_usecustomers_useupdatecustomer": "useUpdateCustomer()" | kind=code-symbol | source=apps/admin/src/hooks/useCustomers.ts:L32 | neighbors=[useCustomers.ts]
- "hooks_usedashboard_usedashboardstats": "useDashboardStats()" | kind=code-symbol | source=apps/admin/src/hooks/useDashboard.ts:L4 | neighbors=[useDashboard.ts]
- "hooks_useinventory_usecreatelocation": "useCreateLocation()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L12 | neighbors=[useInventory.ts]
- "hooks_useinventory_usedeletelocation": "useDeleteLocation()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L36 | neighbors=[useInventory.ts]
- "hooks_useinventory_useinventorylevels": "useInventoryLevels()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L48 | neighbors=[useInventory.ts]
- "hooks_useinventory_uselocations": "useLocations()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L5 | neighbors=[useInventory.ts]
- "hooks_useinventory_useupdateinventorylevel": "useUpdateInventoryLevel()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L56 | neighbors=[useInventory.ts]
- "hooks_useinventory_useupdatelocation": "useUpdateLocation()" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L24 | neighbors=[useInventory.ts]
- "hooks_useorders_useorder": "useOrder()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L12 | neighbors=[useOrders.ts]
- "hooks_useorders_useorders": "useOrders()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L5 | neighbors=[useOrders.ts]
- "hooks_useorders_useupdateorderstatus": "useUpdateOrderStatus()" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L20 | neighbors=[useOrders.ts]
- "hooks_usepages_usepagelayout": "usePageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L5 | neighbors=[usePages.ts]
- "hooks_usepages_usepublishpagelayout": "usePublishPageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L29 | neighbors=[usePages.ts]
- "hooks_usepages_usesavepagelayout": "useSavePageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L12 | neighbors=[usePages.ts]
- "hooks_usepages_useunpublishpagelayout": "useUnpublishPageLayout()" | kind=code-symbol | source=apps/admin/src/hooks/usePages.ts:L41 | neighbors=[usePages.ts]
- "hooks_useproducts_usecreateproduct": "useCreateProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L20 | neighbors=[useProducts.ts]
- "hooks_useproducts_usedeleteproduct": "useDeleteProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L44 | neighbors=[useProducts.ts]
- "hooks_useproducts_useproduct": "useProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L12 | neighbors=[useProducts.ts]
- "hooks_useproducts_useproducts": "useProducts()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L5 | neighbors=[useProducts.ts]
- "hooks_useproducts_useupdateproduct": "useUpdateProduct()" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L32 | neighbors=[useProducts.ts]
- "hooks_usereturns_usecreatereturn": "useCreateReturn()" | kind=code-symbol | source=apps/admin/src/hooks/useReturns.ts:L12 | neighbors=[useReturns.ts]
- "hooks_usereturns_usedeletereturn": "useDeleteReturn()" | kind=code-symbol | source=apps/admin/src/hooks/useReturns.ts:L36 | neighbors=[useReturns.ts]
- "hooks_usereturns_usereturns": "useReturns()" | kind=code-symbol | source=apps/admin/src/hooks/useReturns.ts:L5 | neighbors=[useReturns.ts]
- "hooks_usereturns_useupdatereturn": "useUpdateReturn()" | kind=code-symbol | source=apps/admin/src/hooks/useReturns.ts:L24 | neighbors=[useReturns.ts]
- "hooks_usesubscriptions_usecreatesubscription": "useCreateSubscription()" | kind=code-symbol | source=apps/admin/src/hooks/useSubscriptions.ts:L12 | neighbors=[useSubscriptions.ts]
- "hooks_usesubscriptions_usedeletesubscription": "useDeleteSubscription()" | kind=code-symbol | source=apps/admin/src/hooks/useSubscriptions.ts:L36 | neighbors=[useSubscriptions.ts]
- "hooks_usesubscriptions_usesubscriptions": "useSubscriptions()" | kind=code-symbol | source=apps/admin/src/hooks/useSubscriptions.ts:L5 | neighbors=[useSubscriptions.ts]
- "hooks_usesubscriptions_useupdatesubscription": "useUpdateSubscription()" | kind=code-symbol | source=apps/admin/src/hooks/useSubscriptions.ts:L24 | neighbors=[useSubscriptions.ts]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-034.json

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
