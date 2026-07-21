# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

Write every name in English (en). Do not switch languages.

## Communities

Community 0: utility-types.ts, Arguments, AssertEqual, assertNever(, AsyncFunction, AtLeast, Brand, DeepMutable, DeepPartial, DeepReadonly, DeepRequired, ElementOf
Community 1: vite.config.ts, eslint.config.mjs, layout.tsx, geistMono, geistSans, metadata, RootLayout(, page.tsx, Home(, 028709f chore: scaffold monorepo with apps, shared packages,, index.ts, registry.ts
Community 2: check_versions(, main(, run_cmd(, ts_diagnostic.py, check_any_usage(, check_monorepo(, check_performance(, check_tooling(, check_tsconfig(, check_type_assertions(, check_type_errors(, Check for monorepo configuration.
Community 3: auth.module.ts, AuthModule, builder.module.ts, BuilderModule, catalog.e2e-spec.ts, catalog.module.ts, CatalogModule, commerce.module.ts, CommerceModule, 21888ff feat: implement commerce, catalog, and experience mo, permissions.decorator.ts, RequirePermissions(
Community 4: index.ts, Category, CategorySchema, Product, ProductSchema, ProductVariant, ProductVariantSchema, Role, RoleSchema, Tenant, TenantDomain, TenantDomainSchema
Community 5: main, 24a34d0 docs: initialize enterprise plan, system design docu, 39bac8e docs: initialize architecture, data contracts, and p, 8c8bb73 docs: add UI component creation epic and architectur, 8edc82c docs: initialize core architectural, entity contract, b6a4088 docs: add initial implementation roadmap, component , c160e7d add agent configuration and coding convention docume, c2b0240 chore: initialize project documentation and agent co, c6b41a4 docs: upload -docs, e425b0f docs: upload -docs
Community 6: index.ts, detectConflicts(, MergeResult, resolveOverride(, index.spec.ts, theme.service.ts, ThemeService, .constructor(, .getResolvedTheme(, .updateOverride(
Community 7: TenantContext, auth.service.ts, catalog.controller.ts, tenant-context.decorator.ts, GetTenantContext, tenant-context.middleware.ts, tenant-context.ts, .constructor(, .hasFeature(
Community 8: tenant-scoped.repository.ts, constructor(, create(, findMany(, findUnique(, scope(, softDelete(, update(
Community 9: main(, api_validator.py, check_api_code(, check_openapi_spec(, find_api_files(, Find API-related files., Check OpenAPI/Swagger specification., Check API code for common issues.
Community 10: CatalogService, catalog.service.ts, .constructor(, .createCategory(, .createProduct(, .listCategories(, .listProducts(
Community 11: buildModelMessages(, resolveSkillsFromMessages(, loader.mjs, assertValidMaxSkills(, collectReferencedSkillIds(, loadSkillBodies(, loadSkillIndex(
Community 12: CatalogController, .constructor(, .createCategory(, .createProduct(, .listCategories(, .listProducts(
Community 13: TenantAuthGuard, tenant-auth.guard.ts, CanActivate, .canActivate(, .constructor(, .extractTokenFromHeader(
Community 14: schema_validator.py, find_schema_files(, main(, Find database schema files., Validate Prisma schema file., validate_prisma_schema(
Community 15: builder.controller.ts, BuilderController, .constructor(, .getPageLayout(, .updatePageLayout(
Community 16: builder.service.ts, BuilderService, .constructor(, .getPageLayout(, .updatePageLayout(
Community 17: permission.guard.ts, CanActivate, PermissionGuard, .canActivate(, .constructor(
Community 18: host-resolver.middleware.ts, HostResolverMiddleware, .constructor(, .use(, NestMiddleware
Community 19: prisma.service.ts, OnModuleInit, PrismaClient, PrismaService, .onModuleInit(
Community 20: page-layout.repository.ts, PageLayoutRepository, .constructor(, .findByPageKey(, TenantScopedRepository
Community 21: lighthouse_audit.py, get_summary(, Run Lighthouse audit on URL., Generate summary based on scores., run_lighthouse(
Community 22: theme.controller.ts, ThemeController, .constructor(, .getTheme(, .updateOverride(
Community 23: auth.controller.ts, AuthController, .constructor(, .login(
Community 24: NestMiddleware, TenantContextMiddleware, .constructor(, .use(
Community 25: platform.module.ts, NestModule, PlatformModule, .configure(
Community 26: category.repository.ts, CategoryRepository, .constructor(, TenantScopedRepository
Community 27: product.repository.ts, ProductRepository, .constructor(, TenantScopedRepository
Community 28: theme-override.repository.ts, TenantScopedRepository, ThemeTenantOverrideRepository, .constructor(
Community 29: condition-based-waiting-example.ts, waitForEvent(, waitForEventCount(, waitForEventMatch(
Community 30: AuthService, .constructor(, .login(
Community 31: seed.ts, main(, prisma
Community 32: create-category.dto.ts, CreateCategoryDto
Community 33: create-product.dto.ts, CreateProductDto
Community 34: experience.module.ts, ExperienceModule
Community 35: prisma.module.ts, PrismaModule
Community 36: theme.module.ts, ThemeModule

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\label-instructions\communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.
