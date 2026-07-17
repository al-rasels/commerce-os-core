import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { AddItemDto } from '../commerce/cart/dto/add-item.dto';

@Controller('v1/storefront/cart')
export class StorefrontCartController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart(
    @GetTenantContext() ctx: TenantContext,
    @Body('session_id') sessionId: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service')).PrismaService;
    const service = new prisma();
    return (service as any).cart.create({
      data: {
        tenant_id: ctx.tenantId,
        session_id: sessionId,
        status: 'open',
      },
    });
  }

  @Get()
  async getCart(
    @GetTenantContext() ctx: TenantContext,
    @Query('session_id') sessionId: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service')).PrismaService;
    const service = new prisma();
    const cart = await (service as any).cart.findFirst({
      where: { tenant_id: ctx.tenantId, session_id: sessionId, status: 'open' },
      include: { items: { include: { variant: true } } },
    });
    return cart ?? { items: [] };
  }

  @Post(':cartId/items')
  @HttpCode(HttpStatus.OK)
  async addItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Body() dto: AddItemDto,
  ) {
    const prisma = (await import('../../prisma/prisma.service')).PrismaService;
    const service = new prisma();
    const cart = await (service as any).cart.findFirst({
      where: { id: cartId, tenant_id: ctx.tenantId },
    });
    if (!cart) return { error: 'Cart not found' };

    const variant = await (service as any).productVariant.findUnique({
      where: { id: dto.variant_id },
    });
    if (!variant) return { error: 'Variant not found' };
    if (variant.stock_available - variant.stock_reserved < dto.quantity) {
      return { error: 'Insufficient stock' };
    }

    const existing = await (service as any).cartItem.findFirst({
      where: { cart_id: cartId, variant_id: dto.variant_id },
    });

    if (existing) {
      return (service as any).cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }

    return (service as any).cartItem.create({
      data: {
        cart_id: cartId,
        variant_id: dto.variant_id,
        quantity: dto.quantity,
      },
    });
  }

  @Patch(':cartId/items/:itemId')
  @HttpCode(HttpStatus.OK)
  async updateItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    const prisma = (await import('../../prisma/prisma.service')).PrismaService;
    const service = new prisma();

    if (quantity === 0) {
      await (service as any).cartItem.delete({ where: { id: itemId } });
      return { removed: true };
    }

    return (service as any).cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }

  @Delete(':cartId/items/:itemId')
  @HttpCode(HttpStatus.OK)
  async removeItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ) {
    const prisma = (await import('../../prisma/prisma.service')).PrismaService;
    const service = new prisma();
    await (service as any).cartItem.delete({ where: { id: itemId } });
    return { removed: true };
  }
}
