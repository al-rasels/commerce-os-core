import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ProductRepository extends TenantScopedRepository<Product> {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
  }
}
