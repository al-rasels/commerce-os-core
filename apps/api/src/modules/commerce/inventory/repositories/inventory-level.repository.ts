import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { InventoryLevel } from '@prisma/client';

@Injectable()
export class InventoryLevelRepository extends TenantScopedRepository<InventoryLevel> {
  constructor(prisma: PrismaService) {
    super(prisma, 'inventoryLevel');
  }
}
