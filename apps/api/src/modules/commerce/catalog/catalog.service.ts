import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { StockReservationRepository } from './repositories/stock-reservation.repository';
import { BundleRepository } from './repositories/bundle.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { SearchIndexer } from '../search/search-indexer';

@Injectable()
export class CatalogService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly variantRepo: ProductVariantRepository,
    private readonly stockReservationRepo: StockReservationRepository,
    private readonly bundleRepo: BundleRepository,
    private readonly searchIndexer: SearchIndexer,
  ) {}

  async createProduct(ctx: TenantContext, dto: CreateProductDto) {
    const existing = await this.productRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Product with this slug already exists');
    }
    const product = await this.productRepo.create(ctx, dto);
    await this.indexProduct(ctx, product.id);
    return product;
  }

  async listProducts(ctx: TenantContext) {
    return this.productRepo.findMany(ctx, { orderBy: { created_at: 'desc' } });
  }

  async createCategory(ctx: TenantContext, dto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Category with this slug already exists');
    }
    const category = await this.categoryRepo.create(ctx, dto);
    await this.indexCategory(ctx, category.id);
    return category;
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

    const updated = await this.productRepo.update(ctx, id, dto);
    await this.indexProduct(ctx, id);
    return updated;
  }

  async deleteProduct(ctx: TenantContext, id: string) {
    const product = await this.productRepo.findUnique(ctx, id);
    if (!product) throw new NotFoundException('Product not found');
    const deleted = await this.productRepo.softDelete(ctx, id);
    await this.searchIndexer.remove(ctx.tenantId, 'products', id);
    return deleted;
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

    const updated = await this.categoryRepo.update(ctx, id, dto);
    await this.indexCategory(ctx, id);
    return updated;
  }

  async deleteCategory(ctx: TenantContext, id: string) {
    const category = await this.categoryRepo.findUnique(ctx, id);
    if (!category) throw new NotFoundException('Category not found');
    const deleted = await this.categoryRepo.softDelete(ctx, id);
    await this.searchIndexer.remove(ctx.tenantId, 'categories', id);
    return deleted;
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
    const variant = await this.variantRepo.create(ctx, dto);
    await this.indexProduct(ctx, dto.product_id);
    return variant;
  }

  async updateVariant(
    ctx: TenantContext,
    id: string,
    dto: UpdateProductVariantDto,
  ) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    const updated = await this.variantRepo.update(ctx, id, dto);
    await this.indexProduct(ctx, variant.product_id);
    return updated;
  }

  async deleteVariant(ctx: TenantContext, id: string) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    const deleted = await this.variantRepo.softDelete(ctx, id);
    await this.indexProduct(ctx, variant.product_id);
    return deleted;
  }

  async getLowStockVariants(ctx: TenantContext) {
    return this.variantRepo.findMany(ctx, {
      where: { stock_available: { lt: 5 } },
      include: { product: { select: { name: true } } },
      take: 5,
    });
  }

  async getVariant(ctx: TenantContext, id: string) {
    const variant = await this.variantRepo.findUnique(ctx, id);
    if (!variant) throw new NotFoundException('Variant not found');
    return variant;
  }

  async reserveStock(ctx: TenantContext, variantId: string, quantity: number) {
    const success = await this.variantRepo.incrementReservedStock(
      ctx,
      variantId,
      quantity,
    );

    if (!success) {
      return null;
    }

    const reservation = await this.stockReservationRepo.create(ctx, {
      variant_id: variantId,
      quantity: quantity,
      expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 mins (matching RESERVATION_TTL_MS)
    });

    return reservation.id;
  }

  async confirmReservation(
    ctx: TenantContext,
    reservationId: string,
    orderId: string,
  ) {
    await this.stockReservationRepo.update(ctx, reservationId, {
      order_id: orderId,
    });
  }

  async releaseReservation(ctx: TenantContext, reservationId: string) {
    const res = await this.stockReservationRepo.findUnique(ctx, reservationId);
    if (!res) return;

    // Decrement reserved stock, increment available
    await this.variantRepo.update(ctx, res.variant_id, {
      stock_reserved: { decrement: res.quantity },
    });

    await this.stockReservationRepo.delete(ctx, reservationId);
  }

  async getBundleItems(ctx: TenantContext, parentVariantId: string) {
    return this.bundleRepo.findMany(ctx, {
      where: { parent_variant_id: parentVariantId },
      include: {
        child_variant: {
          include: { product: true },
        },
      },
    });
  }

  async setBundleItems(
    ctx: TenantContext,
    parentVariantId: string,
    items: { child_variant_id: string; quantity: number }[],
  ) {
    await this.bundleRepo.setBundleItems(ctx, parentVariantId, items);
  }

  /**
   * Index a product document for search (products include their variants so
   * facets like price/attributes keep working).
   */
  private async indexProduct(ctx: TenantContext, productId: string) {
    const product = await this.productRepo.findUnique(ctx, productId);
    if (!product) return;
    const variants = await this.variantRepo.findMany(ctx, {
      where: { product_id: productId },
    });

    await this.searchIndexer.upsert(ctx.tenantId, 'products', {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      status: product.status,
      category_id: product.category_id,
      price_min_cents: variants.length
        ? Math.min(...variants.map((v) => v.price_cents))
        : null,
      currency: variants[0]?.currency ?? 'USD',
      variants: variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        price_cents: v.price_cents,
        attributes_json: v.attributes_json,
      })),
    });
  }

  /** Index a category document for search. */
  private async indexCategory(ctx: TenantContext, categoryId: string) {
    const category = await this.categoryRepo.findUnique(ctx, categoryId);
    if (!category) return;

    await this.searchIndexer.upsert(ctx.tenantId, 'categories', {
      id: category.id,
      name: category.name,
      slug: category.slug,
      parent_id: category.parent_id,
    });
  }
}
