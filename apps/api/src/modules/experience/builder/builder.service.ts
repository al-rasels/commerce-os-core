import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import {
  ComponentMetadata,
  PlanTier,
  BuilderNodeSchema,
} from '@commerceos/shared-types';
import { z } from 'zod';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BuilderService {
  constructor(private readonly layoutRepo: PageLayoutRepository) {}

  async getPageLayout(
    ctx: TenantContext,
    pageKey: string,
    draft: boolean = false,
    canReadDraft: boolean = false,
  ) {
    const readDraft = draft && canReadDraft;
    const key = readDraft ? `${pageKey}:draft` : pageKey;
    let layout = await this.layoutRepo.findByPageKey(ctx, key);

    // Fallback: If draft doesn't exist, try getting the published version
    if (!layout && readDraft) {
      layout = await this.layoutRepo.findByPageKey(ctx, pageKey);
    }

    if (!layout) {
      // Return a default empty layout so the editor can start fresh
      return { page_key: pageKey, sections_json: [], published_at: null };
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
    // 0. Validate Schema (sections are an array of nodes)
    const parseResult = z
      .array(BuilderNodeSchema as any)
      .safeParse(sectionsJson);
    if (!parseResult.success) {
      throw new BadRequestException(
        'Invalid page layout schema: ' + parseResult.error.message,
      );
    }

    for (const section of sectionsJson) {
      this.validatePlanRequirements(section, ctx.plan);
    }
    const prisma = (this.layoutRepo as any).prisma;

    // 1. Always update/create the DRAFT version
    const draftKey = `${pageKey}:draft`;
    const existingDraft = await this.layoutRepo.findByPageKey(ctx, draftKey);

    if (existingDraft) {
      await prisma.pageLayout.update({
        where: {
          tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: draftKey },
        },
        data: {
          sections_json: sectionsJson,
          published_at: publish ? new Date() : null,
        },
      });
    } else {
      await this.layoutRepo.create(ctx, {
        page_key: draftKey,
        sections_json: sectionsJson,
        published_at: publish ? new Date() : null,
      });
    }

    // 2. If publishing, also update/create the PUBLISHED version
    if (publish) {
      const existingPublished = await this.layoutRepo.findByPageKey(
        ctx,
        pageKey,
      );
      if (existingPublished) {
        await prisma.pageLayout.update({
          where: {
            tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
          },
          data: { sections_json: sectionsJson, published_at: new Date() },
        });
      } else {
        await this.layoutRepo.create(ctx, {
          page_key: pageKey,
          sections_json: sectionsJson,
          published_at: new Date(),
        });
      }
    }

    return { success: true };
  }

  async publishPageLayout(ctx: TenantContext, pageKey: string) {
    const draftKey = `${pageKey}:draft`;
    const draft = await this.layoutRepo.findByPageKey(ctx, draftKey);
    if (!draft) {
      throw new NotFoundException(`Draft for '${pageKey}' not found`);
    }

    const prisma = (this.layoutRepo as any).prisma;

    // Update draft to published
    await prisma.pageLayout.update({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: draftKey },
      },
      data: { published_at: new Date() },
    });

    // Copy to published record
    const existingPublished = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (existingPublished) {
      return prisma.pageLayout.update({
        where: {
          tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
        },
        data: { sections_json: draft.sections_json, published_at: new Date() },
      });
    } else {
      return this.layoutRepo.create(ctx, {
        page_key: pageKey,
        sections_json: draft.sections_json,
        published_at: new Date(),
      });
    }
  }

  async unpublishPageLayout(ctx: TenantContext, pageKey: string) {
    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!existing) {
      throw new NotFoundException(`Page layout for '${pageKey}' not found`);
    }
    const prisma = (this.layoutRepo as any).prisma;

    await prisma.pageLayout.update({
      where: {
        tenant_id_page_key: {
          tenant_id: ctx.tenantId,
          page_key: `${pageKey}:draft`,
        },
      },
      data: { published_at: null },
    });

    return prisma.pageLayout.update({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
      },
      data: { published_at: null },
    });
  }
}
