import { Injectable, NotFoundException } from '@nestjs/common';
import { PageLayoutRepository } from './repositories/page-layout.repository';
import { TenantContext } from '../../../../common/decorators/tenant-context.decorator';

@Injectable()
export class BuilderService {
  constructor(private readonly layoutRepo: PageLayoutRepository) {}

  async getPageLayout(ctx: any, pageKey: string) {
    const layout = await this.layoutRepo.findByPageKey(ctx, pageKey);
    if (!layout) {
      throw new NotFoundException(`Page layout for '${pageKey}' not found`);
    }
    return layout;
  }

  async updatePageLayout(ctx: any, pageKey: string, sectionsJson: any) {
    const existing = await this.layoutRepo.findByPageKey(ctx, pageKey);
    
    if (existing) {
      // Create new version or overwrite? Overwrite for Phase 1.
      // Since PK is composite [tenant_id, page_key], TenantScopedRepository.update is tricky.
      // We will do a safe delete/create or raw prisma scoped update.
      // For now, let's create a custom scoped update method in the repo, but here we'll use a transaction conceptually.
      await this.layoutRepo.softDelete(ctx, pageKey); // if we had a UUID PK.
      // Actually, Prisma create works fine with TenantScopedRepository if we provide the data.
      // But since we can't easily use the generic update, we'll do:
      const prisma = (this.layoutRepo as any).prisma;
      return prisma.pageLayout.update({
        where: { tenant_id_page_key: { tenant_id: ctx.tenantId, page_key: pageKey } },
        data: { sections_json: sectionsJson, published_at: new Date() }
      });
    } else {
      return this.layoutRepo.create(ctx, {
        page_key: pageKey,
        sections_json: sectionsJson,
        published_at: new Date()
      });
    }
  }
}
