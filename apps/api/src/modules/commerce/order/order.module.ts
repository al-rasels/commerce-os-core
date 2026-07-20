import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from './order-item.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
  exports: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
