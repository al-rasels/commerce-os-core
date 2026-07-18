import { Injectable, NotFoundException } from '@nestjs/common';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';

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

  async updatePageLayout(ctx: TenantContext, pageKey: string, sectionsJson: any, publish: boolean = false) {
    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    const prisma = (this.layoutRepo as any).prisma;

    const data: any = { sections_json: sectionsJson };
    if (publish) {
      data.published_at = new Date();
    }

    if (existing) {
      return prisma.pageLayout.update({
        where: { tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey } },
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
      where: { tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey } },
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
      where: { tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey } },
      data: { published_at: null },
    });
  }
}
