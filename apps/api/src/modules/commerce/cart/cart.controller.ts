import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/carts')
@UseGuards(TenantAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @RequirePermissions('cart.write')
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateCartDto,
  ) {
    return this.cartService.create(ctx, dto);
  }

  @Get(':id')
  @RequirePermissions('cart.read')
  async get(@GetTenantContext() ctx: TenantContext, @Param('id') id: string) {
    return this.cartService.getWithItems(ctx, id);
  }

  @Post(':id/items')
  @RequirePermissions('cart.write')
  async addItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: AddItemDto,
  ) {
    return this.cartService.addItem(ctx, id, dto);
  }

  @Patch(':id/items/:itemId')
  @RequirePermissions('cart.write')
  async updateItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(ctx, id, itemId, dto);
  }

  @Delete(':id/items/:itemId')
  @RequirePermissions('cart.write')
  async removeItem(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(ctx, id, itemId);
  }

  @Delete(':id/items')
  @RequirePermissions('cart.write')
  async clearCart(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.cartService.clearCart(ctx, id);
  }
}
