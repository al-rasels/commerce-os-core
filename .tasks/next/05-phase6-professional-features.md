# Phase 6 — Professional & Enterprise Parity

## Goal

To bridge the feature gap between the MVP and professional-level platforms like Shopify (OS 2.0) and WooCommerce. This phase focuses heavily on advanced Experience Engine components (Builder/Templates) and deep operational tools within the Commerce Engine.

## Core Tasks

### Epic 12: Advanced Experience Engine (Builder & Templates)

- [ ] Design and implement a dynamic templating engine (Liquid/Handlebars equivalent) allowing merchants to write dynamic conditional logic inside the page builder JSON blocks.
- [ ] Implement Global Sections architecture (e.g., Header, Footer) that persist and synchronize across all page templates.
- [ ] Implement Theme App Extensions (App Blocks) allowing third-party integrations to securely inject UI into the page builder canvas.
- [ ] Develop 20+ advanced component variations (Mega Menus, Accordions, Video Backgrounds, Countdown Timers, Multi-currency/Multi-language toggles) in `packages/components`.
- [ ] Enhance the Admin Page Builder UI to support nested section blocks (adding blocks inside sections, dragging blocks between sections).

### Epic 13: Advanced Commerce & CRM

- [ ] Implement Draft Orders module: Admin UI to manually build orders, add custom line-item discounts, and email a secure Stripe checkout link to the customer.
- [ ] Implement Abandoned Cart Recovery engine: Scheduled BullMQ jobs that detect stale carts and trigger recovery email sequences via the Notifications service.
- [ ] Implement Customer Segmentation & Cohorts: Dynamic filtering engine to build segments (e.g., "VIP", "Has not purchased in 90 days") for targeted marketing.
- [ ] Build Advanced Marketing & Discounts Engine: Support for BOGO (Buy One Get One), volume-tiered pricing, and automatic cart-level discounts.
- [ ] Implement Digital Gift Cards engine: Issuance, balance tracking, and native redemption during the checkout state machine.

### Epic 14: Advanced Operations (Admin)

- [ ] Implement Metafields & Metaobjects Admin UI: Visual editor allowing merchants to manage the EAV custom data models introduced in Phase 3.
- [ ] Build Bulk Operations engine for Inventory: UI for mass inventory transfers between warehouse locations, bulk adjustments, and cycle counting.
- [ ] Build Real-time Analytics Dashboard: Granular reporting on sales by channel, average order value over time, and conversion funnel metrics.

## Exit Criteria

- The Experience Builder supports deep block nesting, global sections, and dynamic logic matching Shopify OS 2.0 standards.
- Merchants can execute complex B2B or support workflows via Draft Orders and manual invoicing.
- The platform natively recovers lost revenue via Abandoned Cart automations.
- Customer CRM and Discounting systems provide robust, enterprise-grade capabilities comparable to top-tier SaaS commerce platforms.
