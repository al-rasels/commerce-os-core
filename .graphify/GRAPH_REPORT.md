# Graph Report - .  (2026-07-29)

## Corpus Check
- Large corpus: 832 files · ~364,848 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 2038 nodes · 3419 edges · 163 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 1138 · MODIFIES: 842 · imports_from: 381 · method: 364 · imports: 319 · calls: 97 · ON_BRANCH: 77 · re_exports: 64 · PARENT_OF: 46 · inherits: 33 · references: 32 · rationale_for: 16 · implements: 10


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 832 · Candidates: 1474
- Excluded: 1 untracked · 139883 ignored · 9 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `f33b196`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `TenantContext` - 66 edges
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
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --ON_BRANCH--> `feat/admin-ui-refactor`  [EXTRACTED]
  git → git  _Bridges community 38 → community 9_
- `028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture` --PARENT_OF--> `21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library`  [EXTRACTED]
  git → git  _Bridges community 38 → community 10_
- `0361288 feat(admin): Scaffolded Phase 2 Drag and Drop Page Builder UI` --ON_BRANCH--> `feat/admin-ui-refactor`  [EXTRACTED]
  git → git  _Bridges community 0 → community 9_
- `20e2f86 fix(storefront): resolve import casing in customer portals` --ON_BRANCH--> `feat/admin-ui-refactor`  [EXTRACTED]
  git → git  _Bridges community 7 → community 9_
