import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class HostResolverMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    
    // For local dev, tenanta.localhost -> tenanta.localhost
    const domainRecord = await this.prisma.tenantDomain.findUnique({
      where: { domain: host },
    });

    if (!domainRecord) {
      throw new NotFoundException(`Tenant not found for domain: ${host}`);
    }

    req['resolvedTenantId'] = domainRecord.tenant_id;
    req['resolvedDomain'] = host;
    next();
  }
}