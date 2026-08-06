import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { applyTemplateData } from './template-apply';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listTemplates() {
    return this.prisma.templateBase.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getTemplate(id: string) {
    const template = await this.prisma.templateBase.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async applyTemplate(tenantId: string, templateId: string) {
    this.logger.log(`Applying template ${templateId} to tenant ${tenantId}`);
    const template = await this.prisma.templateBase.findUnique({
      where: { id: templateId },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const data = template.layout_json as any;

    await this.prisma.$transaction(async (tx) => {
      await applyTemplateData(tx, tenantId, data);

      await tx.templateTenantOverride.upsert({
        where: { tenant_id: tenantId },
        update: { template_base_id: templateId, overrides_json: {} },
        create: {
          tenant_id: tenantId,
          template_base_id: templateId,
          overrides_json: {},
        },
      });
    });

    this.logger.log(`Template ${templateId} applied to tenant ${tenantId}`);
    return { success: true, template: template.id };
  }
}
