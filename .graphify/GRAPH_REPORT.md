# Graph Report - . (2026-07-27)

## Corpus Check

- Large corpus: 815 files · ~350,617 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary

- 2008 nodes · 3378 edges · 149 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 1134 · MODIFIES: 836 · imports_from: 380 · method: 345 · imports: 318 · calls: 95 · ON_BRANCH: 74 · re_exports: 64 · PARENT_OF: 43 · inherits: 32 · references: 32 · rationale_for: 16 · implements: 9

## Input Scope

- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 815 · Candidates: 1289
- Excluded: 0 untracked · 139933 ignored · 9 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness

- Built from Git commit: `efe67e9`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.

## God Nodes (most connected - your core abstractions)

1. `TenantContext` - 65 edges
2. `cn()` - 53 edges
3. `CatalogService` - 23 edges
4. `cn()` - 20 edges
5. `api` - 20 edges
6. `Button()` - 19 edges
7. `tenants` - 18 edges
8. `CatalogController` - 18 edges
9. `api` - 17 edges
10. `AuthService` - 16 edges

## Surprising Connections (you probably didn't know these)

- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --ON_BRANCH--> `feat/admin-ui-refactor` [EXTRACTED]
  git → git _Bridges community 21 → community 19_
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --PARENT_OF--> `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library` [EXTRACTED]
  git → git _Bridges community 21 → community 10_
- `0361288 feat(admin): Scaffolded Phase 2 Drag and Drop Page Builder UI` --ON_BRANCH--> `feat/admin-ui-refactor` [EXTRACTED]
  git → git _Bridges community 26 → community 19_
- `05b237f feat(admin): Implemented Page Builder Property and Data Binding Panels` --PARENT_OF--> `67df34f feat(api): Setup BullMQ background queues with strict tenant isolation` [EXTRACTED]
  git → git _Bridges community 26 → community 12_
- `16cea38 feat(api): Implemented Meilisearch Engine and Sync Workers` --ON_BRANCH--> `feat/admin-ui-refactor` [EXTRACTED]
  git → git _Bridges community 12 → community 19_

## Communities

### Community 0 - "Community 0"

Cohesion: 0.05
Nodes (66): b2bApi, CompanyProfile, CompanyProfileInput, catalogApi, Category, CategoryInput, Product, ProductInput (+58 more)

### Community 1 - "Community 1"

Cohesion: 0.06
Nodes (34): Banner(), BannerProps, CartDrawer(), CartDrawerProps, CheckoutSummary(), CheckoutSummaryProps, Column, DataTable() (+26 more)

### Community 2 - "Community 2"

Cohesion: 0.04
Nodes (15): CategoryNode, ac49c08 chore: batch commit — catalog CRUD, admin UI, auth gaps, storefront cart/checkout, theme engine, design system components, MediaUploadWidgetProps, RichTextEditorProps, statusVariant, CreateProductVariantDto, InviteDto, ListOrdersQueryDto (+7 more)

### Community 3 - "Community 3"

Cohesion: 0.06
Nodes (16): AdminModule, CommerceModule, 3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8), 6ffba43 feat: add MFA auth flow, super admin tenant management, forgot/reset password pages, and backend security hardening, CreatePromotionDto, CreateShippingRuleDto, CreateTaxRuleDto, UpdatePromotionDto (+8 more)

### Community 4 - "Community 4"

Cohesion: 0.09
Nodes (12): CheckoutModule, 4029d6f fix(commerce): resolve architecture and tenant isolation violations, 65feb38 feat(api): Integrated Promotions Module with Checkout State Machine, 6eb89d7 chore(tech-debt): resolve technical debt, fix typings, enforce strict tenant isolation, bb279ee fix(ci): fix api tests and linting errors to stabilize pipeline, e3a8c77 feat: implement users CRUD backend module and admin UI, CurrentUser, UpdateUserDto (+4 more)

### Community 5 - "Community 5"

Cohesion: 0.04
Nodes (45): Arguments, AssertEqual, AsyncFunction, AtLeast, Brand, DeepMutable, DeepPartial, DeepReadonly (+37 more)

