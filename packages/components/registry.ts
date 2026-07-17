import { type ComponentType } from "react";
import { Hero } from "./hero";
import { Header } from "./header";
import { Footer } from "./footer";
import { ProductCard } from "./product-card";
import { ProductGrid } from "./product-grid";
import { CartDrawer } from "./cart-drawer";
import { CheckoutSummary } from "./checkout-summary";
import { Testimonials } from "./testimonials";
import { Newsletter } from "./newsletter";
import { Faq } from "./faq";
import { RichText } from "./rich-text";
import { Gallery } from "./gallery";
import { Banner } from "./banner";
import { Breadcrumbs } from "./breadcrumbs";
import { SearchBar } from "./search-bar";
import { Pagination } from "./pagination";
import { Sidebar } from "./sidebar";
import { Modal } from "./modal";
import { Tabs } from "./tabs";
import { Skeleton } from "./skeleton";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { EmptyState } from "./empty-state";
import { DataTable } from "./data-table";
import { FormRenderer } from "./form-renderer";
import { Toast, ToastContainer } from "./toast";

export type ComponentRegistryEntry = {
  component: ComponentType<any>;
  minPlan?: "starter" | "pro" | "enterprise";
};

export const componentRegistry = {
  "hero.v1": { component: Hero },
  "header.v1": { component: Header },
  "footer.v1": { component: Footer },
  "product-card.v1": { component: ProductCard },
  "product-grid.v1": { component: ProductGrid },
  "cart-drawer.v1": { component: CartDrawer },
  "checkout-summary.v1": { component: CheckoutSummary },
  "testimonials.v1": { component: Testimonials },
  "newsletter.v1": { component: Newsletter },
  "faq.v1": { component: Faq },
  "rich-text.v1": { component: RichText },
  "gallery.v1": { component: Gallery, minPlan: "pro" },
  "banner.v1": { component: Banner },
  "breadcrumbs.v1": { component: Breadcrumbs },
  "search-bar.v1": { component: SearchBar },
  "pagination.v1": { component: Pagination },
  "sidebar.v1": { component: Sidebar, minPlan: "pro" },
  "modal.v1": { component: Modal },
  "tabs.v1": { component: Tabs },
  "skeleton.v1": { component: Skeleton },
  "button.v1": { component: Button },
  "input.v1": { component: Input },
  "textarea.v1": { component: Textarea },
  "select.v1": { component: Select },
  "empty-state.v1": { component: EmptyState },
  "data-table.v1": { component: DataTable, minPlan: "pro" },
  "form-renderer.v1": { component: FormRenderer, minPlan: "pro" },
  "toast.v1": { component: Toast },
  "toast-container.v1": { component: ToastContainer },
} as const satisfies Record<string, ComponentRegistryEntry>;

export type ComponentRegistryKey = keyof typeof componentRegistry;
