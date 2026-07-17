import { useState, useCallback, useMemo } from "react"
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
import { usePageLayout, useSavePageLayout, usePublishPageLayout, useUnpublishPageLayout } from "@/hooks/usePages"
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
  Eye,
  EyeOff,
  Layers,
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
    props: defaults,
  }
}

export default function PageLayoutEditorPage() {
  const { pageKey } = useParams<{ pageKey: string }>()
  const navigate = useNavigate()
  const { data: layout, isLoading } = usePageLayout(pageKey ?? "")
  const saveMutation = useSavePageLayout(pageKey ?? "")
  const publishMutation = usePublishPageLayout(pageKey ?? "")
  const unpublishMutation = useUnpublishPageLayout(pageKey ?? "")

  const [sections, setSections] = useState<PageSection[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false)

  if (!initialized && layout) {
    setSections(layout.sections_json ?? [])
    setHasUnpublishedChanges(false)
    setInitialized(true)
  }

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

  function handleSaveDraft() {
    saveMutation.mutate(
      { sections, publish: false },
      { onSuccess: () => setHasUnpublishedChanges(true) },
    )
  }

  function handlePublish() {
    saveMutation.mutate(
      { sections, publish: true },
      { onSuccess: () => setHasUnpublishedChanges(false) },
    )
  }

  function handleUnpublish() {
    unpublishMutation.mutate(undefined, {
      onSuccess: () => setHasUnpublishedChanges(false),
    })
  }

  if (isLoading || !layout) {
    return (
      <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
        Loading page layout...
      </div>
    )
  }

  const sectionIds = sections.map((s) => s.id)
  const hasUnsavedChanges = JSON.stringify(sections) !== JSON.stringify(layout.sections_json ?? [])
  const isPublished = !!layout.published_at
  const syncing = saveMutation.isPending || publishMutation.isPending || unpublishMutation.isPending

  let statusBadge: { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
  if (!isPublished) {
    statusBadge = { label: "Draft", variant: "secondary" }
  } else if (hasUnpublishedChanges || hasUnsavedChanges) {
    statusBadge = { label: "Unpublished changes", variant: "outline" }
  } else {
    statusBadge = { label: "Published", variant: "default" }
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col gap-0">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate("/settings/pages")}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold capitalize">{pageKey}</h1>
            <p className="text-xs text-muted-foreground">Page Layout Editor</p>
          </div>
          <Badge variant={statusBadge.variant} className="ml-2 text-xs">
            {statusBadge.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasUnsavedChanges || syncing}
            onClick={handleSaveDraft}
          >
            <Save className="size-3.5" />
            {syncing ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={(!hasUnsavedChanges && !hasUnpublishedChanges) || syncing}
            onClick={handlePublish}
          >
            <Send className="size-3.5" />
            {syncing ? "Publishing..." : "Publish"}
          </Button>
          {isPublished && (
            <Button
              variant="ghost"
              size="sm"
              disabled={syncing}
              onClick={handleUnpublish}
            >
              <Ban className="size-3.5" />
              Unpublish
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 gap-4 overflow-hidden pt-4">
        {/* Left: Section List */}
        <div className="flex w-full max-w-sm flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Layers className="size-4 text-muted-foreground" />
              Sections
              <span className="rounded-md bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
                {sections.length}
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon-sm" onClick={() => setAddOpen(true)}>
                  <Plus className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add section</TooltipContent>
            </Tooltip>
          </div>

          <ScrollArea className="flex-1">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-1.5 pr-3">
                  {sections.map((section) => (
                    <SectionCard
                      key={section.id}
                      section={section}
                      isSelected={section.id === selectedId}
                      onSelect={() => setSelectedId(section.id)}
                      onToggleVisibility={() => handleToggleVisibility(section.id)}
                      onDelete={() => handleDelete(section.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            {sections.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
                <Layers className="size-8 opacity-30" />
                <p>No sections yet</p>
                <Button variant="outline" size="sm" onClick={() => setAddOpen(true)}>
                  <Plus className="size-3.5" />
                  Add a section
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>

        <Separator orientation="vertical" className="h-full" />

        {/* Right: Prop Editor */}
        <div className="flex flex-1 flex-col gap-3 overflow-hidden">
          {selectedSection && selectedSchema ? (
            <ScrollArea className="flex-1 pr-2">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-sm font-semibold">{selectedSchema.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedSchema.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {selectedSection.component}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    {selectedSection.visible ? (
                      <><Eye className="size-3" /> Visible</>
                    ) : (
                      <><EyeOff className="size-3" /> Hidden</>
                    )}
                  </Badge>
                </div>
                <Separator />
                <div className="flex flex-col gap-4">
                  {selectedSchema.props.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No configurable properties</p>
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
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Select a section to edit its properties
            </div>
          )}
        </div>
      </div>

      {/* Add Section Sheet */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="right" className="sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Add Section</SheetTitle>
            <SheetDescription>Choose a section to add to the page</SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <AddSectionPanel onAdd={handleAddSection} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
