import { Injectable, ConflictException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { TenantContext } from '../../../common/decorators/tenant-context.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CatalogService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async createProduct(ctx: any, dto: CreateProductDto) {
    const existing = await this.productRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Product with this slug already exists');
    }
    return this.productRepo.create(ctx, dto);
  }

  async listProducts(ctx: any) {
    return this.productRepo.findMany(ctx);
  }

  async createCategory(ctx: any, dto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findMany(ctx, { slug: dto.slug });
    if (existing.length > 0) {
      throw new ConflictException('Category with this slug already exists');
    }
    return this.categoryRepo.create(ctx, dto);
  }

  async listCategories(ctx: any) {
    return this.categoryRepo.findMany(ctx);
  }
}
