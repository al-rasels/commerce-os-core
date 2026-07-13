import { Injectable } from '@nestjs/common';
import { ThemeTenantOverride } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../../prisma/prisma.service';

@Injectable()
export class ThemeTenantOverrideRepository extends TenantScopedRepository<ThemeTenantOverride> {
  constructor(prisma: PrismaService) {
    // Model name in prisma schema is themeTenantOverride
    super(prisma, 'themeTenantOverride');
  }
}
