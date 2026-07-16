import { Injectable } from '@nestjs/common';
import { AuditLog } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AuditLogRepository extends TenantScopedRepository<AuditLog> {
  constructor(prisma: PrismaService) {
    super(prisma, 'auditLog');
  }
}
