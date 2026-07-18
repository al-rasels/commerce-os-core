import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { ThemeTenantOverrideRepository } from './repositories/theme-override.repository';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThemeController],
  providers: [ThemeService, ThemeTenantOverrideRepository],
  exports: [ThemeService],
})
export class ThemeModule {}
