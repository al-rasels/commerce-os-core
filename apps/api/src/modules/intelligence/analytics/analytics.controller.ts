import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/intelligence/analytics')
@UseGuards(TenantAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @RequirePermissions('audit.read')
  async getOverview(
    @GetTenantContext() ctx: TenantContext,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getOverview(ctx.tenantId, query);
  }

  @Get('funnels')
  @RequirePermissions('audit.read')
  async getConversionFunnel(
    @GetTenantContext() ctx: TenantContext,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getConversionFunnel(ctx.tenantId, query);
  }

  @Get('products/top-performing')
  @RequirePermissions('catalog.read')
  async getTopProducts(@GetTenantContext() ctx: TenantContext) {
    return this.analyticsService.getTopProducts(ctx.tenantId);
  }

  @Get('customers/cohorts')
  @RequirePermissions('customers.read')
  async getCustomerCohorts(@GetTenantContext() ctx: TenantContext) {
    return this.analyticsService.getCustomerCohorts(ctx.tenantId);
  }
}
