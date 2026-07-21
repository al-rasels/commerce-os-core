# Node Description Batch 36 of 37

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

- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L171 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L152 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L139 | neighbors=[select.tsx]
- "ui_select_selecttrigger": "SelectTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L31 | neighbors=[select.tsx]
- "ui_select_selectvalue": "SelectValue()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L21 | neighbors=[select.tsx]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=apps/storefront/src/components/ui/separator.tsx:L7 | neighbors=[separator.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L18 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L116 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L93 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L26 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L22 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L14 | neighbors=[sheet.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=apps/storefront/src/components/ui/skeleton.tsx:L3 | neighbors=[skeleton.tsx]
- "ui_switch_switch": "Switch()" | kind=code-symbol | source=apps/storefront/src/components/ui/switch.tsx:L7 | neighbors=[switch.tsx]
- "ui_table_table": "Table()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L7 | neighbors=[table.tsx]
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L32 | neighbors=[table.tsx]
- "ui_table_tablecaption": "TableCaption()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L94 | neighbors=[table.tsx]
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L81 | neighbors=[table.tsx]
- "ui_table_tablefooter": "TableFooter()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L42 | neighbors=[table.tsx]
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L68 | neighbors=[table.tsx]
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L22 | neighbors=[table.tsx]
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=apps/admin/src/components/ui/table.tsx:L55 | neighbors=[table.tsx]
- "ui_tabs_tabs": "Tabs()" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L6 | neighbors=[tabs.tsx]
- "ui_tabs_tabscontent": "TabsContent()" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L70 | neighbors=[tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L54 | neighbors=[tabs.tsx]
- "ui_textarea_textarea": "Textarea()" | kind=code-symbol | source=apps/storefront/src/components/ui/textarea.tsx:L5 | neighbors=[textarea.tsx]
- "ui_tooltip_tooltip": "Tooltip()" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L20 | neighbors=[tooltip.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L28 | neighbors=[tooltip.tsx]
- "ui_tooltip_tooltipprovider": "TooltipProvider()" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L7 | neighbors=[tooltip.tsx]
- "ui_tooltip_tooltiptrigger": "TooltipTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L24 | neighbors=[tooltip.tsx]
- "users_role_repository_rolerepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/users/role.repository.ts:L8 | neighbors=[RoleRepository]
- "users_role_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[RoleRepository]
- "users_userdetailpage_statusvariant": "statusVariant" | kind=code-symbol | source=apps/admin/src/pages/users/UserDetailPage.tsx:L14 | neighbors=[UserDetailPage.tsx]
- "users_userdetailpage_userdetailpage": "UserDetailPage()" | kind=code-symbol | source=apps/admin/src/pages/users/UserDetailPage.tsx:L20 | neighbors=[UserDetailPage.tsx]
- "users_userinvitepage_userinvitepage": "UserInvitePage()" | kind=code-symbol | source=apps/admin/src/pages/users/UserInvitePage.tsx:L24 | neighbors=[UserInvitePage.tsx]
- "users_userlistpage_statusvariant": "statusVariant" | kind=code-symbol | source=apps/admin/src/pages/users/UserListPage.tsx:L25 | neighbors=[UserListPage.tsx]
- "users_userlistpage_userlistpage": "UserListPage()" | kind=code-symbol | source=apps/admin/src/pages/users/UserListPage.tsx:L31 | neighbors=[UserListPage.tsx]
- "users_users_controller_userscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L21 | neighbors=[UsersController]
- "users_users_controller_userscontroller_getbyid": ".getById()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L35 | neighbors=[UsersController]
- "users_users_controller_userscontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L24 | neighbors=[UsersController]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-035.json

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
