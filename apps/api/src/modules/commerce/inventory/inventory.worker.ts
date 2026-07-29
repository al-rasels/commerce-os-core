import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Processor('inventory')
export class InventoryWorker extends WorkerHost {
  private readonly logger = new Logger(InventoryWorker.name);

  constructor(private readonly inventoryService: InventoryService) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name === 'release_expired_reservations') {
      this.logger.debug('Running releaseExpiredReservations job...');
      await this.inventoryService.releaseExpiredReservations();
    }
  }
}
