import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { InventoryLocation } from '@prisma/client';

@Injectable()
export class InventoryLocationRepository extends TenantScopedRepository<InventoryLocation> {
  constructor(prisma: PrismaService) {
    super(prisma, 'inventoryLocation');
  }
}
