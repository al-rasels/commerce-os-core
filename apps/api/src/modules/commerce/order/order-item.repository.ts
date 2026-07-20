import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OrderItemRepository extends TenantScopedRepository<OrderItem> {
  constructor(prisma: PrismaService) {
    super(prisma, 'orderItem');
  }
}
