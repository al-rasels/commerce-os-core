export class TenantContext {
  tenantId: string;
  plan: string;
  effectiveFlags: Set<string>;
  theme: { themeBaseId: string; overrides: Record<string, unknown> };
  locale: string;
  currency: string;
  permissions: string[];
  domain: string;
  storagePrefix: string;

  constructor(data: Partial<TenantContext>) {
    Object.assign(this, data);
  }

  hasFeature(feature: string): boolean {
    return this.effectiveFlags.has(feature);
  }
}
