import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { superAdminApi } from "@/lib/api/superAdmin"

const PLANS = ["free", "starter", "growth", "enterprise"] as const

interface Props {
  onProvisioned?: () => void
}

export function ProvisionTenantDialog({ onProvisioned }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [plan, setPlan] = useState<string>("growth")
  const [domain, setDomain] = useState("")

  const mutation = useMutation({
    mutationFn: (data: { name: string; plan_id: string; domain: string }) => superAdminApi.provisionTenant(data),
    onSuccess: () => {
      setOpen(false)
      setName("")
      setPlan("growth")
      setDomain("")
      onProvisioned?.()
    }
    // Errors are handled globally
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate({ name, plan_id: plan, domain })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Provision Tenant</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provision New Tenant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Tenant name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="plan">Plan</Label>
            <Select value={plan} onValueChange={(val) => val && setPlan(val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PLANS.map((p) => (
                  <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="domain">Primary domain</Label>
            <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="store.example.com" />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Provisioning..." : "Provision"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
