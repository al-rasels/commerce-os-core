import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { InventoryService } from './inventory.service';

@Controller('v1/commerce/inventory')
@UseGuards(TenantAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('locations')
  async getLocations(@GetTenantContext() ctx: TenantContext) {
    return this.inventoryService.getLocations(ctx);
  }

  @Get('locations/:id/levels')
  async getLevels(@GetTenantContext() ctx: TenantContext, @Param('id') locationId: string) {
    return this.inventoryService.getLevels(ctx, locationId);
  }
}
