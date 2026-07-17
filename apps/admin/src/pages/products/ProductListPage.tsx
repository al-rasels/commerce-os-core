import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useProducts, useDeleteProduct } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"

const PAGE_SIZE = 10

export default function ProductListPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(0)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: products, isLoading } = useProducts()
  const { data: categories } = useCategories()
  const deleteProduct = useDeleteProduct()

  const categoryMap = useMemo(
    () => new Map(categories?.map((c) => [c.id, c.name])),
    [categories]
  )

  const filtered = useMemo(() => {
    if (!products) return []
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [products, search, statusFilter])

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const totalItems = filtered.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products</CardTitle>
          <Link to="/products/new">
            <Button size="sm">
              <Plus className="size-4" />
              New Product
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paged.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.slug}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category_id ? categoryMap.get(product.category_id) ?? "-" : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : product.status === "draft"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/products/${product.id}/edit`}>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="size-3.5" />
                        </Button>
                      </Link>
                      <Dialog
                        open={deleteId === product.id}
                        onOpenChange={(open) => {
                          if (!open) setDeleteId(null)
                        }}
                      >
                        <DialogTrigger
                          onClick={() => setDeleteId(product.id)}
                          render={<Button variant="ghost" size="icon-sm" />}
                        >
                          <Trash2 className="size-3.5" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Product</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete "{product.name}"? This action
                              cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                              Cancel
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                deleteProduct.mutate(product.id)
                                setDeleteId(null)
                              }}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pageCount > 1 && (
          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <span>{totalItems} product{totalItems !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="px-2">{page + 1} / {pageCount}</span>
              <Button variant="ghost" size="icon-sm" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
