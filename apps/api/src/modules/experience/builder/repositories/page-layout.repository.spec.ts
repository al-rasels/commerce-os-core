import { Test, TestingModule } from '@nestjs/testing';
import { PageLayoutRepository } from './page-layout.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('isolation: page layout (TenantScopedRepository)', () => {
  let layoutRepo: PageLayoutRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageLayoutRepository, PrismaService],
    }).compile();

    layoutRepo = module.get<PageLayoutRepository>(PageLayoutRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const generateUUID = () =>
    '00000000-0000-0000-0000-000000000000'.replace(/0/g, () =>
      (~~(Math.random() * 16)).toString(16),
    );

  it("never returns another tenant's rows", async () => {
    const tenantAId = generateUUID();
    const tenantBId = generateUUID();

    await prisma.tenant.createMany({
      data: [
        { id: tenantAId, name: 'Tenant A' },
        { id: tenantBId, name: 'Tenant B' },
      ],
    });

    const ctxA: any = { tenantId: tenantAId };
    const ctxB: any = { tenantId: tenantBId };

    await layoutRepo.create(ctxA, {
      page_key: 'homepage',
      sections_json: { blocks: [] },
      published_at: new Date(),
    });

    const resultsAsB = await layoutRepo.findMany(ctxB);
    expect(resultsAsB).toHaveLength(0);

    const resultsAsA = await layoutRepo.findMany(ctxA);
    expect(resultsAsA).toHaveLength(1);

    // Cleanup
    await prisma.tenant.deleteMany({
      where: { id: { in: [tenantAId, tenantBId] } },
    });
  });
});
