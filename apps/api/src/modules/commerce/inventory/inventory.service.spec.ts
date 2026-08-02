import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { InventoryLocationRepository } from './repositories/inventory-location.repository';
import { InventoryLevelRepository } from './repositories/inventory-level.repository';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { v4 as uuidv4 } from 'uuid';

describe('InventoryService', () => {
  let service: InventoryService;
  let prisma: PrismaService;

  const mockCtx = new TenantContext({
    tenantId: uuidv4(),
    domain: 'test.com',
    plan: 'starter',
    effectiveFlags: new Set(),
    theme: { themeBaseId: 'default', overrides: {} },
    locale: 'en-US',
    currency: 'USD',
    permissions: [],
    storagePrefix: 'test/',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: PrismaService,
          useValue: {
            $executeRaw: jest.fn(),
            stockReservation: {
              create: jest.fn().mockResolvedValue({ id: uuidv4() }),
            },
          },
        },
        {
          provide: InventoryLocationRepository,
          useValue: {},
        },
        {
          provide: InventoryLevelRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('allows exactly one of N concurrent reservations to succeed on last unit', async () => {
    const variantId = uuidv4();
    let successCount = 0;

    // Simulate DB atomic behavior: only the first query execution resolves to 1 affected row.
    // The rest return 0 because `stock_available >= qty` fails after the first successful update.
    (prisma.$executeRaw as jest.Mock).mockImplementation(async () => {
      if (successCount === 0) {
        successCount++;
        return 1; // 1 row updated
      }
      return 0; // 0 rows updated
    });

    const attempts = Array.from({ length: 10 }, () =>
      service.reserveStock(mockCtx, variantId, 1),
    );

    const results = await Promise.all(attempts);
    const successfulReservations = results.filter((res) => res !== null);

    expect(successfulReservations).toHaveLength(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.$executeRaw as jest.Mock).toHaveBeenCalledTimes(10);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.stockReservation.create as jest.Mock).toHaveBeenCalledTimes(1);
  });
});
