import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TenantService } from './tenant.service';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({ isGlobal: true, ttl: 300_000 }),
  ],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
