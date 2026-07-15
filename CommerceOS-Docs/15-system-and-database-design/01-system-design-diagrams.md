# System Design Diagrams

This document visualizes the core architecture flows described in `02-architecture/01-system-architecture.md`.

## 1. High-Level Request Flow

This diagram illustrates the journey of a client request through the system, emphasizing the strict multi-tenant boundaries and resolution mechanisms.

```mermaid
flowchart TD
    Client[Client Browser / Device]
    CDN[CDN / WAF]
    Proxy[Reverse Proxy]
    Resolver[Tenant Resolver Middleware\nHostname -> Tenant ID]
    Auth[Authentication Layer\nJWT Verify, Context Builder]
    Gateway[API Gateway / Router]
    
    subgraph Modules [CommerceOS Modular Monolith]
        Platform[Platform Engine]
        Commerce[Commerce Engine]
        Experience[Experience Engine]
        Business[Business Engine]
    end
    
    subgraph Data [Data Layer]
        PG[(PostgreSQL\nShared Cluster, Tenant-Scoped)]
        Redis[(Redis Cache\nTenant-Namespaced Keys)]
        S3[(Object Storage\nTenant-Prefixed Paths)]
    end

    Client -->|HTTPS Request| CDN
    CDN --> Proxy
    Proxy --> Resolver
    Resolver -->|Attach Tenant ID| Auth
    Auth -->|Attach User/Role Context| Gateway
    Gateway --> Modules
    Modules --> Data
```

## 2. Storefront Single-Pass Rendering Pipeline

To guarantee ultra-fast performance, the Next.js storefront fetches data concurrently and renders the component tree in a single SSR pass.

```mermaid
sequenceDiagram
    participant Client
    participant Edge as Edge CDN (Next.js)
    participant Middleware as Tenant Middleware
    participant API as Backend API

    Client->>Edge: Request /products
    Edge->>Middleware: Intercept Request
    Middleware->>Middleware: Resolve Hostname to Tenant ID
    Middleware-->>Edge: Attach x-tenant-id Header
    
    par Parallel Data Fetching
        Edge->>API: Fetch Theme (theme:resolved)
        Edge->>API: Fetch Page Layout (layout_json)
        Edge->>API: Fetch Catalog Data
    end
    
    API-->>Edge: Returns all contextual data
    
    Edge->>Edge: Inject Theme CSS Custom Properties
    Edge->>Edge: Bind Layout JSON to Component Registry
    Edge->>Edge: Inject Catalog Data to Provider Context
    
    Edge-->>Client: Stream HTML Response
```

## 3. Event-Driven Backbone

This diagram shows how side effects are handled securely across module boundaries using a tenant-scoped event bus. 

```mermaid
flowchart LR
    Origin[Module A\ne.g., Commerce - Checkout]
    EventBus{Event Bus\nBullMQ}
    
    subgraph Consumers [Asynchronous Consumers]
        Inv[Inventory Service\nReserve/Decrement Stock]
        Notif[Notification Service\nSend Email Receipt]
        Anal[Analytics Service\nRecord Sale]
    end

    Origin -->|Publish: OrderCreatedEvent\nRequires tenant_id| EventBus
    EventBus -->|Consume & Acknowledge| Inv
    EventBus -->|Consume & Acknowledge| Notif
    EventBus -->|Consume & Acknowledge| Anal
    
    style EventBus fill:#f96,stroke:#333,stroke-width:2px
```
