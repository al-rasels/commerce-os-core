import { type ReactNode, useEffect, useState, Suspense } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Command } from "cmdk"
import { useAuth } from "@/contexts/AuthContext"
import { useKeyboardShortcut } from "@/contexts/KeyboardShortcutsContext"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
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
  Command as CommandIcon,
  LifeBuoy,
  Send,
  ChevronsUpDown,
  BarChart3,
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
  SidebarInset,
  SidebarSeparator
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function GlobalLoader() {
  return (
    <div className="animate-in fade-in duration-300 space-y-6">
      {/* Header area */}
      <div className="space-y-2">
        <div className="h-7 w-48 animate-pulse rounded-md bg-muted/80" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-muted/60" />
      </div>
      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted/80" />
              <div className="size-8 animate-pulse rounded-full bg-muted/80" />
            </div>
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted/80" />
          </div>
        ))}
      </div>
      {/* Content area */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-5 rounded-xl border bg-card p-6 space-y-4">
          <div className="h-5 w-32 animate-pulse rounded-md bg-muted/80" />
          <div className="h-3 w-48 animate-pulse rounded-md bg-muted/60" />
          <div className="h-[250px] w-full flex items-end gap-1.5 pt-8">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 68].map((h, i) => (
              <div key={i} className="flex-1 animate-pulse rounded-t-sm bg-muted/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="md:col-span-2 rounded-xl border bg-card p-6 space-y-4">
          <div className="h-5 w-28 animate-pulse rounded-md bg-muted/80" />
          <div className="h-3 w-40 animate-pulse rounded-md bg-muted/60" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-muted/80" />
          ))}
        </div>
      </div>
    </div>
  )
}


const navGroups = [
  {
    label: "Platform",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/orders", label: "Orders", icon: ShoppingCart },
      { href: "/subscriptions", label: "Subscriptions", icon: RefreshCw },
    ]
  },
  {
    label: "Catalog",
    items: [
      { href: "/products", label: "Products", icon: Package },
      { href: "/categories", label: "Categories", icon: FolderTree },
      { href: "/marketing/promotions", label: "Promotions", icon: Tag },
    ]
  },
  {
    label: "B2B & Customers",
    items: [
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/b2b/companies", label: "Companies", icon: Building2 },
      { href: "/b2b/draft-orders", label: "Drafts", icon: FileClock },
    ]
  },
  {
    label: "Storefront & Config",
    items: [
      { href: "/theme", label: "Theme", icon: Palette },
      { href: "/settings/pages", label: "Pages", icon: FileText },
      { href: "/settings/shipping", label: "Shipping", icon: Truck },
      { href: "/settings/tax", label: "Tax", icon: Percent },
      { href: "/settings/locations", label: "Locations", icon: MapPin },
    ]
  },
  {
    label: "System",
    items: [
      { href: "/users", label: "Users & Roles", icon: UserCog },
      { href: "/super-admin/tenants", label: "Super Admin", icon: Shield },
    ]
  }
]

function AppSidebar() {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CommandIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CommerceOS</span>
                  <span className="truncate text-xs">Acme Corp</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>} />
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <CommandIcon className="size-4 shrink-0" />
                  </div>
                  Acme Corp
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border bg-background">
                    <Shield className="size-4 shrink-0" />
                  </div>
                  Global Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname.startsWith(item.href) && (item.href !== "/" || location.pathname === "/")

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        isActive={isActive}
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
        ))}
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />}>
                  <LifeBuoy className="size-4" />
                  <span>Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />}>
                  <Send className="size-4" />
                  <span>Feedback</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent border border-sidebar-border">
                  <UserCog className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.email || "Admin User"}</span>
                  <span className="truncate text-xs">View profile</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>} />
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-accent border">
                      <UserCog className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.email || "Admin User"}</span>
                      <span className="truncate text-xs">Administrator</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link to="/change-password" />}>
                    <KeyRound className="mr-2 size-4" />
                    Change Password
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <LogoutMenuItem />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function LogoutMenuItem() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  return (
    <DropdownMenuItem onClick={() => { logout(); navigate("/login") }}>
      <LogOut className="mr-2 size-4" />
      Log out
    </DropdownMenuItem>
  )
}

function Topbar() {
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

  useKeyboardShortcut('cmd-k', { key: 'k', ctrlOrMeta: true, description: 'Open command palette', handler: () => setOpen(o => !o) })
  useKeyboardShortcut('cmd-b', { key: 'b', ctrlOrMeta: true, description: 'Toggle sidebar', handler: () => document.querySelector<HTMLElement>('[data-sidebar-trigger]')?.click() })

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 px-4 bg-background">
        <SidebarTrigger className="-ml-1" />
        <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
        <div className="flex flex-1 items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full max-w-64 justify-start text-muted-foreground shadow-none"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 size-4" />
            <span>Search...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </header>
      
      {open && (
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
                {navGroups.map(group => (
                  <Command.Group key={group.label} heading={group.label} className="px-2 text-xs font-medium text-muted-foreground">
                    {group.items.map((item) => {
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
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
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
    </SidebarProvider>
  )
}
