import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './order-item.repository';
import { AuditLogModule } from '../../platform/audit-log/audit-log.module';

@Module({
  imports: [AuditLogModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
  exports: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
