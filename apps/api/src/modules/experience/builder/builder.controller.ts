import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { GetTenantContext } from '../../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../../platform/auth/guards/tenant-auth.guard';
import { Permissions } from '../../../platform/auth/decorators/permissions.decorator';

@Controller('v1/experience/builder/pages')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Get(':key')
  // No auth guard for storefront reads
  async getPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string
  ) {
    return this.builderService.getPageLayout(ctx, pageKey);
  }

  @Put(':key')
  @UseGuards(TenantAuthGuard)
  @Permissions('builder.write')
  async updatePageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
    @Body('sectionsJson') sectionsJson: any,
  ) {
    return this.builderService.updatePageLayout(ctx, pageKey, sectionsJson);
  }
}
