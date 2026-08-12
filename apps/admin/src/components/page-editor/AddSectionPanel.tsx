import { useState, useMemo } from "react"
import { sectionSchemas } from "@commerceos/components"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Lock, LayoutTemplate, ShoppingBag, Navigation, Mail, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ComponentMetadata } from "@commerceos/shared-types"
import { cn } from "@/lib/utils"

interface AddSectionPanelProps {
  onAdd: (key: string) => void
}

function getCategoryIcon(key: string) {
  if (key.startsWith("hero") || key.startsWith("promo") || key.startsWith("banner")) {
    return LayoutTemplate
  }
  if (key.startsWith("product") || key.startsWith("gallery") || key.startsWith("cart")) {
    return ShoppingBag
  }
  if (key.startsWith("breadcrumbs") || key.startsWith("search") || key.startsWith("header")) {
    return Navigation
  }
  if (key.startsWith("newsletter") || key.startsWith("form")) {
    return Mail
  }
  return Layers
}

export function AddSectionPanel({ onAdd }: AddSectionPanelProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const schemaList = Object.values(sectionSchemas) as any[]

  const categories = [
    { id: "all", label: "All" },
    { id: "hero", label: "Hero & Banners" },
    { id: "commerce", label: "Commerce" },
    { id: "content", label: "Content" },
    { id: "engagement", label: "Engagement" },
  ]

  const filtered = useMemo(() => {
    return schemaList.filter((s: any) => {
      const q = search.toLowerCase().trim()
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.key.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      const matchesCategory = activeCategory === "all" || s.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [schemaList, search, activeCategory])

  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search components & sections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pl-8 text-xs"
        />
      </div>

      <div className="flex flex-wrap gap-1 border-b pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-2 py-1 text-[11px] rounded-md transition-colors font-medium",
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[380px] pr-2">
        <div className="flex flex-col gap-2">
          {filtered.map((schema) => {
            const CategoryIcon = getCategoryIcon(schema.key)
            const meta = ComponentMetadata[schema.key]

            return (
              <div
                key={schema.key}
                onClick={() => onAdd(schema.key)}
                className="group flex cursor-pointer items-center justify-between rounded-lg border border-border/60 bg-card p-3 transition-all hover:border-primary/50 hover:bg-accent/40"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
                    <CategoryIcon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-foreground group-hover:text-primary">
                        {schema.name}
                      </span>
                      {meta?.minPlan && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] h-3.5 px-1 py-0 gap-0.5 font-mono uppercase bg-amber-500/10 text-amber-600 border-amber-500/20"
                        >
                          <Lock className="size-2.5" />
                          {meta.minPlan}
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground line-clamp-2">
                      {schema.description}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/70">
                      {schema.key}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon-xs"
                  className="size-7 shrink-0 opacity-80 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAdd(schema.key)
                  }}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-xs text-muted-foreground">
              <Layers className="size-6 opacity-40" />
              <p>No section components match search or filter</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
