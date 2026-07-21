import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { StockReservationRepository } from './repositories/stock-reservation.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class CatalogService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly variantRepo: ProductVariantRepository,
    private readonly stockReservationRepo: StockReservationRepository,
  ) {}

  async createProduct(ctx: TenantContext, dto: CreateProductDto) {
    const existing = await this.productRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Product with this slug already exists');
    }
    return this.productRepo.create(ctx, dto);
  }

  async listProducts(ctx: TenantContext) {
    return this.productRepo.findMany(ctx, { orderBy: { created_at: 'desc' } });
  }

  async createCategory(ctx: TenantContext, dto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Category with this slug already exists');
    }
    return this.categoryRepo.create(ctx, dto);
  }

  async listCategories(ctx: TenantContext) {
    return this.categoryRepo.findMany(ctx, { orderBy: { sort_order: 'asc' } });
  }

  async getProduct(ctx: TenantContext, id: string) {
    const product = await this.productRepo.findUnique(ctx, id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(ctx: TenantContext, id: string, dto: UpdateProductDto) {
    const existing = await this.productRepo.findUnique(ctx, id);
    if (!existing) throw new NotFoundException('Product not found');

    if (dto.slug) {
      const slugConflict = await this.productRepo.findMany(ctx, {
        slug: dto.slug,
        id: { not: id },
      });
      if (slugConflict.length > 0) {
        throw new ConflictException('Product with this slug already exists');
      }
    }

    return this.productRepo.update(ctx, id, dto);
  }

  async deleteProduct(ctx: TenantContext, id: string) {
    const product = await this.productRepo.findUnique(ctx, id);
    if (!product) throw new NotFoundException('Product not found');
    return this.productRepo.softDelete(ctx, id);
  }

  async getCategory(ctx: TenantContext, id: string) {
    const category = await this.categoryRepo.findUnique(ctx, id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async updateCategory(ctx: TenantContext, id: string, dto: UpdateCategoryDto) {
    const existing = await this.categoryRepo.findUnique(ctx, id);
    if (!existing) throw new NotFoundException('Category not found');

    if (dto.slug) {
      const slugConflict = await this.categoryRepo.findMany(ctx, {
        slug: dto.slug,
        id: { not: id },
      });
      if (slugConflict.length > 0) {
        throw new ConflictException('Category with this slug already exists');
      }
    }

    return this.categoryRepo.update(ctx, id, dto);
  }

  async deleteCategory(ctx: TenantContext, id: string) {
    const category = await this.categoryRepo.findUnique(ctx, id);
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepo.softDelete(ctx, id);
  }

  async getVariants(ctx: TenantContext, productId: string) {
    return this.variantRepo.findMany(ctx, { where: { product_id: productId } });
  }

  async createVariant(ctx: TenantContext, dto: CreateProductVariantDto) {
    const existing = await this.variantRepo.findMany(ctx, {
      product_id: dto.product_id,
      sku: dto.sku,
    });
    if (existing.length > 0) {
      throw new ConflictException(
        'Variant with this SKU already exists for this product',
      );
    }
    return this.variantRepo.create(ctx, dto);
  }

  async updateVariant(
    ctx: TenantContext,
    id: string,
    dto: UpdateProductVariantDto,
  ) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    return this.variantRepo.update(ctx, id, dto);
  }

  async deleteVariant(ctx: TenantContext, id: string) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    return this.variantRepo.softDelete(ctx, id);
  }

  async getLowStockVariants(ctx: TenantContext) {
    return this.variantRepo.findMany(ctx, {
      where: { stock_available: { lt: 5 }, deleted_at: null },
      include: { product: { select: { title: true } } },
      take: 5,
    });
  }

  async getVariant(ctx: TenantContext, id: string) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    return variant;
  }

  async reserveStock(ctx: TenantContext, variantId: string, quantity: number, orderId: string) {
    const success = await this.variantRepo.incrementReservedStock(ctx, variantId, quantity);

    if (!success) {
      return false;
    }

    await this.stockReservationRepo.create(ctx, {
      variant_id: variantId,
      order_id: orderId,
      quantity: quantity,
      expires_at: new Date(Date.now() + 30 * 60 * 1000), // 30 mins
    });

    return true;
  }
}
