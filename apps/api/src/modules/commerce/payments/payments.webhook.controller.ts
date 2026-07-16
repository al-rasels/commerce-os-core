import { Controller, Post, Req, Headers, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import type { Request } from 'express';

@Controller('v1/commerce/payments')
export class PaymentsWebhookController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const raw = (req as any).rawBody || Buffer.from(JSON.stringify(req.body));
    const buf = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
    return this.paymentsService.handleWebhook(buf, signature);
  }
}
