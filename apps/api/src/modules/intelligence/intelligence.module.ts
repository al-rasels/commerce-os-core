import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [AnalyticsModule, RecommendationsModule],
  exports: [AnalyticsModule, RecommendationsModule],
})
export class IntelligenceModule {}
