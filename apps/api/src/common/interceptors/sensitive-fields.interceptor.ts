import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const SENSITIVE_FIELDS = new Set([
  'password_hash',
  'mfa_secret',
  'refresh_tokens',
  'access_token_raw',
  'api_key_raw',
]);

function stripDeep(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(stripDeep);
  }
  if (data && typeof data === 'object') {
    const proto = Object.getPrototypeOf(data);
    if (proto !== Object.prototype && proto !== null) return data;
    const stripped: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (SENSITIVE_FIELDS.has(key)) continue;
      stripped[key] = stripDeep(value);
    }
    return stripped;
  }
  return data;
}

@Injectable()
export class SensitiveFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map(stripDeep));
  }
}
