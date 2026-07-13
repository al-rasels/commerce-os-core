import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from './category.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantContext } from '../../../../common/decorators/tenant-context.decorator';

describe('isolation: products & categories (TenantScopedRepository)', () => {
  let productRepo: ProductRepository;
  let categoryRepo: CategoryRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepository, CategoryRepository, PrismaService],
    }).compile();

    productRepo = module.get<ProductRepository>(ProductRepository);
    categoryRepo = module.get<CategoryRepository>(CategoryRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const generateUUID = () => '00000000-0000-0000-0000-000000000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));

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

    await productRepo.create(ctxA, { name: 'Product A', slug: 'prod-a-' + tenantAId });
    await categoryRepo.create(ctxA, { name: 'Cat A', slug: 'cat-a-' + tenantAId });

    const resultsProductsAsB = await productRepo.findMany(ctxB);
    const resultsCategoriesAsB = await categoryRepo.findMany(ctxB);

    expect(resultsProductsAsB).toHaveLength(0);
    expect(resultsCategoriesAsB).toHaveLength(0);

    const resultsProductsAsA = await productRepo.findMany(ctxA);
    const resultsCategoriesAsA = await categoryRepo.findMany(ctxA);

    expect(resultsProductsAsA).toHaveLength(1);
    expect(resultsCategoriesAsA).toHaveLength(1);
    
    // Cleanup
    await prisma.tenant.deleteMany({ where: { id: { in: [tenantAId, tenantBId] } } });
  });
});
