# Graph Report - .  (2026-07-15)

## Corpus Check
- 355 files · ~219,770 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 300 nodes · 359 edges · 36 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 149 · MODIFIES: 66 · method: 47 · calls: 30 · rationale_for: 16 · ON_BRANCH: 11 · imports_from: 10 · PARENT_OF: 10 · imports: 9 · implements: 6 · inherits: 5


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 355 · Candidates: 404
- Excluded: 5 untracked · 46326 ignored · 1 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `24a34d0`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `TenantContext` - 10 edges
2. `main()` - 9 edges
3. `run_cmd()` - 7 edges
4. `CatalogController` - 6 edges
5. `CatalogService` - 6 edges
6. `buildModelMessages()` - 5 edges
7. `TenantAuthGuard` - 5 edges
8. `main()` - 4 edges
9. `resolveSkillsFromMessages()` - 4 edges
10. `check_versions()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 1 → community 5_
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --PARENT_OF--> `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library`  [EXTRACTED]
  git → git  _Bridges community 1 → community 3_
- `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 5_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (45): Arguments, AssertEqual, AsyncFunction, AtLeast, Brand, DeepMutable, DeepPartial, DeepReadonly (+37 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (12): geistMono, geistSans, metadata, 028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture, componentRegistry, tokens, AppController, AppModule (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (19): check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig(), check_type_assertions(), check_type_errors(), check_versions() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (5): AuthModule, BuilderModule, CatalogModule, CommerceModule, 21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (14): Category, CategorySchema, Product, ProductSchema, ProductVariant, ProductVariantSchema, Role, RoleSchema (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.36
Nodes (10): main, 24a34d0 docs: initialize enterprise plan, system design documentation, and API schema definitions, 39bac8e docs: initialize architecture, data contracts, and project documentation for core platform modules, 8c8bb73 docs: add UI component creation epic and architecture analysis documentation, 8edc82c docs: initialize core architectural, entity contract, and experience engine documentation, b6a4088 docs: add initial implementation roadmap, component data contracts, product vision, and page builder architecture documentation., c160e7d add agent configuration and coding convention documentation, c2b0240 chore: initialize project documentation and agent configuration files (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.27
Nodes (4): detectConflicts(), MergeResult, resolveOverride(), ThemeService

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (2): GetTenantContext, TenantContext

### Community 8 - "Community 8"
Cohesion: 0.36
Nodes (5): findMany(), findUnique(), scope(), softDelete(), update()

### Community 9 - "Community 9"
Cohesion: 0.36
Nodes (7): check_api_code(), check_openapi_spec(), find_api_files(), main(), Find API-related files., Check OpenAPI/Swagger specification., Check API code for common issues.

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (1): CatalogService

### Community 11 - "Community 11"
Cohesion: 0.57
Nodes (5): assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (1): CatalogController

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (2): CanActivate, TenantAuthGuard

### Community 14 - "Community 14"
Cohesion: 0.47
Nodes (5): find_schema_files(), main(), Find database schema files., Validate Prisma schema file., validate_prisma_schema()

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (1): BuilderController

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (1): BuilderService

### Community 17 - "Community 17"
Cohesion: 0.40
Nodes (2): CanActivate, PermissionGuard

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (2): HostResolverMiddleware, NestMiddleware

### Community 19 - "Community 19"
Cohesion: 0.40
Nodes (3): OnModuleInit, PrismaClient, PrismaService

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (2): PageLayoutRepository, TenantScopedRepository

### Community 21 - "Community 21"
Cohesion: 0.50
Nodes (4): get_summary(), Run Lighthouse audit on URL., Generate summary based on scores., run_lighthouse()

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (1): ThemeController

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (1): AuthController

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (2): NestMiddleware, TenantContextMiddleware

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (2): NestModule, PlatformModule

### Community 26 - "Community 26"
Cohesion: 0.50
Nodes (2): CategoryRepository, TenantScopedRepository

### Community 27 - "Community 27"
Cohesion: 0.50
Nodes (2): ProductRepository, TenantScopedRepository

### Community 28 - "Community 28"
Cohesion: 0.50
Nodes (2): TenantScopedRepository, ThemeTenantOverrideRepository

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (1): AuthService

### Community 31 - "Community 31"
Cohesion: 0.67
Nodes (1): prisma

### Community 32 - "Community 32"
Cohesion: 1.00
Nodes (1): CreateCategoryDto

### Community 33 - "Community 33"
Cohesion: 1.00
Nodes (1): CreateProductDto

### Community 34 - "Community 34"
Cohesion: 1.00
Nodes (1): ExperienceModule

### Community 35 - "Community 35"
Cohesion: 1.00
Nodes (1): PrismaModule

### Community 36 - "Community 36"
Cohesion: 1.00
Nodes (1): ThemeModule

## Knowledge Gaps
- **96 isolated node(s):** `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.`, `Find database schema files.`, `Validate Prisma schema file.` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 7`** (2 nodes): `GetTenantContext`, `TenantContext`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `CatalogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `CatalogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `CanActivate`, `TenantAuthGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `BuilderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `BuilderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `CanActivate`, `PermissionGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `HostResolverMiddleware`, `NestMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `PageLayoutRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `ThemeController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `AuthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `NestMiddleware`, `TenantContextMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `NestModule`, `PlatformModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `CategoryRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `ProductRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `TenantScopedRepository`, `ThemeTenantOverrideRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `AuthService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `prisma`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `CreateCategoryDto`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `CreateProductDto`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `ExperienceModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `PrismaModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `ThemeModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CatalogController` connect `Community 12` to `Community 7`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._