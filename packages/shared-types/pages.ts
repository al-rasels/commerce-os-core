/**
 * Canonical page-key catalog for the page builder.
 *
 * Single source of truth shared by the API seed, the admin "Pages" list, and
 * the storefront routes. Prevents the historical drift between `home` vs
 * `homepage` vs `product` vs `product_detail` across the three apps.
 */

export const PAGE_KEYS = {
  homepage: "homepage",
  products: "products",
  product_detail: "product_detail",
  checkout: "checkout",
  about: "about",
  contact: "contact",
  faq: "faq",
  shipping: "shipping",
  returns: "returns",
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

export interface PageKeyCatalogEntry {
  key: PageKey;
  label: string;
  description: string;
  route: string;
}

/** Admin list + catch-all slug allowlist. */
export const PAGE_KEY_CATALOG: PageKeyCatalogEntry[] = [
  { key: PAGE_KEYS.homepage, label: "Home", description: "Main landing page", route: "/" },
  { key: PAGE_KEYS.products, label: "Products", description: "Collection listing", route: "/products" },
  { key: PAGE_KEYS.product_detail, label: "Product Detail", description: "Single product page", route: "/products/[slug]" },
  { key: PAGE_KEYS.checkout, label: "Checkout", description: "Cart checkout", route: "/checkout" },
  { key: PAGE_KEYS.about, label: "About", description: "About us", route: "/about" },
  { key: PAGE_KEYS.contact, label: "Contact", description: "Contact page", route: "/contact" },
  { key: PAGE_KEYS.faq, label: "FAQ", description: "Frequently asked questions", route: "/faq" },
  { key: PAGE_KEYS.shipping, label: "Shipping", description: "Shipping policy", route: "/shipping" },
  { key: PAGE_KEYS.returns, label: "Returns", description: "Return policy", route: "/returns" },
];
