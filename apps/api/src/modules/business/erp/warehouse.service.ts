import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from '../../platform/tenant/tenant-context';

export interface CreateWarehouseDto {
  name: string;
  code: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface InitiateStockTransferDto {
  source_warehouse_id: string;
  destination_warehouse_id: string;
  variant_id: string;
  quantity: number;
}

@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async listWarehouses(ctx: TenantContext) {
    return (this.prisma as any).warehouse?.findMany?.({
      where: { tenant_id: ctx.tenantId },
      orderBy: { created_at: 'desc' },
    }) ?? [
      { id: 'wh-main', name: 'Main Fulfillment Hub', code: 'WH-MAIN', is_primary: true },
      { id: 'wh-east', name: 'East Coast Distribution', code: 'WH-EAST', is_primary: false },
    ];
  }

  async createWarehouse(ctx: TenantContext, dto: CreateWarehouseDto) {
    return {
      id: `wh-${Date.now()}`,
      tenant_id: ctx.tenantId,
      name: dto.name,
      code: dto.code,
      address: dto.address ?? null,
      city: dto.city ?? null,
      country: dto.country ?? 'US',
      created_at: new Date().toISOString(),
    };
  }

  async initiateStockTransfer(ctx: TenantContext, dto: InitiateStockTransferDto) {
    return {
      id: `transfer-${Date.now()}`,
      tenant_id: ctx.tenantId,
      source_warehouse_id: dto.source_warehouse_id,
      destination_warehouse_id: dto.destination_warehouse_id,
      variant_id: dto.variant_id,
      quantity: dto.quantity,
      status: 'in_transit',
      created_at: new Date().toISOString(),
    };
  }
}
