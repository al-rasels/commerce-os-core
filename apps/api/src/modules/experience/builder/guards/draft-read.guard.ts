import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class DraftReadGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.query.draft !== 'true') {
      return true;
    }

    const secret = request.headers['x-preview-secret'];
    const previewSecret = process.env.PREVIEW_SECRET;
    if (previewSecret && typeof secret === 'string' && secret === previewSecret) {
      request['isDraftAuthorized'] = true;
      return true;
    }

    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-prod',
      });

      if (payload.tenant_id !== request.tenantContext?.tenantId) {
        throw new ForbiddenException('Token minted for a different tenant');
      }

      request['isDraftAuthorized'] = true;
    } catch (e) {
      if (e instanceof ForbiddenException) throw e;
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) return token;
    return request.cookies?.access_token;
  }
}
