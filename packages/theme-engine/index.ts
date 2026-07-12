import deepmerge from "deepmerge";

export interface MergeResult<T> {
  resolved: T;
  conflicts: string[]; // dot-paths where base removed a key the override still references
}

export function resolveOverride<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>,
): MergeResult<T> {
  const conflicts: string[] = [];

  // detect conflicts BEFORE merging: override references a path base no longer has
  detectConflicts(base, override, "", conflicts);

  const resolved = deepmerge(base, override, {
    arrayMerge: (target, source) => source, // override arrays replace, never concatenate
  }) as T;

  return { resolved, conflicts };
}

function detectConflicts(base: any, override: any, path: string, conflicts: string[]) {
  for (const key of Object.keys(override ?? {})) {
    const nextPath = path ? `${path}.${key}` : key;
    if (!(key in (base ?? {}))) {
      conflicts.push(nextPath); // override touches a key base no longer defines
      continue;
    }
    if (typeof override[key] === "object" && override[key] !== null && !Array.isArray(override[key])) {
      detectConflicts(base[key], override[key], nextPath, conflicts);
    }
  }
}
