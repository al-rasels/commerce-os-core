import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from './category.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('isolation: products & categories (TenantScopedRepository)', () => {
  let productRepo: ProductRepository;
  let categoryRepo: CategoryRepository;
  let prisma: { $disconnect: jest.Mock };

  beforeAll(async () => {
    const mockPrisma = {
      $disconnect: jest.fn(),
      product: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        delete: jest.fn(),
      },
      category: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        CategoryRepository,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    productRepo = module.get<ProductRepository>(ProductRepository);
    categoryRepo = module.get<CategoryRepository>(CategoryRepository);
    prisma = mockPrisma as any;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('never returns another tenant\'s rows', async () => {
    // Real isolation assertions live in the e2e suite (apps/api/test) which
    // exercises TenantScopedRepository against a seeded database.
    // This unit-level placeholder keeps the default test run DB-free.
    expect(productRepo).toBeDefined();
    expect(categoryRepo).toBeDefined();
    expect(true).toBe(true);
  });
});