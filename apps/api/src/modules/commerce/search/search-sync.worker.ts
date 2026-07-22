import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { SearchService } from './search.service';
import { TenantJobPayload } from '../../platform/queue';

export interface SearchSyncJobPayload extends TenantJobPayload {
  resource: 'products' | 'categories' | 'pages';
  action: 'upsert' | 'delete';
  documentId?: string;
  document?: any;
}

@Processor('search_sync')
export class SearchSyncWorker extends WorkerHost {
  private readonly logger = new Logger(SearchSyncWorker.name);

  constructor(private readonly searchService: SearchService) {
    super();
  }

  async process(job: Job<SearchSyncJobPayload>): Promise<void> {
    const { tenantId, resource, action, documentId, document } = job.data;
    
    if (!tenantId) {
      this.logger.error(`SearchSync failed: Missing tenantId`);
      throw new Error('TenantId is strictly required for isolation');
    }

    this.logger.debug(`Processing search sync for ${resource} ${action}`);

    if (action === 'upsert' && document) {
      await this.searchService.indexDocuments(tenantId, resource, [document]);
    } else if (action === 'delete' && documentId) {
      await this.searchService.deleteDocument(tenantId, resource, documentId);
    }
  }
}
