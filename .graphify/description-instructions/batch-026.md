# Node Description Batch 27 of 51

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

- "components_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L155 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L39 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L126 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L78 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L62 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogmedia": "AlertDialogMedia()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L94 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogoverlay": "AlertDialogOverlay()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L23 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogportal": "AlertDialogPortal()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L17 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L110 | neighbors=[alert-dialog.tsx]
- "components_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L11 | neighbors=[alert-dialog.tsx]
- "components_avatar_avatar": "Avatar()" | kind=code-symbol | source=packages/components/avatar.tsx:L6 | neighbors=[avatar.tsx]
- "components_avatar_avatarbadge": "AvatarBadge()" | kind=code-symbol | source=packages/components/avatar.tsx:L55 | neighbors=[avatar.tsx]
- "components_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=packages/components/avatar.tsx:L39 | neighbors=[avatar.tsx]
- "components_avatar_avatargroup": "AvatarGroup()" | kind=code-symbol | source=packages/components/avatar.tsx:L71 | neighbors=[avatar.tsx]
- "components_avatar_avatargroupcount": "AvatarGroupCount()" | kind=code-symbol | source=packages/components/avatar.tsx:L84 | neighbors=[avatar.tsx]
- "components_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=packages/components/avatar.tsx:L26 | neighbors=[avatar.tsx]
- "components_banner_bannerprops": "BannerProps" | kind=code-symbol | source=packages/components/banner.tsx:L3 | neighbors=[banner.tsx]
- "components_breadcrumb_breadcrumb": "Breadcrumb()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L5 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L56 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumbitem": "BreadcrumbItem()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L19 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumblink": "BreadcrumbLink()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L23 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumblist": "BreadcrumbList()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L9 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumbpage": "BreadcrumbPage()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L29 | neighbors=[breadcrumb.tsx]
- "components_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L42 | neighbors=[breadcrumb.tsx]
- "components_breadcrumbs_breadcrumbsprops": "BreadcrumbsProps" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L10 | neighbors=[breadcrumbs.tsx]
- "components_breadcrumbs_spec_defaultitems": "defaultItems" | kind=code-symbol | source=packages/components/breadcrumbs.spec.tsx:L4 | neighbors=[breadcrumbs.spec.tsx]
- "components_buildernode_buildernodeprops": "BuilderNodeProps" | kind=code-symbol | source=apps/admin/src/pages/builder/components/BuilderNode.tsx:L11 | neighbors=[BuilderNode.tsx]
- "components_button_buttonprops": "ButtonProps" | kind=code-symbol | source=packages/components/button.tsx:L43 | neighbors=[button.tsx]
- "components_button_sizestyles": "sizeStyles" | kind=code-symbol | source=packages/components/button.tsx:L18 | neighbors=[button.tsx]
- "components_button_variantstyles": "variantStyles" | kind=code-symbol | source=packages/components/button.tsx:L10 | neighbors=[button.tsx]
- "components_card_card": "Card()" | kind=code-symbol | source=packages/components/card.tsx:L5 | neighbors=[card.tsx]
- "components_card_cardaction": "CardAction()" | kind=code-symbol | source=packages/components/card.tsx:L59 | neighbors=[card.tsx]
- "components_card_cardcontent": "CardContent()" | kind=code-symbol | source=packages/components/card.tsx:L72 | neighbors=[card.tsx]
- "components_card_carddescription": "CardDescription()" | kind=code-symbol | source=packages/components/card.tsx:L49 | neighbors=[card.tsx]
- "components_card_cardfooter": "CardFooter()" | kind=code-symbol | source=packages/components/card.tsx:L82 | neighbors=[card.tsx]
- "components_card_cardheader": "CardHeader()" | kind=code-symbol | source=packages/components/card.tsx:L23 | neighbors=[card.tsx]
- "components_card_cardtitle": "CardTitle()" | kind=code-symbol | source=packages/components/card.tsx:L36 | neighbors=[card.tsx]
- "components_cart_drawer_cartdrawerprops": "CartDrawerProps" | kind=code-symbol | source=packages/components/cart-drawer.tsx:L7 | neighbors=[cart-drawer.tsx]
- "components_chart_chartconfig": "ChartConfig" | kind=code-symbol | source=packages/components/chart.tsx:L17 | neighbors=[chart.tsx]
- "components_chart_chartcontainer": "ChartContainer()" | kind=code-symbol | source=packages/components/chart.tsx:L41 | neighbors=[chart.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-026.json

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
