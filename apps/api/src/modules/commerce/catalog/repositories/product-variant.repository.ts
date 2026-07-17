import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ProductVariantRepository extends TenantScopedRepository<ProductVariant> {
  constructor(prisma: PrismaService) {
    super(prisma, 'productVariant');
  }
}
