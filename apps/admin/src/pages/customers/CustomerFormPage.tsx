import { useParams, useNavigate } from "react-router-dom"
import { useCustomer, useCreateCustomer, useUpdateCustomer } from "@/hooks/useCustomers"
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
import { ArrowLeft, Loader2 } from "lucide-react"

export default function CustomerFormPage() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const { data: customer, isLoading } = useCustomer(isEdit ? id : undefined)
  const createCustomer = useCreateCustomer()
  const updateCustomer = useUpdateCustomer(id ?? "")

  const isPending = createCustomer.isPending || updateCustomer.isPending

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      email: form.get("email") as string,
      first_name: (form.get("first_name") as string) || undefined,
      last_name: (form.get("last_name") as string) || undefined,
    }

    if (isEdit) {
      await updateCustomer.mutateAsync(payload)
    } else {
      await createCustomer.mutateAsync(payload)
    }
    navigate("/customers")
  }

  if (isEdit && isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/customers")}>
          <ArrowLeft className="size-4" />
          Back to Customers
        </Button>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEdit ? "Edit Customer" : "New Customer"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={customer?.email}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                defaultValue={customer?.first_name ?? ""}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                defaultValue={customer?.last_name ?? ""}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/customers")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Update Customer" : "Create Customer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
