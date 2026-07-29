import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { SubscriptionsService } from './subscriptions.service';

@Controller('v1/business/subscriptions')
@UseGuards(TenantAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  async getSubscriptions(@GetTenantContext() ctx: TenantContext) {
    return this.subscriptionsService.getSubscriptions(ctx);
  }
}
