import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface TenantJobPayload {
  tenantId: string;
  [key: string]: any;
}

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue('default') private readonly defaultQueue: Queue) {}

  /**
   * Enqueues a job on the default queue.
   * STRICT ENFORCEMENT: Every job MUST include a valid tenantId.
   */
  async enqueueTenantJob(jobName: string, payload: TenantJobPayload) {
    if (!payload.tenantId) {
      this.logger.error(`Failed to enqueue job ${jobName}: missing tenantId`);
      throw new Error(`Queue boundary violation: missing tenantId in job ${jobName}`);
    }
    
    await this.defaultQueue.add(jobName, payload);
    this.logger.log(`Enqueued job ${jobName} for tenant ${payload.tenantId}`);
  }
}
