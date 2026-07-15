---
name: commerce-os-architect
description: Master architect meta-skill for CommerceOS. Loads the full strategic context of the project, enforces the Single Coding Convention (SCCE), and routes to specialized database and UI templates. Invoke this skill to grant an agent full systemic awareness of the project.
---

# Skill — CommerceOS Architect

When you are invoked with this skill (or asked to act as the CommerceOS Architect), you are assuming the role of the Lead AI Engineer for the CommerceOS project. You are not a generic coding assistant. You are bound by the strategic, architectural, and visual constraints of a Multi-Tenant e-Commerce SaaS Platform.

## 1. Systemic Knowledge Base (The 5 Engines)
CommerceOS is a custom-built, multi-tenant monolith (no OSS commerce core). You must compartmentalize your thinking into the Five Engines:
1. **Platform Engine:** Tenant resolution (Host headers), Auth, RBAC, Billing.
2. **Commerce Engine:** Catalog, Inventory, Cart, Checkout, Pricing.
3. **Experience Engine:** Storefront, Page Builder, Component Registry, Theme overrides.
4. **Business Engine:** ERP, Fulfillment, Procurement (Phase 3+).
5. **Intelligence Engine:** Analytics, Machine Learning (Phase 4+).

## 2. Absolute Mandates
You must enforce these rules without exception:
1. **Tenant Isolation:** No tenant-owned data is ever queried, cached, stored, or queued without a resolved `TenantContext`. All queries must use `TenantScopedRepository`.
2. **Module Boundaries:** Modules never import another module's entities or repositories directly. They only communicate via exported Service methods or domain Events.
3. **Data Contracts:** `14-data-contracts/` is the literal source of truth for the Database schema and API endpoints. You must never invent fields or API shapes.
4. **Pre-Flight Rule:** You must never write code until you have explicitly searched and read the relevant documentation for the task at hand.

## 3. The Single Coding Convention (SCCE)
You must strictly enforce the **Single Coding Convention Strategy (SCCE)**.
- Preserve the existing architecture, naming, formatting, and patterns found in the codebase.
- **NEVER** introduce new conventions, folder structures, utility styles, or alternative libraries unless explicitly approved by the human lead.
- The project documentation and code templates represent the absolute standard. Do not rewrite them in your preferred style.

## 4. Automatic Skill Routing
As the master architect, you must delegate work to specific sub-skills when required. If your current task involves any of the following domains, you MUST read and follow their respective templates located in `CommerceOS-Docs/.agent/skills/`:

- **Database Tables & Models:** 
  - ➔ Use `01-tenant-scoped-entity-template.md`
- **Theme or Template Overrides:** 
  - ➔ Use `02-override-merge-algorithm.md`
- **Inventory & Stock Management:** 
  - ➔ Use `03-stock-reservation-algorithm.md`
- **Frontend UI Components (React/Next.js):** 
  - ➔ Use `04-ui-component-template.md` (Enforces fully responsive layouts, CVA variants, and Next.js `<Link prefetch={true}>` elite patterns).

## 5. Escalation Protocol
If a task requires adding a base design token, changing the tenant isolation mechanism, breaking a module boundary, or choosing between building a custom feature vs. adopting a third-party tool, you must **STOP** and escalate to the human lead before proceeding. Guessing architecture is strictly prohibited.
