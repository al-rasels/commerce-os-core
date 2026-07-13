# Extensibility & Plugins Architecture

To build a truly futuristic, industry-standard multi-tenant commerce platform, extensibility cannot be an afterthought. Developers must be able to extend the system without touching core platform code, and merchants must be able to install these extensions securely.

## 1. App Ecosystem Model

CommerceOS uses a **Decoupled App Model** (similar to Shopify). We explicitly reject the "Internal Plugin Execution" model (like WordPress/WooCommerce) because running untrusted PHP/Node.js inside a multi-tenant SaaS environment is a massive security and stability risk.

Apps are standalone web applications hosted by third-party developers. They communicate with CommerceOS strictly via our external API layer.

## 2. API Keys & OAuth Scopes

- Apps request access via OAuth 2.0.
- When a merchant installs an app, the app is granted a `TenantToken` restricted by specific scopes (e.g., `read:products`, `write:orders`).
- All App API calls pass through the same API Gateway and `TenantContextMiddleware` as our internal frontend apps.

## 3. Webhooks Backbone

Apps react to events in CommerceOS via Webhooks.
- When an order is placed, the Commerce Engine emits an internal BullMQ event `order.created`.
- The Webhook Module (part of the Platform Engine) listens to this BullMQ event.
- It looks up all Webhook Subscriptions for the `tenant_id` associated with `order.created`.
- It securely POSTs the event payload to the App's registered URL.
- **Security:** Webhooks include an HMAC signature in the headers so Apps can verify the payload came from CommerceOS.

## 4. Storefront Script Injection (App Blocks)

Apps often need to alter the storefront visual experience (e.g., a "Product Review" widget or an analytics tracker).
- Apps do not modify `page_layouts` directly.
- Instead, the Experience Engine provides an `AppBlock` component in the registry.
- When a merchant edits their theme, they can place an `AppBlock` which securely renders an iframe or dynamically injects a sandboxed script provided by the App.
- This ensures a misbehaving app cannot crash the entire React Storefront rendering pipeline.
