import { Module } from '@nestjs/common';
import { ThemeModule } from './theme/theme.module';
import { BuilderModule } from './builder/builder.module';

@Module({
  imports: [ThemeModule, BuilderModule],
})
export class ExperienceModule {}
