import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { ThemeTenantOverrideRepository } from './repositories/theme-override.repository';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TenantModule } from '../../platform/tenant/tenant.module';

@Module({
  imports: [PrismaModule, TenantModule],
  controllers: [ThemeController],
  providers: [ThemeService, ThemeTenantOverrideRepository],
  exports: [ThemeService],
})
export class ThemeModule {}
