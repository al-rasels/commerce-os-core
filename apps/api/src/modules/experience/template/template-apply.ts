import { Prisma, PrismaClient } from '@prisma/client';
import { normalizePageLayout } from '@commerceos/shared-types';

/**
 * Shared template-application logic. Runs inside the caller's transaction so
 * both the NestJS `TemplateService` and the standalone seed script reuse the
 * exact same write path (no drift between seed and apply).
 *
 * `tx` accepts both a `Prisma.TransactionClient` and the plain `PrismaClient`.
 */

interface TemplateCategoryInput {
  name: string;
  slug: string;
  sort_order?: number;
}

interface TemplateVariantInput {
  sku: string;
  price_cents: number;
  currency?: string;
  stock_available?: number;
  compare_at_cents?: number;
  attributes_json?: Record<string, unknown>;
}

interface TemplateProductInput {
  name: string;
  slug: string;
  description?: string;
  status?: string;
  category_slug?: string;
  badge?: string;
  images?: string[];
  tags?: string[];
  variants?: TemplateVariantInput[];
}

export interface TemplateLayoutData {
  categories?: TemplateCategoryInput[];
  page_layouts?: Record<string, unknown>;
  sample_products?: TemplateProductInput[];
}

export async function applyTemplateData(
  tx: Prisma.TransactionClient | PrismaClient,
  tenantId: string,
  data: TemplateLayoutData,
): Promise<void> {
  if (data.categories && Array.isArray(data.categories)) {
    for (const cat of data.categories) {
      await tx.category.upsert({
        where: { tenant_id_slug: { tenant_id: tenantId, slug: cat.slug } },
        update: { name: cat.name, sort_order: cat.sort_order ?? 0 },
        create: {
          tenant_id: tenantId,
          name: cat.name,
          slug: cat.slug,
          sort_order: cat.sort_order ?? 0,
        },
      });
    }
  }

  if (data.page_layouts && typeof data.page_layouts === 'object') {
    for (const [pageKey, sections] of Object.entries(data.page_layouts)) {
      // Normalize legacy shapes (backfill node ids/visible/rules) and publish
      // the template layouts immediately for a fresh store.
      const doc = normalizePageLayout(sections);
      await tx.pageLayout.upsert({
        where: {
          tenant_id_page_key: { tenant_id: tenantId, page_key: pageKey },
        },
        update: {
          draft_json: doc as unknown as Prisma.InputJsonValue,
          published_json: doc as unknown as Prisma.InputJsonValue,
          published_at: new Date(),
        },
        create: {
          tenant_id: tenantId,
          page_key: pageKey,
          draft_json: doc as unknown as Prisma.InputJsonValue,
          published_json: doc as unknown as Prisma.InputJsonValue,
          published_at: new Date(),
        },
      });
    }
  }

  if (data.sample_products && Array.isArray(data.sample_products)) {
    for (const prod of data.sample_products) {
      const existing = await tx.product.findUnique({
        where: { tenant_id_slug: { tenant_id: tenantId, slug: prod.slug } },
      });
      if (!existing) {
        let categoryId: string | undefined;
        if (prod.category_slug) {
          const cat = await tx.category.findUnique({
            where: {
              tenant_id_slug: { tenant_id: tenantId, slug: prod.category_slug },
            },
          });
          if (cat) categoryId = cat.id;
        }
        const metafields: Record<string, unknown> = {};
        if (prod.badge) metafields.badge = prod.badge;
        if (prod.images) metafields.images = prod.images;
        if (prod.tags) metafields.tags = prod.tags;

        const product = await tx.product.create({
          data: {
            tenant_id: tenantId,
            name: prod.name,
            slug: prod.slug,
            description: prod.description ?? null,
            status: prod.status ?? 'draft',
            category_id: categoryId,
            metafields_json:
              Object.keys(metafields).length > 0
                ? (metafields as Prisma.InputJsonValue)
                : undefined,
          },
        });
        if (prod.variants && Array.isArray(prod.variants)) {
          for (const v of prod.variants) {
            const attrs = {
              ...(typeof v.attributes_json === 'object' &&
              v.attributes_json !== null
                ? v.attributes_json
                : {}),
            };
            if (v.compare_at_cents != null)
              attrs.compareAtPriceCents = v.compare_at_cents;

            await tx.productVariant.create({
              data: {
                tenant_id: tenantId,
                product_id: product.id,
                sku: v.sku,
                price_cents: v.price_cents,
                currency: v.currency ?? 'USD',
                stock_available: v.stock_available ?? 0,
                attributes_json: attrs as Prisma.InputJsonValue,
              },
            });
          }
        }
      }
    }
  }
}
