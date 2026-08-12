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
import { useHistoryState } from "@/hooks/useHistoryState"
import { SectionCard, AddSectionPanel, PropEditor, PagePreviewFrame } from "@/components/page-editor"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Undo2,
  Redo2,
  ExternalLink,
  Eye,
} from "lucide-react"
import type { PageSection } from "@/lib/api/pages"

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
  const storefrontUrl = import.meta.env.VITE_STOREFRONT_URL || "http://localhost:3001"
  const { data: layout, isLoading, isError, error } = usePageLayout(pageKey)
  const saveMutation = useSavePageLayout(pageKey)
  const unpublishMutation = useUnpublishPageLayout(pageKey)

  const [sections, setSections, { undo, redo, canUndo, canRedo, reset }] = useHistoryState<PageSection[]>([])
  
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const initialized = useRef(false)

  const catalogEntry = useMemo(
    () => PAGE_KEY_CATALOG.find((p) => p.key === pageKey) ?? null,
    [pageKey],
  )

  useEffect(() => {
    initialized.current = false
    setSections([])
    setSelectedId(null)
  }, [pageKey, setSections])

  useEffect(() => {
    if (layout && !initialized.current) {
      const initialNodes = layout.nodes ?? layout.sections_json ?? []
      reset(initialNodes)
      if (initialNodes.length > 0) {
        setSelectedId(initialNodes[0].id)
      }
      initialized.current = true
    }
  }, [layout, reset])

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
  }, [setSections])

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
  }, [setSections])

  const handleMoveUp = useCallback((id: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx <= 0) return prev
      const next = [...prev]
      const [moved] = next.splice(idx, 1)
      next.splice(idx - 1, 0, moved)
      return next
    })
  }, [setSections])

  const handleMoveDown = useCallback((id: string) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx === -1 || idx >= prev.length - 1) return prev
      const next = [...prev]
      const [moved] = next.splice(idx, 1)
      next.splice(idx + 1, 0, moved)
      return next
    })
  }, [setSections])

  const handleDelete = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [setSections])

  const handleToggleVisibility = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    )
  }, [setSections])

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
    [selectedId, setSections],
  )

  const handleRulesChange = useCallback(
    (rules: { if: string; action: 'show' | 'hide' }[]) => {
      setSections((prev) =>
        prev.map((s) => (s.id === selectedId ? { ...s, rules } : s)),
      )
    },
    [selectedId, setSections],
  )
  
  const handleStylesChange = useCallback(
    (styles: Record<string, string>) => {
      setSections((prev) =>
        prev.map((s) => (s.id === selectedId ? { ...s, options: { ...s.options, styles } } : s)),
      )
    },
    [selectedId, setSections],
  )

  function handleSaveDraft() {
    saveMutation.mutate({ nodes: sections, publish: false })
  }

  function handlePublish() {
    saveMutation.mutate({ nodes: sections, publish: true })
  }

  function handleUnpublish() {
    unpublishMutation.mutate()
  }

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }
      
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          if (canRedo) redo();
        } else {
          if (canUndo) undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

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

  const baselineNodes = layout?.nodes ?? layout?.sections_json ?? []
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

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          {catalogEntry?.route && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground"
              onClick={() =>
                window.open(
                  `${storefrontUrl}${catalogEntry.route === "/" ? "" : catalogEntry.route}`,
                  "_blank",
                )
              }
            >
              <ExternalLink className="size-3.5" />
              Storefront Preview
            </Button>
          )}

          {/* History Controls */}
          <div className="flex items-center mr-2 border rounded-md">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-none border-r" disabled={!canUndo} onClick={undo}>
                  <Undo2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Cmd+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-none" disabled={!canRedo} onClick={redo}>
                  <Redo2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Cmd+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>

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

      {/* Main 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Section Navigator */}
        <div className="flex w-72 shrink-0 flex-col gap-3 border-r p-3 bg-card/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Layers className="size-4 text-primary" />
              Sections
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

          <ScrollArea className="flex-1 pr-1">
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
                      onMoveUp={() => handleMoveUp(section.id)}
                      onMoveDown={() => handleMoveDown(section.id)}
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

        {/* Center: Live Responsive Preview Frame */}
        <div className="flex-1 h-full min-w-0">
          <PagePreviewFrame 
            sections={sections} 
            device={device}
            onDeviceChange={setDevice}
          />
        </div>

        {/* Right: Prop Editor & Inspector */}
        <div className="flex w-96 shrink-0 flex-col gap-3 p-4 border-l bg-card/60 overflow-hidden">
          {selectedSection && selectedSchema ? (
            <ScrollArea className="flex-1 pr-2">
              <PropEditor
                schema={selectedSchema}
                section={selectedSection}
                onChange={handlePropChange}
                onRulesChange={handleRulesChange}
                onStylesChange={handleStylesChange}
              />
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

      {/* Add Section Sheet */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="left" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Section</SheetTitle>
            <SheetDescription>Choose a component section to add to your layout</SheetDescription>
          </SheetHeader>
          <div className="pt-2">
            <AddSectionPanel onAdd={handleAddSection} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
