import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import { RequirePermissions } from '../../platform/auth/decorators/permissions.decorator';
import { GetTenantContext } from '../../../common/decorators/tenant-context.decorator';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Controller('v1/commerce/customers')
@UseGuards(TenantAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @RequirePermissions('customers.write')
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customerService.create(ctx, dto);
  }

  @Get()
  @RequirePermissions('customers.read')
  async list(@GetTenantContext() ctx: TenantContext) {
    return this.customerService.list(ctx);
  }

  @Get(':id')
  @RequirePermissions('customers.read')
  async get(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.customerService.get(ctx, id);
  }

  @Patch(':id')
  @RequirePermissions('customers.write')
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customerService.update(ctx, id, dto);
  }

  @Delete(':id')
  @RequirePermissions('customers.write')
  async remove(
    @GetTenantContext() ctx: TenantContext,
    @Param('id') id: string,
  ) {
    return this.customerService.remove(ctx, id);
  }
}
