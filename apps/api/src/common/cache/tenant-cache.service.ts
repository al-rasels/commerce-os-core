import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class TenantCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private generateKey(
    tenantId: string,
    module: string,
    key: string,
    subkey?: string,
  ): string {
    return subkey
      ? `${tenantId}:${module}:${key}:${subkey}`
      : `${tenantId}:${module}:${key}`;
  }

  async get<T>(
    tenantId: string,
    module: string,
    key: string,
    subkey?: string,
  ): Promise<T | undefined> {
    const fullKey = this.generateKey(tenantId, module, key, subkey);
    return this.cacheManager.get<T>(fullKey);
  }

  async set<T>(
    tenantId: string,
    module: string,
    key: string,
    value: T,
    ttl?: number,
    subkey?: string,
  ): Promise<void> {
    const fullKey = this.generateKey(tenantId, module, key, subkey);
    await this.cacheManager.set(fullKey, value, ttl); // ttl in ms depending on cache-manager v5
  }

  async del(
    tenantId: string,
    module: string,
    key: string,
    subkey?: string,
  ): Promise<void> {
    const fullKey = this.generateKey(tenantId, module, key, subkey);
    await this.cacheManager.del(fullKey);
  }
}
