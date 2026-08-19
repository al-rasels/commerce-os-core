import { Module } from '@nestjs/common';
import { ThemeModule } from './theme/theme.module';
import { BuilderModule } from './builder/builder.module';
import { TemplateModule } from './template/template.module';
import { NavigationModule } from './navigation/navigation.module';

@Module({
  imports: [ThemeModule, BuilderModule, TemplateModule, NavigationModule],
})
export class ExperienceModule {}
