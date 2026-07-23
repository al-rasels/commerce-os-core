import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TemplateOverrideRepository } from './repositories/template-override.repository';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService, TemplateOverrideRepository],
  exports: [TemplateService],
})
export class TemplateModule {}
