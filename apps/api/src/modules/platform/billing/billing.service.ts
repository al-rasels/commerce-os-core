import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private stripe: Stripe;
  private readonly baseUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const stripeSecret = this.configService.get<string>('STRIPE_SECRET_KEY') || 'sk_test_mock';
    this.stripe = new Stripe(stripeSecret, {
      apiVersion: '2024-06-20' as any,
    });
    this.baseUrl = this.configService.get<string>('APP_URL') || 'http://localhost:5173';
  }

  async createCheckoutSession(tenantId: string, planId: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new Error('Tenant not found');

    const plan = await this.prisma.plan.findFirst({ where: { name: planId } });

    // Use a generic Stripe Price if actual mapping is not available, 
    // or we can mock a checkout session URL for now if no real prices exist in Stripe
    // For production, planId should map to a real Stripe Price ID
    const priceId = this.configService.get<string>(`STRIPE_PRICE_${planId.toUpperCase()}`);

    if (this.configService.get<string>('NODE_ENV') === 'test' || !priceId) {
      this.logger.log(`Mocking checkout session for tenant ${tenantId} and plan ${planId}`);
      return {
        url: `${this.baseUrl}/super-admin/tenants/${tenantId}?checkout=success&plan=${planId}`,
      };
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: tenantId,
      metadata: {
        tenantId,
        planId,
      },
      success_url: `${this.baseUrl}/super-admin/tenants/${tenantId}?checkout=success`,
      cancel_url: `${this.baseUrl}/super-admin/tenants/${tenantId}?checkout=cancelled`,
    });

    return { url: session.url };
  }

  async getBillingStatus(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new Error('Tenant not found');
    
    // We mock the billing status read because Stripe Customer ID is not stored on the tenant table yet.
    return {
      plan_id: tenant.plan_id,
      status: tenant.status,
      next_invoice_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }
}
