import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TenantContext } from '../../modules/platform/tenant/tenant-context';

export const GetTenantContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TenantContext => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantContext;
  },
);
