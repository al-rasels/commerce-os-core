import { Controller, Get, Param } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('v1/experience/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async listTemplates() {
    return this.templateService.listTemplates();
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string) {
    return this.templateService.getTemplate(id);
  }
}
