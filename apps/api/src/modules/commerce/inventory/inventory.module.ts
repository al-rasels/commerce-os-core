import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryLocationRepository } from './repositories/inventory-location.repository';
import { InventoryLevelRepository } from './repositories/inventory-level.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryLocationRepository, InventoryLevelRepository],
})
export class InventoryModule {}
