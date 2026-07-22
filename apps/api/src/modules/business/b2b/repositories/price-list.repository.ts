import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PriceList } from '@prisma/client';

@Injectable()
export class PriceListRepository extends TenantScopedRepository<PriceList> {
  constructor(prisma: PrismaService) {
    super(prisma, 'priceList');
  }
}
