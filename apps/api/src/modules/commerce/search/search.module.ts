import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchSyncWorker } from './search-sync.worker';
import { SearchIndexer } from './search-indexer';

@Module({
  imports: [BullModule.registerQueue({ name: 'search_sync' })],
  providers: [SearchService, SearchSyncWorker, SearchIndexer],
  controllers: [SearchController],
  exports: [SearchService, SearchIndexer],
})
export class SearchModule {}