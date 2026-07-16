import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OrderRepository extends TenantScopedRepository<Order> {
  constructor(prisma: PrismaService) {
    super(prisma, 'order');
  }
}
