import { Injectable, NotFoundException } from '@nestjs/common';
import { ThemeTenantOverrideRepository } from './repositories/theme-override.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  resolveOverride,
  ThemeRegistry,
  ThemeBaseId,
} from '@commerceos/theme-engine';
import { TenantContext } from '../../platform/tenant/tenant-context';

@Injectable()
export class ThemeService {
  constructor(
    private readonly overrideRepo: ThemeTenantOverrideRepository,
    private readonly prisma: PrismaService, // Used only for global ThemeBase
  ) {}

  async getResolvedTheme(ctx: TenantContext) {
    // 1. Fetch base theme from ThemeRegistry using context
    const themeBaseId = (ctx.theme?.themeBaseId || 'default') as ThemeBaseId;
    const baseTheme = ThemeRegistry[themeBaseId];

    if (!baseTheme) {
      throw new NotFoundException(
        `Base theme '${themeBaseId}' not found in registry`,
      );
    }

    // 2. Fetch tenant override using strictly isolated repo
    const overrides = await this.overrideRepo.findMany(ctx, {
      where: { theme_base_id: themeBaseId },
    });
    const tenantOverride = overrides.length > 0 ? overrides[0] : null;

    const baseJson = (baseTheme as Record<string, unknown>) || {};
    const overrideJson = tenantOverride
      ? (tenantOverride.overrides_json as Record<string, unknown>)
      : {};

    // 3. Resolve
    const { resolved, conflicts } = resolveOverride(baseJson, overrideJson);

    return {
      id: themeBaseId,
      version: '1.0.0', // Hardcoded version since it's from code now
      tokens: resolved,
      conflicts,
    };
  }

  async updateOverride(
    ctx: TenantContext,
    themeBaseId: string,
    overridesJson: Record<string, unknown>,
  ) {
    // TenantScopedRepository ensures this only updates this tenant's override
    // We check if it exists via findMany to keep isolation intact
    const existing = await this.overrideRepo.findMany(ctx, {
      where: { theme_base_id: themeBaseId },
    });

    if (existing.length > 0) {
      // In Prisma, ThemeTenantOverride primary key is just tenant_id.
      // But TenantScopedRepository `update` assumes 'id' as the PK name.
      // Since it's tenant_id, we might need a custom update, but let's use Prisma directly with context where:
      return this.overrideRepo.updateByTenant(ctx, {
        overrides_json: overridesJson as any,
        theme_base_id: themeBaseId,
      });
    } else {
      return this.overrideRepo.create(ctx, {
        theme_base_id: themeBaseId,
        overrides_json: overridesJson as any,
      });
    }
  }
}
