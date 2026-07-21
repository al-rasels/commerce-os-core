import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { OrderModule } from '../order/order.module';
import { CustomerModule } from '../customer/customer.module';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [PrismaModule, OrderModule, CustomerModule, CatalogModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
