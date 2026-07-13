import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CategoryRepository extends TenantScopedRepository<Category> {
  constructor(prisma: PrismaService) {
    super(prisma, 'category');
  }
}
