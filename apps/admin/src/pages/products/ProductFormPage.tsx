import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProduct, useCreateProduct, useUpdateProduct } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { RichTextEditor } from "@/components/RichTextEditor"
import { VariantEditor } from "@/components/VariantEditor"
import { ProductBundleEditor } from "@/components/ProductBundleEditor"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function ProductFormPage() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { data: product, isLoading: loadingProduct } = useProduct(isEdit ? id : undefined)
  const [description, setDescription] = useState("")
  const [productType, setProductType] = useState<"physical" | "digital" | "bundle">("physical")

  useEffect(() => {
    if (product?.description) setDescription(product.description)
    if (product?.product_type) setProductType(product.product_type as any)
  }, [product])
  const { data: categories } = useCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct(id ?? "")

  const isPending = createProduct.isPending || updateProduct.isPending

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get("name") as string,
      slug: form.get("slug") as string,
      status: (form.get("status") as "draft" | "active" | "archived") || "draft",
      product_type: productType,
      category_id: (form.get("category_id") as string) || null,
      description: description || null,
    }

    if (isEdit) {
      await updateProduct.mutateAsync(payload)
    } else {
      await createProduct.mutateAsync(payload)
    }
    navigate("/products")
  }

  if (isEdit && loadingProduct) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/products")}>
          <ArrowLeft className="size-4" />
          Back to Products
        </Button>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEdit ? "Edit Product" : "New Product"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product?.name}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={product?.slug}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="product_type">Product Type</Label>
              <select
                id="product_type"
                name="product_type"
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
                className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                required
              >
                <option value="physical">Physical</option>
                <option value="digital">Digital</option>
                <option value="bundle">Bundle</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={product?.status ?? "draft"}
                className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                required
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category_id">Category</Label>
              <Select
                name="category_id"
                defaultValue={product?.category_id ?? ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Product description..."
              />
            </div>
            {isEdit && (
              <div className="border-t pt-4">
                <VariantEditor productId={id!} />
              </div>
            )}
            {isEdit && productType === "bundle" && (
              <div className="border-t pt-4">
                <ProductBundleEditor productId={id!} />
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
