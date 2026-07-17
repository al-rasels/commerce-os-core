import { useParams, Link } from "react-router-dom"
import { useUser, useUpdateUserStatus } from "@/hooks/useUsers"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShieldAlert, ShieldCheck } from "lucide-react"

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  active: "default",
  suspended: "destructive",
  invited: "secondary",
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading, isError } = useUser(id)
  const updateStatus = useUpdateUserStatus(id!)

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>
  if (isError) return <div className="text-sm text-destructive">Failed to load user</div>
  if (!user) return <div className="text-sm text-muted-foreground">User not found</div>

  const handleToggleStatus = () => {
    const newStatus = user.status === "active" ? "suspended" : "active"
    updateStatus.mutate({ status: newStatus })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/users">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">{user.email}</h1>
          <p className="text-sm text-muted-foreground">
            {[user.first_name, user.last_name].filter(Boolean).join(" ") || "—"}
          </p>
        </div>
        <Badge variant={statusVariant[user.status] ?? "outline"} className="text-sm">
          {user.status}
        </Badge>
        <Button variant={user.status === "active" ? "destructive" : "default"} size="sm" onClick={handleToggleStatus}>
          {user.status === "active" ? <ShieldAlert className="size-4" /> : <ShieldCheck className="size-4" />}
          {user.status === "active" ? "Suspend" : "Activate"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{user.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Name</span>
              <span>{user.first_name || "—"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Name</span>
              <span>{user.last_name || "—"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span>{user.role?.name ?? "—"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={statusVariant[user.status] ?? "outline"}>{user.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tenant</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span>{user.tenant?.name ?? "—"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono text-xs">{user.tenant?.id ?? "—"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
