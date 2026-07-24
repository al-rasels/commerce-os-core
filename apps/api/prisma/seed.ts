import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.auditLog.deleteMany();
  await prisma.stockReservation.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.shippingRule.deleteMany();
  await prisma.taxRule.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.pageLayout.deleteMany();
  await prisma.templateTenantOverride.deleteMany();
  await prisma.templateBase.deleteMany();
  await prisma.themeTenantOverride.deleteMany();
  await prisma.themeBase.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.featureFlag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.tenantDomain.deleteMany();
  await prisma.tenant.deleteMany();

  const tenantA = await prisma.tenant.create({
    data: { name: 'Tenant A', plan_id: 'enterprise' },
  });
  const tenantB = await prisma.tenant.create({
    data: { name: 'Tenant B', plan_id: 'starter' },
  });

  await prisma.tenantDomain.create({ data: { tenant_id: tenantA.id, domain: 'tenanta.localhost' } });
  await prisma.tenantDomain.create({ data: { tenant_id: tenantB.id, domain: 'tenantb.localhost' } });

  const rolePermissions: Record<string, string[]> = {
    'Super Admin': [
      'super_admin', 'auth.invite',
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'checkout.write', 'customers.read', 'customers.write',
      'order.read', 'order.write', 'payment.write',
      'promotions.read', 'promotions.write',
      'shipping.read', 'shipping.write', 'tax.read', 'tax.write',
      'theme.write', 'builder.write', 'audit.read',
    ],
    'Store Owner': [
      'auth.invite',
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'checkout.write', 'customers.read', 'customers.write',
      'order.read', 'order.write', 'payment.write',
      'promotions.read', 'promotions.write',
      'shipping.read', 'shipping.write', 'tax.read', 'tax.write',
      'theme.write', 'builder.write', 'audit.read',
    ],
    'Store Staff': [
      'catalog.read', 'catalog.write', 'cart.read', 'cart.write',
      'customers.read', 'order.read', 'order.write',
    ],
    'Customer': [
      'catalog.read', 'cart.read', 'checkout.write', 'order.read',
    ],
  };

  const roleNames = ['Store Owner', 'Store Staff', 'Customer'];
  const rolesA: Record<string, string> = {};
  const rolesB: Record<string, string> = {};

  for (const name of roleNames) {
    const ra = await prisma.role.create({
      data: { tenant_id: tenantA.id, name, permissions: rolePermissions[name] },
    });
    rolesA[name] = ra.id;
    const rb = await prisma.role.create({
      data: { tenant_id: tenantB.id, name, permissions: rolePermissions[name] },
    });
    rolesB[name] = rb.id;
  }

  const superAdminRole = await prisma.role.create({
    data: { tenant_id: null, name: 'Super Admin', permissions: rolePermissions['Super Admin'] },
  });

  const passSA = await argon2.hash('superadmin123');
  await prisma.user.create({
    data: { tenant_id: null, email: 'admin@commerceos.io', password_hash: passSA, role_id: superAdminRole.id },
  });

  const passA = await argon2.hash('password123');
  await prisma.user.create({
    data: { tenant_id: tenantA.id, email: 'admin@tenanta.com', password_hash: passA, role_id: rolesA['Store Owner'] },
  });

  const passB = await argon2.hash('password123');
  await prisma.user.create({
    data: { tenant_id: tenantB.id, email: 'admin@tenantb.com', password_hash: passB, role_id: rolesB['Store Owner'] },
  });

  const baseTheme = await prisma.themeBase.create({
    data: {
      version: 'v1',
      tokens_json: {
        colors: {
          primary: '#2563eb',
          secondary: '#475569',
          background: '#ffffff',
          text: '#0f172a',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSizeBase: '16px',
        },
        spacing: {
          unit: '8px',
        },
      },
    },
  });

  await prisma.templateBase.create({
    data: {
      name: 'Fashion Store',
      description: 'Premium editorial-fashion template inspired by luxury retailers. Warm palette, serif headings, immersive imagery, and trend-forward merchandising with rich product storytelling.',
      version: 'v2',
      layout_json: {
        theme: {
          primary: '#b91c1c',
          primaryHover: '#991b1b',
          primaryLight: '#fef2f2',
          secondary: '#7f1d1d',
          accent: '#a21caf',
          accentHover: '#86198f',
          background: '#fef2f2',
          surface: '#ffffff',
          surfaceAlt: '#faf5f5',
          text: '#1f2937',
          textSecondary: '#6b7280',
          textMuted: '#9ca3af',
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          fontFamily: "'Playfair Display', 'Georgia', serif",
          headingFont: "'Playfair Display', serif",
          headingFontWeight: 700,
          bodyFont: "'Inter', sans-serif",
          borderRadius: '12px',
          borderRadiusLg: '20px',
          borderRadiusSm: '8px',
          shadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
          shadowMd: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
          shadowLg: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.06)',
          spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px' },
          breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.01), rgba(0,0,0,0.6))',
          colorScheme: 'warm',
          mode: 'light',
        },
        categories: [
          { name: 'Clothing', slug: 'clothing', sort_order: 1, subcategories: ['Dresses & Jumpsuits', 'Tops & Blouses', 'Pants & Skirts'] },
          { name: 'Outerwear', slug: 'outerwear', sort_order: 2, subcategories: ['Jackets & Coats', 'Blazers & Suits'] },
          { name: 'Footwear', slug: 'footwear', sort_order: 3, subcategories: ['Sneakers', 'Heels & Platforms', 'Sandals & Flats'] },
          { name: 'Accessories', slug: 'accessories', sort_order: 4, subcategories: ['Bags & Wallets', 'Jewelry', 'Belts & Scarves', 'Watches'] },
          { name: 'Sale %', slug: 'sale', sort_order: 5 },
        ],
        page_layouts: {
          homepage: [
            { component: 'custom.announcement-bar', props: { text: 'Free shipping on orders over $150 — Extended returns through January', bgColor: '#1f2937', textColor: '#ffffff' } },
            { component: 'hero.v1', props: { heading: 'Winter Edition 2026', subheading: 'Where elegance meets edge. Discover our coldest-weather collection yet.', ctaLabel: 'Explore the Collection', ctaHref: '/collections/winter-2026', backgroundImage: '/assets/hero-winter.jpg', alignment: 'left', variant: 'editorial' } },
            { component: 'custom.value-props-strip', props: { items: [{ icon: 'truck', text: 'Free Shipping over $150' }, { icon: 'refresh', text: '60-Day Easy Returns' }, { icon: 'shield', text: 'Secure Checkout' }, { icon: 'gift', text: 'Complimentary Gift Wrap' }], bgColor: '#ffffff' } },
            { component: 'custom.featured-categories', props: { title: 'Shop by Category', subtitle: 'Curated for every moment', count: 4, layout: 'card_grid', imageAspect: '3:4' } },
            { component: 'product-grid.v1', props: { limit: 6, source: 'featured' } },
            { component: 'banner.v1', props: { heading: 'Up to 40% Off', ctaLabel: 'Shop Sale', ctaHref: '/category/sale', imageUrl: '' } },
            { component: 'product-grid.v1', props: { limit: 4, source: 'featured' } },
            { component: 'testimonials.v1', props: { variant: 'carousel', testimonials: [{ name: 'Sophie L.', text: 'The quality is unmatched. Every piece feels intentional and thoughtfully designed.', rating: 5, location: 'New York, NY' }, { name: 'James K.', text: 'Finally, a brand that understands modern tailoring. Perfect fit every time.', rating: 5, location: 'London, UK' }, { name: 'Aisha R.', text: 'Their customer service is as impeccable as their clothing. Truly a luxury experience.', rating: 5, location: 'Dubai, UAE' }] } },
            { component: 'rich-text.v1', props: { content: 'Every stitch tells a story. From our atelier in Milan to your wardrobe, each piece is a collaboration between master artisans and forward-thinking design.' } },
            { component: 'gallery.v1', props: { variant: 'grid' } },
            { component: 'newsletter.v1', props: { heading: 'Become an Insider', subheading: 'Join our community. Get 10% off your first order plus early access to new drops and exclusive edits.', placeholderText: 'Enter your email' } },
          ],
          products: [
            { component: 'breadcrumbs.v1', props: { homeLabel: 'Home', separator: '/' } },
            { component: 'custom.search-bar', props: { placeholder: 'Search by product, category, or brand...', autocomplete: true } },
            { component: 'custom.active-filters', props: { showClearAll: true } },
            { component: 'custom.category-filter', props: { layout: 'grid', showCounts: true, sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling', 'Rating'] } },
            { component: 'product-grid.v1', props: { columns: 3, tabletColumns: 2, mobileColumns: 1, pagination: 24, infiniteScroll: false, lazyLoad: true, showQuickAdd: true } },
          ],
          product_detail: [
            { component: 'breadcrumbs.v1', props: { homeLabel: 'Home', separator: '/' } },
            { component: 'gallery.v1', props: { layout: 'thumbnails_stacked', zoom: true, showThumbnails: true, thumbnailPosition: 'left' } },
            { component: 'custom.product-info', props: { showReviews: true, showSku: true, showStockLevel: true, showSizeGuide: true, showWishlist: true, showShare: true } },
            { component: 'faq.v1', props: { items: [{ title: 'Details & Fit', content: 'Multi-season weight, true to size, model is 5\'10" wearing size S' }, { title: 'Materials & Care', content: '100% organic cotton shell, machine wash cold, tumble dry low' }, { title: 'Shipping & Returns', content: 'Free shipping over $150. 60-day return window. Final sale items excluded.' }] } },
            { component: 'product-grid.v1', props: { title: 'Complete the Look', strategy: 'completes_the_outfit', count: 3 } },
            { component: 'product-grid.v1', props: { title: 'You May Also Like', strategy: 'category_based', count: 4, layout: 'horizontal_scroll' } },
            { component: 'product-grid.v1', props: { title: 'Recently Viewed', count: 4, layout: 'horizontal_scroll' } },
          ],
        },
        sample_products: [
          {
            name: 'The Heritage Wool Blazer', slug: 'heritage-wool-blazer', description: 'A masterclass in modern tailoring. Cut from premium Italian wool, this single-breasted blazer features a natural shoulder, notch lapels, and pick-stitch detailing. Fully lined with interior pockets. The cornerstone of any discerning wardrobe.',
            status: 'published', category_slug: 'outerwear', badge: 'Bestseller',
            images: ['/products/blazer-front.jpg', '/products/blazer-back.jpg', '/products/blazer-detail.jpg'],
            tags: ['tailored', 'wool', 'formal', 'italian-fabric'],
            variants: [
              { sku: 'HB-001-36R', price_cents: 59500, compare_at_cents: 75000, currency: 'USD', stock_available: 12, attributes_json: { size: '36R', color: 'Charcoal' } },
              { sku: 'HB-001-38R', price_cents: 59500, compare_at_cents: 75000, currency: 'USD', stock_available: 20, attributes_json: { size: '38R', color: 'Charcoal' } },
              { sku: 'HB-001-40R', price_cents: 59500, compare_at_cents: 75000, currency: 'USD', stock_available: 25, attributes_json: { size: '40R', color: 'Charcoal' } },
              { sku: 'HB-001-42R', price_cents: 59500, compare_at_cents: 75000, currency: 'USD', stock_available: 18, attributes_json: { size: '42R', color: 'Charcoal' } },
              { sku: 'HB-001-36R-NAV', price_cents: 62500, compare_at_cents: 78000, currency: 'USD', stock_available: 8, attributes_json: { size: '36R', color: 'Navy' } },
              { sku: 'HB-001-38R-NAV', price_cents: 62500, compare_at_cents: 78000, currency: 'USD', stock_available: 15, attributes_json: { size: '38R', color: 'Navy' } },
              { sku: 'HB-001-40R-NAV', price_cents: 62500, compare_at_cents: 78000, currency: 'USD', stock_available: 22, attributes_json: { size: '40R', color: 'Navy' } },
            ],
          },
          {
            name: 'Luna Cashmere Sweater', slug: 'luna-cashmere-sweater', description: 'Luxuriously soft and impossibly lightweight. Made from Grade-A Mongolian cashmere with a fine 14-gauge knit. Features a relaxed silhouette, ribbed cuffs, and a subtle mock-neck collar. Each piece undergoes a 12-step finishing process for unmatched softness.',
            status: 'published', category_slug: 'clothing', badge: 'New',
            images: ['/products/sweater-front.jpg', '/products/sweater-side.jpg'],
            tags: ['cashmere', 'luxury', 'winter', 'essential'],
            variants: [
              { sku: 'LC-001-XS', price_cents: 29500, currency: 'USD', stock_available: 30, attributes_json: { size: 'XS', color: 'Cream' } },
              { sku: 'LC-001-S', price_cents: 29500, currency: 'USD', stock_available: 45, attributes_json: { size: 'S', color: 'Cream' } },
              { sku: 'LC-001-M', price_cents: 29500, currency: 'USD', stock_available: 60, attributes_json: { size: 'M', color: 'Cream' } },
              { sku: 'LC-001-L', price_cents: 29500, currency: 'USD', stock_available: 40, attributes_json: { size: 'L', color: 'Cream' } },
              { sku: 'LC-001-M-BLK', price_cents: 29500, currency: 'USD', stock_available: 55, attributes_json: { size: 'M', color: 'Black' } },
              { sku: 'LC-001-M-BRG', price_cents: 31500, currency: 'USD', stock_available: 25, attributes_json: { size: 'M', color: 'Burgundy' } },
              { sku: 'LC-001-M-FOR', price_cents: 30500, currency: 'USD', stock_available: 35, attributes_json: { size: 'M', color: 'Forest Green' } },
              { sku: 'LC-001-M-DUSK', price_cents: 32500, currency: 'USD', stock_available: 20, attributes_json: { size: 'M', color: 'Dusty Rose' } },
            ],
          },
          {
            name: 'Avena Leather Tote', slug: 'avena-leather-tote', description: 'Handcrafted from full-grain Italian leather that develops a rich patina over time. Features a spacious main compartment with a removable zip pouch, double top handles, and an optional crossbody strap. Artisan-stitched in Tuscany.',
            status: 'published', category_slug: 'accessories', badge: 'Limited Edition',
            images: ['/products/tote-front.jpg', '/products/tote-open.jpg', '/products/tote-detail.jpg'],
            tags: ['leather', 'artisan', 'italian', 'tote', 'everyday-luxury'],
            variants: [
              { sku: 'AT-001-TAN', price_cents: 48500, compare_at_cents: 58000, currency: 'USD', stock_available: 15, attributes_json: { color: 'Rustic Tan' } },
              { sku: 'AT-001-BLK', price_cents: 48500, compare_at_cents: 58000, currency: 'USD', stock_available: 22, attributes_json: { color: 'Black' } },
              { sku: 'AT-001-CML', price_cents: 51500, compare_at_cents: 62000, currency: 'USD', stock_available: 10, attributes_json: { color: 'Camel' } },
            ],
          },
          {
            name: 'Velocity Leather Sneakers', slug: 'velocity-leather-sneakers', description: 'Reimagined court-shoe silhouette in buttery-soft Italian nappa leather. Features a cushioned ortholite insole, perforated toe cap, and a gum rubber outsole. Hand-stitched details and gold-tone eyelets elevate this everyday essential.',
            status: 'published', category_slug: 'footwear', badge: 'Editor Pick',
            images: ['/products/sneakers-side.jpg', '/products/sneakers-top.jpg', '/products/sneakers-back.jpg'],
            tags: ['leather', 'sneakers', 'casual', 'italian'],
            variants: [
              { sku: 'VL-001-39', price_cents: 24500, currency: 'USD', stock_available: 35, attributes_json: { size: '39', color: 'Triple White' } },
              { sku: 'VL-001-40', price_cents: 24500, currency: 'USD', stock_available: 50, attributes_json: { size: '40', color: 'Triple White' } },
              { sku: 'VL-001-41', price_cents: 24500, currency: 'USD', stock_available: 45, attributes_json: { size: '41', color: 'Triple White' } },
              { sku: 'VL-001-42', price_cents: 24500, currency: 'USD', stock_available: 40, attributes_json: { size: '42', color: 'Triple White' } },
              { sku: 'VL-001-43', price_cents: 24500, currency: 'USD', stock_available: 25, attributes_json: { size: '43', color: 'Triple White' } },
              { sku: 'VL-001-40-BLK', price_cents: 25500, currency: 'USD', stock_available: 30, attributes_json: { size: '40', color: 'Black' } },
              { sku: 'VL-001-41-TAU', price_cents: 26500, currency: 'USD', stock_available: 20, attributes_json: { size: '41', color: 'Taupe Suede' } },
            ],
          },
          {
            name: 'Solstice Silk Slip Dress', slug: 'solstice-silk-slip-dress', description: 'An exercise in refined simplicity. Cut from 22-momme charmeuse silk with a subtle satin finish. Features a cowl neckline, adjustable spaghetti straps, and a side slit. Bias-cut for a liquid drape that moves with you.',
            status: 'published', category_slug: 'clothing', badge: 'Bestseller',
            images: ['/products/dress-front.jpg', '/products/dress-back.jpg'],
            tags: ['silk', 'evening', 'luxury', 'minimal'],
            variants: [
              { sku: 'SS-001-XS', price_cents: 39500, currency: 'USD', stock_available: 10, attributes_json: { size: 'XS', color: 'Champagne' } },
              { sku: 'SS-001-S', price_cents: 39500, currency: 'USD', stock_available: 18, attributes_json: { size: 'S', color: 'Champagne' } },
              { sku: 'SS-001-M', price_cents: 39500, currency: 'USD', stock_available: 22, attributes_json: { size: 'M', color: 'Champagne' } },
              { sku: 'SS-001-L', price_cents: 39500, currency: 'USD', stock_available: 14, attributes_json: { size: 'L', color: 'Champagne' } },
              { sku: 'SS-001-S-BLK', price_cents: 39500, currency: 'USD', stock_available: 15, attributes_json: { size: 'S', color: 'Black' } },
              { sku: 'SS-001-M-MID', price_cents: 42500, currency: 'USD', stock_available: 8, attributes_json: { size: 'M', color: 'Midnight' } },
            ],
          },
        ],
      },
    },
  });

  await prisma.templateBase.create({
    data: {
      name: 'Electronics Store',
      description: 'Premium electronics retail template modeled on flagship tech stores. Clean sans-serif typography, blue-cool palette, spec-driven product displays, grid-heavy layouts, and trust-focused merchandising with protection plans and financing badges.',
      version: 'v2',
      layout_json: {
        theme: {
          primary: '#1e40af',
          primaryHover: '#1e3a8a',
          primaryLight: '#eff6ff',
          secondary: '#1e3a8a',
          accent: '#06b6d4',
          accentHover: '#0891b2',
          background: '#f8fafc',
          surface: '#ffffff',
          surfaceAlt: '#f1f5f9',
          text: '#0f172a',
          textSecondary: '#64748b',
          textMuted: '#94a3b8',
          success: '#16a34a',
          warning: '#d97706',
          error: '#dc2626',
          info: '#2563eb',
          fontFamily: "'Inter', sans-serif",
          headingFont: "'Inter', sans-serif",
          headingFontWeight: 600,
          bodyFont: "'Inter', sans-serif",
          borderRadius: '8px',
          borderRadiusLg: '12px',
          borderRadiusSm: '4px',
          shadow: '0 1px 2px rgba(0,0,0,0.05)',
          shadowMd: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
          shadowLg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
          spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px' },
          breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
          transition: 'all 0.15s ease-out',
          overlay: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
          colorScheme: 'cool',
          mode: 'light',
        },
        categories: [
          { name: 'Laptops & Desktops', slug: 'computers', sort_order: 1, subcategories: ['Laptops', 'Desktops & All-in-Ones', 'Monitors', 'Tablets & iPads'] },
          { name: 'Smartphones & Wearables', slug: 'smartphones', sort_order: 2, subcategories: ['Smartphones', 'Smartwatches', 'Fitness Trackers', 'Phone Accessories'] },
          { name: 'Audio & Home Theater', slug: 'audio', sort_order: 3, subcategories: ['Headphones & Earbuds', 'Speakers & Soundbars', 'Home Theater Systems', 'Turntables & Hi-Fi'] },
          { name: 'Gaming', slug: 'gaming', sort_order: 4, subcategories: ['Gaming Laptops', 'Consoles & VR', 'Gaming Accessories'] },
          { name: 'Accessories', slug: 'accessories', sort_order: 5, subcategories: ['Cables & Chargers', 'Cases & Protection', 'Storage', 'Smart Home'] },
          { name: 'Deals', slug: 'deals', sort_order: 6 },
        ],
        page_layouts: {
          homepage: [
            { component: 'custom.announcement-bar', props: { text: 'Free 2-Day Shipping on orders $50+ | 0% APR Financing for 12 Months on select items', bgColor: '#0f172a', textColor: '#ffffff' } },
            { component: 'hero.v1', props: { heading: 'Next-Gen Power. Unveiled.', subheading: 'The new AuraBook Pro M4 is here. Up to 22hr battery life, 3x faster neural engine, and a breathtaking Liquid Retina XDR display.', ctaLabel: 'Pre-Order Now', ctaHref: '/collections/new-arrivals', backgroundImage: '', alignment: 'left', variant: 'modern' } },
            { component: 'custom.value-props-strip', props: { items: [{ icon: 'truck', text: 'Free 2-Day Shipping' }, { icon: 'rotate', text: '30-Day Returns, No Questions' }, { icon: 'shield', text: '2-Year Warranty Included' }, { icon: 'headset', text: '24/7 Tech Support' }, { icon: 'tag', text: 'Price Match Guarantee' }], bgColor: '#f8fafc', borderBottom: true } },
            { component: 'custom.featured-categories', props: { title: 'Shop by Category', subtitle: 'Explore our extensive catalog', count: 5, layout: 'icon_grid', columns: 5 } },
            { component: 'custom.deal-of-the-day', props: { title: 'Deal of the Day', count: 3, showTimer: true, badge: 'Limited Offer', bgColor: '#ffffff' } },
            { component: 'product-grid.v1', props: { limit: 6, source: 'featured' } },
            { component: 'banner.v1', props: { heading: 'Save up to $300 on Trade-In', ctaLabel: 'Get Your Quote', imageUrl: '/assets/trade-in-banner.jpg' } },
            { component: 'custom.brand-logo-strip', props: { title: 'Top Brands', logos: ['Apple', 'Samsung', 'Sony', 'Bose', 'Dell', 'LG', 'AMD', 'Intel'], bgColor: '#ffffff' } },
            { component: 'product-grid.v1', props: { limit: 4, source: 'featured' } },
            { component: 'testimonials.v1', props: { variant: 'carousel', testimonials: [{ name: 'Marcus J.', text: 'Best tech shopping experience hands down. The price match saved me $150 and support was incredible.', rating: 5, location: 'Austin, TX', verifiedPurchase: true }, { name: 'Priya K.', text: 'The financing options made my home studio setup affordable. Will be a lifelong customer.', rating: 5, location: 'Toronto, CA', verifiedPurchase: true }, { name: 'Carlos M.', text: 'Shipping was incredibly fast — ordered my laptop at 10am and it arrived the next morning.', rating: 5, location: 'Miami, FL', verifiedPurchase: true }] } },
            { component: 'custom.service-promises', props: { items: [{ icon: 'wrench', title: 'Geek Squad Support', text: 'Expert setup, repair, and advisory services' }, { icon: 'calendar', title: 'Flexible Financing', text: '0% APR for 12 months on orders $299+' }, { icon: 'award', title: 'Certified Refurbished', text: 'Factory-tested, full warranty, up to 30% off' }], columns: 3 } },
            { component: 'newsletter.v1', props: { heading: 'Stay Ahead of the Curve', subheading: 'Get exclusive access to member-only deals, early product drops, and tech insights.', placeholderText: 'Enter your email address' } },
          ],
          products: [
            { component: 'breadcrumbs.v1', props: { homeLabel: 'Home', showCategory: true } },
            { component: 'custom.search-bar', props: { placeholder: 'Search 10,000+ products by name, brand, or SKU...', autocomplete: true, voiceSearch: true } },
            { component: 'custom.active-filters', props: { showClearAll: true, showCount: true } },
            { component: 'custom.category-filter', props: { layout: 'sidebar', showCounts: true, sortOptions: ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Customer Rating', 'Newest', 'Most Reviews'], filters: ['Brand', 'Price Range', 'Rating', 'Availability', 'Discount'] } },
            { component: 'custom.compare-toolbar', props: { enabled: true, maxCompare: 4 } },
            { component: 'product-grid.v1', props: { columns: 4, tabletColumns: 3, mobileColumns: 2, pagination: 24, infiniteScroll: false, showCompare: true, showRating: true, quickView: true } },
          ],
          product_detail: [
            { component: 'breadcrumbs.v1', props: { showCategory: true, showProductName: true } },
            { component: 'gallery.v1', props: { layout: 'thumbnails_column', zoom: true, imageCount: 5, showVideo: true, has360View: true } },
            { component: 'custom.product-info', props: { showSpecs: true, showSku: true, showStockLevel: true, showReviews: true, showWarranty: true, showFinancing: true } },
            { component: 'faq.v1', props: { items: [
              { title: 'Technical Specifications', content: 'Detailed spec sheet with dimensions, weight, processor, display, ports, connectivity, and battery information.' },
              { title: 'What\'s in the Box', content: 'Product, charging cable, power adapter, documentation, warranty card.' },
              { title: 'Protection Plans', content: 'Extend your coverage up to 3 years. Includes accidental damage protection and priority support.' },
              { title: 'Financing Options', content: '0% APR for 12 months. As low as $49/month with approved credit. No interest if paid in full.' },
            ] } },
            { component: 'custom.comparison-table', props: { title: 'Compare Models', models: ['Base', 'Pro', 'Max'], attributes: ['Processor', 'RAM', 'Storage', 'Display', 'Battery'] } },
            { component: 'product-grid.v1', props: { title: 'Frequently Bought Together', strategy: 'frequently_bundled', count: 4, showTotal: true } },
            { component: 'product-grid.v1', props: { title: 'Customers Also Viewed', strategy: 'views_affinity', count: 6, layout: 'horizontal_scroll' } },
            { component: 'product-grid.v1', props: { title: 'Recently Viewed', count: 4, layout: 'grid_2x2' } },
          ],
        },
        sample_products: [
          {
            name: 'AuraBook Pro M4 Max', slug: 'aurabook-pro-m4-max', description: 'The most powerful AuraBook ever. The M4 Max chip delivers a 16-core CPU, 40-core GPU, and 16-core Neural Engine for mind-blowing performance. Featuring a 16.2" Liquid Retina XDR display with ProMotion, up to 128GB unified memory, Thunderbolt 5 connectivity, and all-day battery life. The ultimate laptop for professionals who refuse to compromise.',
            status: 'published', category_slug: 'computers', badge: 'Just Released',
            images: ['/products/laptop-front.jpg', '/products/laptop-angle.jpg', '/products/laptop-open.jpg', '/products/laptop-ports.jpg', '/products/laptop-display.jpg'],
            tags: ['m4', 'pro', 'laptop', 'apple', 'premium'],
            variants: [
              { sku: 'AB-M4-14-36', price_cents: 249900, currency: 'USD', stock_available: 15, attributes_json: { screen: '14"', chip: 'M4 Pro', ram: '36GB', storage: '1TB SSD', color: 'Space Black' } },
              { sku: 'AB-M4-14-48', price_cents: 289900, currency: 'USD', stock_available: 10, attributes_json: { screen: '14"', chip: 'M4 Max', ram: '48GB', storage: '2TB SSD', color: 'Space Black' } },
              { sku: 'AB-M4-16-48', price_cents: 329900, currency: 'USD', stock_available: 8, attributes_json: { screen: '16"', chip: 'M4 Max', ram: '64GB', storage: '2TB SSD', color: 'Space Black' } },
              { sku: 'AB-M4-16-128', price_cents: 429900, currency: 'USD', stock_available: 3, attributes_json: { screen: '16"', chip: 'M4 Max', ram: '128GB', storage: '4TB SSD', color: 'Space Black' } },
              { sku: 'AB-M4-14-36-SL', price_cents: 249900, currency: 'USD', stock_available: 7, attributes_json: { screen: '14"', chip: 'M4 Pro', ram: '36GB', storage: '1TB SSD', color: 'Silver' } },
            ],
          },
          {
            name: 'Galaxy S26 Ultra', slug: 'galaxy-s26-ultra', description: 'Redefining what a smartphone can do. The Galaxy S26 Ultra features a revolutionary 250MP quad-camera system with AI-powered scene optimization, a stunning 7.0" Dynamic AMOLED 3X display with 3000 nits peak brightness, the lightning-fast Snapdragon 9 Gen 4 processor, built-in S Pen, and 5,500mAh battery with 65W super-fast charging. Titanium frame construction.',
            status: 'published', category_slug: 'smartphones', badge: 'Pre-Order',
            images: ['/products/phone-front.jpg', '/products/phone-back.jpg', '/products/phone-side.jpg', '/products/phone-camera.jpg'],
            tags: ['android', 'flagship', '5g', 'samsung', 'ultra'],
            variants: [
              { sku: 'GS26-256-TB', price_cents: 129900, currency: 'USD', stock_available: 50, attributes_json: { storage: '256GB', color: 'Titanium Black', ram: '12GB' } },
              { sku: 'GS26-512-TB', price_cents: 139900, currency: 'USD', stock_available: 75, attributes_json: { storage: '512GB', color: 'Titanium Black', ram: '12GB' } },
              { sku: 'GS26-1TB-TB', price_cents: 159900, currency: 'USD', stock_available: 30, attributes_json: { storage: '1TB', color: 'Titanium Black', ram: '16GB' } },
              { sku: 'GS26-512-TS', price_cents: 139900, currency: 'USD', stock_available: 40, attributes_json: { storage: '512GB', color: 'Titanium Silver', ram: '12GB' } },
              { sku: 'GS26-512-TG', price_cents: 139900, currency: 'USD', stock_available: 25, attributes_json: { storage: '512GB', color: 'Titanium Gold', ram: '12GB' } },
            ],
          },
          {
            name: 'QuietComfort Ultra Pro Headphones', slug: 'qc-ultra-pro-headphones', description: 'Immerse yourself in pure sound. Industry-leading adaptive noise cancellation with CustomTune technology that adjusts to your environment. Spatial audio with head tracking, lossless over USB-C, and 40-hour battery life. Fold-flat design with a premium hard-shell case. The gold standard in wireless audio.',
            status: 'published', category_slug: 'audio', badge: '★ Best Seller',
            images: ['/products/headphones-side.jpg', '/products/headphones-folded.jpg', '/products/headphones-case.jpg'],
            tags: ['noise-cancelling', 'wireless', 'premium', 'bose', 'spatial-audio'],
            variants: [
              { sku: 'QC-UP-BLK', price_cents: 39900, currency: 'USD', stock_available: 120, attributes_json: { color: 'Black' } },
              { sku: 'QC-UP-WHT', price_cents: 39900, currency: 'USD', stock_available: 85, attributes_json: { color: 'White Smoke' } },
              { sku: 'QC-UP-MID', price_cents: 42900, currency: 'USD', stock_available: 45, attributes_json: { color: 'Midnight Blue' } },
              { sku: 'QC-UP-SND', price_cents: 44900, currency: 'USD', stock_available: 30, attributes_json: { color: 'Sandstone' } },
            ],
          },
          {
            name: 'Predator X45 45" OLED Gaming Monitor', slug: 'predator-x45-oled', description: 'Dominate every frame. A breathtaking 45" UWQHD (3440x1440) OLED panel with 240Hz refresh rate, 0.03ms response time, and true HDR with 1,000 nits peak brightness. Features AMD FreeSync Premium Pro, built-in KVM switch, and RGB ambient lighting. The ultimate command center for competitive and immersive gaming.',
            status: 'published', category_slug: 'gaming', badge: 'Hot',
            images: ['/products/monitor-front.jpg', '/products/monitor-angle.jpg', '/products/monitor-ports.jpg'],
            tags: ['oled', 'gaming', 'ultrawide', 'monitor', '240hz'],
            variants: [
              { sku: 'PX45-001', price_cents: 149900, currency: 'USD', stock_available: 8, attributes_json: { size: '45"', resolution: '3440x1440', refresh: '240Hz', panel: 'OLED' } },
            ],
          },
          {
            name: 'EchoVerse Smart Home Hub Max', slug: 'echoverse-smart-hub-max', description: 'The brain of your smart home. EchoVerse Max combines a 10" HD smart display with a powerful Zigbee/Matter smart home hub, premium room-filling speaker, and advanced AI assistant. Control hundreds of compatible devices, view security cameras, make video calls, and stream content. Built with privacy-first design.',
            status: 'published', category_slug: 'accessories', badge: 'New',
            images: ['/products/hub-front.jpg', '/products/hub-stand.jpg'],
            tags: ['smart-home', 'ai-assistant', 'display', 'matter', 'amazon'],
            variants: [
              { sku: 'EV-HUB-CHR', price_cents: 16900, currency: 'USD', stock_available: 60, attributes_json: { color: 'Charcoal' } },
              { sku: 'EV-HUB-GLT', price_cents: 16900, currency: 'USD', stock_available: 45, attributes_json: { color: 'Glacier White' } },
              { sku: 'EV-HUB-BDL', price_cents: 22900, compare_at_cents: 33800, currency: 'USD', stock_available: 35, attributes_json: { color: 'Bundle - 2 Pack' } },
            ],
          },
        ],
      },
    },
  });

  await prisma.templateBase.create({
    data: {
      name: 'General Store',
      description: 'Versatile big-box retail template inspired by Target and Macy\'s. Clean indigo palette, accessible design, promotional merchandising with deals, loyalty programs, and registry features. Balanced for any product mix.',
      version: 'v2',
      layout_json: {
        theme: {
          primary: '#4f46e5',
          primaryHover: '#4338ca',
          primaryLight: '#eef2ff',
          secondary: '#4338ca',
          accent: '#0d9488',
          accentHover: '#0f766e',
          background: '#f9fafb',
          surface: '#ffffff',
          surfaceAlt: '#f3f4f6',
          text: '#111827',
          textSecondary: '#6b7280',
          textMuted: '#9ca3af',
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          fontFamily: "'Inter', sans-serif",
          headingFont: "'Inter', sans-serif",
          headingFontWeight: 700,
          bodyFont: "'Inter', sans-serif",
          borderRadius: '6px',
          borderRadiusLg: '12px',
          borderRadiusSm: '4px',
          shadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
          shadowMd: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
          shadowLg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
          spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px' },
          breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
          transition: 'all 0.2s ease-out',
          overlay: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
          colorScheme: 'neutral',
          mode: 'light',
        },
        categories: [
          { name: 'Home & Living', slug: 'home-living', sort_order: 1, subcategories: ['Furniture', 'Decor & Pillows', 'Kitchen & Dining', 'Bedding & Bath', 'Storage & Organization'] },
          { name: 'Sports & Outdoors', slug: 'sports-outdoors', sort_order: 2, subcategories: ['Fitness Equipment', 'Yoga & Pilates', 'Camping & Hiking', 'Cycling', 'Team Sports'] },
          { name: 'Beauty & Personal Care', slug: 'beauty-personal-care', sort_order: 3, subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Men\'s Grooming'] },
          { name: 'Toys, Kids & Baby', slug: 'toys-kids-baby', sort_order: 4, subcategories: ['Toys & Games', 'Baby Gear', 'Nursery', 'Books & Learning'] },
          { name: 'Groceries & Gourmet', slug: 'groceries-gourmet', sort_order: 5, subcategories: ['Snacks & Candy', 'Coffee & Tea', 'Pantry Staples', 'Organic & Natural'] },
          { name: 'Deals & Clearance', slug: 'deals-clearance', sort_order: 6 },
        ],
        page_layouts: {
          homepage: [
            { component: 'custom.announcement-bar', props: { text: 'Free store pickup | Save 5% with RedCard | Weekly deals end Sunday', bgColor: '#4f46e5', textColor: '#ffffff' } },
            { component: 'hero.v1', props: { heading: 'Spring Refresh Sale', subheading: 'Save up to 30% on home, fashion & outdoor — plus an extra 10% with code SPRING10', ctaLabel: 'Shop the Sale', ctaHref: '/category/sale', backgroundImage: '', alignment: 'center', variant: 'modern' } },
            { component: 'custom.value-props-strip', props: { items: [{ icon: 'truck', text: 'Free Shipping $35+' }, { icon: 'store', text: 'Free Same-Day Pickup' }, { icon: 'rotate', text: '90-Day Easy Returns' }, { icon: 'credit-card', text: 'Save 5% w/ RedCard' }], bgColor: '#ffffff' } },
            { component: 'custom.deal-grid', props: { title: 'Today\'s Deals', subtitle: 'Limited-time offers updated daily', items: [{ text: 'Buy 2 Get 1 Free', desc: 'On all home decor' }, { text: '30% Off', desc: 'Select outdoor gear' }, { text: 'Spend $50, Save $10', desc: 'Beauty & personal care' }], columns: 3 } },
            { component: 'custom.featured-categories', props: { title: 'Shop by Department', subtitle: 'Find exactly what you need', count: 6, layout: 'card_grid', columns: 3 } },
            { component: 'product-grid.v1', props: { limit: 8, source: 'featured' } },
            { component: 'banner.v1', props: { heading: 'Weekly Ad', ctaLabel: 'View Weekly Ad', imageUrl: '' } },
            { component: 'product-grid.v1', props: { limit: 4, source: 'featured' } },
            { component: 'rich-text.v1', props: { content: 'From everyday essentials to special finds, we bring you quality products at prices that make sense. Free shipping, easy returns, and a team that cares.' } },
            { component: 'testimonials.v1', props: { variant: 'carousel', testimonials: [{ name: 'Maria G.', text: 'This is my go-to for everything. The prices are great and pickup is always ready within 2 hours.', rating: 5, location: 'Chicago, IL' }, { name: 'David T.', text: 'The RedCard savings alone make it worth it. Fast shipping, easy app, and great customer service.', rating: 5, location: 'Seattle, WA' }, { name: 'Nancy P.', text: 'I love the product selection and the quality exceeds what I expect for the price point.', rating: 5, location: 'Atlanta, GA' }] } },
            { component: 'custom.service-promises', props: { items: [{ icon: 'target', title: 'Order Pickup', text: 'Free same-day pickup at 2,000+ stores' }, { icon: 'gift', title: 'Gift Registry', text: 'Create a registry for any occasion' }, { icon: 'tag', title: 'Price Match', text: 'We match competitor prices on qualifying items' }], columns: 3, bgColor: '#ffffff' } },
            { component: 'newsletter.v1', props: { heading: 'Get More from Your Cart', subheading: 'Sign up for weekly deals, personalized picks, and insider access. Plus, get 15% off your next order.', placeholderText: 'Your email address' } },
          ],
          products: [
            { component: 'breadcrumbs.v1', props: { homeLabel: 'Home', separator: '›' } },
            { component: 'custom.search-bar', props: { placeholder: 'Search thousands of products...', autocomplete: true } },
            { component: 'custom.active-filters', props: { showClearAll: true, showCount: true } },
            { component: 'custom.category-filter', props: { layout: 'sidebar', showCounts: true, sortOptions: ['Best Match', 'Price Low - High', 'Price High - Low', 'Top Rated', 'Newest', 'Percent Off'], filters: ['Category', 'Price', 'Brand', 'Rating', 'Color', 'Size', 'Availability', 'Discount'] } },
            { component: 'custom.promo-bar', props: { text: 'Free shipping on orders $35+ | Spend $75 and get a free gift' } },
            { component: 'product-grid.v1', props: { columns: 4, tabletColumns: 3, mobileColumns: 2, pagination: 24, infiniteScroll: true, showRating: true, quickView: true } },
          ],
          product_detail: [
            { component: 'breadcrumbs.v1', props: { showCategory: true, showProductName: true } },
            { component: 'gallery.v1', props: { layout: 'thumbnails_bottom', zoom: true, imageCount: 4 } },
            { component: 'custom.product-info', props: { showReviews: true, showSku: true, showStockLevel: true, showWishlist: true, showRegistry: true } },
            { component: 'faq.v1', props: { items: [
              { title: 'Product Details', content: 'Dimensions, materials, care instructions, and additional product information.' },
              { title: 'Shipping & Returns', content: 'Free shipping on orders $35+. In-store pickup available. 90-day return policy.' },
              { title: 'Ratings & Reviews', content: 'Read verified customer reviews and see product ratings.' },
              { title: 'Price Match Guarantee', content: 'Found a lower price? We\'ll match it. See full terms and conditions.' },
            ] } },
            { component: 'product-grid.v1', props: { title: 'Frequently Bought Together', strategy: 'frequently_bundled', count: 3, showSavings: true } },
            { component: 'product-grid.v1', props: { title: 'Customers Also Viewed', strategy: 'views_affinity', count: 6, layout: 'horizontal_scroll' } },
            { component: 'product-grid.v1', props: { title: 'Recently Viewed', count: 4, layout: 'horizontal_scroll' } },
          ],
        },
        sample_products: [
          {
            name: 'Synthetic Down Comforter - All-Season', slug: 'synthetic-down-comforter', description: 'Hotel-luxury comfort without the premium price tag. This all-season comforter features a 300-thread-count cotton sateen shell filled with premium alternative down for the perfect balance of warmth and breathability. Box-stitch construction prevents shifting. Machine washable. OEKO-TEX certified.',
            status: 'published', category_slug: 'home-living', badge: 'Bestseller',
            images: ['/products/comforter-folded.jpg', '/products/comforter-bed.jpg', '/products/comforter-detail.jpg', '/products/comforter-packaging.jpg'],
            tags: ['bedding', 'comforter', 'hotel-quality', 'all-season'],
            variants: [
              { sku: 'SDC-TWIN-WHT', price_cents: 4999, currency: 'USD', stock_available: 100, attributes_json: { size: 'Twin', color: 'White' } },
              { sku: 'SDC-FULL-WHT', price_cents: 6499, currency: 'USD', stock_available: 80, attributes_json: { size: 'Full', color: 'White' } },
              { sku: 'SDC-QUEEN-WHT', price_cents: 7999, currency: 'USD', stock_available: 120, attributes_json: { size: 'Queen', color: 'White' } },
              { sku: 'SDC-KING-WHT', price_cents: 9499, currency: 'USD', stock_available: 75, attributes_json: { size: 'King', color: 'White' } },
              { sku: 'SDC-QUEEN-IVR', price_cents: 8499, currency: 'USD', stock_available: 45, attributes_json: { size: 'Queen', color: 'Ivory' } },
              { sku: 'SDC-KING-LGR', price_cents: 9999, currency: 'USD', stock_available: 35, attributes_json: { size: 'King', color: 'Light Grey' } },
            ],
          },
          {
            name: 'ProFormance Yoga Mat - 6mm', slug: 'proformance-yoga-mat', description: 'Engineered for serious practitioners. This premium yoga mat features a dual-layer construction with a natural tree rubber base for unmatched grip and a microfiber suede top layer that becomes grippier as you sweat. Includes alignment markings and a carrying strap. Non-toxic, phthalate-free, and biodegradable.',
            status: 'published', category_slug: 'sports-outdoors', badge: 'Top Rated',
            images: ['/products/yogamat-rolled.jpg', '/products/yogamat-flat.jpg', '/products/yogamat-detail.jpg'],
            tags: ['yoga', 'fitness', 'eco-friendly', 'premium'],
            variants: [
              { sku: 'PFYM-6-LAV', price_cents: 7999, currency: 'USD', stock_available: 60, attributes_json: { thickness: '6mm', color: 'Lavender' } },
              { sku: 'PFYM-6-TAL', price_cents: 7999, currency: 'USD', stock_available: 50, attributes_json: { thickness: '6mm', color: 'Teal' } },
              { sku: 'PFYM-6-CHA', price_cents: 7999, currency: 'USD', stock_available: 70, attributes_json: { thickness: '6mm', color: 'Charcoal' } },
              { sku: 'PFYM-5-SGE', price_cents: 8999, currency: 'USD', stock_available: 40, attributes_json: { thickness: '5mm', color: 'Sage Green' } },
              { sku: 'PFYM-4-BLK', price_cents: 11999, currency: 'USD', stock_available: 25, attributes_json: { thickness: '4mm', color: 'Black' } },
            ],
          },
          {
            name: 'Vitamin C Brightening Serum - 15% Pure Formula', slug: 'vitamin-c-brightening-serum', description: 'Dermatologist-developed and clinically tested. Our potent 15% pure L-ascorbic acid serum is stabilized with ferulic acid and vitamin E for maximum efficacy. Brightens dark spots, evens skin tone, and boosts collagen production. Lightweight, fast-absorbing, and fragrance-free. Suitable for all skin types, including sensitive.',
            status: 'published', category_slug: 'beauty-personal-care', badge: 'Bestseller',
            images: ['/products/serum-bottle.jpg', '/products/serum-dropper.jpg', '/products/serum-box.jpg'],
            tags: ['skincare', 'vitamin-c', 'anti-aging', 'brightening'],
            variants: [
              { sku: 'VC-15-30ML', price_cents: 3499, currency: 'USD', stock_available: 200, attributes_json: { size: '30ml', concentration: '15%' } },
              { sku: 'VC-15-50ML', price_cents: 4999, currency: 'USD', stock_available: 150, attributes_json: { size: '50ml', concentration: '15%' } },
              { sku: 'VC-20-30ML', price_cents: 4499, currency: 'USD', stock_available: 80, attributes_json: { size: '30ml', concentration: '20%' } },
              { sku: 'VC-15-DUO', price_cents: 5999, compare_at_cents: 6998, currency: 'USD', stock_available: 100, attributes_json: { size: '30ml Duo Pack', concentration: '15%' } },
            ],
          },
          {
            name: 'STEM Explorer Kit - 50 Experiments', slug: 'stem-explorer-kit', description: 'Ignite a love for science with 50 hands-on experiments. This all-in-one STEM kit includes real lab equipment, safe chemicals, and a full-color instruction book. Build a volcano, grow crystals, create slime, launch a rocket, and more. Designed for ages 8-14 with adult supervision. Winner of the 2025 Toy of the Year Award.',
            status: 'published', category_slug: 'toys-kids-baby', badge: 'Award Winner',
            images: ['/products/stem-box.jpg', '/products/stem-contents.jpg', '/products/stem-action.jpg'],
            tags: ['stem', 'educational', 'science', 'gift', 'award-winner'],
            variants: [
              { sku: 'STEM-50-001', price_cents: 4499, currency: 'USD', stock_available: 90, attributes_json: { age_range: '8-14', experiments: 50 } },
              { sku: 'STEM-50-DLX', price_cents: 6999, currency: 'USD', stock_available: 40, attributes_json: { age_range: '8-14', experiments: 50, bundle: 'Deluxe Kit + Lab Coat' } },
            ],
          },
          {
            name: 'Organic Single-Origin Coffee Collection', slug: 'organic-single-origin-coffee', description: 'Curated for the discerning coffee lover. This collection features three 12oz bags of single-origin, organic, shade-grown coffee from Ethiopia Yirgacheffe, Colombia Huila, and Guatemala Antigua. Small-batch roasted within 48 hours of shipping. Tasting notes, brew guides, and origin story included.',
            status: 'published', category_slug: 'groceries-gourmet', badge: 'Limited Batch',
            images: ['/products/coffee-bags.jpg', '/products/coffee-beans.jpg', '/products/coffee-brewing.jpg'],
            tags: ['coffee', 'organic', 'single-origin', 'gourmet', 'gift'],
            variants: [
              { sku: 'OSC-WHOLE-3PK', price_cents: 4499, currency: 'USD', stock_available: 65, attributes_json: { grind: 'Whole Bean', size: '3 x 12oz', roast: 'Medium' } },
              { sku: 'OSC-GRND-3PK', price_cents: 4499, currency: 'USD', stock_available: 55, attributes_json: { grind: 'Ground - Drip', size: '3 x 12oz', roast: 'Medium' } },
              { sku: 'OSC-WHOLE-6PK', price_cents: 7999, compare_at_cents: 8998, currency: 'USD', stock_available: 30, attributes_json: { grind: 'Whole Bean', size: '6 x 12oz', roast: 'Variety Pack' } },
            ],
          },
        ],
      },
    },
  });

  console.log('Seeding complete!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
