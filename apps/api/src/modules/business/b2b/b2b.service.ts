import { Injectable } from '@nestjs/common';
import { CompanyProfileRepository } from './repositories/company-profile.repository';
import { PriceListRepository } from './repositories/price-list.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';

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

  async getPriceLists(ctx: TenantContext) {
    return this.priceListRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }
}
