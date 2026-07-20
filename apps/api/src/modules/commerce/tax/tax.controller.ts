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
import { TaxService } from './tax.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { UpdateTaxRuleDto } from './dto/update-tax-rule.dto';

@Controller('v1/commerce/tax-rules')
@UseGuards(TenantAuthGuard, PermissionGuard)
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  @RequirePermissions('tax.read')
  async list(@GetTenantContext() ctx: TenantContext) {
    return this.taxService.listRules(ctx);
  }

  @Get(':id')
  @RequirePermissions('tax.read')
  async get(@GetTenantContext() ctx: TenantContext, @Param('id') id: string) {
    return this.taxService.getRule(ctx, id);
  }

  @Post()
  @RequirePermissions('tax.write')
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() data: CreateTaxRuleDto,
  ) {
    return this.taxService.createRule(ctx, data);
  }

  @Patch(':id')
  @RequirePermissions('tax.write')
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() data: UpdateTaxRuleDto,
  ) {
    return this.taxService.updateRule(ctx, id, data);
  }

  @Delete(':id')
  @RequirePermissions('tax.write')
  async remove(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.taxService.deleteRule(ctx, id);
  }
}