### Community 6 - "Community 6"

Cohesion: 0.06
Nodes (12): { authenticator }, B2bModule, 7d74efe feat(commerce): implement B2B, Subscriptions, Returns UI and Backend Scaffold, bb61ae8 feat(commerce): wire up Admin UI to new Enterprise APIs (Wave 2), c506b3c feat(api): implement database repositories for enterprise modules (Wave 4), InventoryModule, ReturnsController, ReturnsModule (+4 more)

### Community 7 - "Community 7"

Cohesion: 0.05
Nodes (15): AuditLogModule, CartModule, 3d66d0f feat: implement payments module, checkout flow, auth, tenant resolution, and admin/storefront scaffolding, AddItemDto, CheckoutDto, CreateCartDto, CreateCustomerDto, CreatePaymentIntentDto (+7 more)

### Community 8 - "Community 8"

Cohesion: 0.07
Nodes (5): Button(), ButtonProps, buttonVariants, sizeStyles, variantStyles

### Community 9 - "Community 9"

Cohesion: 0.09
Nodes (8): Badge(), badgeVariants, Gallery(), GalleryProps, variantStyles, Testimonials(), TestimonialsProps, cn()

### Community 10 - "Community 10"

Cohesion: 0.07
Nodes (9): AuthModule, BuilderModule, 21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library, GetTenantContext, CreateCategoryDto, CreateProductDto, ExperienceModule, PrismaModule (+1 more)

### Community 11 - "Community 11"

Cohesion: 0.08
Nodes (8): Sidebar(), SidebarContext, SidebarContextProps, SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 12 - "Community 12"

Cohesion: 0.08
Nodes (12): 16cea38 feat(api): Implemented Meilisearch Engine and Sync Workers, 67df34f feat(api): Setup BullMQ background queues with strict tenant isolation, cf57e79 fix(schema): fixed cross-tenant promotion code uniqueness leak, QueueModule, QueueService, TenantJobPayload, SearchController, SearchModule (+4 more)

### Community 13 - "Community 13"

Cohesion: 0.10
Nodes (6): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 14 - "Community 14"

Cohesion: 0.11
Nodes (3): cn(), Badge(), badgeVariants

### Community 15 - "Community 15"

Cohesion: 0.08
Nodes (11): files, fs, files, fs, files, fs, files, fs (+3 more)

### Community 16 - "Community 16"

Cohesion: 0.20
Nodes (23): audit_log, cart_items, carts, categories, countries, currencies, customers, feature_flags (+15 more)

### Community 17 - "Community 17"

Cohesion: 0.13
Nodes (12): footerColumns, geistMono, geistSans, metadata, e5d6c72 feat: implement end-to-end checkout flow including UI components, API repositories, and storefront application modules, CartBadge(), FloatingHeader(), SearchAutocomplete() (+4 more)

### Community 18 - "Community 18"

Cohesion: 0.08
Nodes (5): 4ddc1b9 fix(build): resolve type and import errors across admin and storefront, PLANS, Props, DataTableProps, TanStackColumn

### Community 19 - "Community 19"

Cohesion: 0.18
Nodes (20): feat/admin-ui-refactor, main, 24a34d0 docs: initialize enterprise plan, system design documentation, and API schema definitions, 39bac8e docs: initialize architecture, data contracts, and project documentation for core platform modules, 49b2dd1 chore: add graphify folder, 4a91873 chore: add .graphify directory to git, 57631e5 docs: add UI specifications, agent skills, and architectural documentation for the CommerceOS platform, 7bea885 feat: implement full-stack authentication flow and admin entity management hooks (+12 more)

### Community 20 - "Community 20"

Cohesion: 0.09
Nodes (1): CatalogService

### Community 21 - "Community 21"

Cohesion: 0.10
Nodes (7): 028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture, tokens, AppController, AppService, eslintConfig, nextConfig, config

### Community 22 - "Community 22"

Cohesion: 0.16
Nodes (4): AuthGuard(), SearchForm(), Input(), Label()

### Community 23 - "Community 23"

