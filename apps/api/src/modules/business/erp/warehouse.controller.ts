import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { WarehouseService, CreateWarehouseDto, InitiateStockTransferDto } from './warehouse.service';

@Controller('v1/business/erp/warehouses')
@UseGuards(TenantAuthGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async listWarehouses(@GetTenantContext() ctx: TenantContext) {
    return this.warehouseService.listWarehouses(ctx);
  }

  @Post()
  async createWarehouse(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateWarehouseDto,
  ) {
    return this.warehouseService.createWarehouse(ctx, dto);
  }

  @Post('transfers')
  async initiateStockTransfer(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: InitiateStockTransferDto,
  ) {
    return this.warehouseService.initiateStockTransfer(ctx, dto);
  }
}
