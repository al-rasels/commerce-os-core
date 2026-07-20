import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('Tenant Isolation (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let tenantAId: string;
  let tenantBId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();

    // Create test tenants
    const tenantA = await prisma.tenant.create({ data: { name: 'Tenant A', status: 'active' } });
    const tenantB = await prisma.tenant.create({ data: { name: 'Tenant B', status: 'active' } });
    tenantAId = tenantA.id;
    tenantBId = tenantB.id;

    // Map domains
    await prisma.tenantDomain.create({ data: { tenant_id: tenantAId, domain: 'tenant-a.test' } });
    await prisma.tenantDomain.create({ data: { tenant_id: tenantBId, domain: 'tenant-b.test' } });
  });

  afterAll(async () => {
    await prisma.tenant.deleteMany({ where: { id: { in: [tenantAId, tenantBId] } } });
    await app.close();
  });

  describe('isolation: products', () => {
    it('never returns another tenant\'s rows', async () => {
      // Seed product for B
      await prisma.product.create({
        data: {
          tenant_id: tenantBId,
          title: 'Tenant B Product',
          slug: 'b-product',
          status: 'active'
        }
      });

      const res = await request(app.getHttpServer())
        .get('/v1/commerce/catalog/products')
        .set('Host', 'tenant-a.test');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0); // Should not see B's product
    });
  });

  describe('isolation: cross-tenant tokens', () => {
    it('rejects a token minted for a different tenant', async () => {
      // Mint a valid JWT for Tenant A
      const tokenForA = jwtService.sign({
        sub: 'user-123',
        tenant_id: tenantAId,
        roles: ['admin']
      });

      // Attempt to access a protected route on Tenant B's domain
      const res = await request(app.getHttpServer())
        .get('/v1/commerce/orders') // assumes this requires auth
        .set('Host', 'tenant-b.test')
        .set('Authorization', `Bearer ${tokenForA}`);

      expect(res.status).toBe(403);
    });
  });
});
