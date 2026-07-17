import { Navigate, Outlet, Route, BrowserRouter, Routes } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import AdminLayout from "@/layouts/AdminLayout"
import LoginPage from "@/pages/LoginPage"
import ProductListPage from "@/pages/products/ProductListPage"
import ProductFormPage from "@/pages/products/ProductFormPage"
import CategoryListPage from "@/pages/categories/CategoryListPage"
import ThemeEditorPage from "@/pages/theme/ThemeEditorPage"
import PageLayoutListPage from "@/pages/settings/PageLayoutList"
import PageLayoutEditorPage from "@/pages/settings/PageLayoutEditor"
import OrderListPage from "@/pages/orders/OrderListPage"
import OrderDetailPage from "@/pages/orders/OrderDetailPage"
import CustomerListPage from "@/pages/customers/CustomerListPage"
import CustomerDetailPage from "@/pages/customers/CustomerDetailPage"
import CustomerFormPage from "@/pages/customers/CustomerFormPage"
import DashboardPage from "@/pages/DashboardPage"
import UserListPage from "@/pages/users/UserListPage"
import UserDetailPage from "@/pages/users/UserDetailPage"
import UserInvitePage from "@/pages/users/UserInvitePage"
import ChangePasswordPage from "@/pages/auth/ChangePasswordPage"

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/new" element={<ProductFormPage />} />
            <Route path="products/:id/edit" element={<ProductFormPage />} />
            <Route path="categories" element={<CategoryListPage />} />
            <Route path="orders" element={<OrderListPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="customers" element={<CustomerListPage />} />
            <Route path="customers/new" element={<CustomerFormPage />} />
            <Route path="customers/:id/edit" element={<CustomerFormPage />} />
            <Route path="customers/:id" element={<CustomerDetailPage />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="users/invite" element={<UserInvitePage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="theme" element={<ThemeEditorPage />} />
            <Route path="settings/pages" element={<PageLayoutListPage />} />
            <Route path="settings/pages/:pageKey" element={<PageLayoutEditorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
