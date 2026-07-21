import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';

@Injectable()
export class ShippingRuleRepository extends TenantScopedRepository<any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'shipping_rule');
  }
}
