import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { CustomerModule } from './customer/customer.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { PaymentsModule } from './payments/payments.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StorefrontModule } from '../storefront/storefront.module';
import { ShippingModule } from './shipping/shipping.module';
import { TaxModule } from './tax/tax.module';
import { PromotionsModule } from './promotions/promotions.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReturnsModule } from './returns/returns.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    CatalogModule,
    CustomerModule,
    CartModule,
    OrderModule,
    CheckoutModule,
    PaymentsModule,
    DashboardModule,
    StorefrontModule,
    ShippingModule,
    TaxModule,
    PromotionsModule,
    InventoryModule,
    ReturnsModule,
    SearchModule,
  ],
})
export class CommerceModule {}
