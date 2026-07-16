import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../tenant.service';

@Injectable()
export class HostResolverMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;

    const ctx = await this.tenantService.resolveTenant(host);

    req['resolvedTenantId'] = ctx.tenantId;
    req['resolvedDomain'] = host;
    req['tenantContext'] = ctx;
    next();
  }
}
