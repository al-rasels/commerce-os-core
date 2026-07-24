import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listTemplates() {
    return this.prisma.templateBase.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getTemplate(id: string) {
    const template = await this.prisma.templateBase.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async applyTemplate(tenantId: string, templateId: string) {
    this.logger.log(`Applying template ${templateId} to tenant ${tenantId}`);
    const template = await this.prisma.templateBase.findUnique({
      where: { id: templateId },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const data = template.layout_json as any;

    await this.prisma.$transaction(async (tx) => {

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
          await tx.pageLayout.upsert({
            where: { tenant_id_page_key: { tenant_id: tenantId, page_key: pageKey } },
            update: { sections_json: sections as any },
            create: {
              tenant_id: tenantId,
              page_key: pageKey,
              sections_json: sections as any,
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
                where: { tenant_id_slug: { tenant_id: tenantId, slug: prod.category_slug } },
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
                metafields_json: Object.keys(metafields).length > 0 ? metafields as Prisma.InputJsonValue : undefined,
              },
            });
            if (prod.variants && Array.isArray(prod.variants)) {
              for (const v of prod.variants) {
                const attrs = { ...(typeof v.attributes_json === 'object' && v.attributes_json !== null ? v.attributes_json : {}) };
                if (v.compare_at_cents != null) attrs.compareAtPriceCents = v.compare_at_cents;

                await tx.productVariant.create({
                  data: {
                    tenant_id: tenantId,
                    product_id: product.id,
                    sku: v.sku,
                    price_cents: v.price_cents,
                    currency: v.currency ?? 'USD',
                    stock_available: v.stock_available ?? 0,
                    attributes_json: attrs,
                  },
                });
              }
            }
          }
        }
      }

      await tx.templateTenantOverride.upsert({
        where: { tenant_id: tenantId },
        update: { template_base_id: templateId, overrides_json: {} },
        create: {
          tenant_id: tenantId,
          template_base_id: templateId,
          overrides_json: {},
        },
      });
    });

    this.logger.log(`Template ${templateId} applied to tenant ${tenantId}`);
    return { success: true, template: template.name };
  }
}
