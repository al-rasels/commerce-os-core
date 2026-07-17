import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Eye, EyeOff, Trash2, Settings, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { sectionSchemas } from "@commerceos/components"
import type { PageSection } from "@/lib/api/pages"

interface SectionCardProps {
  section: PageSection
  isSelected: boolean
  onSelect: () => void
  onToggleVisibility: () => void
  onDelete: () => void
}

export function SectionCard({ section, isSelected, onSelect, onToggleVisibility, onDelete }: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  }

  const schema = sectionSchemas[section.component]
  const isUnknown = !schema
  const displayName = schema?.name ?? section.component

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-selected={isSelected || undefined}
      onClick={onSelect}
      className="group flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm transition-colors hover:bg-accent/50 data-selected:border-primary data-selected:ring-1 data-selected:ring-primary data-invalid:border-destructive/50"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
        <GripVertical className="size-3.5" />
      </button>
      {isUnknown && (
        <Tooltip>
          <TooltipTrigger>
            <AlertTriangle className="size-3.5 shrink-0 text-destructive" />
          </TooltipTrigger>
          <TooltipContent side="top">
            Unknown component: {section.component}
          </TooltipContent>
        </Tooltip>
      )}
      <span className="flex-1 truncate font-medium">{displayName}</span>
      <span className="hidden text-xs text-muted-foreground group-hover:inline">{section.component.split(".")[1]}</span>
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon-xs" onClick={(e) => { e.stopPropagation(); onToggleVisibility() }} title={section.visible ? "Hide" : "Show"}>
          {section.visible ? <Eye className="size-3" /> : <EyeOff className="size-3 text-muted-foreground" />}
        </Button>
        <Button variant="ghost" size="icon-xs" onClick={(e) => { e.stopPropagation(); onSelect() }} title="Edit props">
          <Settings className="size-3" />
        </Button>
        <Button variant="ghost" size="icon-xs" onClick={(e) => { e.stopPropagation(); onDelete() }} title="Remove">
          <Trash2 className="size-3 text-destructive" />
        </Button>
      </div>
    </div>
  )
}
