import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CartRepository extends TenantScopedRepository<Cart> {
  constructor(prisma: PrismaService) {
    super(prisma, 'cart');
  }
}
