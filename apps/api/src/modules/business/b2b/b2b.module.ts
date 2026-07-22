import { Module } from '@nestjs/common';
import { B2bController } from './b2b.controller';
import { B2bService } from './b2b.service';
import { CompanyProfileRepository } from './repositories/company-profile.repository';
import { PriceListRepository } from './repositories/price-list.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [B2bController],
  providers: [B2bService, CompanyProfileRepository, PriceListRepository],
})
export class B2bModule {}
