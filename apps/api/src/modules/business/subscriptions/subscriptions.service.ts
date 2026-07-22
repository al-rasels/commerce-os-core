import { Injectable } from '@nestjs/common';
import { SubscriptionsRepository } from './repositories/subscriptions.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly subscriptionsRepo: SubscriptionsRepository) {}

  async getSubscriptions(ctx: TenantContext) {
    return this.subscriptionsRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }
}
