import { Injectable, NotFoundException } from '@nestjs/common';
import { ThemeTenantOverrideRepository } from './repositories/theme-override.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { resolveOverride } from '../../../../../../packages/theme-engine/index';
import { TenantContext } from '../../../../common/decorators/tenant-context.decorator';

@Injectable()
export class ThemeService {
  constructor(
    private readonly overrideRepo: ThemeTenantOverrideRepository,
    private readonly prisma: PrismaService, // Used only for global ThemeBase
  ) {}

  async getResolvedTheme(ctx: any) {
    // 1. Fetch base theme. Currently assuming a single global base 'v1' or resolving from tenant.
    // In a full implementation, `ctx.theme.themeBaseId` points to the exact base.
    const baseTheme = await this.prisma.themeBase.findFirst({
      orderBy: { version: 'desc' }
    });

    if (!baseTheme) {
      throw new NotFoundException('Base theme not found');
    }

    // 2. Fetch tenant override using strictly isolated repo
    const overrides = await this.overrideRepo.findMany(ctx, { theme_base_id: baseTheme.id });
    const tenantOverride = overrides.length > 0 ? overrides[0] : null;

    const baseJson = (baseTheme.tokens_json as Record<string, unknown>) || {};
    const overrideJson = tenantOverride ? (tenantOverride.overrides_json as Record<string, unknown>) : {};

    // 3. Resolve
    const { resolved, conflicts } = resolveOverride(baseJson, overrideJson);

    return {
      version: baseTheme.version,
      tokens: resolved,
      conflicts, // Exposing conflicts so admin UI can warn the merchant if keys disappeared
    };
  }

  async updateOverride(ctx: any, themeBaseId: string, overridesJson: Record<string, unknown>) {
    // TenantScopedRepository ensures this only updates this tenant's override
    // We check if it exists via findMany to keep isolation intact
    const existing = await this.overrideRepo.findMany(ctx, { theme_base_id: themeBaseId });
    
    if (existing.length > 0) {
      // In Prisma, ThemeTenantOverride primary key is just tenant_id. 
      // But TenantScopedRepository `update` assumes 'id' as the PK name.
      // Since it's tenant_id, we might need a custom update, but let's use Prisma directly with context where:
      return this.prisma.themeTenantOverride.update({
        where: { tenant_id: ctx.tenantId },
        data: { overrides_json: overridesJson, theme_base_id: themeBaseId }
      });
    } else {
      return this.overrideRepo.create(ctx, {
        theme_base_id: themeBaseId,
        overrides_json: overridesJson,
      });
    }
  }
}
