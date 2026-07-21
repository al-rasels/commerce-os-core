import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

jest.setTimeout(30000);

describe('Checkout Tenant Isolation (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let tenantAId: string;
  let tenantBId: string;
  let cartAId: string;
  let cartBId: string;
  let tokenForA: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('STRIPE_CLIENT')
      .useValue({
        paymentIntents: {
          create: jest.fn().mockResolvedValue({ client_secret: 'pi_secret_test_mock' }),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();

    // Create test tenants
    const tenantA = await prisma.tenant.create({
      data: { name: 'Checkout Tenant A', status: 'active' },
    });
    const tenantB = await prisma.tenant.create({
      data: { name: 'Checkout Tenant B', status: 'active' },
    });
    tenantAId = tenantA.id;
    tenantBId = tenantB.id;

    // Map domains
    await prisma.tenantDomain.create({
      data: { tenant_id: tenantAId, domain: 'checkout-a.test' },
    });
    await prisma.tenantDomain.create({
      data: { tenant_id: tenantBId, domain: 'checkout-b.test' },
    });

    // Seed Tenant A: customer, product, variant, open cart with items
    const customerA = await prisma.customer.create({
      data: { tenant_id: tenantAId, email: 'a@test.com' },
    });
    const productA = await prisma.product.create({
      data: { tenant_id: tenantAId, name: 'Product A', slug: 'product-a', status: 'active' },
    });
    const variantA = await prisma.productVariant.create({
      data: {
        tenant_id: tenantAId,
        product_id: productA.id,
        sku: 'SKU-A',
        price_cents: 2999,
        currency: 'USD',
        stock_available: 100,
      },
    });
    const cartA = await prisma.cart.create({
      data: { tenant_id: tenantAId, customer_id: customerA.id, status: 'open' },
    });
    await prisma.cartItem.create({
      data: { tenant_id: tenantAId, cart_id: cartA.id, variant_id: variantA.id, quantity: 2 },
    });
    cartAId = cartA.id;

    // Seed Tenant B: customer, product, variant, open cart with items
    const customerB = await prisma.customer.create({
      data: { tenant_id: tenantBId, email: 'b@test.com' },
    });
    const productB = await prisma.product.create({
      data: { tenant_id: tenantBId, name: 'Product B', slug: 'product-b', status: 'active' },
    });
    const variantB = await prisma.productVariant.create({
      data: {
        tenant_id: tenantBId,
        product_id: productB.id,
        sku: 'SKU-B',
        price_cents: 1999,
        currency: 'USD',
        stock_available: 50,
      },
    });
    const cartB = await prisma.cart.create({
      data: { tenant_id: tenantBId, customer_id: customerB.id, status: 'open' },
    });
    await prisma.cartItem.create({
      data: { tenant_id: tenantBId, cart_id: cartB.id, variant_id: variantB.id, quantity: 1 },
    });
    cartBId = cartB.id;

    // Mint a reusable token for Tenant A
    tokenForA = jwtService.sign({
      sub: 'user-a',
      tenant_id: tenantAId,
    });
  });

  afterAll(async () => {
    if (!prisma) return;
    // Cleanup Tenant B
    await prisma.cartItem.deleteMany({ where: { cart: { tenant_id: tenantBId } } });
    await prisma.stockReservation.deleteMany({ where: { tenant_id: tenantBId } });
    await prisma.orderItem.deleteMany({ where: { order: { tenant_id: tenantBId } } });
    await prisma.order.deleteMany({ where: { tenant_id: tenantBId } });
    await prisma.cart.deleteMany({ where: { tenant_id: tenantBId } });
    await prisma.productVariant.deleteMany({ where: { tenant_id: tenantBId } });
    await prisma.product.deleteMany({ where: { tenant_id: tenantBId } });
    await prisma.customer.deleteMany({ where: { tenant_id: tenantBId } });

    // Cleanup Tenant A
    await prisma.cartItem.deleteMany({ where: { cart: { tenant_id: tenantAId } } });
    await prisma.stockReservation.deleteMany({ where: { tenant_id: tenantAId } });
    await prisma.orderItem.deleteMany({ where: { order: { tenant_id: tenantAId } } });
    await prisma.order.deleteMany({ where: { tenant_id: tenantAId } });
    await prisma.cart.deleteMany({ where: { tenant_id: tenantAId } });
    await prisma.productVariant.deleteMany({ where: { tenant_id: tenantAId } });
    await prisma.product.deleteMany({ where: { tenant_id: tenantAId } });
    await prisma.customer.deleteMany({ where: { tenant_id: tenantAId } });

    // Cleanup domains and tenants
    await prisma.tenantDomain.deleteMany({
      where: { tenant_id: { in: [tenantAId, tenantBId] } },
    });
    await prisma.tenant.deleteMany({
      where: { id: { in: [tenantAId, tenantBId] } },
    });
    await app.close();
  });

  describe('happy path', () => {
    it('completes checkout for own cart', async () => {
      const res = await request(app.getHttpServer())
        .post('/v1/commerce/checkout')
        .set('Host', 'checkout-a.test')
        .set('Authorization', `Bearer ${tokenForA}`)
        .send({ cart_id: cartAId })
        .expect(201);

      expect(res.body.order).toBeDefined();
      expect(res.body.order.tenant_id).toBe(tenantAId);
      expect(res.body.order.status).toBe('pending');
      expect(res.body.order.total_cents).toBeGreaterThan(0);
      expect(res.body.client_secret).toBe('pi_secret_test_mock');
    });
  });

  describe('tenant isolation', () => {
    it('rejects a token minted for a different tenant', async () => {
      await request(app.getHttpServer())
        .post('/v1/commerce/checkout')
        .set('Host', 'checkout-b.test')
        .set('Authorization', `Bearer ${tokenForA}`)
        .send({ cart_id: cartBId })
        .expect(403);
    });

    it('rejects checkout of a cross-tenant cart ID', async () => {
      await request(app.getHttpServer())
        .post('/v1/commerce/checkout')
        .set('Host', 'checkout-a.test')
        .set('Authorization', `Bearer ${tokenForA}`)
        .send({ cart_id: cartBId })
        .expect(404);
    });
  });
});
