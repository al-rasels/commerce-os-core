import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryLocationRepository } from './repositories/inventory-location.repository';
import { InventoryLevelRepository } from './repositories/inventory-level.repository';
import { InventoryWorker } from './inventory.worker';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'inventory',
    }),
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    InventoryLocationRepository,
    InventoryLevelRepository,
    InventoryWorker,
  ],
  exports: [InventoryService],
})
export class InventoryModule implements OnModuleInit {
  constructor(
    @InjectQueue('inventory') private readonly inventoryQueue: Queue,
  ) {}

  async onModuleInit() {
    await this.inventoryQueue.add(
      'release_expired_reservations',
      {},
      {
        repeat: {
          pattern: '* * * * *', // runs every minute
        },
      },
    );
  }
}
