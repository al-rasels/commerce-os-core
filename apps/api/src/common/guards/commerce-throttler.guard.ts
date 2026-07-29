import { Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';

const TIER_LIMITS: Record<string, { limit: number; ttl: number }> = {
  guest: { limit: 20, ttl: 60000 },
  member: { limit: 60, ttl: 60000 },
  admin: { limit: 200, ttl: 60000 },
};

function getUserTier(req: Record<string, any>): string {
  const user = req.user as { sub?: string; permissions?: string[] } | undefined;
  if (!user?.sub) return 'guest';
  const perms = user.permissions ?? [];
  if (perms.includes('*') || perms.includes('admin.*')) return 'admin';
  return 'member';
}

@Injectable()
export class CommerceThrottlerGuard extends ThrottlerGuard {
  protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const { context, limit, ttl, throttler, blockDuration, getTracker, generateKey } = requestProps;
    const { req, res } = this.getRequestResponse(context);

    const tier = getUserTier(req);
    const tierConfig = TIER_LIMITS[tier] ?? TIER_LIMITS.guest;
    const isCustom = limit !== 60 || ttl !== 60000;
    const effectiveLimit = isCustom ? limit : (tierConfig.limit ?? limit);
    const effectiveTtl = isCustom ? ttl : (tierConfig.ttl ?? ttl);

    const tracker = await getTracker(req, context);
    const throttlerKey = throttler.name ?? 'default';
    const key = generateKey(context, tracker, throttlerKey);

    const { totalHits, timeToExpire, isBlocked, timeToBlockExpire } =
      await this.storageService.increment(key, effectiveTtl, effectiveLimit, blockDuration, throttlerKey);

    const suffix = throttlerKey === 'default' ? '' : `-${throttlerKey}`;

    if (isBlocked) {
      res.header(`Retry-After${suffix}`, timeToBlockExpire);
      await this.throwThrottlingException(context, {
        limit: effectiveLimit,
        ttl: effectiveTtl,
        key,
        tracker,
        totalHits,
        timeToExpire,
        isBlocked,
        timeToBlockExpire,
      });
    }

    res.header(`${this.headerPrefix}-Limit${suffix}`, effectiveLimit);
    res.header(`${this.headerPrefix}-Remaining${suffix}`, Math.max(0, effectiveLimit - totalHits));
    res.header(`${this.headerPrefix}-Reset${suffix}`, timeToExpire);

    return true;
  }
}
