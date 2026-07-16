import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemRepo: CartItemRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(ctx: TenantContext, dto: CreateCartDto) {
    return this.cartRepo.create(ctx, {
      customer_id: dto.customer_id || null,
      session_id: dto.session_id || null,
      status: 'open',
    });
  }

  async get(ctx: TenantContext, id: string) {
    const cart = await this.cartRepo.findUnique(ctx, id);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async getWithItems(ctx: TenantContext, id: string) {
    const cart = await (this.prisma as any).cart.findUnique({
      where: { id },
      include: { items: { include: { variant: true } } },
    });
    if (!cart || cart.tenant_id !== ctx.tenantId) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addItem(ctx: TenantContext, cartId: string, dto: AddItemDto) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');
    if (cart.status !== 'open') {
      throw new BadRequestException('Cart is not open for modifications');
    }

    const variant = await (this.prisma as any).productVariant.findUnique({
      where: { id: dto.variant_id },
    });
    if (!variant) throw new NotFoundException('Variant not found');
    if (variant.stock_available - variant.stock_reserved < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const existing = await this.cartItemRepo.findMany(ctx, {
      where: { cart_id: cartId, variant_id: dto.variant_id },
    });

    if (existing.length > 0) {
      return this.cartItemRepo.update(ctx, existing[0].id, {
        quantity: existing[0].quantity + dto.quantity,
      });
    }

    return this.cartItemRepo.create(ctx, {
      cart_id: cartId,
      variant_id: dto.variant_id,
      quantity: dto.quantity,
    });
  }

  async updateItem(ctx: TenantContext, cartId: string, itemId: string, dto: UpdateItemDto) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.cartItemRepo.findUnique(ctx, itemId);
    if (!item || item.cart_id !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity === 0) {
      return this.removeItem(ctx, cartId, itemId);
    }

    const variant = await (this.prisma as any).productVariant.findUnique({
      where: { id: item.variant_id },
    });
    if (variant && variant.stock_available - variant.stock_reserved < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    return this.cartItemRepo.update(ctx, itemId, { quantity: dto.quantity });
  }

  async removeItem(ctx: TenantContext, cartId: string, itemId: string) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.cartItemRepo.findUnique(ctx, itemId);
    if (!item || item.cart_id !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    await (this.prisma as any).cartItem.delete({ where: { id: itemId } });
    return { removed: true };
  }

  async clearCart(ctx: TenantContext, cartId: string) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    await (this.prisma as any).cartItem.deleteMany({
      where: { cart_id: cartId },
    });
    return { cleared: true };
  }
}
