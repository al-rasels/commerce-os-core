import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { sectionSchemas } from "@commerceos/components"
import { areNodesEqual, PAGE_KEY_CATALOG } from "@commerceos/shared-types"
import {
  usePageLayout,
  useSavePageLayout,
  useUnpublishPageLayout,
} from "@/hooks/usePages"
import { SectionCard, AddSectionPanel, PropEditor } from "@/components/page-editor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import {
  ArrowLeft,
  Plus,
  Save,
  Send,
  Ban,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Sparkles,
  Zap,
} from "lucide-react"
import type { PageSection } from "@/lib/api/pages"

type ViewportMode = "desktop" | "tablet" | "mobile"

function createDefaultSection(componentKey: string): PageSection {
  const schema = sectionSchemas[componentKey]
  const defaults: Record<string, unknown> = {}
  if (schema) {
    for (const prop of schema.props) {
      if (prop.defaultValue !== undefined) {
        defaults[prop.key] = prop.defaultValue
      }
    }
  }
  return {
    id: crypto.randomUUID(),
    component: componentKey,
    visible: true,
    rules: [],
    props: defaults,
    children: [],
  }
}

export default function PageLayoutEditorPage() {
  const { pageKey = "homepage" } = useParams<{ pageKey: string }>()
  const navigate = useNavigate()
  const { data: layout, isLoading, isError, error } = usePageLayout(pageKey)
  const saveMutation = useSavePageLayout(pageKey)
  const unpublishMutation = useUnpublishPageLayout(pageKey)

  const [sections, setSections] = useState<PageSection[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [viewport, setViewport] = useState<ViewportMode>("desktop")
  const initialized = useRef(false)

  const catalogEntry = useMemo(
    () => PAGE_KEY_CATALOG.find((p) => p.key === pageKey) ?? null,
    [pageKey],
  )

  // Reset editor state when navigating to a different page key.
  useEffect(() => {
    initialized.current = false
    setSections([])
    setSelectedId(null)
  }, [pageKey])

  useEffect(() => {
    if (layout && !initialized.current) {
      const initialNodes = layout.nodes ?? []
      setSections(initialNodes)
      if (initialNodes.length > 0) {
        setSelectedId(initialNodes[0].id)
      }
      initialized.current = true
    }
  }, [layout, pageKey])

  const selectedSection = useMemo(
    () => sections.find((s) => s.id === selectedId) ?? null,
    [sections, selectedId],
  )
  const selectedSchema = selectedSection
    ? sectionSchemas[selectedSection.component]
    : null

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setSections((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id)
      const newIndex = prev.findIndex((s) => s.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return prev
      const next = [...prev]
      const [moved] = next.splice(oldIndex, 1)
      next.splice(newIndex, 0, moved)
      return next
    })
  }

  const handleAddSection = useCallback((componentKey: string) => {
    const section = createDefaultSection(componentKey)
    setSections((prev) => [...prev, section])
    setSelectedId(section.id)
    setAddOpen(false)
  }, [])

  const handleDuplicateSection = useCallback((id: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx === -1) return prev
      const target = prev[idx]
      const duplicate: PageSection = {
        ...target,
        id: crypto.randomUUID(),
        props: JSON.parse(JSON.stringify(target.props)),
        rules: JSON.parse(JSON.stringify(target.rules ?? [])),
      }
      const next = [...prev]
      next.splice(idx + 1, 0, duplicate)
      return next
    })
  }, [])

  const handleDelete = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const handleToggleVisibility = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    )
  }, [])

  const handlePropChange = useCallback(
    (propKey: string, value: unknown) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id === selectedId
            ? { ...s, props: { ...s.props, [propKey]: value } }
            : s,
        ),
      )
    },
    [selectedId],
  )

  const handleRulesChange = useCallback(
    (rules: { if: string; action: 'show' | 'hide' }[]) => {
      setSections((prev) =>
        prev.map((s) => (s.id === selectedId ? { ...s, rules } : s)),
      )
    },
    [selectedId],
  )

  function handleSaveDraft() {
    saveMutation.mutate({ nodes: sections, publish: false })
  }

  function handlePublish() {
    // Persist the current draft first, then publish it atomically.
    saveMutation.mutate({ nodes: sections, publish: true })
  }

  function handleUnpublish() {
    unpublishMutation.mutate()
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading layout builder...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
        <p className="font-semibold text-destructive">Failed to load layout builder</p>
        <p className="text-xs">{(error as Error)?.message || "An unexpected error occurred"}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  const baselineNodes = layout?.nodes ?? []
  const hasUnsavedChanges = !areNodesEqual(sections, baselineNodes)
  const isPublished = !!layout?.published_at
  const hasUnpublishedChanges = !!layout?.has_unpublished_changes || hasUnsavedChanges
  const syncing = saveMutation.isPending || unpublishMutation.isPending

  let statusBadge: { label: string; variant: "default" | "secondary" | "outline"; className: string }
  if (!isPublished) {
    statusBadge = {
      label: "Draft",
      variant: "secondary",
      className: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400",
    }
  } else if (hasUnpublishedChanges) {
    statusBadge = {
      label: "Unpublished changes",
      variant: "outline",
      className: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    }
  } else {
    statusBadge = {
      label: "Published",
      variant: "default",
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    }
  }

  const viewportWidthClass =
    viewport === "mobile"
      ? "max-w-[375px]"
      : viewport === "tablet"
        ? "max-w-[768px]"
        : "w-full"

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col gap-0 overflow-hidden">
      {/* Header Bar */}
      <div className="flex shrink-0 items-center justify-between border-b bg-card/80 px-4 py-2.5 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate("/settings/pages")}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold capitalize">
                {catalogEntry?.label || pageKey}
              </h1>
              <Badge variant="outline" className={`text-[10px] font-mono ${statusBadge.className}`}>
                {statusBadge.label}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {catalogEntry?.description || `Layout editor for ${pageKey}`}
            </p>
          </div>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center rounded-lg border bg-muted/40 p-0.5">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={viewport === "desktop" ? "secondary" : "ghost"}
                  size="icon-xs"
                  className="h-7 w-7"
                  onClick={() => setViewport("desktop")}
                />
              }
            >
              <Monitor className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Desktop View</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={viewport === "tablet" ? "secondary" : "ghost"}
                  size="icon-xs"
                  className="h-7 w-7"
                  onClick={() => setViewport("tablet")}
                />
              }
            >
              <Tablet className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Tablet (768px)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={viewport === "mobile" ? "secondary" : "ghost"}
                  size="icon-xs"
                  className="h-7 w-7"
                  onClick={() => setViewport("mobile")}
                />
              }
            >
              <Smartphone className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent>Mobile (375px)</TooltipContent>
          </Tooltip>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          {catalogEntry?.route && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground"
              onClick={() =>
                window.open(
                  `http://localhost:3001${catalogEntry.route === "/" ? "" : catalogEntry.route}`,
                  "_blank",
                )
              }
            >
              <ExternalLink className="size-3.5" />
              Storefront Preview
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            disabled={!hasUnsavedChanges || syncing}
            onClick={handleSaveDraft}
          >
            <Save className="size-3.5" />
            {saveMutation.isPending ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            disabled={syncing}
            onClick={handlePublish}
          >
            <Send className="size-3.5" />
            {saveMutation.isPending ? "Publishing..." : "Publish"}
          </Button>
          {isPublished && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              disabled={syncing}
              onClick={handleUnpublish}
            >
              <Ban className="size-3.5" />
              Unpublish
            </Button>
          )}
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="flex flex-1 overflow-hidden bg-muted/20">
        {/* Left Column: Section Explorer Tree */}
        <div className="flex w-80 flex-col border-r bg-card/60">
          <div className="flex items-center justify-between border-b px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Layers className="size-4 text-primary" />
              Page Sections
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px] tabular-nums font-mono">
                {sections.length}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="size-3.5" />
              Add Section
            </Button>
          </div>

          <ScrollArea className="flex-1 p-2">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-1.5">
                  {sections.map((section) => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      isSelected={section.id === selectedId}
                      onSelect={() => setSelectedId(section.id)}
                      onToggleVisibility={() => handleToggleVisibility(section.id)}
                      onDuplicate={() => handleDuplicateSection(section.id)}
                      onDelete={() => handleDelete(section.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {sections.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-xs text-muted-foreground">
                <Layers className="size-8 opacity-30" />
                <p className="font-medium text-foreground">No sections configured</p>
                <p>Add components to compose your store layout.</p>
                <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => setAddOpen(true)}>
                  <Plus className="size-3.5 mr-1" /> Add Section
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Center Column: Live Responsive Canvas */}
        <div className="flex flex-1 flex-col items-center justify-start overflow-y-auto p-4">
          <div
            className={`transition-all duration-300 ${viewportWidthClass} flex min-h-[500px] flex-col rounded-xl border bg-card shadow-sm overflow-hidden`}
          >
            {/* Viewport Frame Header */}
            <div className="flex items-center justify-between border-b bg-muted/40 px-3 py-1.5 text-[10px] text-muted-foreground">
              <span className="font-mono uppercase tracking-wider">{viewport} frame</span>
              <span className="font-mono">
                {viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px"}
              </span>
            </div>

            {/* Sections Canvas Render Stack */}
            <div className="flex flex-1 flex-col divide-y divide-border/40 p-3 bg-background/50">
              {sections.map((section, idx) => {
                const schema = sectionSchemas[section.component]
                const isSelected = section.id === selectedId
                return (
                  <div
                    key={section.id}
                    onClick={() => setSelectedId(section.id)}
                    className={`group relative flex cursor-pointer flex-col p-4 transition-all rounded-lg my-1 ${
                      isSelected
                        ? "border-2 border-primary bg-primary/5 shadow-xs"
                        : "border border-dashed border-border/70 hover:border-primary/40 hover:bg-accent/30"
                    } ${!section.visible ? "opacity-50 border-muted" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">#{idx + 1}</span>
                        <span className="text-xs font-bold text-foreground">
                          {schema?.name || section.component}
                        </span>
                        {!section.visible && (
                          <Badge variant="outline" className="text-[9px] h-3.5 px-1 bg-muted">
                            Hidden
                          </Badge>
                        )}
                      </div>
                      <code className="text-[10px] font-mono text-muted-foreground">{section.component}</code>
                    </div>

                    <div className="rounded border bg-card/80 p-3 text-xs text-muted-foreground">
                      <p className="text-[11px] italic mb-1">{schema?.description || "Component preview"}</p>
                      <pre className="font-mono text-[10px] overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground/80">
                        {JSON.stringify(section.props, null, 2)}
                      </pre>
                    </div>
                  </div>
                )
              })}

              {sections.length === 0 && (
                <div className="flex flex-1 items-center justify-center p-12 text-center text-xs text-muted-foreground">
                  Empty canvas. Click &quot;Add Section&quot; to begin building.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Prop Inspector & Rules Engine */}
        <div className="flex w-96 flex-col border-l bg-card/60">
          {selectedSection && selectedSchema ? (
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-foreground">{selectedSchema.name}</h2>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {selectedSection.component}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedSchema.description}</p>
                </div>

                <Separator />

                {/* Section Props Inspector */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Zap className="size-3 text-primary" /> Component Properties
                  </h3>

                  {selectedSchema.props.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No configurable properties for this section.</p>
                  ) : (
                    selectedSchema.props.map((propSchema) => (
                      <PropEditor
                        key={propSchema.key}
                        schema={propSchema}
                        value={selectedSection.props[propSchema.key]}
                        onChange={handlePropChange}
                      />
                    ))
                  )}
                </div>

                <Separator />

                {/* Visibility Rules Engine */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Sparkles className="size-3 text-primary" /> Visibility Rules (DSL)
                    </h3>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      className="h-6 w-6"
                      onClick={() => {
                        const newRules = [
                          ...(selectedSection.rules || []),
                          { if: "segment == 'vip'", action: "show" as const },
                        ]
                        handleRulesChange(newRules)
                      }}
                      title="Add Visibility Rule"
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>

                  {/* Rule Presets */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] text-muted-foreground">Presets:</span>
                    <button
                      type="button"
                      className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-foreground hover:bg-accent font-mono"
                      onClick={() => {
                        const newRules = [
                          ...(selectedSection.rules || []),
                          { if: "segment == 'vip'", action: "show" as const },
                        ]
                        handleRulesChange(newRules)
                      }}
                    >
                      + VIP Only
                    </button>
                    <button
                      type="button"
                      className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-foreground hover:bg-accent font-mono"
                      onClick={() => {
                        const newRules = [
                          ...(selectedSection.rules || []),
                          { if: "category in ('tech','fashion')", action: "show" as const },
                        ]
                        handleRulesChange(newRules)
                      }}
                    >
                      + Category Match
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {(selectedSection.rules || []).map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-2 rounded-lg border bg-muted/20 p-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[11px] text-primary">Rule #{idx + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="h-5 w-5 text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              const newRules = [...(selectedSection.rules || [])]
                              newRules.splice(idx, 1)
                              handleRulesChange(newRules)
                            }}
                          >
                            <Ban className="size-3" />
                          </Button>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <div>
                            <label className="text-[10px] uppercase font-semibold text-muted-foreground mb-0.5 block">
                              Condition Expression (If)
                            </label>
                            <input
                              className="flex h-7 w-full rounded border border-input bg-background px-2 font-mono text-xs shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              placeholder="segment == 'vip' or category in ('a','b')"
                              value={rule.if}
                              onChange={(e) => {
                                const newRules = [...(selectedSection.rules || [])]
                                newRules[idx].if = e.target.value
                                handleRulesChange(newRules)
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="text-[10px] uppercase font-semibold text-muted-foreground">
                              Action
                            </label>
                            <select
                              className="h-7 rounded border border-input bg-background px-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              value={rule.action}
                              onChange={(e) => {
                                const newRules = [...(selectedSection.rules || [])]
                                newRules[idx].action = e.target.value as 'show' | 'hide'
                                handleRulesChange(newRules)
                              }}
                            >
                              <option value="show">Show Section</option>
                              <option value="hide">Hide Section</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(selectedSection.rules || []).length === 0 && (
                      <p className="text-[11px] text-muted-foreground italic">
                        No visibility rules attached. Section renders for all visitors.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-xs text-muted-foreground">
              <Layers className="size-8 opacity-30" />
              <p className="font-semibold text-foreground">No Section Selected</p>
              <p>Select a section from the left sidebar to inspect and edit its properties.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Section Sheet Drawer */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-base font-bold">Add Section Component</SheetTitle>
            <SheetDescription className="text-xs">
              Choose a section component to insert into the page layout tree.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <AddSectionPanel onAdd={handleAddSection} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
