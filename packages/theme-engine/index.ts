import deepmerge from "deepmerge";
import type { DesignTokens } from "@commerceos/design-tokens";

export interface MergeResult<T> {
  resolved: T;
  conflicts: string[];
}

export type TenantTokenOverride = Partial<DesignTokens>;

export function resolveOverride<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>,
): MergeResult<T> {
  const conflicts: string[] = [];

  detectConflicts(base, override, "", conflicts);

  const resolved = deepmerge(base, override, {
    arrayMerge: (_target, source) => source,
  }) as T;

  return { resolved, conflicts };
}

function detectConflicts(base: unknown, override: unknown, path: string, conflicts: string[]) {
  if (override === null || override === undefined) return;
  if (typeof override !== "object") return;
  if (Array.isArray(override)) return;
  if (typeof base !== "object" || base === null) return;
  if (Array.isArray(base)) return;

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const nextPath = path ? `${path}.${key}` : key;
    if (!(key in (base as Record<string, unknown>))) {
      conflicts.push(nextPath);
      continue;
    }
    detectConflicts(
      (base as Record<string, unknown>)[key],
      (override as Record<string, unknown>)[key],
      nextPath,
      conflicts,
    );
  }
}
