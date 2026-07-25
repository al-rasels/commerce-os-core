import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const SENSITIVE_FIELDS = new Set(['password_hash', 'mfa_secret']);

function stripSensitive(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(stripSensitive);
  }
  if (data && typeof data === 'object') {
    const stripped = { ...data };
    for (const key of Object.keys(stripped)) {
      if (SENSITIVE_FIELDS.has(key)) {
        delete (stripped as any)[key];
      } else if (typeof (stripped as any)[key] === 'object') {
        (stripped as any)[key] = stripSensitive((stripped as any)[key]);
      }
    }
    return stripped;
  }
  return data;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      const result = await next(params);
      const actions = params.action;
      if (
        actions.startsWith('find') ||
        actions === 'aggregate' ||
        actions === 'groupBy'
      ) {
        return stripSensitive(result);
      }
      return result;
    });
    await this.$connect();
  }
}
