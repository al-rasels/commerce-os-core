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
    return (service as any).product.findMany({
      where,
      include: { category: true, variants: true },
      orderBy: { created_at: 'desc' },
    });
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
}
