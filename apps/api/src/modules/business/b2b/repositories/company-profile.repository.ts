import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { CompanyProfile } from '@prisma/client';

@Injectable()
export class CompanyProfileRepository extends TenantScopedRepository<CompanyProfile> {
  constructor(prisma: PrismaService) {
    super(prisma, 'companyProfile');
  }
}
