import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Meilisearch, Index } from 'meilisearch';

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);
  private client: Meilisearch;

  onModuleInit() {
    this.client = new Meilisearch({
      host: process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700',
      apiKey: process.env.MEILISEARCH_KEY || 'masterKey',
    });
    this.logger.log('Meilisearch client initialized');
  }

  /**
   * Helper to get a tenant-isolated index name.
   * e.g., 'tenant_123_products'
   */
  private getTenantIndexName(tenantId: string, resource: string): string {
    return `tenant_${tenantId}_${resource}`;
  }

  /**
   * Upsert documents into a tenant-specific index.
   */
  async indexDocuments(tenantId: string, resource: string, documents: any[]) {
    const indexName = this.getTenantIndexName(tenantId, resource);
    const index = this.client.index(indexName);
    
    await index.addDocuments(documents);
    this.logger.debug(`Indexed ${documents.length} documents into ${indexName}`);
  }

  /**
   * Search documents in a tenant-specific index.
   */
  async search(tenantId: string, resource: string, query: string, options?: any) {
    const indexName = this.getTenantIndexName(tenantId, resource);
    const index = this.client.index(indexName);
    
    return index.search(query, options);
  }

  /**
   * Delete a document from a tenant-specific index.
   */
  async deleteDocument(tenantId: string, resource: string, documentId: string) {
    const indexName = this.getTenantIndexName(tenantId, resource);
    const index = this.client.index(indexName);
    
    await index.deleteDocument(documentId);
  }
}
