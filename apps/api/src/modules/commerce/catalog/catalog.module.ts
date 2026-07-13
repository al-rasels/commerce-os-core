import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/category.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogController],
  providers: [CatalogService, ProductRepository, CategoryRepository],
  exports: [CatalogService],
})
export class CatalogModule {}
