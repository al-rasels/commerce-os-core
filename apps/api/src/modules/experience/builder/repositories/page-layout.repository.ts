import { Injectable } from '@nestjs/common';
import { PageLayout } from '@prisma/client';
import { TenantScopedRepository } from '../../../../common/repositories/tenant-scoped.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class PageLayoutRepository extends TenantScopedRepository<PageLayout> {
  constructor(prisma: PrismaService) {
    super(prisma, 'pageLayout');
  }

  // Override to handle composite key (tenant_id + page_key) safely
  async findByPageKey(ctx: any, pageKey: string): Promise<PageLayout | null> {
    const results = await this.findMany(ctx, { page_key: pageKey });
    return results.length > 0 ? results[0] : null;
  }
}
