import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { HostResolverMiddleware } from './tenant/middlewares/host-resolver.middleware';
import { TenantContextMiddleware } from './tenant/middlewares/tenant-context.middleware';
import { TenantService } from './tenant/tenant.service';

@Module({
  imports: [TenantModule, AuthModule, UsersModule, RedisModule, AuditLogModule],
})
export class PlatformModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HostResolverMiddleware, TenantContextMiddleware)
      .forRoutes('*');
  }
}
