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
  // Additional core & industry templates
  cart: "cart",
  order_confirmation: "order_confirmation",
  fashion_editorial: "fashion_editorial",
  fashion_lookbook: "fashion_lookbook",
  fashion_season: "fashion_season",
  fashion_size_guide: "fashion_size_guide",
  fashion_sustainability: "fashion_sustainability",
  tech_homepage: "tech_homepage",
  tech_specs_matrix: "tech_specs_matrix",
  tech_comparison: "tech_comparison",
  tech_warranty: "tech_warranty",
  b2b_portal: "b2b_portal",
  b2b_quick_order: "b2b_quick_order",
  b2b_rfq: "b2b_rfq",
  b2b_contract_catalog: "b2b_contract_catalog",
  b2b_invoices: "b2b_invoices",
  beauty_homepage: "beauty_homepage",
  beauty_shade_quiz: "beauty_shade_quiz",
  beauty_pdp_routine: "beauty_pdp_routine",
  beauty_subscription: "beauty_subscription",
  grocery_homepage: "grocery_homepage",
  grocery_express: "grocery_express",
  grocery_nutrition: "grocery_nutrition",
  grocery_recipe: "grocery_recipe",
  luxury_homepage: "luxury_homepage",
  luxury_concierge: "luxury_concierge",
  luxury_boutique: "luxury_boutique",
  digital_subscription: "digital_subscription",
} as const;

export type PageKey = (typeof PAGE_KEYS)[keyof typeof PAGE_KEYS];

export interface PageKeyCatalogEntry {
  key: PageKey;
  label: string;
  description: string;
  route: string;
  category?: string;
}