Cohesion: 0.12
Nodes (5): Dialog(), DialogContent(), DialogDescription(), DialogHeader(), DialogTitle()

### Community 24 - "Community 24"

Cohesion: 0.10
Nodes (20): Timeline, TimelineContent, TimelineContentProps, timelineContentVariants, TimelineDot, TimelineDotProps, timelineDotVariants, TimelineHeading (+12 more)

### Community 25 - "Community 25"

Cohesion: 0.10
Nodes (20): Timeline, TimelineContent, TimelineContentProps, timelineContentVariants, TimelineDot, TimelineDotProps, timelineDotVariants, TimelineHeading (+12 more)

### Community 26 - "Community 26"

Cohesion: 0.19
Nodes (10): DataBindingPanel(), PropertyPanel(), PropertyPanelProps, ResponsiveEditor(), 0361288 feat(admin): Scaffolded Phase 2 Drag and Drop Page Builder UI, 05b237f feat(admin): Implemented Page Builder Property and Data Binding Panels, BuilderNode(), BuilderNodeProps (+2 more)

### Community 27 - "Community 27"

Cohesion: 0.17
Nodes (19): check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig(), check_type_assertions(), check_type_errors(), check_versions() (+11 more)

### Community 28 - "Community 28"

Cohesion: 0.11
Nodes (6): 4ece707 feat(admin): port UI components and refactor layout & dashboard, navItems, containerVariants, itemVariants, mockChartData, PaymentsModule

### Community 29 - "Community 29"

Cohesion: 0.11
Nodes (1): CatalogController

### Community 30 - "Community 30"

Cohesion: 0.16
Nodes (6): JsonLd(), SectionRenderer(), ApiError, serverApi, serverRequest(), ProductPageClient()

### Community 31 - "Community 31"

Cohesion: 0.12
Nodes (16): Category, CategorySchema, ComponentMetadata, PlanTier, Product, ProductSchema, ProductVariant, ProductVariantSchema (+8 more)

### Community 33 - "Community 33"

Cohesion: 0.16
Nodes (1): AuthService

### Community 34 - "Community 34"

Cohesion: 0.17
Nodes (8): Cart, CartDrawer(), CartItem, formatPrice(), Sheet(), SheetContent(), SheetHeader(), SheetTitle()

### Community 37 - "Community 37"

Cohesion: 0.13
Nodes (1): AuthController

### Community 38 - "Community 38"

Cohesion: 0.17
Nodes (11): FieldType, FormField, FormRenderer(), FormRendererProps, Input(), InputProps, Select(), SelectOption (+3 more)

### Community 39 - "Community 39"

Cohesion: 0.20
Nodes (6): b121f53 some-things, f1d1a16 feat: implement storefront foundation with API integration, authentication, cart, checkout, and UI components, api, Order, OrderItem, config

### Community 40 - "Community 40"

Cohesion: 0.19
Nodes (12): CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions, CarouselPlugin (+4 more)

### Community 41 - "Community 41"

Cohesion: 0.21
Nodes (1): UsersService

### Community 42 - "Community 42"

Cohesion: 0.19
Nodes (5): Cart, CartItem, stripePromise, CartStore, useCartStore

### Community 43 - "Community 43"

Cohesion: 0.15
Nodes (3): CatalogModule, bdd391f feat(admin): fix ts errors in ProductBundleEditor, ProductBundleEditorProps

### Community 44 - "Community 44"

Cohesion: 0.18
Nodes (9): ChartConfig, ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 45 - "Community 45"

Cohesion: 0.21
Nodes (5): ApiError, authRequest(), authRequestWithToken(), request(), ProductsClient()

### Community 46 - "Community 46"

Cohesion: 0.23
Nodes (8): aggregate(), count(), findMany(), findUnique(), groupBy(), scope(), softDelete(), update()

### Community 47 - "Community 47"

Cohesion: 0.15
Nodes (3): ColorMode, SectionKey, SettingRowProps

### Community 49 - "Community 49"

Cohesion: 0.18
Nodes (9): ChartConfig, ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 50 - "Community 50"

