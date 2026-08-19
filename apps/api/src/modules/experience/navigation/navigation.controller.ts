import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { NavigationService, NavigationTree } from './navigation.service';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/experience/navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  async getNavigation(@GetTenantContext() ctx: TenantContext) {
    return this.navigationService.getNavigationTree(ctx.tenantId);
  }

  @Put()
  @UseGuards(TenantAuthGuard)
  @RequirePermissions('builder.write')
  async updateNavigation(
    @GetTenantContext() ctx: TenantContext,
    @Body() body: NavigationTree,
  ) {
    return this.navigationService.updateNavigationTree(ctx.tenantId, body);
  }
}
