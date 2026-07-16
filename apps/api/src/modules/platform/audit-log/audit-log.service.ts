import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './audit-log.repository';
import { TenantContext } from '../tenant/tenant-context';

@Injectable()
export class AuditLogService {
  constructor(private readonly repo: AuditLogRepository) {}

  async log(
    ctx: TenantContext,
    action: string,
    entity: string,
    entityId: string | undefined,
    actorId: string,
    diff?: Record<string, unknown>,
  ) {
    return this.repo.create(ctx, {
      actor_id: actorId,
      action,
      entity,
      entity_id: entityId,
      diff_json: diff || {},
    });
  }

  async list(ctx: TenantContext, entity?: string) {
    const where: any = {};
    if (entity) where.entity = entity;
    return this.repo.findMany(ctx, { where, orderBy: { created_at: 'desc' } });
  }
}
