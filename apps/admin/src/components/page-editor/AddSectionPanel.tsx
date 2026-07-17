import { useState } from "react"
import { sectionSchemas } from "@commerceos/components"
import type { SectionSchema } from "@commerceos/components"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, Plus } from "lucide-react"

interface AddSectionPanelProps {
  onAdd: (key: string) => void
}

export function AddSectionPanel({ onAdd }: AddSectionPanelProps) {
  const [search, setSearch] = useState("")
  const schemaList = Object.values(sectionSchemas)

  const filtered = search
    ? schemaList.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.key.toLowerCase().includes(search.toLowerCase()))
    : schemaList

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search sections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pl-7 text-sm"
        />
      </div>
      <ScrollArea className="h-[280px]">
        <div className="flex flex-col gap-1">
          {filtered.map((schema) => (
            <SectionOption key={schema.key} schema={schema} onAdd={onAdd} />
          ))}
          {filtered.length === 0 && (
            <p className="py-4 text-center text-xs text-muted-foreground">No sections match your search</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function SectionOption({ schema, onAdd }: { schema: SectionSchema; onAdd: (key: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors",
        hovered ? "bg-accent" : "",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col">
        <span className="font-medium">{schema.name}</span>
        <span className="text-xs text-muted-foreground">{schema.description}</span>
      </div>
      {hovered && (
        <Button variant="ghost" size="icon-sm" onClick={() => onAdd(schema.key)}>
          <Plus className="size-3.5" />
        </Button>
      )}
    </div>
  )
}
