import { type ReactNode } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
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

export default function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {children ?? <Outlet />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
