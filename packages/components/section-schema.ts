export type PropType = "string" | "number" | "boolean" | "select" | "image" | "html" | "array" | "object" | "color" | "range"

export interface PropSchema {
  key: string
  label?: string
  type: PropType
  options?: { label: string; value: string }[]
  defaultValue?: unknown
  placeholder?: string
  description?: string
  min?: number
  max?: number
  step?: number
  itemSchema?: PropSchema[]
}

export type SectionCategory =
  | 'hero'
  | 'commerce'
  | 'content'
  | 'engagement'
  | 'navigation'
  | 'social-proof'
  | 'b2b'
  | 'account'
  | 'utility'

export interface SectionSchema {
  key: string
  name: string
  description: string
  category?: SectionCategory
  props: PropSchema[]
}

export const sectionSchemas: Record<string, SectionSchema> = {
  // --- Category 1: Navigation & Header ---
  "header.v1": {
    key: "header.v1",
    name: "Header (Classic)",
    description: "Site navigation bar with logo, links, and cart icon",
    category: "navigation",
    props: [
      { key: "variant", label: "Style", type: "select", options: [{ label: "Minimal", value: "minimal" }, { label: "Mega Menu", value: "mega-menu" }, { label: "Sticky", value: "sticky" }, { label: "Transparent", value: "transparent" }], defaultValue: "minimal" },
      { key: "logoUrl", label: "Logo URL", type: "image", defaultValue: "/placeholder.svg", placeholder: "https://example.com/logo.png" },
      { key: "showSearch", label: "Show Search Icon", type: "boolean", defaultValue: true },
      { key: "showCart", label: "Show Cart Icon", type: "boolean", defaultValue: true },
    ],
  },
  "header-mega.v1": {
    key: "header-mega.v1",
    name: "Header Mega Menu",
    description: "Enterprise multi-level mega menu with category banners, search, and locale selector",
    category: "navigation",
    props: [
      { key: "logoUrl", label: "Logo URL", type: "image", defaultValue: "/logo.svg" },
      { key: "sticky", label: "Sticky Navigation", type: "boolean", defaultValue: true },
      { key: "showCurrencySwitch", label: "Show Currency Selector", type: "boolean", defaultValue: true },
      { key: "promoBadge", label: "Promo Badge Text", type: "string", defaultValue: "FREE SHIPPING ON ORDERS $50+" },
    ],
  },
  "header-top-bar.v1": {
    key: "header-top-bar.v1",
    name: "Announcement Top Bar",
    description: "Rotating ticker for shipping promos, discount codes, and countdowns",
    category: "navigation",
    props: [
      { key: "message", label: "Announcement Text", type: "string", defaultValue: "🔥 Summer Sale: Up to 50% Off Selected Items!" },
      { key: "ctaLabel", label: "Button Label", type: "string", defaultValue: "Shop Sale" },
      { key: "ctaHref", label: "Link URL", type: "string", defaultValue: "/products" },
      { key: "backgroundColor", label: "Background Color", type: "color", defaultValue: "#0f172a" },
      { key: "textColor", label: "Text Color", type: "color", defaultValue: "#ffffff" },
      { key: "closable", label: "Allow Close Button", type: "boolean", defaultValue: true },
    ],
  },
  "footer.v1": {
    key: "footer.v1",
    name: "Footer (Classic)",
    description: "Site footer with links and branding",
    category: "navigation",
    props: [
      { key: "copyright", label: "Copyright Text", type: "string", defaultValue: "© 2026 CommerceOS Storefront. All rights reserved.", placeholder: "Copyright notice" },
    ],
  },
  "footer-enterprise.v1": {
    key: "footer-enterprise.v1",
    name: "Footer (Enterprise Multi-Column)",
    description: "4-column enterprise footer with newsletter, app badges, and payment icons",
    category: "navigation",
    props: [
      { key: "companyName", label: "Company Name", type: "string", defaultValue: "CommerceOS Retail Inc." },
      { key: "description", label: "Tagline / Bio", type: "string", defaultValue: "The modern multi-tenant e-commerce platform powering high-growth brands." },
      { key: "copyright", label: "Copyright", type: "string", defaultValue: "© 2026 CommerceOS. All rights reserved." },
      { key: "showNewsletter", label: "Show Email Signup", type: "boolean", defaultValue: true },
      { key: "showPaymentIcons", label: "Show Payment Icons", type: "boolean", defaultValue: true },
    ],
  },

  // --- Category 2: Hero & Promotional Banners ---
  "hero.v1": {
    key: "hero.v1",
    name: "Hero Banner",
    description: "Full-width hero banner with heading, subtext, and CTA",
    category: "hero",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Welcome to Our Store", placeholder: "Main heading text" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Discover our premium handcrafted collection.", placeholder: "Supporting text below heading" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Now", placeholder: "Button text" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/products", placeholder: "/products" },
      { key: "variant", label: "Style", type: "select", options: [{ label: "Modern", value: "modern" }, { label: "Luxury", value: "luxury" }, { label: "Minimal", value: "minimal" }, { label: "Editorial", value: "editorial" }], defaultValue: "modern" },
      { key: "alignment", label: "Alignment", type: "select", options: [{ label: "Center", value: "center" }, { label: "Left", value: "left" }, { label: "Right", value: "right" }], defaultValue: "center" },
      { key: "backgroundImage", label: "Background Image", type: "image", defaultValue: "" },
      { key: "backgroundColor", label: "Background Color", type: "color", defaultValue: "#ffffff" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "hero-slider.v1": {
    key: "hero-slider.v1",
    name: "Hero Multi-Slide Carousel",
    description: "Full-width carousel with autoplay, custom slide headings, and per-slide CTAs",
    category: "hero",
    props: [
      { key: "autoplaySpeed", label: "Autoplay Delay (ms)", type: "number", defaultValue: 5000 },
      { key: "showDots", label: "Show Navigation Dots", type: "boolean", defaultValue: true },
      { key: "showArrows", label: "Show Slide Arrows", type: "boolean", defaultValue: true },
    ],
  },
  "hero-split.v1": {
    key: "hero-split.v1",
    name: "Hero Split Media",
    description: "50/50 layout with text/CTA on one side and image or mockup on the other",
    category: "hero",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Engineered for Excellence" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Experience next-level performance and design." },
      { key: "ctaLabel", label: "Primary CTA", type: "string", defaultValue: "Explore Collection" },
      { key: "ctaHref", label: "Primary Link", type: "string", defaultValue: "/products" },
      { key: "secondaryCtaLabel", label: "Secondary CTA", type: "string", defaultValue: "Learn More" },
      { key: "secondaryCtaHref", label: "Secondary Link", type: "string", defaultValue: "/about" },
      { key: "imageUrl", label: "Hero Image URL", type: "image", defaultValue: "" },
      { key: "mediaPosition", label: "Media Position", type: "select", options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }], defaultValue: "right" },
    ],
  },
  "banner.v1": {
    key: "banner.v1",
    name: "Promo Banner",
    description: "Image backdrop with overlay heading and CTA",
    category: "hero",
    props: [
      { key: "imageUrl", label: "Image URL", type: "image", defaultValue: "" },
      { key: "heading", label: "Heading", type: "string", defaultValue: "Limited Time Offer" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Sale" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/products" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "banner-promotional.v1": {
    key: "banner-promotional.v1",
    name: "Countdown Flash Sale Banner",
    description: "Promotional sale banner with live countdown timer and discount coupon badge",
    category: "hero",
    props: [
      { key: "heading", label: "Title", type: "string", defaultValue: "⚡ Flash Sale Ends Soon!" },
      { key: "subheading", label: "Subtitle", type: "string", defaultValue: "Use coupon code SUMMER30 for 30% off." },
      { key: "couponCode", label: "Coupon Code", type: "string", defaultValue: "SUMMER30" },
      { key: "ctaLabel", label: "Button Label", type: "string", defaultValue: "Claim Discount" },
      { key: "ctaHref", label: "Link URL", type: "string", defaultValue: "/products" },
      { key: "targetHours", label: "Countdown Hours", type: "number", defaultValue: 24 },
    ],
  },

  // --- Category 3: Commerce & Merchandising ---
  "product-grid.v1": {
    key: "product-grid.v1",
    name: "Product Grid",
    description: "Grid of product cards from a collection or source",
    category: "commerce",
    props: [
      { key: "source", label: "Product Source", type: "select", options: [{ label: "Featured", value: "featured" }, { label: "Category", value: "category" }, { label: "Collection", value: "collection" }, { label: "Manual", value: "manual" }], defaultValue: "featured" },
      { key: "sourceId", label: "Source ID", type: "string", defaultValue: "" },
      { key: "columns", label: "Columns", type: "select", options: [{ label: "2 Columns", value: "2" }, { label: "3 Columns", value: "3" }, { label: "4 Columns", value: "4" }], defaultValue: "4" },
      { key: "limit", label: "Max Products", type: "number", defaultValue: 12 },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "product-carousel.v1": {
    key: "product-carousel.v1",
    name: "Product Carousel",
    description: "Touch-swipeable carousel of featured or trending products",
    category: "commerce",
    props: [
      { key: "heading", label: "Section Heading", type: "string", defaultValue: "Trending Now" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Handpicked items our customers are loving right now." },
      { key: "source", label: "Product Source", type: "select", options: [{ label: "Featured", value: "featured" }, { label: "New Arrivals", value: "new" }, { label: "Best Sellers", value: "bestsellers" }], defaultValue: "featured" },
      { key: "limit", label: "Max Products", type: "number", defaultValue: 8 },
    ],
  },
  "collection-list-featured.v1": {
    key: "collection-list-featured.v1",
    name: "Featured Collections",
    description: "Card grid of top collections with item count badges",
    category: "commerce",
    props: [
      { key: "heading", label: "Section Heading", type: "string", defaultValue: "Shop by Category" },
      { key: "columns", label: "Columns", type: "select", options: [{ label: "3 Columns", value: "3" }, { label: "4 Columns", value: "4" }], defaultValue: "3" },
    ],
  },
  "product-details.v1": {
    key: "product-details.v1",
    name: "Product Details (PDP)",
    description: "Interactive product info, variant selection, and add-to-cart. Binds to the current product via $bind.",
    category: "commerce",
    props: [
      { key: "showSku", label: "Show SKU", type: "boolean", defaultValue: true },
      { key: "showStockLevel", label: "Show Stock Level", type: "boolean", defaultValue: true },
      { key: "showReviews", label: "Show Reviews", type: "boolean", defaultValue: true },
      { key: "showSizeGuide", label: "Show Size Guide", type: "boolean", defaultValue: true },
      { key: "showWishlist", label: "Show Wishlist", type: "boolean", defaultValue: true },
      { key: "showShare", label: "Show Share", type: "boolean", defaultValue: true },
    ],
  },
  "product-bundle-builder.v1": {
    key: "product-bundle-builder.v1",
    name: "Frequently Bought Together",
    description: "Interactive bundle builder with combined savings badge and 1-click bundle checkout",
    category: "commerce",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Frequently Bought Together" },
      { key: "discountPercent", label: "Bundle Discount (%)", type: "number", defaultValue: 15 },
      { key: "ctaLabel", label: "Bundle Button Label", type: "string", defaultValue: "Add Selected to Cart" },
    ],
  },
  "shoppable-lookbook.v1": {
    key: "shoppable-lookbook.v1",
    name: "Shoppable Hotspot Lookbook",
    description: "Lifestyle photo with clickable product pins opening quick-buy popups",
    category: "commerce",
    props: [
      { key: "heading", label: "Lookbook Title", type: "string", defaultValue: "Shop the Outfit" },
      { key: "imageUrl", label: "Lookbook Image URL", type: "image", defaultValue: "" },
    ],
  },
  "flash-deals-scroller.v1": {
    key: "flash-deals-scroller.v1",
    name: "Flash Deals Progress Scroller",
    description: "Limited-time deals carousel with live stock claimed progress bars (% claimed)",
    category: "commerce",
    props: [
      { key: "heading", label: "Title", type: "string", defaultValue: "🔥 Hourly Flash Deals" },
      { key: "showProgressBar", label: "Show Claimed Bar", type: "boolean", defaultValue: true },
    ],
  },

  // --- Category 4: Content & Storytelling ---
  "rich-text.v1": {
    key: "rich-text.v1",
    name: "Rich Text Content",
    description: "HTML content block for articles, press releases, and descriptions",
    category: "content",
    props: [
      { key: "content", label: "Content (HTML)", type: "html", defaultValue: "<h3>Our Story</h3><p>Write your brand story or custom HTML layout content here...</p>" },
    ],
  },
  "feature-grid-icon.v1": {
    key: "feature-grid-icon.v1",
    name: "Value Proposition Grid",
    description: "4-column icon grid highlighting free shipping, warranty, returns, and support",
    category: "content",
    props: [
      { key: "heading", label: "Section Heading", type: "string", defaultValue: "Why Shop With Us" },
      { key: "columns", label: "Columns", type: "select", options: [{ label: "3 Columns", value: "3" }, { label: "4 Columns", value: "4" }], defaultValue: "4" },
    ],
  },
  "comparison-table.v1": {
    key: "comparison-table.v1",
    name: "Product Comparison Matrix",
    description: "Side-by-side feature comparison matrix with highlighted winner column",
    category: "content",
    props: [
      { key: "heading", label: "Table Title", type: "string", defaultValue: "Compare Features" },
      { key: "subheading", label: "Subtitle", type: "string", defaultValue: "See how our product stacks up against alternatives." },
    ],
  },
  "gallery.v1": {
    key: "gallery.v1",
    name: "Visual Gallery",
    description: "Image gallery in grid, masonry, or carousel layout",
    category: "content",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Visual Gallery" },
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Masonry", value: "masonry" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
    ],
  },

  // --- Category 5: Social Proof & Trust ---
  "testimonials.v1": {
    key: "testimonials.v1",
    name: "Customer Reviews",
    description: "Customer quote display grid or carousel",
    category: "social-proof",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "What Our Customers Say" },
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
    ],
  },
  "trust-badges-bar.v1": {
    key: "trust-badges-bar.v1",
    name: "Security & Trust Seals Bar",
    description: "Trust seals banner displaying SSL, PCI compliance, 30-day guarantee, and free returns",
    category: "social-proof",
    props: [
      { key: "showSsl", label: "Show SSL Badge", type: "boolean", defaultValue: true },
      { key: "showMoneyBack", label: "Show Money Back Seal", type: "boolean", defaultValue: true },
      { key: "showFreeReturns", label: "Show Free Returns Seal", type: "boolean", defaultValue: true },
      { key: "showFastShipping", label: "Show Fast Shipping Seal", type: "boolean", defaultValue: true },
    ],
  },

  // --- Category 6: Engagement & Conversion ---
  "newsletter.v1": {
    key: "newsletter.v1",
    name: "Newsletter Signup",
    description: "Email signup form with heading and subtext",
    category: "engagement",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Stay in the Loop" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Get exclusive offers and updates delivered straight to your inbox." },
      { key: "placeholderText", label: "Input Placeholder", type: "string", defaultValue: "Enter your email address" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "newsletter-popup.v1": {
    key: "newsletter-popup.v1",
    name: "Newsletter Popup Modal",
    description: "Exit-intent or scroll discount capture modal with email form and promo code delivery",
    category: "engagement",
    props: [
      { key: "heading", label: "Modal Title", type: "string", defaultValue: "Get 15% Off Your First Order" },
      { key: "subheading", label: "Modal Subtitle", type: "string", defaultValue: "Subscribe to our VIP list to unlock your discount code immediately." },
      { key: "discountCode", label: "Coupon Code Delivered", type: "string", defaultValue: "WELCOME15" },
      { key: "delaySeconds", label: "Trigger Delay (seconds)", type: "number", defaultValue: 5 },
    ],
  },
  "faq.v1": {
    key: "faq.v1",
    name: "FAQ Accordion",
    description: "Accordion-style questions and answers",
    category: "engagement",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Frequently Asked Questions" },
    ],
  },

  // --- Category 7: B2B Enterprise & Wholesale ---
  "b2b-quick-order-pad.v1": {
    key: "b2b-quick-order-pad.v1",
    name: "B2B Bulk Quick Order Pad",
    description: "High-efficiency bulk SKU quick-order grid with instant price calculation and CSV upload",
    category: "b2b",
    props: [
      { key: "title", label: "Pad Title", type: "string", defaultValue: "Wholesale Bulk Quick Order" },
      { key: "enableCsvUpload", label: "Allow CSV Upload", type: "boolean", defaultValue: true },
      { key: "showMoqNotice", label: "Enforce Minimum Order Quantity", type: "boolean", defaultValue: true },
    ],
  },
  "b2b-tier-pricing-table.v1": {
    key: "b2b-tier-pricing-table.v1",
    name: "B2B Volume Tier Pricing Table",
    description: "Volume discount tier table showing quantity price breaks ($bind to product variant)",
    category: "b2b",
    props: [
      { key: "title", label: "Table Title", type: "string", defaultValue: "Volume Tier Discounts" },
      { key: "showSavingsBadge", label: "Show % Savings Badge", type: "boolean", defaultValue: true },
    ],
  },
  "b2b-quote-request-form.v1": {
    key: "b2b-quote-request-form.v1",
    name: "B2B Request for Quote (RFQ)",
    description: "RFQ submission form for custom manufacturing, bulk volume tenders, and custom shipping",
    category: "b2b",
    props: [
      { key: "title", label: "Form Title", type: "string", defaultValue: "Request a Custom B2B Quote" },
      { key: "subheading", label: "Form Subheading", type: "string", defaultValue: "Submit your order specs and our sales team will respond within 4 business hours." },
    ],
  },

  // --- Category 8: Customer Account & Portal ---
  "account-order-history.v1": {
    key: "account-order-history.v1",
    name: "Account Order History & Tracking",
    description: "Filterable order history list with live carrier tracking links and invoice downloads",
    category: "account",
    props: [
      { key: "title", label: "Section Title", type: "string", defaultValue: "My Orders" },
      { key: "showTracking", label: "Show Live Tracking Button", type: "boolean", defaultValue: true },
    ],
  },

  // --- Category 9: Interactive & Layout Utilities ---
  "container-grid.v1": {
    key: "container-grid.v1",
    name: "Responsive Container Grid",
    description: "Flex/Grid wrapper allowing nested child sections with customizable column spans",
    category: "utility",
    props: [
      { key: "columnsDesktop", label: "Desktop Columns", type: "select", options: [{ label: "1 Column", value: "1" }, { label: "2 Columns", value: "2" }, { label: "3 Columns", value: "3" }, { label: "4 Columns", value: "4" }], defaultValue: "2" },
      { key: "gap", label: "Grid Gap (px)", type: "select", options: [{ label: "Small (16px)", value: "16" }, { label: "Medium (24px)", value: "24" }, { label: "Large (32px)", value: "32" }], defaultValue: "24" },
    ],
  },
  "spacer-divider.v1": {
    key: "spacer-divider.v1",
    name: "Spacer & Line Separator",
    description: "Vertical spacing block with optional decorative divider line",
    category: "utility",
    props: [
      { key: "heightPx", label: "Height (px)", type: "number", defaultValue: 40 },
      { key: "showLine", label: "Show Divider Line", type: "boolean", defaultValue: true },
      { key: "lineColor", label: "Line Color", type: "color", defaultValue: "#e2e8f0" },
    ],
  },
  "custom-code-html.v1": {
    key: "custom-code-html.v1",
    name: "Custom HTML / Script Embed",
    description: "Raw HTML/JavaScript embed block for external third-party widgets (Klaviyo, Trustpilot, Chatbots)",
    category: "utility",
    props: [
      { key: "htmlCode", label: "HTML / Embed Code", type: "html", defaultValue: "<!-- Insert embed snippet here -->" },
    ],
  },
  "sticky-floating-bar.v1": {
    key: "sticky-floating-bar.v1",
    name: "Mobile Sticky Floating Bar",
    description: "Mobile sticky bottom bar displaying price, variant summary, and quick Add-to-Cart CTA button",
    category: "utility",
    props: [
      { key: "ctaLabel", label: "CTA Button Text", type: "string", defaultValue: "Add to Cart" },
      { key: "showPrice", label: "Show Live Price", type: "boolean", defaultValue: true },
    ],
  },
}
