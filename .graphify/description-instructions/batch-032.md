# Node Description Batch 33 of 37

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

- "theme_engine_index_mergeresult": "MergeResult" | kind=code-symbol | source=packages/theme-engine/index.ts:L4 | neighbors=[index.ts]
- "theme_engine_index_tenanttokenoverride": "TenantTokenOverride" | kind=code-symbol | source=packages/theme-engine/index.ts:L9 | neighbors=[index.ts]
- "theme_theme_controller_themecontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L10 | neighbors=[ThemeController]
- "theme_theme_controller_themecontroller_gettheme": ".getTheme()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L14 | neighbors=[ThemeController]
- "theme_theme_controller_themecontroller_updateoverride": ".updateOverride()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L21 | neighbors=[ThemeController]
- "theme_theme_module_thememodule": "ThemeModule" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.module.ts:L13 | neighbors=[theme.module.ts]
- "theme_theme_service_themeservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L9 | neighbors=[ThemeService]
- "theme_theme_service_themeservice_getresolvedtheme": ".getResolvedTheme()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L14 | neighbors=[ThemeService]
- "theme_theme_service_themeservice_updateoverride": ".updateOverride()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L47 | neighbors=[ThemeService]
- "theme_themeeditorpage_colormode": "ColorMode" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L35 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_colorssection": "ColorsSection()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L287 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_deepmergedesigntokens": "deepMergeDesignTokens()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L423 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_flattenedsection": "FlattenedSection()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L356 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_loadingskeleton": "LoadingSkeleton()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L399 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_previewcard": "PreviewCard()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L128 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_sectioncard": "SectionCard()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L94 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_sectionkey": "SectionKey" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L37 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_settingrow": "SettingRow()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L47 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_settingrowprops": "SettingRowProps" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L39 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_themeeditorpage": "ThemeEditorPage()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L443 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_typographysection": "TypographySection()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L313 | neighbors=[ThemeEditorPage.tsx]
- "ui_accordion_accordion": "Accordion()" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L6 | neighbors=[accordion.tsx]
- "ui_accordion_accordioncontent": "AccordionContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L49 | neighbors=[accordion.tsx]
- "ui_accordion_accordionitem": "AccordionItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L16 | neighbors=[accordion.tsx]
- "ui_accordion_accordiontrigger": "AccordionTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L26 | neighbors=[accordion.tsx]
- "ui_alert_alertaction": "AlertAction()" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L66 | neighbors=[alert.tsx]
- "ui_alert_alertdescription": "AlertDescription()" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L50 | neighbors=[alert.tsx]
- "ui_alert_alerttitle": "AlertTitle()" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L37 | neighbors=[alert.tsx]
- "ui_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L7 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L142 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L155 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L39 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L126 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L78 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L62 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogmedia": "AlertDialogMedia()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L94 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogoverlay": "AlertDialogOverlay()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L23 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogportal": "AlertDialogPortal()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L17 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L110 | neighbors=[alert-dialog.tsx]
- "ui_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L11 | neighbors=[alert-dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-032.json

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
