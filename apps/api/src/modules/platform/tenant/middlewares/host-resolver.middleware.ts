import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../tenant.service';
import { TenantContext } from '../tenant-context';

@Injectable()
export class HostResolverMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;

    try {
      const ctx = await this.tenantService.resolveTenant(host);

      req['resolvedTenantId'] = ctx.tenantId;
      req['resolvedDomain'] = host;
      req['tenantContext'] = ctx;
    } catch (err) {
      // In development mode, if we can't resolve a tenant for localhost,
      // fall back to the first available tenant so the app is usable
      if (host === 'localhost' || host === '127.0.0.1') {
        const firstTenant = await this.tenantService.findFirstActiveTenant();
        if (firstTenant) {
          const ctx = new TenantContext({
            tenantId: firstTenant.id,
            plan: firstTenant.plan_id,
            effectiveFlags: new Set(),
            theme: { themeBaseId: '', overrides: {} },
            locale: 'en-US',
            currency: 'USD',
            permissions: [],
            domain: host,
            storagePrefix: `tenant-${firstTenant.id}/`,
          });
          req['resolvedTenantId'] = ctx.tenantId;
          req['resolvedDomain'] = host;
          req['tenantContext'] = ctx;
          return next();
        }
        throw new NotFoundException(`No active tenant found for domain: ${host}`);
      }
      throw err;
    }
    next();
  }
}
