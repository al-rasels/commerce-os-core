import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '../../../prisma/prisma.service';
import { TenantContext } from './tenant-context';

@Injectable()
export class TenantService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async resolveTenant(hostname: string): Promise<TenantContext> {
    const cacheKey = `tenant:domain:${hostname}`;
    const cached = await this.cacheManager.get<string>(cacheKey);
    if (cached) {
      return new TenantContext(JSON.parse(cached));
    }

    const domainRecord = await this.prisma.tenantDomain.findUnique({
      where: { domain: hostname },
      include: {
        tenant: {
          include: {
            flags: true,
            theme_overrides: { take: 1, orderBy: { updated_at: 'desc' } },
          },
        },
      },
    });

    if (!domainRecord) {
      throw new NotFoundException(`Tenant not found for domain: ${hostname}`);
    }

    const { tenant } = domainRecord;
    const themeOverride = tenant.theme_overrides[0];
    const ctx = new TenantContext({
      tenantId: tenant.id,
      plan: tenant.plan_id,
      effectiveFlags: new Set(
        tenant.flags.filter((f) => f.enabled).map((f) => f.flag_key),
      ),
      theme: themeOverride
        ? {
            themeBaseId: themeOverride.theme_base_id,
            overrides: themeOverride.overrides_json as Record<string, unknown>,
          }
        : { themeBaseId: '', overrides: {} },
      locale: 'en-US',
      currency: 'USD',
      permissions: [],
      domain: hostname,
      storagePrefix: `tenant-${tenant.id}/`,
    });

    await this.cacheManager.set(cacheKey, JSON.stringify(ctx), 300_000);
    return ctx;
  }

  async invalidateCache(hostname: string): Promise<void> {
    await this.cacheManager.del(`tenant:domain:${hostname}`);
  }
}
