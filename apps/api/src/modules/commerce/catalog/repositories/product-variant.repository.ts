import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantContext } from '../../../platform/tenant/tenant-context';

@Injectable()
export class ProductVariantRepository extends TenantScopedRepository<ProductVariant> {
  constructor(prisma: PrismaService) {
    super(prisma, 'productVariant');
  }

  async incrementReservedStock(
    ctx: TenantContext,
    variantId: string,
    quantity: number,
  ) {
    const result = await this.prisma.$executeRaw`
      UPDATE product_variants
      SET stock_reserved = stock_reserved + ${quantity}
      WHERE id = ${variantId}::uuid
        AND tenant_id = ${ctx.tenantId}::uuid
        AND (stock_available - stock_reserved) >= ${quantity}
    `;
    return result > 0;
  }
}
