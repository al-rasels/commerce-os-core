import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionRepo: PromotionRepository) {}

  async listPromotions(ctx: TenantContext) {
    return this.promotionRepo.findMany(ctx, {
      orderBy: { created_at: 'desc' },
    });
  }

  async getPromotion(ctx: TenantContext, id: string) {
    const promo = (await this.promotionRepo.findMany(ctx, { where: { id } }))[0];
    if (!promo) throw new NotFoundException('Promotion not found');
    return promo;
  }

  async createPromotion(ctx: TenantContext, data: CreatePromotionDto) {
    return this.promotionRepo.create(ctx, data);
  }

  async updatePromotion(ctx: TenantContext, id: string, data: UpdatePromotionDto) {
    return this.promotionRepo.update(ctx, id, data);
  }

  async deletePromotion(ctx: TenantContext, id: string) {
    return this.promotionRepo.delete(ctx, id);
  }

  async validateAndApply(ctx: TenantContext, code: string, orderSubtotalCents: number) {
    const promo = (await this.promotionRepo.findMany(ctx, { where: { code, is_active: true } }))[0];
    if (!promo) {
      throw new BadRequestException('Invalid or expired coupon code');
    }

    if (promo.expires_at && new Date() > new Date(promo.expires_at)) {
      throw new BadRequestException('Coupon code has expired');
    }

    if (promo.max_uses && promo.uses >= promo.max_uses) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    if (promo.min_order && orderSubtotalCents < promo.min_order) {
      throw new BadRequestException(`Minimum order amount of ${(promo.min_order / 100).toFixed(2)} not met`);
    }

    let discountCents = 0;
    if (promo.type === 'percentage') {
      discountCents = Math.round(orderSubtotalCents * (promo.value / 100));
    } else if (promo.type === 'fixed_amount') {
      discountCents = promo.value;
    }

    // Ensure discount doesn't exceed subtotal
    discountCents = Math.min(discountCents, orderSubtotalCents);

    return {
      id: promo.id,
      code: promo.code,
      discount_cents: discountCents,
    };
  }

  async incrementUsage(ctx: TenantContext, id: string) {
    const promo = await this.getPromotion(ctx, id);
    return this.promotionRepo.update(ctx, id, { uses: promo.uses + 1 });
  }
}
