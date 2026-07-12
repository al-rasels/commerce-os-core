# Intelligence Engine

## 1. Scope Note

Phase 4+ (per roadmap). Documented at scaffold level only — real design happens once real usage data exists to design against.

## 2. Anticipated Modules

```
Search & Recommendations   (product search, "customers also bought")
AI Store Assistant         ("create a modern luxury fashion store..." → auto-config template+theme+content)
AI Content Generation      (product descriptions, SEO metadata)
Forecasting                (inventory demand prediction)
Support Chatbot
```

## 3. Design Constraint Set Now (even though building later)

- All AI features consume tenant-scoped data only — no cross-tenant training/inference without explicit, separate, anonymized aggregate pipelines (a hard boundary, not a performance optimization).
- AI Store Assistant output must resolve to the same `template_base` + `theme_tenant_override` structures Experience Engine already defines — it's a generator that writes valid overrides, not a parallel rendering path.
- Search is additive (Elasticsearch/Meilisearch index built from Commerce Engine data via events), never the source of truth for catalog data.

## 4. Placeholder Module Boundary

`/modules/intelligence` exists as an empty scaffold from Phase 1 so the five-engine folder structure is stable from day one, even though it contains no logic until Phase 4.
