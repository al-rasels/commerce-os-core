import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { OrderModule } from '../order/order.module';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsWebhookController } from './payments.webhook.controller';

@Module({
  imports: [PrismaModule, forwardRef(() => OrderModule)],
  controllers: [PaymentsController, PaymentsWebhookController],
  providers: [
    PaymentsService,
    {
      provide: 'STRIPE_CLIENT',
      useFactory: () => {
        const Stripe = require('stripe').default || require('stripe');
        return new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2025-02-24.acacia',
        });
      },
    },
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
