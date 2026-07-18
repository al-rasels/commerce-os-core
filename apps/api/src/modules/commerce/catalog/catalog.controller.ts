import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';

@Controller('v1/commerce/catalog')
@UseGuards(TenantAuthGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('products')
  @RequirePermissions('catalog.write')
  async createProduct(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateProductDto,
  ) {
    return this.catalogService.createProduct(ctx, dto);
  }

  @Get('products')
  @RequirePermissions('catalog.read')
  async listProducts(@GetTenantContext() ctx: TenantContext) {
    return this.catalogService.listProducts(ctx);
  }

  @Post('categories')
  @RequirePermissions('catalog.write')
  async createCategory(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.catalogService.createCategory(ctx, dto);
  }

  @Get('categories')
  @RequirePermissions('catalog.read')
  async listCategories(@GetTenantContext() ctx: TenantContext) {
    return this.catalogService.listCategories(ctx);
  }

  @Get('products/:id')
  @RequirePermissions('catalog.read')
  async getProduct(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.catalogService.getProduct(ctx, id);
  }

  @Patch('products/:id')
  @RequirePermissions('catalog.write')
  async updateProduct(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.catalogService.updateProduct(ctx, id, dto);
  }

  @Delete('products/:id')
  @RequirePermissions('catalog.write')
  async deleteProduct(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.catalogService.deleteProduct(ctx, id);
  }

  @Get('categories/:id')
  @RequirePermissions('catalog.read')
  async getCategory(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.catalogService.getCategory(ctx, id);
  }

  @Patch('categories/:id')
  @RequirePermissions('catalog.write')
  async updateCategory(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.catalogService.updateCategory(ctx, id, dto);
  }

  @Delete('categories/:id')
  @RequirePermissions('catalog.write')
  async deleteCategory(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.catalogService.deleteCategory(ctx, id);
  }

  @Get('products/:productId/variants')
  @RequirePermissions('catalog.read')
  async listVariants(
    @GetTenantContext() ctx: TenantContext,
    @Param('productId') productId: string,
  ) {
    return this.catalogService.getVariants(ctx, productId);
  }

  @Post('products/:productId/variants')
  @RequirePermissions('catalog.write')
  async createVariant(
    @GetTenantContext() ctx: TenantContext,
    @Param('productId') productId: string,
    @Body() dto: CreateProductVariantDto,
  ) {
    return this.catalogService.createVariant(ctx, { ...dto, product_id: productId });
  }

  @Patch('variants/:id')
  @RequirePermissions('catalog.write')
  async updateVariant(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: UpdateProductVariantDto,
  ) {
    return this.catalogService.updateVariant(ctx, id, dto);
  }

  @Delete('variants/:id')
  @RequirePermissions('catalog.write')
  async deleteVariant(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.catalogService.deleteVariant(ctx, id);
  }
}
