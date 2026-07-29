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
import { ArrowLeft, Loader2, Save, CloudOff } from "lucide-react"

export default function ProductFormPage() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { data: product, isLoading: loadingProduct } = useProduct(isEdit ? id : undefined)
  const [description, setDescription] = useState("")
  const [productType, setProductType] = useState<"physical" | "digital" | "bundle">("physical")
  const [isDirty, setIsDirty] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    if (product?.description) setDescription(product.description)
    if (product?.product_type) setProductType(product.product_type as any)
  }, [product])
  
  const { data: categories } = useCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct(id ?? "")

  const isPending = createProduct.isPending || updateProduct.isPending

  const handleFormChange = () => {
    if (!isDirty) setIsDirty(true)
  }

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
      setLastSaved(new Date())
      setIsDirty(false)
    } else {
      await createProduct.mutateAsync(payload)
      navigate("/products")
    }
  }

  if (isEdit && loadingProduct) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleFormChange} className="relative pb-16">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 -mx-6 -mt-6 mb-6 flex items-center justify-between border-b bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/products")}>
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{isEdit ? "Edit Product" : "New Product"}</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {isPending ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  Saving changes...
                </>
              ) : isDirty ? (
                <>
                  <CloudOff className="size-3" />
                  Unsaved changes
                </>
              ) : lastSaved ? (
                <>
                  <Save className="size-3" />
                  Saved at {lastSaved.toLocaleTimeString()}
                </>
              ) : (
                "Up to date"
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/products")}>
            Discard
          </Button>
          <Button type="submit" disabled={isPending || (!isDirty && isEdit)} isLoading={isPending}>
            {isEdit ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
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
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={description}
                  onChange={(v) => { setDescription(v); handleFormChange(); }}
                  placeholder="Write a compelling product description..."
                />
              </div>
            </CardContent>
          </Card>

          {isEdit && (
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <VariantEditor productId={id!} />
              </CardContent>
            </Card>
          )}

          {isEdit && productType === "bundle" && (
            <Card>
              <CardHeader>
                <CardTitle>Bundle Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductBundleEditor productId={id!} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={product?.status ?? "draft"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="product_type">Product Type</Label>
                <Select name="product_type" value={productType} onValueChange={(v: any) => { setProductType(v); handleFormChange(); }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical Product</SelectItem>
                    <SelectItem value="digital">Digital Asset</SelectItem>
                    <SelectItem value="bundle">Product Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  name="category_id"
                  defaultValue={product?.category_id ?? ""}
                >
                  <SelectTrigger>
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
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={product?.slug}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
