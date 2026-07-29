import { Module } from '@nestjs/common';
import { ReturnsController } from './returns.controller';
import { ReturnsService } from './returns.service';
import { ReturnsRepository } from './repositories/returns.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

import { PaymentsModule } from '../payments/payments.module';
import { InventoryModule } from '../inventory/inventory.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [PrismaModule, PaymentsModule, InventoryModule, OrderModule],
  controllers: [ReturnsController],
  providers: [ReturnsService, ReturnsRepository],
})
export class ReturnsModule {}
