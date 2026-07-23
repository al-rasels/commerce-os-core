import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TemplateService } from '../../experience/template/template.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly templateService: TemplateService,
  ) {}

  async listTenants() {
    this.logger.debug('Fetching tenant list');
    try {
      return await this.prisma.tenant.findMany({
        include: { domains: true },
        orderBy: { created_at: 'desc' },
      });
    } catch (error) {
      this.logger.error('Failed to fetch tenants', error);
      throw new InternalServerErrorException('Failed to fetch tenants');
    }
  }

  async getTenant(tenantId: string) {
    this.logger.debug(`Fetching tenant: ${tenantId}`);
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        domains: true,
        flags: true,
      },
    });

    if (!tenant) {
      this.logger.warn(`Tenant not found: ${tenantId}`);
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async provisionTenant(data: {
    name: string;
    domain: string;
    plan_id: string;
    template_id?: string;
  }) {
    this.logger.log(
      `Provisioning new tenant: ${data.name} with domain ${data.domain}`,
    );

    const existingDomain = await this.prisma.tenantDomain.findUnique({
      where: { domain: data.domain },
    });

    if (existingDomain) {
      this.logger.warn(
        `Provisioning failed: Domain already in use (${data.domain})`,
      );
      throw new ConflictException('Domain already in use');
    }

    try {
      const tenant = await this.prisma.$transaction(async (tx) => {
        const t = await tx.tenant.create({
          data: {
            name: data.name,
            plan_id: data.plan_id,
            status: 'active',
            domains: {
              create: {
                domain: data.domain,
                is_primary: true,
              },
            },
          },
        });

        this.logger.log(`Tenant provisioned successfully: ${t.id}`);
        return t;
      });

      if (data.template_id) {
        await this.templateService.applyTemplate(tenant.id, data.template_id);
      }

      return this.getTenant(tenant.id);
    } catch (error) {
      this.logger.error(`Failed to provision tenant: ${data.name}`, error);
      throw new InternalServerErrorException('Failed to provision tenant');
    }
  }

  async updateTenantPlan(tenantId: string, planId: string) {
    this.logger.log(`Updating tenant ${tenantId} to plan ${planId}`);
    try {
      return await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { plan_id: planId },
      });
    } catch (error) {
      this.logger.error(`Failed to update plan for tenant ${tenantId}`, error);
      throw new InternalServerErrorException('Failed to update tenant plan');
    }
  }

  async toggleFeatureFlag(tenantId: string, key: string, isEnabled: boolean) {
    this.logger.log(
      `Toggling feature flag ${key} for tenant ${tenantId} to ${isEnabled}`,
    );
    try {
      const existing = await this.prisma.featureFlag.findFirst({
        where: { tenant_id: tenantId, flag_key: key },
      });

      if (existing) {
        return await this.prisma.featureFlag.update({
          where: { id: existing.id },
          data: { enabled: isEnabled },
        });
      }

      return await this.prisma.featureFlag.create({
        data: {
          tenant_id: tenantId,
          flag_key: key,
          enabled: isEnabled,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to toggle feature flag ${key} for tenant ${tenantId}`,
        error,
      );
      throw new InternalServerErrorException('Failed to toggle feature flag');
    }
  }

  async suspendTenant(tenantId: string) {
    this.logger.warn(`Suspending tenant: ${tenantId}`);
    try {
      return await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { status: 'suspended' },
      });
    } catch (error) {
      this.logger.error(`Failed to suspend tenant ${tenantId}`, error);
      throw new InternalServerErrorException('Failed to suspend tenant');
    }
  }
}
