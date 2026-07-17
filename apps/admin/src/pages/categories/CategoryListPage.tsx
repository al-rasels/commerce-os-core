import { useState, useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCategories, useCreateCategory } from "@/hooks/useCategories"
import { catalogApi, type CategoryInput } from "@/lib/api/catalog"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Pencil, Trash2, ChevronRight, GripVertical } from "lucide-react"

type CategoryNode = {
  id: string
  name: string
  slug: string
  parent_id: string | null
  sort_order: number
  depth: number
}

function SortableCategoryRow({ cat }: { cat: CategoryNode }) {
  const queryClient = useQueryClient()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      catalogApi.categories.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category updated")
    },
  })

  const deleteCategory = useMutation({
    mutationFn: (id: string) => catalogApi.categories.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category deleted")
    },
  })

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cat.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get("name") as string
    const slug = form.get("slug") as string
    const parent_id = (form.get("parent_id") as string) || null
    const sort_order = parseInt(form.get("sort_order") as string, 10) || 0
    updateCategory.mutate({ id: cat.id, data: { name, slug, parent_id, sort_order } })
    setEditOpen(false)
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <span
          className="inline-flex items-center gap-1 font-medium"
          style={{ paddingLeft: `${cat.depth * 1.25}rem` }}
        >
          <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
            <GripVertical className="size-3.5" />
          </button>
          {cat.depth > 0 && (
            <ChevronRight className="size-3 text-muted-foreground" />
          )}
          {cat.name}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <Pencil className="size-3.5" />
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="edit-sort">Sort Order</Label>
                    <Input id="edit-sort" name="sort_order" type="number" defaultValue={cat.sort_order} className="w-24" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input id="edit-name" name="name" defaultValue={cat.name} required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="edit-slug">Slug</Label>
                    <Input id="edit-slug" name="slug" defaultValue={cat.slug} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={updateCategory.isPending}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <Trash2 className="size-3.5" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{cat.name}"? Subcategories will be unlinked.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => { deleteCategory.mutate(cat.id); setDeleteOpen(false) }}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  )
}

function buildTree(categories: Array<{ id: string; name: string; slug: string; parent_id: string | null; sort_order: number }>): CategoryNode[] {
  const map = new Map<string, CategoryNode[]>()
  const roots: CategoryNode[] = []

  for (const cat of categories) {
    const node: CategoryNode = { ...cat, depth: 0 }
    if (cat.parent_id) {
      const children = map.get(cat.parent_id) ?? []
      children.push(node)
      map.set(cat.parent_id, children)
    } else {
      roots.push(node)
    }
  }

  function flatten(nodes: CategoryNode[], depth: number): CategoryNode[] {
    const result: CategoryNode[] = []
    for (const node of nodes) {
      node.depth = depth
      result.push(node)
      const children = map.get(node.id) ?? []
      result.push(...flatten(children, depth + 1))
    }
    return result
  }

  return flatten(roots, 0)
}

export default function CategoryListPage() {
  const { data: categories, isLoading } = useCategories()
  const qc = useQueryClient()
  const createCategory = useCreateCategory()

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      catalogApi.categories.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category updated')
    },
    onError: (err: Error) => toast.error(err.message),
  })

  const [editDialog, setEditDialog] = useState<{
    mode: "create" | "edit"
    id?: string
  } | null>(null)

  const tree = useMemo(() => categories ? buildTree(categories) : [], [categories])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get("name") as string
    const slug = form.get("slug") as string
    const parent_id = (form.get("parent_id") as string) || null
    const sort_order = parseInt(form.get("sort_order") as string, 10) || 0

    if (editDialog?.mode === "edit" && editDialog.id) {
      updateCategory.mutate({ id: editDialog.id, data: { name, slug, parent_id, sort_order } })
    } else {
      createCategory.mutate({ name, slug, parent_id, sort_order })
    }
    setEditDialog(null)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const activeCat = categories?.find((c) => c.id === active.id)
    const overCat = categories?.find((c) => c.id === over.id)
    if (!activeCat || !overCat) return
    updateCategory.mutate({ id: activeCat.id, data: { sort_order: overCat.sort_order } })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Categories</CardTitle>
          <Dialog
            open={editDialog?.mode === "create"}
            onOpenChange={(open) => { if (!open) setEditDialog(null) }}
          >
            <DialogTrigger
              onClick={() => setEditDialog({ mode: "create" })}
              render={<Button size="sm" />}
            >
              <Plus className="size-4" />
              New Category
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>New Category</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cat-sort">Sort Order</Label>
                    <Input id="cat-sort" name="sort_order" type="number" defaultValue={0} className="w-24" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cat-name">Name</Label>
                    <Input id="cat-name" name="name" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cat-slug">Slug</Label>
                    <Input id="cat-slug" name="slug" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cat-parent">Parent Category</Label>
                    <Select name="parent_id" defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="None (top level)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None (top level)</SelectItem>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <Button type="submit" disabled={createCategory.isPending}>
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tree.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No categories yet
                </TableCell>
              </TableRow>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tree.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                  {tree.map((cat) => (
                    <SortableCategoryRow key={cat.id} cat={cat} />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
