import { Controller, Get, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/intelligence/recommendations')
export class RecommendationsController {
  constructor(private readonly recsService: RecommendationsService) {}

  @Get('frequently-bought-together')
  async getFrequentlyBoughtTogether(
    @GetTenantContext() ctx: TenantContext,
    @Query('productId') productId?: string,
  ) {
    return this.recsService.getFrequentlyBoughtTogether(ctx.tenantId, productId);
  }

  @Get('personalized')
  async getPersonalized(
    @GetTenantContext() ctx: TenantContext,
    @Query('limit') limit?: number,
  ) {
    return this.recsService.getPersonalized(ctx.tenantId, limit ? Number(limit) : 6);
  }

  @Get('trending')
  async getTrending(
    @GetTenantContext() ctx: TenantContext,
    @Query('limit') limit?: number,
  ) {
    return this.recsService.getTrending(ctx.tenantId, limit ? Number(limit) : 8);
  }
}
