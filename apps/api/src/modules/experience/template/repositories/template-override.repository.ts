import { Injectable } from '@nestjs/common';
import { TemplateTenantOverride } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class TemplateOverrideRepository extends TenantScopedRepository<TemplateTenantOverride> {
  constructor(prisma: PrismaService) {
    super(prisma, 'templateTenantOverride');
  }
}
