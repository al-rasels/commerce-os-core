import { Module } from '@nestjs/common';
import { ThemeModule } from './theme/theme.module';
import { BuilderModule } from './builder/builder.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [ThemeModule, BuilderModule, TemplateModule],
})
export class ExperienceModule {}