Cohesion: 0.23
Nodes (8): detectConflicts(), MergeResult, resolveOverride(), TenantTokenOverride, ThemeBaseId, ThemeRegistry, boldTheme, minimalTheme

### Community 51 - "Community 51"

Cohesion: 0.29
Nodes (4): 20e2f86 fix(storefront): resolve import casing in customer portals, Button(), ButtonProps, buttonVariants

### Community 52 - "Community 52"

Cohesion: 0.18
Nodes (6): f1bfa47 feat: implement storefront order retrieval, status management, and admin order dashboard functionality, OrderItemDto, OrderResponseDto, VALID_TRANSITIONS, StorefrontModule, StorefrontOrderController

### Community 53 - "Community 53"

Cohesion: 0.24
Nodes (6): AddSectionPanel(), AddSectionPanelProps, PropEditor(), PropEditorProps, SectionCard(), SectionCardProps

### Community 55 - "Community 55"

Cohesion: 0.31
Nodes (5): Card(), CardContent(), CardDescription(), CardHeader(), CardTitle()

### Community 56 - "Community 56"

Cohesion: 0.29
Nodes (6): formatPrice(), ProductCard(), ProductCardProps, columnMap, demoProducts, ProductGridProps

### Community 57 - "Community 57"

Cohesion: 0.24
Nodes (1): CartService

### Community 58 - "Community 58"

Cohesion: 0.24
Nodes (8): AddToCartButton(), localRegistry, Node, resolveBind(), resolveProps(), SectionRendererProps, VisibilityRule, ProductClient()

### Community 59 - "Community 59"

Cohesion: 0.22
Nodes (9): borderMap, iconMap, Toast(), ToastContainer(), ToastContainerProps, ToastData, Toaster(), ToastProps (+1 more)

### Community 60 - "Community 60"

Cohesion: 0.22
Nodes (1): TenantAdminController

### Community 64 - "Community 64"

Cohesion: 0.25
Nodes (1): PromotionsService

### Community 65 - "Community 65"

Cohesion: 0.22
Nodes (3): OnModuleDestroy, OnModuleInit, RedisService

### Community 66 - "Community 66"

Cohesion: 0.28
Nodes (4): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants

### Community 67 - "Community 67"

Cohesion: 0.22
Nodes (1): PaginationLinkProps

### Community 69 - "Community 69"

Cohesion: 0.25
Nodes (1): AdminController

### Community 70 - "Community 70"

Cohesion: 0.25
Nodes (1): AdminService

### Community 71 - "Community 71"

Cohesion: 0.25
Nodes (1): CartController

### Community 74 - "Community 74"

Cohesion: 0.25
Nodes (7): destDir, exportedContent, files, fs, indexFile, path, srcDir

### Community 75 - "Community 75"

Cohesion: 0.32
Nodes (1): CustomerService

### Community 76 - "Community 76"

Cohesion: 0.32
Nodes (1): OrderService

### Community 77 - "Community 77"

Cohesion: 0.25
Nodes (1): PromotionsController

### Community 78 - "Community 78"

Cohesion: 0.36
Nodes (7): check_api_code(), check_openapi_spec(), find_api_files(), main(), Find API-related files., Check OpenAPI/Swagger specification., Check API code for common issues.

### Community 79 - "Community 79"

Cohesion: 0.25
Nodes (1): ShippingService

### Community 80 - "Community 80"

Cohesion: 0.25
Nodes (1): TaxService

### Community 82 - "Community 82"

Cohesion: 0.33
Nodes (1): BuilderService

### Community 85 - "Community 85"

Cohesion: 0.29
Nodes (4): AuthContext, AuthContextType, AuthUser, MfaState

### Community 86 - "Community 86"

Cohesion: 0.29
Nodes (1): CustomerController

### Community 88 - "Community 88"

Cohesion: 0.57
Nodes (5): assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()

### Community 89 - "Community 89"

Cohesion: 0.43
Nodes (2): OnModuleInit, SearchService

### Community 90 - "Community 90"

Cohesion: 0.29
Nodes (1): ShippingController

### Community 91 - "Community 91"

Cohesion: 0.29
Nodes (1): TaxController

