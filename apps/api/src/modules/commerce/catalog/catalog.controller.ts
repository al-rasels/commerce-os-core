import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { Permissions } from '../../platform/auth/decorators/permissions.decorator';

@Controller('v1/commerce/catalog')
@UseGuards(TenantAuthGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('products')
  @Permissions('catalog.write')
  async createProduct(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateProductDto,
  ) {
    return this.catalogService.createProduct(ctx, dto);
  }

  @Get('products')
  @Permissions('catalog.read')
  async listProducts(@GetTenantContext() ctx: TenantContext) {
    return this.catalogService.listProducts(ctx);
  }

  @Post('categories')
  @Permissions('catalog.write')
  async createCategory(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.catalogService.createCategory(ctx, dto);
  }

  @Get('categories')
  @Permissions('catalog.read')
  async listCategories(@GetTenantContext() ctx: TenantContext) {
    return this.catalogService.listCategories(ctx);
  }
}
