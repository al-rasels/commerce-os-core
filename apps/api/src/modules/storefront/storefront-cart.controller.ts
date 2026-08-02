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
import { GetTenantContext } from '../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../platform/tenant/tenant-context';
import { AddItemDto } from '../commerce/cart/dto/add-item.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('v1/storefront/cart')
export class StorefrontCartController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart(
    @GetTenantContext() ctx: TenantContext,
    @Body('session_id') sessionId: string,
  ) {
    const service = this.prismaService as any;
    return service.cart.create({
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
    const service = this.prismaService as any;
    const cart = await service.cart.findFirst({
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
    const service = this.prismaService as any;
    const cart = await service.cart.findFirst({
      where: { id: cartId, tenant_id: ctx.tenantId },
    });
    if (!cart) return { error: 'Cart not found' };

    const variant = await service.productVariant.findUnique({
      where: { id: dto.variant_id },
    });
    if (!variant) return { error: 'Variant not found' };
    if (variant.stock_available - variant.stock_reserved < dto.quantity) {
      return { error: 'Insufficient stock' };
    }

    const existing = await service.cartItem.findFirst({
      where: { cart_id: cartId, variant_id: dto.variant_id },
    });

    if (existing) {
      return service.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity },
      });
    }

    return service.cartItem.create({
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
    const service = this.prismaService as any;

    if (quantity === 0) {
      await service.cartItem.delete({ where: { id: itemId } });
      return { removed: true };
    }

    return service.cartItem.update({
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
    const service = this.prismaService as any;
    await service.cartItem.delete({ where: { id: itemId } });
    return { removed: true };
  }
}
