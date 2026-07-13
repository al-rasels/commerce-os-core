import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../../../prisma/prisma.service';
import { TenantContext } from '../tenant-context';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req['resolvedTenantId'];
    if (!tenantId) {
      return next();
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        flags: true,
        theme_overrides: {
          take: 1,
          orderBy: { updated_at: 'desc' }
        }
      }
    });

    if (!tenant) {
      return next();
    }

    // Resolve theme override
    const themeOverride = tenant.theme_overrides[0];
    const theme = themeOverride ? {
      themeBaseId: themeOverride.theme_base_id,
      overrides: themeOverride.overrides_json as Record<string, unknown>
    } : {
      themeBaseId: '', 
      overrides: {}
    };

    req['tenantContext'] = new TenantContext({
      tenantId: tenant.id,
      plan: tenant.plan_id,
      effectiveFlags: new Set(tenant.flags.filter(f => f.enabled).map(f => f.flag_key)),
      theme: theme,
      locale: 'en-US', 
      currency: 'USD', 
      permissions: [], 
      domain: req['resolvedDomain'],
      storagePrefix: `tenant-${tenant.id}/`
    });

    next();
  }
}