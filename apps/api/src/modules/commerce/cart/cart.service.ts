import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemRepo: CartItemRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(ctx: TenantContext, dto: CreateCartDto) {
    this.logger.log(`Creating cart for tenant ${ctx.tenantId}`);
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
    const cart = await this.prisma.cart.findFirst({
      where: { id, tenant_id: ctx.tenantId },
      include: { items: { include: { variant: true } } },
    });
    if (!cart) {
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

    const variant = await this.prisma.productVariant.findFirst({
      where: { id: dto.variant_id, tenant_id: ctx.tenantId },
    });

    if (!variant) throw new NotFoundException('Variant not found');
    if (variant.stock_available - variant.stock_reserved < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const existing = await this.cartItemRepo.findMany(ctx, {
      where: { cart_id: cartId, variant_id: dto.variant_id },
    });

    if (existing.length > 0) {
      this.logger.log(`Updating existing cart item in cart ${cartId}`);
      return this.cartItemRepo.update(ctx, existing[0].id, {
        quantity: existing[0].quantity + dto.quantity,
      });
    }

    this.logger.log(`Adding new variant ${dto.variant_id} to cart ${cartId}`);
    return this.cartItemRepo.create(ctx, {
      cart_id: cartId,
      variant_id: dto.variant_id,
      quantity: dto.quantity,
    });
  }

  async updateItem(
    ctx: TenantContext,
    cartId: string,
    itemId: string,
    dto: UpdateItemDto,
  ) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.cartItemRepo.findUnique(ctx, itemId);
    if (!item || item.cart_id !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity === 0) {
      return this.removeItem(ctx, cartId, itemId);
    }

    const variant = await this.prisma.productVariant.findFirst({
      where: { id: item.variant_id, tenant_id: ctx.tenantId },
    });

    if (
      variant &&
      variant.stock_available - variant.stock_reserved < dto.quantity
    ) {
      throw new BadRequestException('Insufficient stock');
    }

    this.logger.log(`Updating quantity of item ${itemId} in cart ${cartId}`);
    return this.cartItemRepo.update(ctx, itemId, { quantity: dto.quantity });
  }

  async removeItem(ctx: TenantContext, cartId: string, itemId: string) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.cartItemRepo.findUnique(ctx, itemId);
    if (!item || item.cart_id !== cartId) {
      throw new NotFoundException('Cart item not found');
    }

    this.logger.log(`Removing item ${itemId} from cart ${cartId}`);
    await this.prisma.cartItem.deleteMany({
      where: { id: itemId, tenant_id: ctx.tenantId },
    });

    return { removed: true };
  }

  async clearCart(ctx: TenantContext, cartId: string) {
    const cart = await this.cartRepo.findUnique(ctx, cartId);
    if (!cart) throw new NotFoundException('Cart not found');

    this.logger.log(`Clearing all items from cart ${cartId}`);
    await this.prisma.cartItem.deleteMany({
      where: { cart_id: cartId, tenant_id: ctx.tenantId },
    });

    return { cleared: true };
  }
}