### Community 94 - "Community 94"

Cohesion: 0.29
Nodes (2): TenantScopedRepository, UsersRepository

### Community 95 - "Community 95"

Cohesion: 0.33
Nodes (1): BuilderController

### Community 96 - "Community 96"

Cohesion: 0.53
Nodes (1): TenantCacheService

### Community 97 - "Community 97"

Cohesion: 0.40
Nodes (2): Alert(), alertVariants

### Community 98 - "Community 98"

Cohesion: 0.47
Nodes (4): Breadcrumbs(), BreadcrumbsProps, Crumb, defaultItems

### Community 100 - "Community 100"

Cohesion: 0.47
Nodes (4): Sidebar(), SidebarItem, SidebarProps, items

### Community 101 - "Community 101"

Cohesion: 0.47
Nodes (4): tabs, Tab, Tabs(), TabsProps

### Community 105 - "Community 105"

Cohesion: 0.33
Nodes (2): OrderRepository, TenantScopedRepository

### Community 106 - "Community 106"

Cohesion: 0.33
Nodes (4): CONFIRMATION_LABELS, DESTRUCTIVE_ACTIONS, OrderTimelineProps, statusOrder

### Community 107 - "Community 107"

Cohesion: 0.47
Nodes (1): PaymentsService

### Community 108 - "Community 108"

Cohesion: 0.47
Nodes (5): find_schema_files(), main(), Find database schema files., Validate Prisma schema file., validate_prisma_schema()

### Community 109 - "Community 109"

Cohesion: 0.33
Nodes (1): queryClient

### Community 110 - "Community 110"

Cohesion: 0.33
Nodes (1): StorefrontCartController

### Community 111 - "Community 111"

Cohesion: 0.33
Nodes (1): StorefrontController

### Community 112 - "Community 112"

Cohesion: 0.40
Nodes (2): Alert(), alertVariants

### Community 114 - "Community 114"

Cohesion: 0.40
Nodes (2): TabsList(), tabsListVariants

### Community 115 - "Community 115"

Cohesion: 0.33
Nodes (1): UsersController

### Community 116 - "Community 116"

Cohesion: 0.60
Nodes (3): getPageNumbers(), Pagination(), PaginationProps

### Community 117 - "Community 117"

Cohesion: 0.40
Nodes (4): PropSchema, PropType, SectionSchema, sectionSchemas

### Community 118 - "Community 118"

Cohesion: 0.40
Nodes (1): VariantEditorProps

### Community 119 - "Community 119"

Cohesion: 0.50
Nodes (2): CanActivate, TenantAuthGuard

### Community 125 - "Community 125"

Cohesion: 0.40
Nodes (2): HostResolverMiddleware, NestMiddleware

### Community 126 - "Community 126"

Cohesion: 0.40
Nodes (1): OrderController

### Community 127 - "Community 127"

Cohesion: 0.50
Nodes (4): get_summary(), Run Lighthouse audit on URL., Generate summary based on scores., run_lighthouse()

### Community 129 - "Community 129"

Cohesion: 0.50
Nodes (1): AuditLogController

### Community 130 - "Community 130"

Cohesion: 0.50
Nodes (2): AuditLogRepository, TenantScopedRepository

### Community 131 - "Community 131"

Cohesion: 0.50
Nodes (1): AuditLogService

### Community 132 - "Community 132"

Cohesion: 0.50
Nodes (1): B2bController

### Community 133 - "Community 133"

Cohesion: 0.50
Nodes (1): B2bService

### Community 134 - "Community 134"

Cohesion: 0.50
Nodes (1): CheckoutController

### Community 135 - "Community 135"

Cohesion: 0.50
Nodes (2): CustomerRepository, TenantScopedRepository

### Community 136 - "Community 136"

Cohesion: 0.50
Nodes (1): DashboardController

### Community 137 - "Community 137"

Cohesion: 0.50
Nodes (2): CanActivate, PermissionGuard

### Community 139 - "Community 139"

Cohesion: 0.50
Nodes (1): InventoryController

### Community 140 - "Community 140"

