import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SearchSyncJobPayload } from './search-sync.worker';

/**
 * Thin producer for the `search_sync` queue. Services call these helpers after
 * mutating catalog/experience data; the SearchSyncWorker applies the change to
 * a tenant-scoped Meilisearch index.
 */
@Injectable()
export class SearchIndexer {
  constructor(
    @InjectQueue('search_sync') private readonly queue: Queue<SearchSyncJobPayload>,
  ) {}

  async upsert(
    tenantId: string,
    resource: SearchSyncJobPayload['resource'],
    document: any,
  ): Promise<void> {
    await this.add('upsert', tenantId, resource, { document });
  }

  async remove(
    tenantId: string,
    resource: SearchSyncJobPayload['resource'],
    documentId: string,
  ): Promise<void> {
    await this.add('delete', tenantId, resource, { documentId });
  }

  private async add(
    action: 'upsert' | 'delete',
    tenantId: string,
    resource: SearchSyncJobPayload['resource'],
    extra: Partial<SearchSyncJobPayload>,
  ): Promise<void> {
    if (!tenantId) return;
    await this.queue.add(action, { tenantId, resource, action, ...extra });
  }
}