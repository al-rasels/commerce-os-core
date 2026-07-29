import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { StockReservationRepository } from './repositories/stock-reservation.repository';
import { BundleRepository } from './repositories/bundle.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogController],
  providers: [
    CatalogService,
    ProductRepository,
    CategoryRepository,
    ProductVariantRepository,
    StockReservationRepository,
    BundleRepository,
  ],
  exports: [CatalogService, ProductRepository, ProductVariantRepository, BundleRepository],
})
export class CatalogModule {}
