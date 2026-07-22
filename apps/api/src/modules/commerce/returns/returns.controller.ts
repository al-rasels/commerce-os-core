import { Controller, Get, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { ReturnsService } from './returns.service';

@Controller('v1/commerce/returns')
@UseGuards(TenantAuthGuard)
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Get()
  async getReturns(@GetTenantContext() ctx: TenantContext) {
    return this.returnsService.getReturns(ctx);
  }
}
