import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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

  async list(
    ctx: TenantContext,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { first_name: { contains: search, mode: 'insensitive' } },
        { last_name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.customerRepo.findMany(ctx, {
        where,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { orders: true } } },
      }),
      this.customerRepo.count(ctx, where),
    ]);

    return { data, total, page, limit };
  }

  async get(ctx: TenantContext, id: string) {
    const customer = await this.customerRepo.findByIdWithOrders(ctx, id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(
    ctx: TenantContext,
    id: string,
    data: Partial<CreateCustomerDto>,
  ) {
    await this.get(ctx, id);
    return this.customerRepo.update(ctx, id, data);
  }

  async remove(ctx: TenantContext, id: string) {
    await this.get(ctx, id);
    return this.customerRepo.softDelete(ctx, id);
  }
}
