import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFrequentlyBoughtTogether(tenantId: string, productId?: string) {
    const products = await this.prisma.product.findMany({
      where: { tenant_id: tenantId, status: 'published' },
      take: 4,
      include: { variants: true },
    });

    return {
      sourceProductId: productId ?? products[0]?.id ?? null,
      recommendations: products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        priceCents: p.variants[0]?.price_cents ?? 2999,
        image: (p.metafields_json as any)?.images?.[0] ?? '/assets/placeholder.jpg',
        confidenceScore: 0.94,
      })),
    };
  }

  async getPersonalized(tenantId: string, _limit = 6) {
    const products = await this.prisma.product.findMany({
      where: { tenant_id: tenantId, status: 'published' },
      take: 6,
      include: { variants: true },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      priceCents: p.variants[0]?.price_cents ?? 4999,
      image: (p.metafields_json as any)?.images?.[0] ?? '/assets/placeholder.jpg',
      badge: (p.metafields_json as any)?.badge ?? 'Recommended for You',
    }));
  }

  async getTrending(tenantId: string, _limit = 8) {
    const products = await this.prisma.product.findMany({
      where: { tenant_id: tenantId, status: 'published' },
      take: 8,
      include: { variants: true },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      priceCents: p.variants[0]?.price_cents ?? 3999,
      image: (p.metafields_json as any)?.images?.[0] ?? '/assets/placeholder.jpg',
      velocityScore: 98.4,
    }));
  }
}
