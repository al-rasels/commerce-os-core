import { Injectable, NestMiddleware, InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (!req['tenantContext']) {
      throw new InternalServerErrorException('Tenant context not resolved before middleware');
    }
    next();
  }
}
