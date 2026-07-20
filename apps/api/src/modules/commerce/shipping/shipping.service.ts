import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingRuleRepository } from './shipping-rule.repository';
import { CreateShippingRuleDto } from './dto/create-shipping-rule.dto';
import { UpdateShippingRuleDto } from './dto/update-shipping-rule.dto';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class ShippingService {
  constructor(private readonly shippingRuleRepo: ShippingRuleRepository) {}

  async listRules(ctx: TenantContext) {
    return this.shippingRuleRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async getRule(ctx: TenantContext, id: string) {
    const rule = (
      await this.shippingRuleRepo.findMany(ctx, { where: { id } })
    )[0];
    if (!rule) throw new NotFoundException('Shipping rule not found');
    return rule;
  }

  async createRule(ctx: TenantContext, data: CreateShippingRuleDto) {
    return this.shippingRuleRepo.create(ctx, data);
  }

  async updateRule(
    ctx: TenantContext,
    id: string,
    data: UpdateShippingRuleDto,
  ) {
    return this.shippingRuleRepo.update(ctx, id, data);
  }

  async deleteRule(ctx: TenantContext, id: string) {
    return this.shippingRuleRepo.delete(ctx, id);
  }

  // Used by checkout to calculate shipping options for a cart
  async calculateShippingOptions(
    ctx: TenantContext,
    orderSubtotalCents: number,
    orderWeight: number,
  ) {
    const activeRules = await this.shippingRuleRepo.findMany(ctx, {
      where: { is_active: true },
    });

    const options = activeRules.map((rule: any) => {
      let price = 0;
      if (rule.type === 'flat_rate') {
        price = rule.config.price_cents || 0;
        // check free shipping threshold
        if (
          rule.config.free_shipping_threshold_cents &&
          orderSubtotalCents >= rule.config.free_shipping_threshold_cents
        ) {
          price = 0;
        }
      } else if (rule.type === 'weight_tier') {
        // Find applicable tier
        const tiers = rule.config.tiers || [];
        const matchedTier = tiers.find(
          (t: any) =>
            orderWeight >= t.min_weight && orderWeight <= t.max_weight,
        );
        price = matchedTier ? matchedTier.price_cents : 0;
      }
      return { id: rule.id, name: rule.name, price_cents: price };
    });

    return options;
  }
}
