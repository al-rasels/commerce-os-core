import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('v1/storefront')
export class StorefrontController {
  constructor(private readonly prismaService: PrismaService) {}

  // Storefront expects top-level `images`/`brand`/`badge`/`tags` on products,
  // but they are stored in `metafields_json` for extensibility.
  private transformProduct(product: any) {
    if (!product) return product;
    const meta = product.metafields_json ?? {};
    return {
      ...product,
      images: Array.isArray(meta.images) ? meta.images : [],
      brand: meta.brand ?? null,
      badge: meta.badge ?? null,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
    };
  }

  private computeReviewSummary(reviews: Array<{ rating: number }>) {
    const count = reviews.length;
    const avg = count
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
      : 0;
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      distribution[r.rating] = (distribution[r.rating] ?? 0) + 1;
    });
    return { avg, count, distribution };
  }

  @Get('products')
  async listProducts(
    @GetTenantContext() ctx: TenantContext,
    @Query('category') categorySlug?: string,
    @Query('q') searchQuery?: string,
    @Query('brand') brand?: string,
    @Query('min_price') rawMinPrice?: string,
    @Query('max_price') rawMaxPrice?: string,
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
    if (brand) {
      where.metafields_json = { path: ['brand'], equals: brand };
    }

    const minPrice =
      rawMinPrice === undefined ||
      rawMinPrice === '' ||
      Number.isNaN(Number(rawMinPrice))
        ? null
        : Number(rawMinPrice);
    const maxPrice =
      rawMaxPrice === undefined ||
      rawMaxPrice === '' ||
      Number.isNaN(Number(rawMaxPrice))
        ? null
        : Number(rawMaxPrice);

    const variantConstraints: any[] = [];
    if (attributesJson) {
      try {
        const parsedAttributes = JSON.parse(attributesJson);
        if (parsedAttributes && typeof parsedAttributes === 'object') {
          for (const [k, v] of Object.entries(parsedAttributes)) {
            variantConstraints.push({
              attributes_json: { path: [k], equals: v as string },
            });
          }
        }
      } catch (e) {
        // ignore invalid json
      }
    }
    if (minPrice !== null || maxPrice !== null) {
      variantConstraints.push({
        price_cents: {
          ...(minPrice !== null ? { gte: minPrice } : {}),
          ...(maxPrice !== null ? { lte: maxPrice } : {}),
        },
      });
    }
    if (variantConstraints.length > 0) {
      where.variants = { some: { AND: variantConstraints } };
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
      const productBrand = p.metafields_json?.brand;
      if (productBrand) {
        if (!facets.Brand) facets.Brand = {};
        facets.Brand[productBrand] = (facets.Brand[productBrand] || 0) + 1;
      }
      p.variants?.forEach((v: any) => {
        if (v.attributes_json) {
          Object.entries(v.attributes_json).forEach(([key, val]) => {
            if (!facets[key]) facets[key] = {};
            facets[key][val as string] = (facets[key][val as string] || 0) + 1;
          });
        }
      });
    });

    return {
      data: products.map((p: any) => this.transformProduct(p)),
      facets,
      total,
      page,
      limit,
    };
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
    if (!product) return { notFound: true };

    const reviews = await service.productReview.findMany({
      where: {
        tenant_id: ctx.tenantId,
        product_id: product.id,
        status: 'approved',
      },
      select: { rating: true },
    });

    return {
      ...this.transformProduct(product),
      reviewSummary: this.computeReviewSummary(reviews),
    };
  }

  @Get('products/:slug/reviews')
  async getProductReviews(
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
      select: { id: true },
    });
    if (!product) return { notFound: true };

    const reviews = await service.productReview.findMany({
      where: {
        tenant_id: ctx.tenantId,
        product_id: product.id,
        status: 'approved',
      },
      include: {
        customer: { select: { first_name: true, last_name: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    const data = reviews.map((r: any) => ({
      ...r,
      author: r.customer
        ? `${r.customer.first_name ?? ''} ${r.customer.last_name ?? ''}`.trim()
        : 'Verified Customer',
    }));

    return { data, summary: this.computeReviewSummary(data) };
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
