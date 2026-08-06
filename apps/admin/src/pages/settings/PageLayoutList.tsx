import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PAGE_KEY_CATALOG } from "@commerceos/shared-types"
import { usePageLayoutsList } from "@/hooks/usePages"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  FileEdit,
  Layout,
  Search,
  ExternalLink,
  Layers,
} from "lucide-react"

export default function PageLayoutListPage() {
  const navigate = useNavigate()
  const { data: layoutsList, isLoading, isError, error } = usePageLayoutsList()
  const [search, setSearch] = useState("")

  const layoutsMap = new Map(
    (layoutsList || []).map((layout) => [layout.page_key, layout]),
  )

  const filteredCatalog = PAGE_KEY_CATALOG.filter((item) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      item.label.toLowerCase().includes(q) ||
      item.key.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.route.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/60 shadow-xs">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layout className="size-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Page Layouts & Builder</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Manage store page layouts, drag-and-drop sections, and visibility rules.
                </CardDescription>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search page layouts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              Loading page layouts...
            </div>
          ) : isError ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 text-sm text-destructive">
              <p className="font-semibold">Failed to load page layouts</p>
              <p className="text-xs text-muted-foreground">
                {(error as Error)?.message || "Unexpected error"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-56 font-semibold">Page</TableHead>
                  <TableHead className="font-semibold">Description & Route</TableHead>
                  <TableHead className="w-28 font-semibold">Sections</TableHead>
                  <TableHead className="w-40 font-semibold">Status</TableHead>
                  <TableHead className="w-28 text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCatalog.map((page) => {
                  const layout = layoutsMap.get(page.key)
                  const isPublished = !!layout?.published_at
                  const hasChanges = !!layout?.has_unpublished_changes
                  const sectionCount = layout?.nodes?.length ?? 0

                  let badge: { label: string; className: string }
                  if (!layout) {
                    badge = {
                      label: "Default Baseline",
                      className: "bg-muted text-muted-foreground border-transparent",
                    }
                  } else if (!isPublished) {
                    badge = {
                      label: "Draft",
                      className: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400",
                    }
                  } else if (hasChanges) {
                    badge = {
                      label: "Unpublished changes",
                      className: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
                    }
                  } else {
                    badge = {
                      label: "Published",
                      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
                    }
                  }

                  return (
                    <TableRow key={page.key} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{page.label}</span>
                          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {page.key}
                          </code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-muted-foreground">{page.description}</span>
                          <span className="font-mono text-[11px] text-primary/80">{page.route}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Layers className="size-3.5" />
                          <span className="font-medium tabular-nums">{sectionCount}</span>
                          <span>sections</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[11px] font-medium ${badge.className}`}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 gap-1.5 text-xs font-medium"
                            onClick={() => navigate(`/settings/pages/${page.key}`)}
                          >
                            <FileEdit className="size-3.5" />
                            Edit
                          </Button>
                          {page.route && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              title="View page route description"
                              onClick={() => navigate(`/settings/pages/${page.key}`)}
                            >
                              <ExternalLink className="size-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {filteredCatalog.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                      No page layouts match &quot;{search}&quot;
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
