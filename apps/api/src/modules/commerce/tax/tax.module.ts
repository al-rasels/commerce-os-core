import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TaxRuleRepository } from './tax-rule.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '../../platform/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TaxController],
  providers: [TaxService, TaxRuleRepository],
  exports: [TaxService],
})
export class TaxModule {}