/** Admin list + catch-all slug allowlist. */
export const PAGE_KEY_CATALOG: PageKeyCatalogEntry[] = [
  { key: PAGE_KEYS.homepage, label: "Home", description: "Main landing page", route: "/", category: "Standard" },
  { key: PAGE_KEYS.products, label: "Products", description: "Collection listing", route: "/products", category: "Standard" },
  { key: PAGE_KEYS.product_detail, label: "Product Detail", description: "Single product page", route: "/products/[slug]", category: "Standard" },
  { key: PAGE_KEYS.cart, label: "Cart", description: "Cart & drawer overview", route: "/cart", category: "Standard" },
  { key: PAGE_KEYS.checkout, label: "Checkout", description: "Cart checkout", route: "/checkout", category: "Standard" },
  { key: PAGE_KEYS.order_confirmation, label: "Order Confirmation", description: "Thank you & tracking page", route: "/orders/confirmation", category: "Standard" },
  { key: PAGE_KEYS.about, label: "About Us", description: "Brand story & values", route: "/about", category: "Standard" },
  { key: PAGE_KEYS.contact, label: "Contact Us", description: "Customer support & form", route: "/contact", category: "Standard" },
  { key: PAGE_KEYS.faq, label: "FAQ & Help Center", description: "Knowledge base accordion", route: "/faq", category: "Standard" },
  { key: PAGE_KEYS.shipping, label: "Shipping Policy", description: "Delivery terms & rates", route: "/shipping", category: "Standard" },
  { key: PAGE_KEYS.returns, label: "Return Policy", description: "Refund & exchange policy", route: "/returns", category: "Standard" },

  // Fashion & Apparel
  { key: PAGE_KEYS.fashion_editorial, label: "Fashion Editorial", description: "High-contrast campaign lookbook", route: "/fashion/editorial", category: "Fashion" },
  { key: PAGE_KEYS.fashion_lookbook, label: "Shoppable Lookbook", description: "Interactive hotspot outfit showcase", route: "/fashion/lookbook", category: "Fashion" },
  { key: PAGE_KEYS.fashion_season, label: "Seasonal Drop", description: "Limited time collection launch", route: "/fashion/season-drop", category: "Fashion" },
  { key: PAGE_KEYS.fashion_size_guide, label: "Size & Fit Guide", description: "Measurement tables & fit calculator", route: "/fashion/size-guide", category: "Fashion" },
  { key: PAGE_KEYS.fashion_sustainability, label: "Sustainability Story", description: "Eco materials & supply chain transparency", route: "/fashion/sustainability", category: "Fashion" },

  // Electronics & Tech
  { key: PAGE_KEYS.tech_homepage, label: "Tech Showcase", description: "3D model hero & dark mode aesthetics", route: "/tech/showcase", category: "Tech" },
  { key: PAGE_KEYS.tech_specs_matrix, label: "Tech Specs Matrix", description: "Deep technical specifications PDP", route: "/tech/specs", category: "Tech" },
  { key: PAGE_KEYS.tech_comparison, label: "Product Comparison", description: "Side-by-side device spec compare", route: "/tech/compare", category: "Tech" },
  { key: PAGE_KEYS.tech_warranty, label: "Warranty & Support", description: "Serial number registration portal", route: "/tech/warranty", category: "Tech" },

  // B2B Enterprise
  { key: PAGE_KEYS.b2b_portal, label: "Wholesale Portal", description: "Buyer dashboard with credit limit gauge", route: "/b2b/portal", category: "B2B" },
  { key: PAGE_KEYS.b2b_quick_order, label: "B2B Quick Order", description: "Bulk SKU order grid & CSV upload", route: "/b2b/quick-order", category: "B2B" },
  { key: PAGE_KEYS.b2b_rfq, label: "Request for Quote", description: "Custom volume tender request form", route: "/b2b/rfq", category: "B2B" },
  { key: PAGE_KEYS.b2b_contract_catalog, label: "Negotiated Catalog", description: "Contract price list & custom SKUs", route: "/b2b/contract", category: "B2B" },
  { key: PAGE_KEYS.b2b_invoices, label: "Pay Invoices", description: "Net-30 open balances & payment", route: "/b2b/invoices", category: "B2B" },

  // Beauty & Cosmetics
  { key: PAGE_KEYS.beauty_homepage, label: "Beauty Glow Homepage", description: "Pastel skincare aesthetic & ingredients", route: "/beauty/glow", category: "Beauty" },
  { key: PAGE_KEYS.beauty_shade_quiz, label: "Shade Finder Quiz", description: "Skin type & shade matching tool", route: "/beauty/shade-finder", category: "Beauty" },
  { key: PAGE_KEYS.beauty_pdp_routine, label: "Skincare Routine PDP", description: "Dermatologist approved routine PDP", route: "/beauty/routine", category: "Beauty" },
  { key: PAGE_KEYS.beauty_subscription, label: "Subscribe & Save Box", description: "Recurring beauty box landing page", route: "/beauty/subscribe", category: "Beauty" },

  // Grocery & FMCG
  { key: PAGE_KEYS.grocery_homepage, label: "Supermarket Homepage", description: "Delivery slot banner & aisle grid", route: "/grocery/storefront", category: "Grocery" },
  { key: PAGE_KEYS.grocery_express, label: "Express Quick Add", description: "Fast-add aisle listing with steppers", route: "/grocery/express", category: "Grocery" },
  { key: PAGE_KEYS.grocery_nutrition, label: "Nutrition & Origin PDP", description: "FDA label matrix & organic badges", route: "/grocery/nutrition", category: "Grocery" },
  { key: PAGE_KEYS.grocery_recipe, label: "Shoppable Recipe", description: "One-click recipe ingredients to cart", route: "/grocery/recipes", category: "Grocery" },

  // Luxury & Digital
  { key: PAGE_KEYS.luxury_homepage, label: "Luxury Heritage", description: "High-elegance gold accent homepage", route: "/luxury/heritage", category: "Luxury" },
  { key: PAGE_KEYS.luxury_concierge, label: "VIP Concierge PDP", description: "GIA diamond certificate & live concierge", route: "/luxury/concierge", category: "Luxury" },
  { key: PAGE_KEYS.luxury_boutique, label: "Boutique Showroom", description: "Private appointment scheduler", route: "/luxury/boutique", category: "Luxury" },
  { key: PAGE_KEYS.digital_subscription, label: "Digital Membership", description: "SaaS software key & membership tier", route: "/digital/membership", category: "Digital" },
];
