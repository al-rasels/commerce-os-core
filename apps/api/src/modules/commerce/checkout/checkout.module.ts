import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CartModule } from '../cart/cart.module';
import { OrderModule } from '../order/order.module';
import { PaymentsModule } from '../payments/payments.module';
import { CatalogModule } from '../catalog/catalog.module';
import { ShippingModule } from '../shipping/shipping.module';
import { TaxModule } from '../tax/tax.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { AuditLogModule } from '../../platform/audit-log/audit-log.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    CartModule,
    OrderModule,
    PaymentsModule,
    CatalogModule,
    ShippingModule,
    TaxModule,
    PromotionsModule,
    AuditLogModule,
    InventoryModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
