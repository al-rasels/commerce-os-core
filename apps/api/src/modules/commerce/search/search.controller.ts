import { Controller, Get, Query, Req, Param } from '@nestjs/common';
import { SearchService } from './search.service';
import type { Request } from 'express';

/**
 * Tenant-scoped search over Meilisearch.
 *
 * Intentionally public (like the storefront product endpoints): isolation comes
 * from the per-tenant index naming scheme (`tenant_<id>_<resource>`), keyed off
 * the tenant resolved from the request host. Reads only.
 */
@Controller('v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':resource')
  async search(
    @Req() req: Request,
    @Param('resource') resource: string,
    @Query('q') query: string,
    @Query('limit') limit?: string,
  ) {
    const tenantId = (req as any).tenantContext.tenantId;

    const results = await this.searchService.search(
      tenantId,
      resource,
      query || '',
      {
        limit: limit ? parseInt(limit, 10) : 20,
      },
    );

    return results;
  }
}