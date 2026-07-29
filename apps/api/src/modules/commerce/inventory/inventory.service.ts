import { Injectable } from '@nestjs/common';
import { InventoryLocationRepository } from './repositories/inventory-location.repository';
import { InventoryLevelRepository } from './repositories/inventory-level.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { PrismaService } from '../../../prisma/prisma.service';

const RESERVATION_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class InventoryService {
  constructor(
    private readonly locationRepo: InventoryLocationRepository,
    private readonly levelRepo: InventoryLevelRepository,
    private readonly prisma: PrismaService,
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

  async reserveStock(ctx: TenantContext, variantId: string, qty: number): Promise<string | null> {
    const result = await this.prisma.$executeRaw`
      UPDATE product_variants
      SET stock_available = stock_available - ${qty},
          stock_reserved = stock_reserved + ${qty}
      WHERE id = ${variantId}::uuid
        AND tenant_id = ${ctx.tenantId}::uuid
        AND stock_available >= ${qty}
    `;
    
    if (result === 0) return null;

    const reservation = await this.prisma.stockReservation.create({
      data: {
        tenant_id: ctx.tenantId,
        variant_id: variantId,
        quantity: qty,
        expires_at: new Date(Date.now() + RESERVATION_TTL_MS),
      },
    });
    return reservation.id;
  }

  async releaseExpiredReservations() {
    const expired = await this.prisma.stockReservation.findMany({
      where: { order_id: null, expires_at: { lt: new Date() } },
    });
    for (const res of expired) {
      await this.prisma.$transaction([
        this.prisma.productVariant.update({
          where: { id: res.variant_id },
          data: { stock_available: { increment: res.quantity }, stock_reserved: { decrement: res.quantity } },
        }),
        this.prisma.stockReservation.delete({ where: { id: res.id } }),
      ]);
    }
  }

  async confirmReservation(ctx: TenantContext, reservationId: string, orderId: string) {
    await this.prisma.stockReservation.update({
      where: { id: reservationId, tenant_id: ctx.tenantId },
      data: { order_id: orderId },
    });
  }

  async releaseReservation(ctx: TenantContext, reservationId: string) {
    const res = await this.prisma.stockReservation.findUnique({
      where: { id: reservationId, tenant_id: ctx.tenantId },
    });
    if (!res) return;

    await this.prisma.$transaction([
      this.prisma.productVariant.update({
        where: { id: res.variant_id },
        data: { stock_available: { increment: res.quantity }, stock_reserved: { decrement: res.quantity } },
      }),
      this.prisma.stockReservation.delete({ where: { id: reservationId } }),
    ]);
  }
}
