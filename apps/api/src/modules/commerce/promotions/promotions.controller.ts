import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Controller('v1/commerce/promotions')
@UseGuards(TenantAuthGuard, PermissionGuard)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  @RequirePermissions('promotions.read')
  async list(@GetTenantContext() ctx: TenantContext) {
    return this.promotionsService.listPromotions(ctx);
  }

  @Get(':id')
  @RequirePermissions('promotions.read')
  async get(@GetTenantContext() ctx: TenantContext, @Param('id') id: string) {
    return this.promotionsService.getPromotion(ctx, id);
  }

  @Post()
  @RequirePermissions('promotions.write')
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() data: CreatePromotionDto,
  ) {
    return this.promotionsService.createPromotion(ctx, data);
  }

  @Patch(':id')
  @RequirePermissions('promotions.write')
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() data: UpdatePromotionDto,
  ) {
    return this.promotionsService.updatePromotion(ctx, id, data);
  }

  @Delete(':id')
  @RequirePermissions('promotions.write')
  async remove(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.promotionsService.deletePromotion(ctx, id);
  }

  @Post('validate')
  async validate(
    @GetTenantContext() ctx: TenantContext,
    @Body('code') code: string,
    @Body('subtotal_cents') subtotal_cents: number,
  ) {
    return this.promotionsService.validateAndApply(ctx, code, subtotal_cents);
  }
}
