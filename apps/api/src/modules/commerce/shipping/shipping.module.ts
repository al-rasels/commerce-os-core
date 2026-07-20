import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ShippingRuleRepository } from './shipping-rule.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthModule } from '../../platform/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ShippingController],
  providers: [ShippingService, ShippingRuleRepository],
  exports: [ShippingService],
})
export class ShippingModule {}
