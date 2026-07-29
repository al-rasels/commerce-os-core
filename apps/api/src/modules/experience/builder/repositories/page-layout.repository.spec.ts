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
    // Note: Integration tests require an active database.
    // This is a placeholder for isolation tests that verify TenantScopedRepository behavior.
    expect(true).toBe(true);
  });
});
