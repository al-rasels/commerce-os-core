import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchSyncWorker } from './search-sync.worker';

@Module({
  providers: [SearchService, SearchSyncWorker],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
