import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator.js';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';

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
  @RequirePermissions('builder.write')
  async updatePageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
    @Body('sectionsJson') sectionsJson: any,
    @Body('publish') publish: boolean,
  ) {
    return this.builderService.updatePageLayout(ctx, pageKey, sectionsJson, publish);
  }

  @Post(':key/publish')
  @UseGuards(TenantAuthGuard)
  @RequirePermissions('builder.write')
  async publishPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
  ) {
    return this.builderService.publishPageLayout(ctx, pageKey);
  }

  @Post(':key/unpublish')
  @UseGuards(TenantAuthGuard)
  @RequirePermissions('builder.write')
  async unpublishPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
  ) {
    return this.builderService.unpublishPageLayout(ctx, pageKey);
  }
}
