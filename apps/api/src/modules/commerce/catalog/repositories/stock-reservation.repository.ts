import { Injectable } from '@nestjs/common';
import { StockReservation } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class StockReservationRepository extends TenantScopedRepository<StockReservation> {
  constructor(prisma: PrismaService) {
    super(prisma, 'stockReservation');
  }
}
