import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyProfileRepository } from './repositories/company-profile.repository';
import { PriceListRepository } from './repositories/price-list.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { CreateCompanyDto, UpdateCompanyStatusDto } from './dto/create-company.dto';
import { CreatePriceListDto } from './dto/create-price-list.dto';

@Injectable()
export class B2bService {
  constructor(
    private readonly companyProfileRepo: CompanyProfileRepository,
    private readonly priceListRepo: PriceListRepository,
  ) {}

  async getCompanies(ctx: TenantContext) {
    return this.companyProfileRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async getCompanyById(ctx: TenantContext, id: string) {
    const company = await this.companyProfileRepo.findUnique(ctx, id);
    if (!company) throw new NotFoundException(`Company '${id}' not found`);
    return company;
  }

  async createCompany(ctx: TenantContext, dto: CreateCompanyDto) {
    return this.companyProfileRepo.create(ctx, {
      name: dto.name,
      tax_id: dto.tax_id ?? null,
      credit_limit_cents: (dto.credit_limit ?? 0) * 100,
      payment_terms: 'net30',
      status: 'pending',
    });
  }

  async updateCompanyStatus(ctx: TenantContext, id: string, dto: UpdateCompanyStatusDto) {
    const company = await this.getCompanyById(ctx, id);
    return this.companyProfileRepo.update(ctx, company.id, {
      status: dto.status,
    });
  }

  async getPriceLists(ctx: TenantContext) {
    return this.priceListRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async createPriceList(ctx: TenantContext, dto: CreatePriceListDto) {
    return this.priceListRepo.create(ctx, {
      name: dto.name,
      currency: dto.currency ?? 'USD',
      rules_json: (dto.rules ?? []) as any,
    });
  }
}
