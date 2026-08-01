import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database health
      () => this.prismaHealth.pingCheck('database', this.prisma),
      // Redis health — ping the already-connected RedisService client
      async (): Promise<HealthIndicatorResult> => {
        try {
          const pong = await this.redisService.ping();
          if (pong === 'PONG') {
            return { redis: { status: 'up', message: 'Redis is responsive' } };
          }
          return {
            redis: { status: 'down', message: `Unexpected response: ${pong}` },
          };
        } catch (err) {
          return {
            redis: {
              status: 'down',
              message: (err as Error).message,
            },
          };
        }
      },
    ]);
  }
}
