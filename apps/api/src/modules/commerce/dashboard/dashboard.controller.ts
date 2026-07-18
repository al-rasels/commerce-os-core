import { Controller, Get, UseGuards } from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard'
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator'
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator'
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/dashboard')
@UseGuards(TenantAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @RequirePermissions('order.read')
  async stats(@GetTenantContext() ctx: TenantContext) {
    return this.dashboardService.getStats(ctx)
  }
}
