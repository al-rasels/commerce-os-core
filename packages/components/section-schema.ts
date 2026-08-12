export type PropType = "string" | "number" | "boolean" | "select" | "image" | "html" | "array" | "object" | "color" | "range"

export interface PropSchema {
  key: string
  label: string
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

export interface SectionSchema {
  key: string
  name: string
  description: string
  category?: 'hero' | 'commerce' | 'content' | 'engagement'
  props: PropSchema[]
}

export const sectionSchemas: Record<string, SectionSchema> = {
  "hero.v1": {
    key: "hero.v1",
    name: "Hero",
    description: "Full-width hero banner with heading, subtext, and CTA",
    category: "hero",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Welcome to Our Store", placeholder: "Main heading text" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Discover our premium handcrafted collection.", placeholder: "Supporting text below the heading", description: "Optional subheading" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Now", placeholder: "Button text", description: "Optional call-to-action button" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/products", placeholder: "/products", description: "Optional CTA link" },
      { key: "variant", label: "Style", type: "select", options: [{ label: "Modern", value: "modern" }, { label: "Luxury", value: "luxury" }, { label: "Minimal", value: "minimal" }, { label: "Editorial", value: "editorial" }], defaultValue: "modern" },
      { key: "alignment", label: "Alignment", type: "select", options: [{ label: "Center", value: "center" }, { label: "Left", value: "left" }, { label: "Right", value: "right" }], defaultValue: "center" },
      { key: "backgroundImage", label: "Background Image", type: "image", defaultValue: "", placeholder: "https://example.com/image.jpg", description: "Optional background image URL" },
      { key: "backgroundColor", label: "Background Color", type: "color", defaultValue: "#ffffff", description: "Base background color" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "banner.v1": {
    key: "banner.v1",
    name: "Banner",
    description: "Image backdrop with overlay heading and CTA",
    category: "hero",
    props: [
      { key: "imageUrl", label: "Image URL", type: "image", defaultValue: "", placeholder: "https://example.com/banner.jpg" },
      { key: "heading", label: "Heading", type: "string", defaultValue: "Limited Time Offer", placeholder: "Heading text", description: "Optional heading" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Sale", placeholder: "Button text", description: "Optional button" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/products", placeholder: "/products", description: "Optional CTA link" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "header.v1": {
    key: "header.v1",
    name: "Header",
    description: "Site navigation bar with logo, links, and icons",
    category: "hero",
    props: [
      { key: "variant", label: "Style", type: "select", options: [{ label: "Minimal", value: "minimal" }, { label: "Mega Menu", value: "mega-menu" }, { label: "Sticky", value: "sticky" }, { label: "Transparent", value: "transparent" }], defaultValue: "minimal" },
      { key: "logoUrl", label: "Logo URL", type: "image", defaultValue: "/placeholder.svg", placeholder: "https://example.com/logo.png" },
      { key: "showSearch", label: "Show Search Icon", type: "boolean", defaultValue: true },
      { key: "showCart", label: "Show Cart Icon", type: "boolean", defaultValue: true },
    ],
  },
  "footer.v1": {
    key: "footer.v1",
    name: "Footer",
    description: "Site footer with links and branding",
    category: "content",
    props: [
      { key: "copyright", label: "Copyright Text", type: "string", defaultValue: "© 2026 CommerceOS Storefront. All rights reserved.", placeholder: "Copyright notice" },
    ],
  },
  "newsletter.v1": {
    key: "newsletter.v1",
    name: "Newsletter",
    description: "Email signup form with heading and subtext",
    category: "engagement",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Stay in the Loop", placeholder: "Newsletter heading" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Get exclusive offers and updates delivered straight to your inbox.", placeholder: "Supporting text" },
      { key: "placeholderText", label: "Input Placeholder", type: "string", defaultValue: "Enter your email address", placeholder: "Placeholder text" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "rich-text.v1": {
    key: "rich-text.v1",
    name: "Rich Text",
    description: "HTML content block for articles and descriptions",
    category: "content",
    props: [
      { key: "content", label: "Content (HTML)", type: "html", defaultValue: "<p>Write your article or custom layout HTML content here...</p>", placeholder: "Enter HTML content" },
    ],
  },
  "product-grid.v1": {
    key: "product-grid.v1",
    name: "Product Grid",
    description: "Grid of product cards from a collection or source",
    category: "commerce",
    props: [
      { key: "source", label: "Product Source", type: "select", options: [{ label: "Featured", value: "featured" }, { label: "Category", value: "category" }, { label: "Collection", value: "collection" }, { label: "Manual", value: "manual" }], defaultValue: "featured" },
      { key: "sourceId", label: "Source ID", type: "string", defaultValue: "", placeholder: "Category or collection ID" },
      { key: "columns", label: "Columns", type: "select", options: [{ label: "2 Columns", value: "2" }, { label: "3 Columns", value: "3" }, { label: "4 Columns", value: "4" }], defaultValue: "4" },
      { key: "limit", label: "Max Products", type: "number", defaultValue: 12, placeholder: "12" },
      { key: "deviceTarget", label: "Device Visibility", type: "select", options: [{ label: "All Devices", value: "all" }, { label: "Desktop Only", value: "desktop" }, { label: "Mobile Only", value: "mobile" }], defaultValue: "all" },
    ],
  },
  "testimonials.v1": {
    key: "testimonials.v1",
    name: "Testimonials",
    description: "Customer quote display grid or carousel",
    category: "engagement",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "What Our Customers Say", placeholder: "Testimonials heading" },
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
      { key: "items", label: "Testimonials List", type: "array", defaultValue: [
        { author: "Alex R.", role: "Verified Buyer", quote: "Outstanding quality and customer support!" },
        { author: "Sarah M.", role: "Frequent Shopper", quote: "Fast shipping and fantastic packaging." }
      ] },
    ],
  },
  "faq.v1": {
    key: "faq.v1",
    name: "FAQ",
    description: "Accordion-style questions and answers",
    category: "engagement",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Frequently Asked Questions", placeholder: "FAQ heading" },
      { key: "items", label: "FAQ Items", type: "array", defaultValue: [
        { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all orders." },
        { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days." }
      ] },
    ],
  },
  "gallery.v1": {
    key: "gallery.v1",
    name: "Gallery",
    description: "Image gallery in grid, masonry, or carousel layout",
    category: "content",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Visual Gallery", placeholder: "Gallery title" },
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Masonry", value: "masonry" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
    ],
  },
  "product-details.v1": {
    key: "product-details.v1",
    name: "Product Details",
    description: "Interactive product info, variant selection, and add-to-cart. Binds to the current product via $bind.",
    props: [
      { key: "showSku", label: "Show SKU", type: "boolean", defaultValue: true },
      { key: "showStockLevel", label: "Show Stock Level", type: "boolean", defaultValue: true },
      { key: "showReviews", label: "Show Reviews", type: "boolean", defaultValue: true },
      { key: "showSizeGuide", label: "Show Size Guide", type: "boolean", defaultValue: false },
      { key: "showWishlist", label: "Show Wishlist", type: "boolean", defaultValue: false },
      { key: "showShare", label: "Show Share", type: "boolean", defaultValue: false },
    ],
  },
}
