import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { ComponentMetadata, PlanTier } from '@commerceos/shared-types';

@Injectable()
export class BuilderService {
  constructor(private readonly layoutRepo: PageLayoutRepository) {}

  async getPageLayout(ctx: TenantContext, pageKey: string) {
    const layout = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!layout) {
      throw new NotFoundException(`Page layout for '${pageKey}' not found`);
    }
    return layout;
  }

  private validatePlanRequirements(node: any, tenantPlan: string) {
    if (!node) return;

    if (node.component) {
      const meta = ComponentMetadata[node.component];
      if (meta?.minPlan) {
        const planWeight: Record<string, number> = {
          trial: 0,
          starter: 1,
          pro: 2,
          enterprise: 3,
        };
        const tenantWeight = planWeight[tenantPlan] ?? 0;
        const requiredWeight = planWeight[meta.minPlan] ?? 0;

        if (tenantWeight < requiredWeight) {
          throw new ForbiddenException(
            `Component '${node.component}' requires ${meta.minPlan} plan or higher.`,
          );
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        this.validatePlanRequirements(child, tenantPlan);
      }
    }
  }

  async updatePageLayout(
    ctx: TenantContext,
    pageKey: string,
    sectionsJson: any,
    publish: boolean = false,
  ) {
    this.validatePlanRequirements(sectionsJson, ctx.plan);

    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    const prisma = (this.layoutRepo as any).prisma;

    const data: any = { sections_json: sectionsJson };
    if (publish) {
      data.published_at = new Date();
    }

    if (existing) {
      return prisma.pageLayout.update({
        where: {
          tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
        },
        data,
      });
    } else {
      return this.layoutRepo.create(ctx, {
        page_key: pageKey,
        sections_json: sectionsJson,
        published_at: publish ? new Date() : null,
      });
    }
  }

  async publishPageLayout(ctx: TenantContext, pageKey: string) {
    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!existing) {
      throw new NotFoundException(`Page layout for '${pageKey}' not found`);
    }
    const prisma = (this.layoutRepo as any).prisma;
    return prisma.pageLayout.update({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
      },
      data: { published_at: new Date() },
    });
  }

  async unpublishPageLayout(ctx: TenantContext, pageKey: string) {
    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!existing) {
      throw new NotFoundException(`Page layout for '${pageKey}' not found`);
    }
    const prisma = (this.layoutRepo as any).prisma;
    return prisma.pageLayout.update({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
      },
      data: { published_at: null },
    });
  }
}
