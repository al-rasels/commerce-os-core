import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';

@Controller('v1/experience/theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  // No auth guard here, storefront needs to fetch theme without admin JWT (or use a public API key, simplifying for now)
  async getTheme(@GetTenantContext() ctx: TenantContext) {
    return this.themeService.getResolvedTheme(ctx);
  }

  @Put('override')
  @UseGuards(TenantAuthGuard)
  @RequirePermissions('theme.write')
  async updateOverride(
    @GetTenantContext() ctx: TenantContext,
    @Body('themeBaseId') themeBaseId: string,
    @Body('overridesJson') overridesJson: any,
  ) {
    return this.themeService.updateOverride(ctx, themeBaseId, overridesJson);
  }
}
