import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { TenantAuthGuard } from '../auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { PermissionGuard } from '../auth/guards/permission.guard';

@Controller('v1/super-admin')
@UseGuards(TenantAuthGuard, PermissionGuard)
@RequirePermissions('super_admin') // Only super_admin role can access
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('tenants')
  async listTenants() {
    return this.adminService.listTenants();
  }

  @Get('tenants/:id')
  async getTenant(@Param('id') id: string) {
    return this.adminService.getTenant(id);
  }

  @Post('tenants')
  async provisionTenant(
    @Body() data: { name: string; domain: string; plan_id: string },
  ) {
    return this.adminService.provisionTenant(data);
  }

  @Patch('tenants/:id/plan')
  async updatePlan(
    @Param('id') id: string,
    @Body('plan_id') planId: string,
  ) {
    return this.adminService.updateTenantPlan(id, planId);
  }

  @Patch('tenants/:id/flags')
  async toggleFlag(
    @Param('id') id: string,
    @Body() data: { key: string; is_enabled: boolean },
  ) {
    return this.adminService.toggleFeatureFlag(id, data.key, data.is_enabled);
  }

  @Post('tenants/:id/suspend')
  async suspendTenant(@Param('id') id: string) {
    return this.adminService.suspendTenant(id);
  }
}
