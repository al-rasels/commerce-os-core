import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private fallback = new Map<string, string>();

  async onModuleInit() {
    try {
      this.client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        retryStrategy: (times) =>
          times > 3 ? null : Math.min(times * 200, 2000),
        lazyConnect: true,
      });
      await this.client.connect();
      this.logger.log('Connected to Redis');
    } catch {
      this.logger.warn(
        'Redis unavailable — using in-memory fallback for refresh tokens',
      );
      this.client = null;
    }
  }

  async onModuleDestroy() {
    await this.client?.quit();
  }

  async set(key: string, value: string, ttlSec: number): Promise<void> {
    if (this.client) {
      await this.client.set(key, value, 'EX', ttlSec);
    } else {
      this.fallback.set(key, value);
      setTimeout(() => this.fallback.delete(key), ttlSec * 1000);
    }
  }

  async get(key: string): Promise<string | null> {
    if (this.client) {
      return this.client.get(key);
    }
    return this.fallback.get(key) ?? null;
  }

  async del(key: string): Promise<void> {
    if (this.client) {
      await this.client.del(key);
    } else {
      this.fallback.delete(key);
    }
  }
}
