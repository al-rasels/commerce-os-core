import { type ReactNode, useEffect, useState, Suspense } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Command } from "cmdk"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/ErrorBoundary"
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
  Truck,
  Percent,
  Tag,
  Building2,
  RefreshCw,
  MapPin,
  FileClock,
  Search,
  Loader2,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar"

function GlobalLoader() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-muted-foreground animate-in fade-in duration-500">
      <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      <p className="text-sm font-medium tracking-tight">Loading content...</p>
    </div>
  )
}

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/categories", label: "Categories", icon: FolderTree },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/subscriptions", label: "Subscriptions", icon: RefreshCw },
  { href: "/b2b/companies", label: "B2B Companies", icon: Building2 },
  { href: "/b2b/draft-orders", label: "B2B Drafts", icon: FileClock },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/users", label: "Users", icon: UserCog },
  { href: "/theme", label: "Theme", icon: Palette },
  { href: "/settings/pages", label: "Pages", icon: FileText },
  { href: "/settings/shipping", label: "Shipping", icon: Truck },
  { href: "/settings/tax", label: "Tax", icon: Percent },
  { href: "/marketing/promotions", label: "Promotions", icon: Tag },
  { href: "/settings/locations", label: "Locations", icon: MapPin },
  { href: "/super-admin/tenants", label: "Super Admin", icon: Shield },
]

function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="bg-transparent!" render={<Link to="/" />}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                C
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-nowrap">CommerceOS</span>
                <span className="text-xs font-light text-nowrap">Admin Shell</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 tracking-wider uppercase">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname.startsWith(item.href) && (item.href !== "/" || location.pathname === "/")
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      tooltip={item.label} 
                      isActive={isActive} 
                      className="data-active:bg-primary/10!"
                      render={<Link to={item.href} />}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Change Password" render={<Link to="/change-password" />}>
              <KeyRound className="size-4" />
              <span>Change Password</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function Topbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1" />
      <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/login") }}>
        <LogOut className="mr-2 size-4" />
        Logout
      </Button>
    </header>
  )
}

function CommandMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-background shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <Command
          className="flex flex-col bg-transparent"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false)
          }}
        >
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              autoFocus
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a command or search..."
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            <Command.Group heading="Navigation" className="px-2 text-xs font-medium text-muted-foreground">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Command.Item
                    key={item.href}
                    onSelect={() => {
                      navigate(item.href)
                      setOpen(false)
                    }}
                    className="flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none aria-selected:bg-primary/10 aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Command.Item>
                )
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          <ErrorBoundary>
            <Suspense fallback={<GlobalLoader />}>
              {children ?? <Outlet />}
            </Suspense>
          </ErrorBoundary>
        </main>
      </SidebarInset>
      <CommandMenu />
    </SidebarProvider>
  )
}
