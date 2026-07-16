import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { TenantScopedRepository } from '../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CustomerRepository extends TenantScopedRepository<Customer> {
  constructor(prisma: PrismaService) {
    super(prisma, 'customer');
  }
}
