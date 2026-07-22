import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/business/subscriptions')
@UseGuards(TenantAuthGuard)
export class SubscriptionsController {
  @Get()
  getSubscriptions(@GetTenantContext() ctx: TenantContext) {
    return [];
  }
}
