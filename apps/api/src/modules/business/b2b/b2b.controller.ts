import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/business/b2b')
@UseGuards(TenantAuthGuard)
export class B2bController {
  @Get('companies')
  getCompanies(@GetTenantContext() ctx: TenantContext) {
    return [];
  }

  @Get('price-lists')
  getPriceLists(@GetTenantContext() ctx: TenantContext) {
    return [];
  }
}
