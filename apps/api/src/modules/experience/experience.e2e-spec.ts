import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';

describe('ExperienceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects an update request without a valid JWT', async () => {
    return request(app.getHttpServer())
      .put('/v1/experience/theme/override')
      .set('Host', 'tenant1.localhost')
      .send({ themeBaseId: 'fake-id', overridesJson: {} })
      .expect(401); // Unauthorized
  });

  it('allows fetching a theme without auth (public Storefront API)', async () => {
    // Should return 404 because no base theme exists, not 401
    return request(app.getHttpServer())
      .get('/v1/experience/theme')
      .set('Host', 'tenant1.localhost')
      .expect(404);
  });
});
