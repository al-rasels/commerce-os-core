import { type ComponentType } from "react";
import { ComponentMetadata, type PlanTier } from "@commerceos/shared-types";
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
import { Toaster, toast } from "./toast";

// New Enterprise Components
import { HeaderMega } from "./header-mega";
import { HeaderTopBar } from "./header-top-bar";
import { FooterEnterprise } from "./footer-enterprise";
import { HeroSlider } from "./hero-slider";
import { HeroSplit } from "./hero-split";
import { BannerPromotional } from "./banner-promotional";
import { ProductCarousel } from "./product-carousel";
import { CollectionListFeatured } from "./collection-list-featured";
import { ProductBundleBuilder } from "./product-bundle-builder";
import { ShoppableLookbook } from "./shoppable-lookbook";
import { FlashDealsScroller } from "./flash-deals-scroller";
import { FeatureGridIcon } from "./feature-grid-icon";
import { ComparisonTable } from "./comparison-table";
import { TrustBadgesBar } from "./trust-badges-bar";
import { NewsletterPopup } from "./newsletter-popup";
import { B2bQuickOrderPad } from "./b2b-quick-order-pad";
import { B2bTierPricingTable } from "./b2b-tier-pricing-table";
import { B2bQuoteRequestForm } from "./b2b-quote-request-form";
import { AccountOrderHistory } from "./account-order-history";
import { ContainerGrid } from "./container-grid";
import { SpacerDivider } from "./spacer-divider";
import { CustomCodeHtml } from "./custom-code-html";
import { StickyFloatingBar } from "./sticky-floating-bar";

export type ComponentRegistryEntry = {
  component: ComponentType<any>;
  minPlan?: PlanTier;
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
  "gallery.v1": { component: Gallery, minPlan: ComponentMetadata["gallery.v1"]?.minPlan },
  "banner.v1": { component: Banner },
  "breadcrumbs.v1": { component: Breadcrumbs },
  "search-bar.v1": { component: SearchBar },
  "pagination.v1": { component: Pagination },
  "sidebar.v1": { component: Sidebar, minPlan: ComponentMetadata["sidebar.v1"]?.minPlan },
  "modal.v1": { component: Modal },
  "tabs.v1": { component: Tabs },
  "skeleton.v1": { component: Skeleton },
  "button.v1": { component: Button },
  "input.v1": { component: Input },
  "textarea.v1": { component: Textarea },
  "select.v1": { component: Select },
  "empty-state.v1": { component: EmptyState },
  "data-table.v1": { component: DataTable, minPlan: ComponentMetadata["data-table.v1"]?.minPlan },
  "form-renderer.v1": { component: FormRenderer, minPlan: ComponentMetadata["form-renderer.v1"]?.minPlan },
  "toast.v1": { component: Toaster },

  // New Enterprise Registry Entries
  "header-mega.v1": { component: HeaderMega },
  "header-top-bar.v1": { component: HeaderTopBar },
  "footer-enterprise.v1": { component: FooterEnterprise },
  "hero-slider.v1": { component: HeroSlider },
  "hero-split.v1": { component: HeroSplit },
  "banner-promotional.v1": { component: BannerPromotional },
  "product-carousel.v1": { component: ProductCarousel },
  "collection-list-featured.v1": { component: CollectionListFeatured },
  "product-bundle-builder.v1": { component: ProductBundleBuilder },
  "shoppable-lookbook.v1": { component: ShoppableLookbook },
  "flash-deals-scroller.v1": { component: FlashDealsScroller },
  "feature-grid-icon.v1": { component: FeatureGridIcon },
  "comparison-table.v1": { component: ComparisonTable },
  "trust-badges-bar.v1": { component: TrustBadgesBar },
  "newsletter-popup.v1": { component: NewsletterPopup },
  "b2b-quick-order-pad.v1": { component: B2bQuickOrderPad },
  "b2b-tier-pricing-table.v1": { component: B2bTierPricingTable },
  "b2b-quote-request-form.v1": { component: B2bQuoteRequestForm },
  "account-order-history.v1": { component: AccountOrderHistory },
  "container-grid.v1": { component: ContainerGrid },
  "spacer-divider.v1": { component: SpacerDivider },
  "custom-code-html.v1": { component: CustomCodeHtml },
  "sticky-floating-bar.v1": { component: StickyFloatingBar },
} as const satisfies Record<string, ComponentRegistryEntry>;

export type ComponentRegistryKey = keyof typeof componentRegistry;