Cohesion: 0.50
Nodes (1): InventoryService

### Community 141 - "Community 141"

Cohesion: 0.50
Nodes (2): NestMiddleware, TenantContextMiddleware

### Community 142 - "Community 142"

Cohesion: 0.50
Nodes (2): OrderItemRepository, TenantScopedRepository

### Community 143 - "Community 143"

Cohesion: 0.50
Nodes (1): PaymentsController

### Community 144 - "Community 144"

Cohesion: 0.50
Nodes (1): PaymentsWebhookController

### Community 145 - "Community 145"

Cohesion: 0.50
Nodes (3): OnModuleInit, PrismaClient, PrismaService

### Community 146 - "Community 146"

Cohesion: 0.50
Nodes (2): PromotionRepository, TenantScopedRepository

### Community 147 - "Community 147"

Cohesion: 0.50
Nodes (2): BundleRepository, TenantScopedRepository

### Community 148 - "Community 148"

Cohesion: 0.50
Nodes (2): CartItemRepository, TenantScopedRepository

### Community 149 - "Community 149"

Cohesion: 0.50
Nodes (2): CartRepository, TenantScopedRepository

### Community 150 - "Community 150"

Cohesion: 0.50
Nodes (2): CategoryRepository, TenantScopedRepository

### Community 151 - "Community 151"

Cohesion: 0.50
Nodes (2): CompanyProfileRepository, TenantScopedRepository

### Community 152 - "Community 152"

Cohesion: 0.50
Nodes (2): InventoryLevelRepository, TenantScopedRepository

### Community 153 - "Community 153"

Cohesion: 0.50
Nodes (2): InventoryLocationRepository, TenantScopedRepository

### Community 154 - "Community 154"

Cohesion: 0.50
Nodes (2): PageLayoutRepository, TenantScopedRepository

### Community 155 - "Community 155"

Cohesion: 0.50
Nodes (2): PriceListRepository, TenantScopedRepository

### Community 156 - "Community 156"

Cohesion: 0.50
Nodes (2): ProductRepository, TenantScopedRepository

### Community 157 - "Community 157"

Cohesion: 0.50
Nodes (2): ProductVariantRepository, TenantScopedRepository

### Community 158 - "Community 158"

Cohesion: 0.50
Nodes (2): ReturnsRepository, TenantScopedRepository

### Community 159 - "Community 159"

Cohesion: 0.50
Nodes (2): StockReservationRepository, TenantScopedRepository

### Community 160 - "Community 160"

Cohesion: 0.50
Nodes (2): SubscriptionsRepository, TenantScopedRepository

### Community 161 - "Community 161"

Cohesion: 0.50
Nodes (2): TenantScopedRepository, TestRepo

### Community 162 - "Community 162"

Cohesion: 0.50
Nodes (2): TenantScopedRepository, ThemeTenantOverrideRepository

### Community 163 - "Community 163"

Cohesion: 0.50
Nodes (2): ShippingRuleRepository, TenantScopedRepository

### Community 165 - "Community 165"

Cohesion: 0.50
Nodes (2): TaxRuleRepository, TenantScopedRepository

### Community 166 - "Community 166"

Cohesion: 0.50
Nodes (1): TenantService

### Community 167 - "Community 167"

Cohesion: 0.50
Nodes (1): ThemeController

### Community 168 - "Community 168"

Cohesion: 0.50
Nodes (1): ThemeService

### Community 170 - "Community 170"

Cohesion: 0.50
Nodes (2): RoleRepository, TenantScopedRepository

### Community 171 - "Community 171"

Cohesion: 0.67
Nodes (1): CheckoutService

### Community 172 - "Community 172"

Cohesion: 0.67
Nodes (1): DashboardService

### Community 173 - "Community 173"

Cohesion: 0.67
Nodes (2): BaseExceptionFilter, PrismaClientExceptionFilter

### Community 174 - "Community 174"

Cohesion: 0.67
Nodes (1): HealthController

### Community 176 - "Community 176"

Cohesion: 0.67
Nodes (1): statusConfig

### Community 177 - "Community 177"

