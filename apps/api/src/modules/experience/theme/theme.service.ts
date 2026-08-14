import { Injectable, NotFoundException } from '@nestjs/common';
import { ThemeTenantOverrideRepository } from './repositories/theme-override.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  resolveOverride,
  ThemeRegistry,
  ThemeBaseId,
} from '@commerceos/theme-engine';
import { TenantContext } from '../../platform/tenant/tenant-context';
import { TenantService } from '../../platform/tenant/tenant.service';

@Injectable()
export class ThemeService {
  constructor(
    private readonly overrideRepo: ThemeTenantOverrideRepository,
    private readonly prisma: PrismaService, // Used only for global ThemeBase
    private readonly tenantService: TenantService,
  ) {}

  async getResolvedTheme(ctx: TenantContext) {
    // 1. Determine the base theme registry key. ctx.theme.themeBaseId is a
    //    ThemeBase UUID (set when a tenant override exists) or ''. Resolve a
    //    real UUID back to its registry key (slug); otherwise default.
    const overrideId = ctx.theme?.themeBaseId || '';
    const resolvedKey =
      overrideId && (await this.resolveBaseKey(overrideId));
    const baseKey = (resolvedKey as ThemeBaseId) || 'default';

    const baseTheme = ThemeRegistry[baseKey];

    if (!baseTheme) {
      throw new NotFoundException(
        `Base theme '${baseKey}' not found in registry`,
      );
    }

    // 2. Fetch tenant override using strictly isolated repo. Only query the
    //    UUID column when we actually have a UUID (avoids the 500 caused by
    //    passing a slug like 'default' into a @db.Uuid where clause).
    const overrides = overrideId
      ? await this.overrideRepo.findMany(ctx, {
          where: { theme_base_id: overrideId },
        })
      : [];
    const tenantOverride = overrides.length > 0 ? overrides[0] : null;

    const baseJson = (baseTheme as Record<string, unknown>) || {};
    const overrideJson = tenantOverride
      ? (tenantOverride.overrides_json as Record<string, unknown>)
      : {};

    // 3. Resolve
    const { resolved, conflicts } = resolveOverride(baseJson, overrideJson);

    return {
      id: baseKey,
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
    // The admin sends the registry slug (e.g. 'default') as themeBaseId,
    // matching the `id` returned by getResolvedTheme. Map it to the ThemeBase
    // UUID before writing, since theme_base_id is a @db.Uuid column.
    const base = await this.prisma.themeBase.findUnique({
      where: { key: themeBaseId },
      select: { id: true },
    });

    if (!base) {
      throw new NotFoundException(`Base theme '${themeBaseId}' not found`);
    }

    const existing = await this.overrideRepo.findMany(ctx, {});

    if (existing.length > 0) {
      await this.overrideRepo.updateByTenant(ctx, {
        overrides_json: overridesJson as any,
        theme_base_id: base.id,
      });
    } else {
      await this.overrideRepo.create(ctx, {
        theme_base_id: base.id,
        overrides_json: overridesJson as any,
      });
    }

    // ctx.theme.themeBaseId was resolved (and cached for 300s) BEFORE the
    // write above, so it would still point to '' and the override would never
    // be read back. Invalidate the tenant cache and re-resolve so the returned
    // (and subsequent) resolved theme reflects the persisted override.
    await this.tenantService.invalidateCache(ctx.domain);
    const freshCtx = await this.tenantService.resolveTenant(ctx.domain);
    return this.getResolvedTheme(freshCtx);
  }

  private async resolveBaseKey(
    themeBaseId: string,
  ): Promise<ThemeBaseId | null> {
    const base = await this.prisma.themeBase.findUnique({
      where: { id: themeBaseId },
      select: { key: true },
    });
    return base?.key ? ((base.key as ThemeBaseId) ?? null) : null;
  }
}
