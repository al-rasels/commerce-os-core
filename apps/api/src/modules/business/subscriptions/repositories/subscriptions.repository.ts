import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { Subscription } from '@prisma/client';

@Injectable()
export class SubscriptionsRepository extends TenantScopedRepository<Subscription> {
  constructor(prisma: PrismaService) {
    super(prisma, 'subscription');
  }
}
