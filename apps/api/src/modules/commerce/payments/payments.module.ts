import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsWebhookController } from './payments.webhook.controller';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [PaymentsController, PaymentsWebhookController],
  providers: [
    PaymentsService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => {
        const Stripe = require('stripe');
        return new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2025-02-24.acacia',
        });
      },
    },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
