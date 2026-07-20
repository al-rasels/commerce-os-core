import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisOptions, Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private microserviceHealth: MicroserviceHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database health
      () => this.prismaHealth.pingCheck('database', this.prisma),
      // Redis health
      () =>
        this.microserviceHealth.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
          },
        }),
    ]);
  }
}
