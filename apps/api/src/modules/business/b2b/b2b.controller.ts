import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { B2bService } from './b2b.service';

@Controller('v1/business/b2b')
@UseGuards(TenantAuthGuard)
export class B2bController {
  constructor(private readonly b2bService: B2bService) {}

  @Get('companies')
  async getCompanies(@GetTenantContext() ctx: TenantContext) {
    return this.b2bService.getCompanies(ctx);
  }

  @Get('price-lists')
  async getPriceLists(@GetTenantContext() ctx: TenantContext) {
    return this.b2bService.getPriceLists(ctx);
  }
}
