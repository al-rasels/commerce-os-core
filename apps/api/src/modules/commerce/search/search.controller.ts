import { Controller, Get, Query, Req, UseGuards, Param } from '@nestjs/common';
import { SearchService } from './search.service';
import { TenantAuthGuard } from '../../platform/auth/guards/tenant-auth.guard';
import type { Request } from 'express';

@Controller('v1/search')
@UseGuards(TenantAuthGuard)
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
    
    const results = await this.searchService.search(tenantId, resource, query || '', {
      limit: limit ? parseInt(limit, 10) : 20,
    });
    
    return results;
  }
}
