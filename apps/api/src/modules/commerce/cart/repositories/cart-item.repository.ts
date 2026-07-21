import { Injectable } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantContext } from '../../../platform/tenant/tenant-context';

@Injectable()
export class CartItemRepository extends TenantScopedRepository<CartItem> {
  constructor(prisma: PrismaService) {
    super(prisma, 'cartItem');
  }

  async clearByCartId(ctx: TenantContext, cartId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { cart_id: cartId, tenant_id: ctx.tenantId },
    });
  }
}
