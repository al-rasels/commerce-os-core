import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { Role } from '@prisma/client';

@Injectable()
export class RoleRepository extends TenantScopedRepository<Role> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'role');
  }
}
