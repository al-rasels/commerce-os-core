import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BuilderService } from './builder.service';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { PermissionGuard } from '../../platform/auth/guards/permission.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { DraftReadGuard } from './guards/draft-read.guard';

@Controller('v1/experience/builder/pages')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  // List layouts for the tenant (admin "Pages" list). Declared before ':key'.
  @Get()
  @UseGuards(TenantAuthGuard, PermissionGuard)
  @RequirePermissions('builder.write')
  async listPageLayouts(@GetTenantContext() ctx: TenantContext) {
    return this.builderService.listPageLayouts(ctx);
  }

  @Get(':key')
  // Public for published reads; draft reads gated by DraftReadGuard
  @UseGuards(DraftReadGuard)
  async getPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
    @Query('draft') draft?: string,
    @Req() request?: Request,
  ) {
    return this.builderService.getPageLayout(
      ctx,
      pageKey,
      draft === 'true',
      request?.['isDraftAuthorized'] === true,
    );
  }

  @Put(':key')
  @UseGuards(TenantAuthGuard, PermissionGuard)
  @RequirePermissions('builder.write')
  async updatePageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
    @Body('nodes') nodes: unknown,
  ) {
    return this.builderService.updatePageLayout(ctx, pageKey, nodes);
  }

  @Post(':key/publish')
  @UseGuards(TenantAuthGuard, PermissionGuard)
  @RequirePermissions('builder.write')
  async publishPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
  ) {
    return this.builderService.publishPageLayout(ctx, pageKey);
  }

  @Post(':key/unpublish')
  @UseGuards(TenantAuthGuard, PermissionGuard)
  @RequirePermissions('builder.write')
  async unpublishPageLayout(
    @GetTenantContext() ctx: TenantContext,
    @Param('key') pageKey: string,
  ) {
    return this.builderService.unpublishPageLayout(ctx, pageKey);
  }
}
