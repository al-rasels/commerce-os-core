import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { CustomerModule } from './customer/customer.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [CatalogModule, CustomerModule, CartModule, OrderModule, CheckoutModule, PaymentsModule],
})
export class CommerceModule {}
