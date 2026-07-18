import { Module } from '@nestjs/common';
import { StorefrontController } from './storefront.controller';
import { StorefrontCartController } from './storefront-cart.controller';
import { StorefrontCheckoutController } from './storefront-checkout.controller';
import { StorefrontOrderController } from './storefront-order.controller';
import { CatalogModule } from '../commerce/catalog/catalog.module';
import { CartModule } from '../commerce/cart/cart.module';
import { CheckoutModule } from '../commerce/checkout/checkout.module';

@Module({
  imports: [CatalogModule, CartModule, CheckoutModule],
  controllers: [StorefrontController, StorefrontCartController, StorefrontCheckoutController, StorefrontOrderController],
})
export class StorefrontModule {}
