export type PropType = "string" | "number" | "boolean" | "select" | "image" | "html" | "array" | "object"

export interface PropSchema {
  key: string
  label: string
  type: PropType
  options?: { label: string; value: string }[]
  defaultValue?: unknown
  placeholder?: string
  description?: string
}

export interface SectionSchema {
  key: string
  name: string
  description: string
  props: PropSchema[]
}

export const sectionSchemas: Record<string, SectionSchema> = {
  "hero.v1": {
    key: "hero.v1",
    name: "Hero",
    description: "Full-width hero banner with heading, subtext, and CTA",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Welcome to Our Store", placeholder: "Main heading text" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "", placeholder: "Supporting text below the heading", description: "Optional subheading" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Now", placeholder: "Button text", description: "Optional call-to-action button" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/shop", placeholder: "/shop", description: "Optional CTA link" },
      { key: "variant", label: "Style", type: "select", options: [{ label: "Modern", value: "modern" }, { label: "Luxury", value: "luxury" }, { label: "Minimal", value: "minimal" }, { label: "Editorial", value: "editorial" }], defaultValue: "modern" },
      { key: "alignment", label: "Alignment", type: "select", options: [{ label: "Center", value: "center" }, { label: "Left", value: "left" }, { label: "Right", value: "right" }], defaultValue: "center" },
      { key: "backgroundImage", label: "Background Image", type: "image", defaultValue: "", placeholder: "https://example.com/image.jpg", description: "Optional background image URL" },
    ],
  },
  "banner.v1": {
    key: "banner.v1",
    name: "Banner",
    description: "Image backdrop with overlay heading and CTA",
    props: [
      { key: "imageUrl", label: "Image URL", type: "image", defaultValue: "", placeholder: "https://example.com/banner.jpg" },
      { key: "heading", label: "Heading", type: "string", defaultValue: "Limited Offer", placeholder: "Heading text", description: "Optional heading" },
      { key: "ctaLabel", label: "CTA Label", type: "string", defaultValue: "Shop Sale", placeholder: "Button text", description: "Optional button" },
      { key: "ctaHref", label: "CTA Link", type: "string", defaultValue: "/sale", placeholder: "/sale", description: "Optional CTA link" },
    ],
  },
  "header.v1": {
    key: "header.v1",
    name: "Header",
    description: "Site navigation bar with logo, links, and icons",
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
    props: [],
  },
  "newsletter.v1": {
    key: "newsletter.v1",
    name: "Newsletter",
    description: "Email signup form with heading and subtext",
    props: [
      { key: "heading", label: "Heading", type: "string", defaultValue: "Stay in the Loop", placeholder: "Newsletter heading" },
      { key: "subheading", label: "Subheading", type: "string", defaultValue: "Get exclusive offers and updates.", placeholder: "Supporting text", description: "Optional" },
      { key: "placeholderText", label: "Input Placeholder", type: "string", defaultValue: "Enter your email", placeholder: "Placeholder text" },
    ],
  },
  "rich-text.v1": {
    key: "rich-text.v1",
    name: "Rich Text",
    description: "HTML content block for articles and descriptions",
    props: [
      { key: "content", label: "Content (HTML)", type: "html", defaultValue: "<p>Write your content here...</p>", placeholder: "Enter HTML content" },
    ],
  },
  "product-grid.v1": {
    key: "product-grid.v1",
    name: "Product Grid",
    description: "Grid of product cards from a source",
    props: [
      { key: "source", label: "Product Source", type: "select", options: [{ label: "Featured", value: "featured" }, { label: "Category", value: "category" }, { label: "Collection", value: "collection" }, { label: "Manual", value: "manual" }], defaultValue: "featured" },
      { key: "sourceId", label: "Source ID", type: "string", defaultValue: "", placeholder: "Category or collection ID", description: "Required if source is category or collection" },
      { key: "columns", label: "Columns", type: "select", options: [{ label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }], defaultValue: "4" },
      { key: "limit", label: "Max Products", type: "number", defaultValue: 12, placeholder: "12" },
    ],
  },
  "testimonials.v1": {
    key: "testimonials.v1",
    name: "Testimonials",
    description: "Customer quote display",
    props: [
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
    ],
  },
  "faq.v1": {
    key: "faq.v1",
    name: "FAQ",
    description: "Accordion-style questions and answers",
    props: [],
  },
  "gallery.v1": {
    key: "gallery.v1",
    name: "Gallery",
    description: "Image gallery in grid, masonry, or carousel layout",
    props: [
      { key: "variant", label: "Layout", type: "select", options: [{ label: "Grid", value: "grid" }, { label: "Masonry", value: "masonry" }, { label: "Carousel", value: "carousel" }], defaultValue: "grid" },
    ],
  },
}
