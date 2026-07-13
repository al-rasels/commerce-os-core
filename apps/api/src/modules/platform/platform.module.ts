import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HostResolverMiddleware } from './tenant/middlewares/host-resolver.middleware';
import { TenantContextMiddleware } from './tenant/middlewares/tenant-context.middleware';

@Module({})
export class PlatformModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HostResolverMiddleware, TenantContextMiddleware)
      .forRoutes('*');
  }
}