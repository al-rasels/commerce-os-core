import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { TenantAuthGuard } from '../auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../tenant/tenant-context';

@Controller('v1/platform/audit-log')
@UseGuards(TenantAuthGuard)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @RequirePermissions('audit.read')
  async list(
    @GetTenantContext() ctx: TenantContext,
    @Query('entity') entity?: string,
  ) {
    return this.auditLogService.list(ctx, entity);
  }
}