- `20e2f86 fix(storefront): resolve import casing in customer portals` --PARENT_OF--> `c506b3c feat(api): implement database repositories for enterprise modules (Wave 4)`  [EXTRACTED]
  git → git  _Bridges community 7 → community 4_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (23): DataBindingPanel(), PropertyPanel(), PropertyPanelProps, ResponsiveEditor(), 0361288 feat(admin): Scaffolded Phase 2 Drag and Drop Page Builder UI, 05b237f feat(admin): Implemented Page Builder Property and Data Binding Panels, 16cea38 feat(api): Implemented Meilisearch Engine and Sync Workers, 67df34f feat(api): Setup BullMQ background queues with strict tenant isolation (+15 more)

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
Nodes (10): 6eb89d7 chore(tech-debt): resolve technical debt, fix typings, enforce strict tenant isolation, c506b3c feat(api): implement database repositories for enterprise modules (Wave 4), e3a8c77 feat: implement users CRUD backend module and admin UI, CurrentUser, GetTenantContext, UpdateUserDto, UpdateUserStatusDto, StorefrontCheckoutController (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (45): Arguments, AssertEqual, AsyncFunction, AtLeast, Brand, DeepMutable, DeepPartial, DeepReadonly (+37 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (18): 4ddc1b9 fix(build): resolve type and import errors across admin and storefront, JsonLd(), localRegistry, Node, resolveBind(), resolveProps(), SectionRenderer(), SectionRendererProps (+10 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (13): stripePromise, 20e2f86 fix(storefront): resolve import casing in customer portals, b121f53 some-things, f1d1a16 feat: implement storefront foundation with API integration, authentication, cart, checkout, and UI components, api, Order, OrderItem, SearchForm() (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (17): AuditLogModule, CartModule, 3d66d0f feat: implement payments module, checkout flow, auth, tenant resolution, and admin/storefront scaffolding, CustomerModule, AddItemDto, CheckoutDto, CreateCartDto, CreateCustomerDto (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (27): feat/admin-ui-refactor, main, CheckoutModule, 04d75c7 docs: update progress report and tasklist with identified code gaps, 24a34d0 docs: initialize enterprise plan, system design documentation, and API schema definitions, 39bac8e docs: initialize architecture, data contracts, and project documentation for core platform modules, 4029d6f fix(commerce): resolve architecture and tenant isolation violations, 49b2dd1 chore: add graphify folder (+19 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (10): AuthModule, BuilderModule, CatalogModule, 21888ff feat: implement commerce, catalog, and experience modules while expanding agent skills and documentation library, bdd391f feat(admin): fix ts errors in ProductBundleEditor, CreateCategoryDto, CreateProductDto, ExperienceModule (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (5): Button(), ButtonProps, buttonVariants, sizeStyles, variantStyles

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (8): Badge(), badgeVariants, Gallery(), GalleryProps, variantStyles, Testimonials(), TestimonialsProps, cn()

### Community 13 - "Community 13"
Cohesion: 0.09
Nodes (7): { authenticator }, B2bModule, 4ece707 feat(admin): port UI components and refactor layout & dashboard, 7d74efe feat(commerce): implement B2B, Subscriptions, Returns UI and Backend Scaffold, bb61ae8 feat(commerce): wire up Admin UI to new Enterprise APIs (Wave 2), ReturnsModule, SubscriptionsModule

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (13): footerColumns, geistMono, geistSans, metadata, e5d6c72 feat: implement end-to-end checkout flow including UI components, API repositories, and storefront application modules, CartBadge(), FloatingHeader(), SearchAutocomplete() (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (8): Sidebar(), SidebarContext, SidebarContextProps, SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (6): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (3): cn(), Badge(), badgeVariants

### Community 18 - "Community 18"
Cohesion: 0.08
Nodes (11): files, fs, files, fs, files, fs, files, fs (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.20
Nodes (23): audit_log, cart_items, carts, categories, countries, currencies, customers, feature_flags (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (1): CatalogService

### Community 21 - "Community 21"
Cohesion: 0.12
Nodes (5): Dialog(), DialogContent(), DialogDescription(), DialogHeader(), DialogTitle()

### Community 22 - "Community 22"
Cohesion: 0.10
Nodes (20): Timeline, TimelineContent, TimelineContentProps, timelineContentVariants, TimelineDot, TimelineDotProps, timelineDotVariants, TimelineHeading (+12 more)

### Community 23 - "Community 23"
Cohesion: 0.10
Nodes (20): Timeline, TimelineContent, TimelineContentProps, timelineContentVariants, TimelineDot, TimelineDotProps, timelineDotVariants, TimelineHeading (+12 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (19): check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig(), check_type_assertions(), check_type_errors(), check_versions() (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.19
Nodes (15): catalogApi, Category, CategoryInput, Product, ProductInput, ProductVariant, ProductVariantInput, inventoryApi (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.11
Nodes (1): CatalogController

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (16): Category, CategorySchema, ComponentMetadata, PlanTier, Product, ProductSchema, ProductVariant, ProductVariantSchema (+8 more)

### Community 29 - "Community 29"
Cohesion: 0.16
Nodes (1): AuthService

### Community 30 - "Community 30"
Cohesion: 0.17
Nodes (8): Cart, CartDrawer(), CartItem, formatPrice(), Sheet(), SheetContent(), SheetHeader(), SheetTitle()

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (1): AuthController

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (11): FieldType, FormField, FormRenderer(), FormRendererProps, Input(), InputProps, Select(), SelectOption (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (11): dashboardApi, DashboardStats, canTransition(), ListOrdersParams, Order, ORDER_VALID_TRANSITIONS, orderApi, OrderItem (+3 more)

### Community 36 - "Community 36"
Cohesion: 0.19
Nodes (12): CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions, CarouselPlugin (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.21
Nodes (1): UsersService

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (5): 028709f chore: scaffold monorepo with apps, shared packages, and agent-driven documentation architecture, tokens, eslintConfig, nextConfig, config

### Community 39 - "Community 39"
Cohesion: 0.18
Nodes (9): ChartConfig, ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.23
Nodes (8): aggregate(), count(), findMany(), findUnique(), groupBy(), scope(), softDelete(), update()

### Community 41 - "Community 41"
Cohesion: 0.15
Nodes (3): ColorMode, SectionKey, SettingRowProps

### Community 43 - "Community 43"
Cohesion: 0.18
Nodes (9): ChartConfig, ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 44 - "Community 44"
Cohesion: 0.23
Nodes (8): detectConflicts(), MergeResult, resolveOverride(), TenantTokenOverride, ThemeBaseId, ThemeRegistry, boldTheme, minimalTheme

### Community 45 - "Community 45"
Cohesion: 0.24
Nodes (5): Cart, CartItem, AddToCartButton(), CartStore, useCartStore

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (6): f1bfa47 feat: implement storefront order retrieval, status management, and admin order dashboard functionality, OrderItemDto, OrderResponseDto, VALID_TRANSITIONS, StorefrontModule, StorefrontOrderController

### Community 47 - "Community 47"
Cohesion: 0.24
Nodes (6): AddSectionPanel(), AddSectionPanelProps, PropEditor(), PropEditorProps, SectionCard(), SectionCardProps

### Community 49 - "Community 49"
Cohesion: 0.31
Nodes (5): Card(), CardContent(), CardDescription(), CardHeader(), CardTitle()

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (7): api, ResolvedTheme, themeApi, Promotion, promotionsApi, taxApi, TaxRule

### Community 51 - "Community 51"
Cohesion: 0.27
Nodes (7): ApiError, failedQueue, getToken(), processQueue(), request(), shippingApi, ShippingRule

### Community 52 - "Community 52"
Cohesion: 0.29
Nodes (6): formatPrice(), ProductCard(), ProductCardProps, columnMap, demoProducts, ProductGridProps

### Community 53 - "Community 53"
Cohesion: 0.24
Nodes (1): CartService

### Community 54 - "Community 54"
Cohesion: 0.22
Nodes (9): borderMap, iconMap, Toast(), ToastContainer(), ToastContainerProps, ToastData, Toaster(), ToastProps (+1 more)

### Community 55 - "Community 55"
Cohesion: 0.22
Nodes (1): TenantAdminController

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (8): InviteUserInput, ListUsersParams, UpdateUserInput, UpdateUserStatusInput, User, userApi, UserDetail, UserListResponse

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (1): InventoryService

### Community 61 - "Community 61"
Cohesion: 0.31
Nodes (4): ApiError, authRequest(), authRequestWithToken(), request()

### Community 62 - "Community 62"
Cohesion: 0.31
Nodes (1): OrderService

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (1): PromotionsService

### Community 64 - "Community 64"
Cohesion: 0.22
Nodes (3): OnModuleDestroy, OnModuleInit, RedisService

### Community 65 - "Community 65"
Cohesion: 0.28
Nodes (4): InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants

### Community 66 - "Community 66"
Cohesion: 0.22
Nodes (1): PaginationLinkProps

### Community 68 - "Community 68"
Cohesion: 0.25
Nodes (1): AdminController

### Community 69 - "Community 69"
Cohesion: 0.25
Nodes (1): AdminService

### Community 70 - "Community 70"
Cohesion: 0.25
Nodes (1): CartController

### Community 73 - "Community 73"
Cohesion: 0.25
Nodes (7): destDir, exportedContent, files, fs, indexFile, path, srcDir

### Community 74 - "Community 74"
Cohesion: 0.32
Nodes (1): CustomerService

### Community 75 - "Community 75"
Cohesion: 0.25
Nodes (1): navItems

### Community 76 - "Community 76"
Cohesion: 0.25
Nodes (1): PromotionsController

### Community 77 - "Community 77"
Cohesion: 0.36
Nodes (7): check_api_code(), check_openapi_spec(), find_api_files(), main(), Find API-related files., Check OpenAPI/Swagger specification., Check API code for common issues.

### Community 78 - "Community 78"
Cohesion: 0.25
Nodes (1): ShippingService

### Community 79 - "Community 79"
Cohesion: 0.25
Nodes (1): TaxService

### Community 81 - "Community 81"
Cohesion: 0.33
Nodes (6): Customer, customerApi, CustomerDetail, CustomerInput, CustomerListResponse, ListCustomersParams

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
Cohesion: 0.38
Nodes (1): PaymentsService

### Community 90 - "Community 90"
Cohesion: 0.29
Nodes (1): ReturnsController

### Community 91 - "Community 91"
Cohesion: 0.29
Nodes (1): ReturnsService

### Community 92 - "Community 92"
Cohesion: 0.29
Nodes (1): ShippingController

### Community 93 - "Community 93"
Cohesion: 0.29
Nodes (1): TaxController

### Community 96 - "Community 96"
Cohesion: 0.29
Nodes (2): TenantScopedRepository, UsersRepository

### Community 97 - "Community 97"
Cohesion: 0.33
Nodes (5): ProvisionTenantInput, superAdminApi, Tenant, TenantDetail, TenantListResponse

### Community 98 - "Community 98"
Cohesion: 0.33
Nodes (1): BuilderController

### Community 99 - "Community 99"
Cohesion: 0.53
Nodes (1): TenantCacheService

### Community 100 - "Community 100"
Cohesion: 0.40
Nodes (2): Alert(), alertVariants

### Community 101 - "Community 101"
Cohesion: 0.47
Nodes (4): Breadcrumbs(), BreadcrumbsProps, Crumb, defaultItems

### Community 103 - "Community 103"
Cohesion: 0.47
Nodes (4): Sidebar(), SidebarItem, SidebarProps, items

### Community 104 - "Community 104"
Cohesion: 0.47
Nodes (4): tabs, Tab, Tabs(), TabsProps

### Community 108 - "Community 108"
Cohesion: 0.33
Nodes (2): OrderRepository, TenantScopedRepository

### Community 109 - "Community 109"
Cohesion: 0.33
Nodes (4): CONFIRMATION_LABELS, DESTRUCTIVE_ACTIONS, OrderTimelineProps, statusOrder

### Community 110 - "Community 110"
Cohesion: 0.33
Nodes (3): containerVariants, itemVariants, mockChartData

### Community 111 - "Community 111"
Cohesion: 0.47
Nodes (5): find_schema_files(), main(), Find database schema files., Validate Prisma schema file., validate_prisma_schema()

### Community 112 - "Community 112"
Cohesion: 0.33
Nodes (1): queryClient

### Community 113 - "Community 113"
Cohesion: 0.33
Nodes (1): StorefrontCartController

### Community 114 - "Community 114"
Cohesion: 0.33
Nodes (1): StorefrontController

### Community 115 - "Community 115"
Cohesion: 0.40
Nodes (2): Alert(), alertVariants

### Community 117 - "Community 117"
Cohesion: 0.40
Nodes (2): TabsList(), tabsListVariants

### Community 118 - "Community 118"
Cohesion: 0.33
Nodes (1): UsersController

### Community 119 - "Community 119"
Cohesion: 0.50
Nodes (1): AuthGuard()

### Community 120 - "Community 120"
Cohesion: 0.60
Nodes (3): getPageNumbers(), Pagination(), PaginationProps

### Community 121 - "Community 121"
Cohesion: 0.40
Nodes (1): ProductBundleEditorProps

### Community 122 - "Community 122"
Cohesion: 0.40
Nodes (4): PropSchema, PropType, SectionSchema, sectionSchemas

### Community 123 - "Community 123"
Cohesion: 0.40
Nodes (1): VariantEditorProps

### Community 124 - "Community 124"
Cohesion: 0.50
Nodes (2): CanActivate, TenantAuthGuard

### Community 130 - "Community 130"
Cohesion: 0.40
Nodes (2): InventoryWorker, WorkerHost

### Community 131 - "Community 131"
Cohesion: 0.40
Nodes (2): HostResolverMiddleware, NestMiddleware

### Community 132 - "Community 132"
Cohesion: 0.40
Nodes (1): OrderController

### Community 133 - "Community 133"
Cohesion: 0.50
Nodes (4): get_summary(), Run Lighthouse audit on URL., Generate summary based on scores., run_lighthouse()

### Community 134 - "Community 134"
Cohesion: 0.40
Nodes (1): AppController

### Community 136 - "Community 136"
Cohesion: 0.50
Nodes (3): b2bApi, CompanyProfile, CompanyProfileInput

### Community 137 - "Community 137"
Cohesion: 0.50
Nodes (3): ReturnRequest, ReturnRequestInput, returnsApi

### Community 138 - "Community 138"
Cohesion: 0.50
Nodes (3): Subscription, SubscriptionInput, subscriptionsApi

### Community 139 - "Community 139"
Cohesion: 0.50
Nodes (1): AuditLogController

### Community 140 - "Community 140"
Cohesion: 0.50
Nodes (2): AuditLogRepository, TenantScopedRepository

### Community 141 - "Community 141"
Cohesion: 0.50
Nodes (1): AuditLogService

### Community 142 - "Community 142"
Cohesion: 0.50
Nodes (1): B2bController

### Community 143 - "Community 143"
Cohesion: 0.50
Nodes (1): B2bService

### Community 144 - "Community 144"
Cohesion: 0.50
Nodes (1): CheckoutController

### Community 145 - "Community 145"
Cohesion: 0.50
Nodes (2): CustomerRepository, TenantScopedRepository

### Community 146 - "Community 146"
Cohesion: 0.50
Nodes (2): CanActivate, PermissionGuard

### Community 148 - "Community 148"
Cohesion: 0.50
Nodes (1): InventoryController

### Community 149 - "Community 149"
Cohesion: 0.50
Nodes (2): InventoryModule, OnModuleInit

### Community 150 - "Community 150"
Cohesion: 0.50
Nodes (2): NestMiddleware, TenantContextMiddleware

### Community 151 - "Community 151"
Cohesion: 0.50
Nodes (2): OrderItemRepository, TenantScopedRepository

### Community 152 - "Community 152"
Cohesion: 0.50
Nodes (1): PaymentsWebhookController

### Community 153 - "Community 153"
Cohesion: 0.50
Nodes (3): OnModuleInit, PrismaClient, PrismaService

### Community 154 - "Community 154"
Cohesion: 0.50
Nodes (2): PromotionRepository, TenantScopedRepository

### Community 155 - "Community 155"
Cohesion: 0.50
Nodes (2): BundleRepository, TenantScopedRepository

### Community 156 - "Community 156"
Cohesion: 0.50
Nodes (2): CartItemRepository, TenantScopedRepository

### Community 157 - "Community 157"
Cohesion: 0.50
Nodes (2): CartRepository, TenantScopedRepository

### Community 158 - "Community 158"
Cohesion: 0.50
Nodes (2): CategoryRepository, TenantScopedRepository

### Community 159 - "Community 159"
Cohesion: 0.50
Nodes (2): CompanyProfileRepository, TenantScopedRepository

### Community 160 - "Community 160"
Cohesion: 0.50
Nodes (2): InventoryLevelRepository, TenantScopedRepository

### Community 161 - "Community 161"
Cohesion: 0.50
Nodes (2): InventoryLocationRepository, TenantScopedRepository

### Community 162 - "Community 162"
Cohesion: 0.50
Nodes (2): PageLayoutRepository, TenantScopedRepository

### Community 163 - "Community 163"
Cohesion: 0.50
Nodes (2): PriceListRepository, TenantScopedRepository

### Community 164 - "Community 164"
Cohesion: 0.50
Nodes (2): ProductRepository, TenantScopedRepository

### Community 165 - "Community 165"
Cohesion: 0.50
Nodes (2): ProductVariantRepository, TenantScopedRepository

### Community 166 - "Community 166"
Cohesion: 0.50
Nodes (2): ReturnsRepository, TenantScopedRepository

### Community 167 - "Community 167"
Cohesion: 0.50
Nodes (2): StockReservationRepository, TenantScopedRepository

### Community 168 - "Community 168"
Cohesion: 0.50
Nodes (2): SubscriptionsRepository, TenantScopedRepository

### Community 169 - "Community 169"
Cohesion: 0.50
Nodes (2): TenantScopedRepository, ThemeTenantOverrideRepository

### Community 170 - "Community 170"
Cohesion: 0.50
Nodes (2): ShippingRuleRepository, TenantScopedRepository

### Community 172 - "Community 172"
Cohesion: 0.50
Nodes (2): TaxRuleRepository, TenantScopedRepository

### Community 173 - "Community 173"
Cohesion: 0.50
Nodes (1): TenantService

### Community 174 - "Community 174"
Cohesion: 0.50
Nodes (1): ThemeController

### Community 175 - "Community 175"
Cohesion: 0.50
Nodes (1): ThemeService

### Community 177 - "Community 177"
Cohesion: 0.50
Nodes (2): RoleRepository, TenantScopedRepository

### Community 178 - "Community 178"
Cohesion: 0.67
Nodes (1): CheckoutService

### Community 179 - "Community 179"
Cohesion: 0.67
Nodes (1): DashboardController

### Community 180 - "Community 180"
Cohesion: 0.67
Nodes (1): DashboardService

### Community 181 - "Community 181"
Cohesion: 0.67
Nodes (2): BaseExceptionFilter, PrismaClientExceptionFilter

### Community 182 - "Community 182"
Cohesion: 0.67
Nodes (1): HealthController

### Community 185 - "Community 185"
Cohesion: 0.67
Nodes (1): statusConfig

### Community 186 - "Community 186"
Cohesion: 0.67
Nodes (1): PaymentsController

### Community 187 - "Community 187"
Cohesion: 0.67
Nodes (2): NestModule, PlatformModule

### Community 188 - "Community 188"
Cohesion: 0.67
Nodes (2): TenantScopedRepository, TestRepo

### Community 189 - "Community 189"
Cohesion: 0.67
Nodes (1): knownPages

### Community 190 - "Community 190"
Cohesion: 0.67
Nodes (1): AppService

### Community 191 - "Community 191"
Cohesion: 0.67
Nodes (1): config

### Community 192 - "Community 192"
Cohesion: 0.67
Nodes (1): SubscriptionsController

### Community 193 - "Community 193"
Cohesion: 0.67
Nodes (1): SubscriptionsService

### Community 194 - "Community 194"
Cohesion: 0.67
Nodes (1): statusVariant

### Community 195 - "Community 195"
Cohesion: 0.67
Nodes (1): statusVariant

## Knowledge Gaps
- **338 isolated node(s):** `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.`, `Find database schema files.`, `Validate Prisma schema file.` (+333 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 20`** (1 nodes): `CatalogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `CatalogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `AuthService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `AuthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `UsersService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `CartService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `TenantAdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `InventoryService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `OrderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `PromotionsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `PaginationLinkProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `AdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `AdminService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `CartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `CustomerService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `navItems`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `PromotionsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `ShippingService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `TaxService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `BuilderService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (1 nodes): `CustomerController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `PaymentsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `ReturnsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `ReturnsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `ShippingController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (1 nodes): `TaxController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (2 nodes): `TenantScopedRepository`, `UsersRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (1 nodes): `BuilderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (1 nodes): `TenantCacheService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (2 nodes): `Alert()`, `alertVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (2 nodes): `OrderRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (1 nodes): `queryClient`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (1 nodes): `StorefrontCartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (1 nodes): `StorefrontController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (2 nodes): `Alert()`, `alertVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (2 nodes): `TabsList()`, `tabsListVariants`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `UsersController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (1 nodes): `AuthGuard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `ProductBundleEditorProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `VariantEditorProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (2 nodes): `CanActivate`, `TenantAuthGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (2 nodes): `InventoryWorker`, `WorkerHost`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 131`** (2 nodes): `HostResolverMiddleware`, `NestMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (1 nodes): `OrderController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (1 nodes): `AppController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `AuditLogController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (2 nodes): `AuditLogRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 141`** (1 nodes): `AuditLogService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (1 nodes): `B2bController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 143`** (1 nodes): `B2bService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 144`** (1 nodes): `CheckoutController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 145`** (2 nodes): `CustomerRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (2 nodes): `CanActivate`, `PermissionGuard`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 148`** (1 nodes): `InventoryController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 149`** (2 nodes): `InventoryModule`, `OnModuleInit`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 150`** (2 nodes): `NestMiddleware`, `TenantContextMiddleware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 151`** (2 nodes): `OrderItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 152`** (1 nodes): `PaymentsWebhookController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 154`** (2 nodes): `PromotionRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 155`** (2 nodes): `BundleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 156`** (2 nodes): `CartItemRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 157`** (2 nodes): `CartRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 158`** (2 nodes): `CategoryRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 159`** (2 nodes): `CompanyProfileRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 160`** (2 nodes): `InventoryLevelRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 161`** (2 nodes): `InventoryLocationRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 162`** (2 nodes): `PageLayoutRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 163`** (2 nodes): `PriceListRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 164`** (2 nodes): `ProductRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 165`** (2 nodes): `ProductVariantRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 166`** (2 nodes): `ReturnsRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 167`** (2 nodes): `StockReservationRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 168`** (2 nodes): `SubscriptionsRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 169`** (2 nodes): `TenantScopedRepository`, `ThemeTenantOverrideRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 170`** (2 nodes): `ShippingRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 172`** (2 nodes): `TaxRuleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 173`** (1 nodes): `TenantService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 174`** (1 nodes): `ThemeController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 175`** (1 nodes): `ThemeService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 177`** (2 nodes): `RoleRepository`, `TenantScopedRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 178`** (1 nodes): `CheckoutService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 179`** (1 nodes): `DashboardController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 180`** (1 nodes): `DashboardService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 181`** (2 nodes): `BaseExceptionFilter`, `PrismaClientExceptionFilter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 182`** (1 nodes): `HealthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 185`** (1 nodes): `statusConfig`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 186`** (1 nodes): `PaymentsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 187`** (2 nodes): `NestModule`, `PlatformModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 188`** (2 nodes): `TenantScopedRepository`, `TestRepo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 189`** (1 nodes): `knownPages`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 190`** (1 nodes): `AppService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 191`** (1 nodes): `config`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 192`** (1 nodes): `SubscriptionsController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 193`** (1 nodes): `SubscriptionsService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 194`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 195`** (1 nodes): `statusVariant`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TenantContext` connect `Community 4` to `Community 139`, `Community 13`, `Community 3`, `Community 10`, `Community 9`, `Community 144`, `Community 46`, `Community 40`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `CatalogService` connect `Community 20` to `Community 10`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `CatalogController` connect `Community 26` to `Community 10`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `Find API-related files.`, `Check OpenAPI/Swagger specification.`, `Check API code for common issues.` to the rest of the system?**
  _338 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05505279034690799 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0392156862745098 - nodes in this community are weakly interconnected._