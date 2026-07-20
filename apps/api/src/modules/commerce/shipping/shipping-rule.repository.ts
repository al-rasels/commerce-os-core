import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { ShippingRule } from '@prisma/client';

// Note: Ensure that the Prisma client generates the ShippingRule type before accessing it.
// We use 'any' temporarily if the types aren't generated yet.
@Injectable()
export class ShippingRuleRepository extends TenantScopedRepository<ShippingRule> {
  constructor(prisma: PrismaService) {
    super(prisma, 'shippingRule');
  }
}
