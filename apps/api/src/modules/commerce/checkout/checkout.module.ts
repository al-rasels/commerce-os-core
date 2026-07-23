import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CartModule } from '../cart/cart.module';
import { OrderModule } from '../order/order.module';
import { PaymentsModule } from '../payments/payments.module';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [CartModule, OrderModule, PaymentsModule, CatalogModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
