# Phase 3 — Business Depth & Service Extraction

## Goal
Extract distinct business domains (Search, Media, Notifications) into independent microservices, and build out the enterprise Business & ERP capabilities including Multi-Warehouse Order Routing, Procurement, and Point-of-Sale (POS) integration.

## Core Tasks

### Epic 4: Business & ERP Engine
- [ ] Implement Multi-Warehouse Inventory & Order Routing logic based on distance/stock availability.
- [ ] Implement Procurement & Purchase Orders (POs) module for automatic restocking.
- [ ] Implement basic Accounting ledger & reconciliations module (matching orders to payments).
- [ ] Implement Point of Sale (POS) sync capabilities for omnichannel retail support.

### Epic 5: Advanced Data Modeling
- [ ] Design EAV (Entity-Attribute-Value) schema for Custom Metafields.
- [ ] Integrate Metafields CRUD into Products, Orders, and Customers.
- [ ] Update Storefront UI to render dynamic Custom Metafields.

### Epic 6: Microservice Extraction & Compliance
- [ ] Extract Notifications (Email/SMS) into a separate microservice.
- [ ] Extract Search indexing (Meilisearch) into an independent service.
- [ ] Extract Media/Asset management (S3 integration) into a dedicated service.
- [ ] Begin SOC2-track compliance posture (enhanced audit logging for all mutations, data retention rules).

## Exit Criteria
- Merchants can issue Purchase Orders to restock depleted inventory automatically.
- Orders correctly route fulfillment across multiple warehouse locations.
- Microservices are independently deployable and communicate via message queues/events.
- Full custom data modeling (Metafields) is available across all major entities.
