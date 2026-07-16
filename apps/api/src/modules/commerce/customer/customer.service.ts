import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async create(ctx: TenantContext, dto: CreateCustomerDto) {
    const existing = await this.customerRepo.findMany(ctx, {
      where: { email: dto.email },
    });
    if (existing.length > 0) {
      throw new ConflictException('Customer with this email already exists');
    }
    return this.customerRepo.create(ctx, dto);
  }

  async list(ctx: TenantContext) {
    return this.customerRepo.findMany(ctx, { orderBy: { created_at: 'desc' } });
  }

  async get(ctx: TenantContext, id: string) {
    const customer = await this.customerRepo.findUnique(ctx, id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(ctx: TenantContext, id: string, data: Partial<CreateCustomerDto>) {
    await this.get(ctx, id);
    return this.customerRepo.update(ctx, id, data);
  }

  async remove(ctx: TenantContext, id: string) {
    await this.get(ctx, id);
    return this.customerRepo.softDelete(ctx, id);
  }
}
