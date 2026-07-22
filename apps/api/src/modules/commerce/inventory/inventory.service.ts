import { Injectable } from '@nestjs/common';
import { InventoryLocationRepository } from './repositories/inventory-location.repository';
import { InventoryLevelRepository } from './repositories/inventory-level.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class InventoryService {
  constructor(
    private readonly locationRepo: InventoryLocationRepository,
    private readonly levelRepo: InventoryLevelRepository,
  ) {}

  async getLocations(ctx: TenantContext) {
    return this.locationRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async getLevels(ctx: TenantContext, locationId: string) {
    return this.levelRepo.findMany(ctx, {
      where: { location_id: locationId },
      orderBy: { created_at: 'desc' },
    });
  }
}
