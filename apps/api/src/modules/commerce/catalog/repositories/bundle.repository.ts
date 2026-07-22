import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { ProductBundleItem } from '@prisma/client';
import { TenantContext } from '../../../../modules/platform/tenant/tenant-context';

@Injectable()
export class BundleRepository extends TenantScopedRepository<ProductBundleItem> {
  constructor(prisma: PrismaService) {
    super(prisma, 'productBundleItem');
  }

  async setBundleItems(
    ctx: TenantContext,
    parentVariantId: string,
    items: { child_variant_id: string; quantity: number }[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Delete all existing items for this bundle, scoped to tenant
      await tx.productBundleItem.deleteMany({
        where: {
          tenant_id: ctx.tenantId,
          parent_variant_id: parentVariantId,
        },
      });

      // 2. Insert new items
      if (items.length > 0) {
        await tx.productBundleItem.createMany({
          data: items.map((item) => ({
            tenant_id: ctx.tenantId,
            parent_variant_id: parentVariantId,
            child_variant_id: item.child_variant_id,
            quantity: item.quantity,
          })),
        });
      }
    });
  }
}
