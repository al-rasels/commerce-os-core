import { Injectable, NotFoundException } from '@nestjs/common';
import { TaxRuleRepository } from './tax-rule.repository';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { UpdateTaxRuleDto } from './dto/update-tax-rule.dto';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class TaxService {
  constructor(private readonly taxRuleRepo: TaxRuleRepository) {}

  async listRules(ctx: TenantContext) {
    return this.taxRuleRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async getRule(ctx: TenantContext, id: string) {
    const rule = (await this.taxRuleRepo.findMany(ctx, { where: { id } }))[0];
    if (!rule) throw new NotFoundException('Tax rule not found');
    return rule;
  }

  async createRule(ctx: TenantContext, data: CreateTaxRuleDto) {
    return this.taxRuleRepo.create(ctx, data);
  }

  async updateRule(ctx: TenantContext, id: string, data: UpdateTaxRuleDto) {
    return this.taxRuleRepo.update(ctx, id, data);
  }

  async deleteRule(ctx: TenantContext, id: string) {
    return this.taxRuleRepo.delete(ctx, id);
  }

  // Used by checkout to calculate tax for a given subtotal and destination region
  async calculateTax(
    ctx: TenantContext,
    orderSubtotalCents: number,
    region?: string,
  ) {
    const activeRules = await this.taxRuleRepo.findMany(ctx, {
      where: { is_active: true },
    });

    let taxAmountCents = 0;
    const appliedRules: Array<{ id: string; name: string; rate: number; amount_cents: number }> = [];

    for (const rule of activeRules as any[]) {
      if (
        rule.type === 'flat' ||
        (rule.type === 'region' && rule.region === region)
      ) {
        const taxForRule = Math.round(orderSubtotalCents * (rule.rate / 100));
        taxAmountCents += taxForRule;
        appliedRules.push({
          id: rule.id,
          name: rule.name,
          rate: rule.rate,
          amount_cents: taxForRule,
        });
      }
    }

    return {
      total_tax_cents: taxAmountCents,
      breakdown: appliedRules,
    };
  }
}
