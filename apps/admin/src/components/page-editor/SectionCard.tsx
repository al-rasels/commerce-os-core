import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Eye, EyeOff, Trash2, Settings, AlertTriangle, Copy, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { sectionSchemas } from "@commerceos/components"
import { ComponentMetadata } from "@commerceos/shared-types"
import type { PageSection } from "@/lib/api/pages"

interface SectionCardProps {
  section: PageSection
  isSelected: boolean
  onSelect: () => void
  onToggleVisibility: () => void
  onDelete: () => void
  onDuplicate?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export function SectionCard({
  section,
  isSelected,
  onSelect,
  onToggleVisibility,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
  }

  const schema = sectionSchemas[section.component]
  const meta = ComponentMetadata[section.component]
  const isUnknown = !schema
  const displayName = schema?.name ?? section.component
  const hasRules = section.rules && section.rules.length > 0
  const deviceTarget = (section.props as any)?.deviceTarget ?? "all"

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-selected={isSelected || undefined}
      onClick={onSelect}
      className={`group relative flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm transition-all hover:border-primary/50 hover:bg-accent/40 ${
        isSelected
          ? "border-primary bg-accent/60 ring-1 ring-primary shadow-xs"
          : "border-border/70"
      } ${!section.visible ? "opacity-60 bg-muted/30" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground/60 hover:text-foreground active:cursor-grabbing p-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="size-4" />
      </button>

      {isUnknown && (
        <Tooltip>
          <TooltipTrigger>
            <AlertTriangle className="size-4 shrink-0 text-destructive" />
          </TooltipTrigger>
          <TooltipContent side="top">Unknown component: {section.component}</TooltipContent>
        </Tooltip>
      )}

      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="truncate font-semibold text-xs text-foreground">{displayName}</span>
          {deviceTarget !== "all" && (
            <Badge variant="outline" className="text-[9px] px-1 py-0 uppercase font-mono">
              {deviceTarget}
            </Badge>
          )}
          {meta?.minPlan && (
            <Badge
              variant="outline"
              className="text-[9px] h-3.5 px-1 py-0 uppercase bg-amber-500/10 text-amber-600 border-amber-500/20 shrink-0 font-mono"
            >
              {meta.minPlan}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="font-mono text-[9px] text-muted-foreground/80 truncate">{section.component}</span>
          {hasRules && (
            <Badge variant="secondary" className="text-[9px] h-3.5 px-1 py-0 text-primary bg-primary/10">
              {section.rules!.length} rule{section.rules!.length > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
        {onMoveUp && (
          <Button variant="ghost" size="icon-xs" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onMoveUp() }} title="Move up">
            <ArrowUp className="size-3" />
          </Button>
        )}
        {onMoveDown && (
          <Button variant="ghost" size="icon-xs" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onMoveDown() }} title="Move down">
            <ArrowDown className="size-3" />
          </Button>
        )}
        {onDuplicate && (
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              onDuplicate()
            }}
            title="Duplicate section"
          >
            <Copy className="size-3" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onToggleVisibility()
          }}
          title={section.visible ? "Hide section" : "Show section"}
        >
          {section.visible ? (
            <Eye className="size-3.5 text-primary" />
          ) : (
            <EyeOff className="size-3.5 text-muted-foreground" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          title="Remove section"
        >
          <Trash2 className="size-3 text-destructive/80" />
        </Button>
      </div>
    </div>
  )
}
