import { Injectable } from '@nestjs/common';
import { PageLayout, Prisma } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantContext } from '../../../../modules/platform/tenant/tenant-context';
import { LAYOUT_VERSION, PageLayoutDocument } from '@commerceos/shared-types';

@Injectable()
export class PageLayoutRepository extends TenantScopedRepository<PageLayout> {
  constructor(prisma: PrismaService) {
    super(prisma, 'pageLayout');
  }

  // Override to handle composite key (tenant_id + page_key) safely
  async findByPageKey(
    ctx: TenantContext,
    pageKey: string,
  ): Promise<PageLayout | null> {
    const results = await this.findMany(ctx, { where: { page_key: pageKey } });
    return results.length > 0 ? results[0] : null;
  }

  async list(ctx: TenantContext): Promise<PageLayout[]> {
    return this.findMany(ctx, { orderBy: { page_key: 'asc' } });
  }

  /** Upsert the working copy. Published copy starts empty until first publish. */
  async saveDraft(
    ctx: TenantContext,
    pageKey: string,
    doc: PageLayoutDocument,
  ): Promise<PageLayout> {
    const jsonVal = doc as unknown as Prisma.InputJsonValue;
    return this.prisma.pageLayout.upsert({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
      },
      update: {
        draft_json: jsonVal,
      },
      create: {
        tenant_id: ctx.tenantId,
        page_key: pageKey,
        draft_json: jsonVal,
        published_json: {
          version: LAYOUT_VERSION,
          nodes: [],
        } as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /** Atomic publish: copy draft_json → published_json in one UPDATE. */
  async publish(ctx: TenantContext, pageKey: string): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE "page_layouts"
      SET "published_json" = "draft_json", "published_at" = NOW(), "updated_at" = NOW()
      WHERE "tenant_id" = ${ctx.tenantId} AND "page_key" = ${pageKey}
    `;
  }

  /** Clear the published copy so the public GET 404s. */
  async unpublish(ctx: TenantContext, pageKey: string): Promise<void> {
    await this.prisma.pageLayout.update({
      where: {
        tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey },
      },
      data: {
        published_at: null,
      },
    });
  }
}
