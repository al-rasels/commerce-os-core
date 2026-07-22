import { Injectable } from '@nestjs/common';
import { ReturnsRepository } from './repositories/returns.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class ReturnsService {
  constructor(private readonly returnsRepo: ReturnsRepository) {}

  async getReturns(ctx: TenantContext) {
    return this.returnsRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }
}
