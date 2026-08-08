import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('v1/storefront')
export class StorefrontController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('products')
  async listProducts(
    @GetTenantContext() ctx: TenantContext,
    @Query('category') categorySlug?: string,
    @Query('q') searchQuery?: string,
    @Query('attributes') attributesJson?: string,
    @Query('page') rawPage?: string,
    @Query('limit') rawLimit?: string,
  ) {
    const service = this.prismaService as any;
    const page = Math.max(parseInt(rawPage || '', 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(rawLimit || '', 10) || 100, 1),
      100,
    );
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
      const category = await service.category.findFirst({
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

    const [total, products] = await Promise.all([
      service.product.count({ where }),
      service.product.findMany({
        where,
        include: { category: true, variants: true },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    // Compute simple facets in-memory for MVP (against the current page).
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

    return { data: products, facets, total, page, limit };
  }

  @Get('products/:slug')
  async getProduct(
    @GetTenantContext() ctx: TenantContext,
    @Param('slug') slug: string,
  ) {
    const service = this.prismaService as any;
    const product = await service.product.findFirst({
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
    const service = this.prismaService as any;
    return service.category.findMany({
      where: { tenant_id: ctx.tenantId },
      orderBy: { sort_order: 'asc' },
    });
  }

  @Get('orders/by-email')
  async listOrdersByEmail(
    @GetTenantContext() ctx: TenantContext,
    @Query('email') email: string,
  ) {
    if (!email) return [];
    const service = this.prismaService as any;
    return service.order.findMany({
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
    const service = this.prismaService as any;
    const order = await service.order.findFirst({
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
