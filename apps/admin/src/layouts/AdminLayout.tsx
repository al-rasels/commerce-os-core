import { type ReactNode } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  UserCog,
  Palette,
  FileText,
  Shield,
  LogOut,
  KeyRound,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/categories", label: "Categories", icon: FolderTree },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/users", label: "Users", icon: UserCog },
  { href: "/theme", label: "Theme", icon: Palette },
  { href: "/settings/pages", label: "Pages", icon: FileText },
  { href: "/super-admin/tenants", label: "Super Admin", icon: Shield },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex h-screen w-56 flex-col border-r bg-sidebar p-3">
      <Link to="/" className="mb-6 flex items-center gap-2 px-2 pt-1">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          C
        </div>
        <span className="text-sm font-semibold">CommerceOS</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              to={item.href}
              data-active={isActive || undefined}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-active:bg-accent data-active:text-accent-foreground"
            >
              <Icon className="size-4" />
              {item.label}
              {isActive && <ChevronRight className="ml-auto size-3.5" />}
            </Link>
          )
        })}
      </nav>
      <Separator className="my-3" />
      <div className="space-y-1">
        <Link
          to="/change-password"
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <KeyRound className="size-4" />
          Change Password
        </Link>
      </div>
    </aside>
  )
}

function Topbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex h-11 items-center justify-between border-b px-4">
      <div />
      <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/login") }}>
        <LogOut className="size-3.5" />
        Logout
      </Button>
    </header>
  )
}

export default function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  )
}
