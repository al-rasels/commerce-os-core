import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';

@Controller('v1/storefront')
export class StorefrontController {
  @Get('products')
  async listProducts(
    @GetTenantContext() ctx: TenantContext,
    @Query('category') categorySlug?: string,
    @Query('q') searchQuery?: string,
    @Query('attributes') attributesJson?: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service.js'))
      .PrismaService;
    const service = new prisma();
    const where: any = {
      deleted_at: null,
      tenant_id: ctx.tenantId,
      status: 'active',
    };
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }
    if (categorySlug) {
      const category = await (service as any).category.findFirst({
        where: { slug: categorySlug, tenant_id: ctx.tenantId },
      });
      if (category) where.category_id = category.id;
    }

    let parsedAttributes: Record<string, string> | null = null;
    if (attributesJson) {
      try {
        parsedAttributes = JSON.parse(attributesJson);
        const variantWhere: any = {};
        if (parsedAttributes) {
          for (const [k, v] of Object.entries(parsedAttributes)) {
            variantWhere.attributes_json = { path: [k], equals: v };
          }
          where.variants = { some: variantWhere };
        }
      } catch (e) {
        // ignore invalid json
      }
    }

    const products = await (service as any).product.findMany({
      where,
      include: { category: true, variants: true },
      orderBy: { created_at: 'desc' },
    });

    // Compute simple facets in-memory for MVP
    const facets: Record<string, Record<string, number>> = {};
    products.forEach((p: any) => {
      p.variants?.forEach((v: any) => {
        if (v.attributes_json) {
          Object.entries(v.attributes_json).forEach(([key, val]) => {
            if (!facets[key]) facets[key] = {};
            facets[key][val as string] = (facets[key][val as string] || 0) + 1;
          });
        }
      });
    });

    return { data: products, facets };
  }

  @Get('products/:slug')
  async getProduct(
    @GetTenantContext() ctx: TenantContext,
    @Param('slug') slug: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service.js'))
      .PrismaService;
    const service = new prisma();
    const product = await (service as any).product.findFirst({
      where: {
        slug,
        tenant_id: ctx.tenantId,
        deleted_at: null,
        status: 'active',
      },
      include: { category: true, variants: true },
    });
    return product ?? { notFound: true };
  }

  @Get('categories')
  async listCategories(@GetTenantContext() ctx: TenantContext) {
    const prisma = (await import('../../prisma/prisma.service.js'))
      .PrismaService;
    const service = new prisma();
    return (service as any).category.findMany({
      where: { deleted_at: null, tenant_id: ctx.tenantId },
      orderBy: { sort_order: 'asc' },
    });
  }

  @Get('orders/by-email')
  async listOrdersByEmail(
    @GetTenantContext() ctx: TenantContext,
    @Query('email') email: string,
  ) {
    if (!email) return [];
    const prisma = (await import('../../prisma/prisma.service.js'))
      .PrismaService;
    const service = new prisma();
    return (service as any).order.findMany({
      where: {
        tenant_id: ctx.tenantId,
        customer: { email },
      },
      include: {
        items: {
          include: { variant: { include: { product: true } } },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  @Get('orders/:id')
  async getOrder(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service.js'))
      .PrismaService;
    const service = new prisma();
    const order = await (service as any).order.findFirst({
      where: {
        id,
        tenant_id: ctx.tenantId,
      },
      include: {
        items: {
          include: { variant: { include: { product: true } } },
        },
      },
    });
    return order ?? { notFound: true };
  }
}
