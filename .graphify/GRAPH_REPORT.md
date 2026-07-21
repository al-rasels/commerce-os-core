# Graph Report - .  (2026-07-21)

## Corpus Check
- Large corpus: 675 files · ~294,599 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1452 nodes · 2433 edges · 127 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 753 · MODIFIES: 604 · method: 295 · imports_from: 280 · imports: 243 · calls: 77 · re_exports: 50 · references: 32 · ON_BRANCH: 27 · PARENT_OF: 26 · inherits: 22 · rationale_for: 16 · implements: 8


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 675 · Candidates: 825
- Excluded: 1 untracked · 135775 ignored · 9 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `4a91873`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `TenantContext` - 56 edges
2. `cn()` - 29 edges
3. `cn()` - 20 edges
4. `CatalogService` - 19 edges
5. `tenants` - 18 edges
6. `api` - 17 edges
7. `Button()` - 16 edges
8. `CatalogController` - 16 edges
9. `AuthService` - 16 edges
10. `AuthController` - 15 edges

## Surprising Connections (you probably didn't know these)
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 4 → community 11_
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --PARENT_OF--> `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library`  [EXTRACTED]
  git → git  _Bridges community 4 → community 6_
- `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 6 → community 11_
- `3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8)` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 11_
- `3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8)` --PARENT_OF--> `b121f53 some-things`  [EXTRACTED]
  git → git  _Bridges community 3 → community 31_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (52): catalogApi, Category, CategoryInput, Product, ProductInput, ProductVariant, ProductVariantInput, api (+44 more)

### Community 1 - "Community 1"
Cohesion: 0.04
Nodes (14): CategoryNode, CommerceModule, ac49c08 chore: batch commit — catalog CRUD, admin UI, auth gaps, storefront cart/checkout, theme engine, design system components, MediaUploadWidgetProps, RichTextEditorProps, statusVariant, CreateProductVariantDto, InviteDto (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (45): Arguments, AssertEqual, AsyncFunction, AtLeast, Brand, DeepMutable, DeepPartial, DeepReadonly (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (15): AdminModule, 3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8), 6ffba43 feat: add MFA auth flow, super admin tenant management, forgot/reset password pages, and backend security hardening, CreatePromotionDto, CreateShippingRuleDto, CreateTaxRuleDto, UpdatePromotionDto, UpdateShippingRuleDto (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (26): 028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture, tokens, Category, CategorySchema, Product, ProductSchema, ProductVariant, ProductVariantSchema (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (19): AuditLogModule, AuditLogRepository, TenantScopedRepository, CartModule, CheckoutModule, 3d66d0f feat: implement payments module, checkout flow, auth, tenant resolution, and admin/storefront scaffolding, CustomerModule, AddItemDto (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (10): AuthModule, BuilderModule, 21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library, 6eb89d7 chore(tech-debt): resolve technical debt, fix typings, enforce strict tenant isolation, CreateCategoryDto, CreateProductDto, ExperienceModule, PrismaModule (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (8): { authenticator }, CheckoutController, e3a8c77 feat: implement users CRUD backend module and admin UI, CurrentUser, GetTenantContext, UpdateUserDto, UpdateUserStatusDto, TenantContext

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (3): cn(), Badge(), badgeVariants

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (6): 4a91873 chore: add .graphify directory to git, 4ddc1b9 fix(build): resolve type and import errors across admin and storefront, PLANS, Props, DataTableProps, TanStackColumn

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (23): audit_log, cart_items, carts, categories, countries, currencies, customers, feature_flags (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.15
Nodes (16): main, CatalogModule, 24a34d0 docs: initialize enterprise plan, system design documentation, and API schema definitions, 39bac8e docs: initialize architecture, data contracts, and project documentation for core platform modules, 57631e5 docs: add UI specifications, agent skills, and architectural documentation for the CommerceOS platform, 7bea885 feat: implement full-stack authentication flow and admin entity management hooks, 8c8bb73 docs: add UI component creation epic and architecture analysis documentation, 8edc82c docs: initialize core architectural, entity contract, and experience engine documentation (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (3): SearchForm(), Input(), Label()

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (15): Button(), ButtonProps, sizeStyles, variantStyles, FieldType, FormField, FormRenderer(), FormRendererProps (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (19): check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig(), check_type_assertions(), check_type_errors(), check_versions() (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (10): Cart, CartDrawer(), CartItem, formatPrice(), Button(), buttonVariants, Sheet(), SheetContent() (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (1): CatalogService

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (11): EmptyState(), EmptyStateProps, Faq(), FaqProps, RichText(), RichTextProps, Skeleton(), SkeletonProps (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.15
Nodes (10): footerColumns, geistMono, geistSans, metadata, CartBadge(), SearchAutocomplete(), ResolvedTheme, TenantThemeProvider() (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.16
Nodes (1): AuthService

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (1): CatalogController

### Community 21 - "Community 21"
Cohesion: 0.16
Nodes (11): Banner(), BannerProps, CartDrawer(), CartDrawerProps, CheckoutSummary(), CheckoutSummaryProps, Newsletter(), NewsletterProps (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (1): AuthController

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (12): CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions, CarouselPlugin (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.21
Nodes (1): UsersService

### Community 26 - "Community 26"
Cohesion: 0.19
Nodes (5): Cart, CartItem, api, CartStore, useCartStore

### Community 27 - "Community 27"
Cohesion: 0.23
Nodes (8): aggregate(), count(), findMany(), findUnique(), groupBy(), scope(), softDelete(), update()

### Community 28 - "Community 28"
Cohesion: 0.15
Nodes (3): ColorMode, SectionKey, SettingRowProps

### Community 30 - "Community 30"
Cohesion: 0.25
Nodes (7): formatPrice(), ProductCard(), ProductCardProps, columnMap, demoProducts, ProductGrid(), ProductGridProps

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (5): b121f53 some-things, f1d1a16 feat: implement storefront foundation with API integration, authentication, cart, checkout, and UI components, Order, OrderItem, config

### Community 32 - "Community 32"
Cohesion: 0.24
Nodes (6): AddSectionPanel(), AddSectionPanelProps, PropEditor(), PropEditorProps, SectionCard(), SectionCardProps

### Community 34 - "Community 34"
Cohesion: 0.31
Nodes (5): Card(), CardContent(), CardDescription(), CardHeader(), CardTitle()

### Community 35 - "Community 35"
Cohesion: 0.24
Nodes (1): CartService

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (1): TenantAdminController

### Community 39 - "Community 39"
Cohesion: 0.28
Nodes (2): e5d6c72 feat: implement end-to-end checkout flow including UI components, API repositories, and storefront application modules, ProductsClient()

### Community 40 - "Community 40"
Cohesion: 0.28
Nodes (7): AddToCartButton(), localRegistry, Node, resolveBind(), resolveProps(), SectionRendererProps, ProductClient()

### Community 41 - "Community 41"
Cohesion: 0.28
Nodes (3): JsonLd(), SectionRenderer(), ProductPageClient()

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (8): borderMap, iconMap, Toast(), ToastContainer(), ToastContainerProps, ToastData, ToastProps, ToastVariant

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (2): StorefrontCheckoutController, StorefrontOrderController

### Community 44 - "Community 44"
Cohesion: 0.25
Nodes (1): PromotionsService

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (3): OnModuleDestroy, OnModuleInit, RedisService

### Community 46 - "Community 46"
Cohesion: 0.28
Nodes (4): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants

### Community 48 - "Community 48"
Cohesion: 0.25
Nodes (1): AdminController

### Community 49 - "Community 49"
Cohesion: 0.25
Nodes (1): AdminService

### Community 50 - "Community 50"
Cohesion: 0.32
Nodes (3): ApiError, serverApi, serverRequest()

### Community 51 - "Community 51"
Cohesion: 0.25
Nodes (1): CartController

### Community 52 - "Community 52"
Cohesion: 0.25
Nodes (5): f1bfa47 feat: implement storefront order retrieval, status management, and admin order dashboard functionality, OrderItemDto, OrderResponseDto, VALID_TRANSITIONS, StorefrontModule

### Community 53 - "Community 53"
Cohesion: 0.25
Nodes (5): Column, DataTable(), DataTableProps, Header(), HeaderProps

### Community 54 - "Community 54"
Cohesion: 0.32
Nodes (1): CustomerService

### Community 55 - "Community 55"
Cohesion: 0.32
Nodes (1): OrderService

### Community 56 - "Community 56"
Cohesion: 0.36
Nodes (7): check_api_code(), check_openapi_spec(), find_api_files(), main(), Find API-related files., Check OpenAPI/Swagger specification., Check API code for common issues.

### Community 57 - "Community 57"
Cohesion: 0.25
Nodes (1): ShippingService

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (1): TaxService

### Community 59 - "Community 59"
Cohesion: 0.29
Nodes (4): AuthContext, AuthContextType, AuthUser, MfaState

### Community 60 - "Community 60"
Cohesion: 0.29
Nodes (1): CustomerController

### Community 61 - "Community 61"
Cohesion: 0.57
Nodes (5): assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()

### Community 62 - "Community 62"
Cohesion: 0.29
Nodes (1): PromotionsController

### Community 63 - "Community 63"
Cohesion: 0.29
Nodes (1): ShippingController

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (1): TaxController

### Community 67 - "Community 67"
Cohesion: 0.29
Nodes (2): TenantScopedRepository, UsersRepository

### Community 68 - "Community 68"
Cohesion: 0.33
Nodes (1): BuilderController

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (1): BuilderService

### Community 70 - "Community 70"
Cohesion: 0.53
Nodes (1): TenantCacheService

### Community 71 - "Community 71"
Cohesion: 0.47
Nodes (4): Breadcrumbs(), BreadcrumbsProps, Crumb, defaultItems

### Community 72 - "Community 72"
Cohesion: 0.47
Nodes (4): Sidebar(), SidebarItem, SidebarProps, items

### Community 73 - "Community 73"
Cohesion: 0.47
Nodes (4): tabs, Tab, Tabs(), TabsProps

### Community 77 - "Community 77"
Cohesion: 0.53
Nodes (4): ApiError, authRequest(), authRequestWithToken(), request()

### Community 78 - "Community 78"
Cohesion: 0.33
Nodes (2): OrderRepository, TenantScopedRepository

### Community 79 - "Community 79"
Cohesion: 0.33
Nodes (4): CONFIRMATION_LABELS, DESTRUCTIVE_ACTIONS, OrderTimelineProps, statusOrder

### Community 80 - "Community 80"
Cohesion: 0.33
Nodes (3): containerVariants, itemVariants, mockChartData

### Community 81 - "Community 81"
Cohesion: 0.47
Nodes (1): PaymentsService

### Community 82 - "Community 82"
Cohesion: 0.47
Nodes (5): find_schema_files(), main(), Find database schema files., Validate Prisma schema file., validate_prisma_schema()

### Community 83 - "Community 83"
Cohesion: 0.33
Nodes (1): StorefrontCartController

### Community 84 - "Community 84"
Cohesion: 0.40
Nodes (2): Alert(), alertVariants

### Community 86 - "Community 86"
Cohesion: 0.40
Nodes (2): TabsList(), tabsListVariants

### Community 87 - "Community 87"
Cohesion: 0.33
Nodes (1): UsersController

### Community 88 - "Community 88"
Cohesion: 0.50
Nodes (1): AuthGuard()

### Community 89 - "Community 89"
Cohesion: 0.40
Nodes (4): alignmentStyles, Hero(), HeroProps, variantStyles

### Community 90 - "Community 90"
Cohesion: 0.60
Nodes (3): getPageNumbers(), Pagination(), PaginationProps

### Community 91 - "Community 91"
Cohesion: 0.40
Nodes (4): PropSchema, PropType, SectionSchema, sectionSchemas

### Community 92 - "Community 92"
Cohesion: 0.40
Nodes (1): VariantEditorProps

### Community 93 - "Community 93"
Cohesion: 0.50
Nodes (2): CanActivate, TenantAuthGuard

### Community 96 - "Community 96"
Cohesion: 0.40
Nodes (1): navItems

### Community 97 - "Community 97"
Cohesion: 0.40
Nodes (2): HostResolverMiddleware, NestMiddleware

### Community 98 - "Community 98"
Cohesion: 0.40
Nodes (1): OrderController

### Community 99 - "Community 99"
Cohesion: 0.50
Nodes (4): get_summary(), Run Lighthouse audit on URL., Generate summary based on scores., run_lighthouse()

### Community 101 - "Community 101"
Cohesion: 0.50
Nodes (1): AuditLogController

### Community 102 - "Community 102"
Cohesion: 0.50
Nodes (1): AuditLogService

### Community 103 - "Community 103"
Cohesion: 0.50
Nodes (1): CheckoutService

### Community 104 - "Community 104"
Cohesion: 0.50
Nodes (3): Footer(), FooterProps, socialIconLabels

### Community 105 - "Community 105"
Cohesion: 0.50
Nodes (3): Gallery(), GalleryProps, variantStyles

### Community 106 - "Community 106"
Cohesion: 0.67
Nodes (2): Modal(), ModalProps

### Community 107 - "Community 107"
Cohesion: 0.67
Nodes (2): SearchBar(), SearchBarProps

### Community 108 - "Community 108"
Cohesion: 0.50
Nodes (2): CustomerRepository, TenantScopedRepository

### Community 109 - "Community 109"
Cohesion: 0.50
Nodes (1): DashboardController

### Community 110 - "Community 110"
Cohesion: 0.50
Nodes (2): CanActivate, PermissionGuard

### Community 112 - "Community 112"
Cohesion: 0.50
Nodes (2): NestMiddleware, TenantContextMiddleware

### Community 113 - "Community 113"
Cohesion: 0.50
Nodes (2): OrderItemRepository, TenantScopedRepository

### Community 114 - "Community 114"
Cohesion: 0.50
Nodes (1): PaymentsWebhookController

### Community 115 - "Community 115"
Cohesion: 0.50
Nodes (3): OnModuleInit, PrismaClient, PrismaService

### Community 116 - "Community 116"
Cohesion: 0.50
Nodes (2): PromotionRepository, TenantScopedRepository

### Community 117 - "Community 117"
Cohesion: 0.50
Nodes (2): CartItemRepository, TenantScopedRepository

### Community 118 - "Community 118"
Cohesion: 0.50
Nodes (2): CartRepository, TenantScopedRepository

### Community 119 - "Community 119"
Cohesion: 0.50
Nodes (2): CategoryRepository, TenantScopedRepository

### Community 120 - "Community 120"
Cohesion: 0.50
Nodes (2): PageLayoutRepository, TenantScopedRepository

### Community 121 - "Community 121"
Cohesion: 0.50
Nodes (2): ProductRepository, TenantScopedRepository

### Community 122 - "Community 122"
Cohesion: 0.50
Nodes (2): ProductVariantRepository, TenantScopedRepository

### Community 123 - "Community 123"
Cohesion: 0.50
Nodes (2): TenantScopedRepository, ThemeTenantOverrideRepository

### Community 124 - "Community 124"
Cohesion: 0.50
Nodes (2): ShippingRuleRepository, TenantScopedRepository

### Community 125 - "Community 125"
Cohesion: 0.50
Nodes (1): StorefrontController

### Community 127 - "Community 127"
Cohesion: 0.50
Nodes (2): TaxRuleRepository, TenantScopedRepository

### Community 128 - "Community 128"
Cohesion: 0.50
Nodes (1): TenantService

### Community 129 - "Community 129"
Cohesion: 0.50
Nodes (1): ThemeController

### Community 130 - "Community 130"
Cohesion: 0.50
Nodes (1): ThemeService

### Community 132 - "Community 132"
Cohesion: 0.50
Nodes (2): RoleRepository, TenantScopedRepository

### Community 133 - "Community 133"
Cohesion: 0.67
Nodes (1): DashboardService

### Community 134 - "Community 134"
Cohesion: 0.67
Nodes (2): OrderStatusDto, VALID_STATUSES

### Community 135 - "Community 135"
Cohesion: 0.67
Nodes (2): BaseExceptionFilter, PrismaClientExceptionFilter

### Community 136 - "Community 136"
Cohesion: 0.67
Nodes (1): HealthController

### Community 138 - "Community 138"
Cohesion: 0.67
Nodes (1): statusConfig

### Community 139 - "Community 139"
Cohesion: 0.67
Nodes (1): PaymentsController

### Community 140 - "Community 140"
Cohesion: 0.67
Nodes (2): NestModule, PlatformModule

### Community 141 - "Community 141"
Cohesion: 0.67
Nodes (1): prisma

### Community 142 - "Community 142"
Cohesion: 0.67
Nodes (2): TenantScopedRepository, TestRepo

### Community 144 - "Community 144"
Cohesion: 0.67
Nodes (1): knownPages

### Community 145 - "Community 145"
Cohesion: 0.67
Nodes (1): statusVariant

### Community 146 - "Community 146"
Cohesion: 0.67
Nodes (1): statusVariant

## Knowledge Gaps
- **251 isolated node(s):** `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.`, `Find database schema files.`, `Validate Prisma schema file.` (+246 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 16`** (1 nodes): `CatalogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `AuthService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `CatalogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `AuthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `UsersService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `CartService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `TenantAdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (2 nodes): `e5d6c72 feat: implement end-to-end checkout flow including UI components, API repositories, and storefront application modules`, `ProductsClient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (2 nodes): `StorefrontCheckoutController`, `StorefrontOrderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `PromotionsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `AdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `AdminService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `CartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `CustomerService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `OrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `ShippingService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `TaxService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `CustomerController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `PromotionsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `ShippingController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `TaxController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (2 nodes): `TenantScopedRepository`, `UsersRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `BuilderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `BuilderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `TenantCacheService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (2 nodes): `OrderRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `PaymentsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `StorefrontCartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (2 nodes): `Alert()`, `alertVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `TabsList()`, `tabsListVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (1 nodes): `UsersController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (1 nodes): `AuthGuard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `VariantEditorProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (2 nodes): `CanActivate`, `TenantAuthGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `navItems`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (2 nodes): `HostResolverMiddleware`, `NestMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (1 nodes): `OrderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 101`** (1 nodes): `AuditLogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 102`** (1 nodes): `AuditLogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 103`** (1 nodes): `CheckoutService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 106`** (2 nodes): `Modal()`, `ModalProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (2 nodes): `SearchBar()`, `SearchBarProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (2 nodes): `CustomerRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (1 nodes): `DashboardController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (2 nodes): `CanActivate`, `PermissionGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (2 nodes): `NestMiddleware`, `TenantContextMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (2 nodes): `OrderItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (1 nodes): `PaymentsWebhookController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (2 nodes): `PromotionRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (2 nodes): `CartItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (2 nodes): `CartRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (2 nodes): `CategoryRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 120`** (2 nodes): `PageLayoutRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (2 nodes): `ProductRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (2 nodes): `ProductVariantRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (2 nodes): `TenantScopedRepository`, `ThemeTenantOverrideRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (2 nodes): `ShippingRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `StorefrontController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 127`** (2 nodes): `TaxRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 128`** (1 nodes): `TenantService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (1 nodes): `ThemeController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (1 nodes): `ThemeService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (2 nodes): `RoleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 133`** (1 nodes): `DashboardService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (2 nodes): `OrderStatusDto`, `VALID_STATUSES`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (2 nodes): `BaseExceptionFilter`, `PrismaClientExceptionFilter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 136`** (1 nodes): `HealthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (1 nodes): `statusConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `PaymentsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (2 nodes): `NestModule`, `PlatformModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (1 nodes): `prisma`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (2 nodes): `TenantScopedRepository`, `TestRepo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 144`** (1 nodes): `knownPages`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 145`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TenantContext` connect `Community 7` to `Community 101`, `Community 6`, `Community 3`, `Community 103`, `Community 109`, `Community 52`, `Community 27`, `Community 43`, `Community 11`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `CatalogService` connect `Community 16` to `Community 6`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `CatalogController` connect `Community 20` to `Community 6`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.` to the rest of the system?**
  _251 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06467661691542288 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._