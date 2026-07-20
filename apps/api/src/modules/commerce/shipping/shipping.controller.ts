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
import { ShippingService } from './shipping.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { CreateShippingRuleDto } from './dto/create-shipping-rule.dto';
import { UpdateShippingRuleDto } from './dto/update-shipping-rule.dto';

@Controller('v1/commerce/shipping-rules')
@UseGuards(TenantAuthGuard, PermissionGuard)
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  @RequirePermissions('shipping.read')
  async list(@GetTenantContext() ctx: TenantContext) {
    return this.shippingService.listRules(ctx);
  }

  @Get(':id')
  @RequirePermissions('shipping.read')
  async get(@GetTenantContext() ctx: TenantContext, @Param('id') id: string) {
    return this.shippingService.getRule(ctx, id);
  }

  @Post()
  @RequirePermissions('shipping.write')
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() data: CreateShippingRuleDto,
  ) {
    return this.shippingService.createRule(ctx, data);
  }

  @Patch(':id')
  @RequirePermissions('shipping.write')
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() data: UpdateShippingRuleDto,
  ) {
    return this.shippingService.updateRule(ctx, id, data);
  }

  @Delete(':id')
  @RequirePermissions('shipping.write')
  async remove(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.shippingService.deleteRule(ctx, id);
  }
}
