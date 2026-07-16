import { Injectable } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class CartItemRepository extends TenantScopedRepository<CartItem> {
  constructor(prisma: PrismaService) {
    super(prisma, 'cartItem');
  }
}
