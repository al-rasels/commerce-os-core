import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PromotionRepository } from './promotion.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '../../platform/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionRepository],
  exports: [PromotionsService],
})
export class PromotionsModule {}
