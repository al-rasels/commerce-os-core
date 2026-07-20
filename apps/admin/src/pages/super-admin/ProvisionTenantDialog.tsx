import { useState } from "react"
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
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await superAdminApi.provisionTenant({ name, plan_id: plan, domain })
      setOpen(false)
      setName("")
      setPlan("growth")
      setDomain("")
      onProvisioned?.()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
            <Select value={plan} onValueChange={setPlan}>
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Provisioning..." : "Provision"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