Cohesion: 0.67
Nodes (2): NestModule, PlatformModule

### Community 178 - "Community 178"

Cohesion: 0.67
Nodes (1): knownPages

### Community 179 - "Community 179"

Cohesion: 0.67
Nodes (1): statusVariant

### Community 180 - "Community 180"

Cohesion: 0.67
Nodes (1): statusVariant

## Knowledge Gaps

- **338 isolated node(s):** `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.`, `Find database schema files.`, `Validate Prisma schema file.` (+333 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 20`** (1 nodes): `CatalogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `CatalogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `AuthService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `AuthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `UsersService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `CartService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `TenantAdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `PromotionsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `PaginationLinkProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `AdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `AdminService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `CartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `CustomerService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `OrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `PromotionsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `ShippingService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `TaxService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `BuilderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `CustomerController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (2 nodes): `OnModuleInit`, `SearchService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `ShippingController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `TaxController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (2 nodes): `TenantScopedRepository`, `UsersRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (1 nodes): `BuilderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `TenantCacheService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (2 nodes): `Alert()`, `alertVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 105`** (2 nodes): `OrderRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (1 nodes): `PaymentsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (1 nodes): `queryClient`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `StorefrontCartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 111`** (1 nodes): `StorefrontController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (2 nodes): `Alert()`, `alertVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (2 nodes): `TabsList()`, `tabsListVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (1 nodes): `UsersController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `VariantEditorProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (2 nodes): `CanActivate`, `TenantAuthGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (2 nodes): `HostResolverMiddleware`, `NestMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `OrderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (1 nodes): `AuditLogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (2 nodes): `AuditLogRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 131`** (1 nodes): `AuditLogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (1 nodes): `B2bController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 133`** (1 nodes): `B2bService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (1 nodes): `CheckoutController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (2 nodes): `CustomerRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 136`** (1 nodes): `DashboardController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (2 nodes): `CanActivate`, `PermissionGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `InventoryController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (1 nodes): `InventoryService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (2 nodes): `NestMiddleware`, `TenantContextMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (2 nodes): `OrderItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 143`** (1 nodes): `PaymentsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 144`** (1 nodes): `PaymentsWebhookController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (2 nodes): `PromotionRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 147`** (2 nodes): `BundleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 148`** (2 nodes): `CartItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 149`** (2 nodes): `CartRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 150`** (2 nodes): `CategoryRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 151`** (2 nodes): `CompanyProfileRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 152`** (2 nodes): `InventoryLevelRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 153`** (2 nodes): `InventoryLocationRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 154`** (2 nodes): `PageLayoutRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 155`** (2 nodes): `PriceListRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 156`** (2 nodes): `ProductRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 157`** (2 nodes): `ProductVariantRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 158`** (2 nodes): `ReturnsRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 159`** (2 nodes): `StockReservationRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 160`** (2 nodes): `SubscriptionsRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 161`** (2 nodes): `TenantScopedRepository`, `TestRepo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 162`** (2 nodes): `TenantScopedRepository`, `ThemeTenantOverrideRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 163`** (2 nodes): `ShippingRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 165`** (2 nodes): `TaxRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 166`** (1 nodes): `TenantService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 167`** (1 nodes): `ThemeController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 168`** (1 nodes): `ThemeService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 170`** (2 nodes): `RoleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 171`** (1 nodes): `CheckoutService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 172`** (1 nodes): `DashboardService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 173`** (2 nodes): `BaseExceptionFilter`, `PrismaClientExceptionFilter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 174`** (1 nodes): `HealthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 176`** (1 nodes): `statusConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 177`** (2 nodes): `NestModule`, `PlatformModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 178`** (1 nodes): `knownPages`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 179`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 180`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `TenantContext` connect `Community 4` to `Community 129`, `Community 6`, `Community 3`, `Community 10`, `Community 43`, `Community 134`, `Community 136`, `Community 52`, `Community 143`, `Community 46`, `Community 161`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `CatalogService` connect `Community 20` to `Community 4`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `CatalogController` connect `Community 29` to `Community 43`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.` to the rest of the system?**
  _338 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05126050420168067 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._
