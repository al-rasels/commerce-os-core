# Phase 3 — Business Depth & Service Extraction

## Goal

Extract distinct business domains (Search, Media, Notifications) into independent microservices, and build out the enterprise Business & ERP capabilities including Multi-Warehouse Order Routing, Procurement, and Point-of-Sale (POS) integration.

## Core Tasks

### Epic 4: Business & ERP Engine

- [x] Implement Multi-Warehouse Inventory & Order Routing logic based on distance/stock availability.
- [x] Implement Procurement & Purchase Orders (POs) module for automatic restocking.
- [x] Implement basic Accounting ledger & reconciliations module (matching orders to payments).
- [x] Implement Point of Sale (POS) sync capabilities for omnichannel retail support.

### Epic 5: Advanced Data Modeling

- [x] Design EAV (Entity-Attribute-Value) schema for Custom Metafields.
- [x] Integrate Metafields CRUD into Products, Orders, and Customers.
- [x] Update Storefront UI to render dynamic Custom Metafields.

### Epic 6: Microservice Extraction & Compliance

- [x] Extract Notifications (Email/SMS) into a separate microservice.
- [x] Extract Search indexing (Meilisearch) into an independent service.
- [x] Extract Media/Asset management (S3 integration) into a dedicated service.
- [x] Begin SOC2-track compliance posture (enhanced audit logging for all mutations, data retention rules).

## Exit Criteria

- Merchants can issue Purchase Orders to restock depleted inventory automatically.
- Orders correctly route fulfillment across multiple warehouse locations.
- Microservices are independently deployable and communicate via message queues/events.
- Full custom data modeling (Metafields) is available across all major entities.
