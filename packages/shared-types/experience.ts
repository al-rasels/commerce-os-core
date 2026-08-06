import { z } from "zod";

/**
 * Experience engine — page builder contracts.
 *
 * Single source of truth for the page-layout document, the recursive node
 * shape, the HTTP DTO, the visibility-rule DSL, and ingestion normalization.
 * Consumed by the NestJS API (validation + plan gating), the admin editor,
 * and the storefront renderer.
 */

// ---------------------------------------------------------------------------
// Visibility rules (dynamic show/hide evaluated against a data context)
// ---------------------------------------------------------------------------

export const VisibilityRuleSchema = z.object({
  /** DSL expression, e.g. `segment == 'vip'` or `category in ('a','b')`. */
  if: z.string().min(1),
  action: z.enum(["show", "hide"]),
});
export type VisibilityRule = z.infer<typeof VisibilityRuleSchema>;

// ---------------------------------------------------------------------------
// Recursive builder node
// ---------------------------------------------------------------------------

export const BuilderNodeSchema: z.ZodType<
  BuilderNode,
  z.ZodTypeDef,
  unknown
> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    component: z.string().min(1),
    props: z.record(z.unknown()).default({}),
    children: z.array(BuilderNodeSchema).default([]),
    visible: z.boolean().default(true),
    rules: z.array(VisibilityRuleSchema).default([]),
  })
);
export type BuilderNode = {
  id: string;
  component: string;
  props: Record<string, unknown>;
  children: BuilderNode[];
  visible: boolean;
  rules: VisibilityRule[];
};

// ---------------------------------------------------------------------------
// Versioned layout document (persisted form)
// ---------------------------------------------------------------------------

export const LAYOUT_VERSION = 1 as const;

export const PageLayoutDocumentSchema = z.object({
  version: z.literal(LAYOUT_VERSION),
  /** Root nodes (a forest). Children are nested via `node.children`. */
  nodes: z.array(BuilderNodeSchema),
});
export type PageLayoutDocument = z.infer<typeof PageLayoutDocumentSchema>;

// ---------------------------------------------------------------------------
// HTTP DTO
// ---------------------------------------------------------------------------

export type PageLayoutStatus = "draft" | "published";

export const PageLayoutDTOSchema = z.object({
  page_key: z.string().min(1),
  nodes: z.array(BuilderNodeSchema),
  version: z.literal(LAYOUT_VERSION),
  /** Derived from `published_at` — published only once published_at is set. */
  status: z.enum(["draft", "published"]),
  published_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  has_unpublished_changes: z.boolean().default(false),
});
export type PageLayoutDTO = z.infer<typeof PageLayoutDTOSchema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a dot path (e.g. `product.title`) against a data context object. */
export function resolveDataPath(
  path: string,
  data: Record<string, unknown>
): unknown {
  if (!path) return undefined;
  if (path === "$root") return data;
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, data);
}

let __fallbackId = 0;
function generateNodeId(): string {
  if (
    typeof globalThis !== "undefined" &&
    typeof (globalThis as any).crypto?.randomUUID === "function"
  ) {
    return (globalThis as any).crypto.randomUUID();
  }
  __fallbackId += 1;
  return `node_${Date.now().toString(36)}_${__fallbackId.toString(36)}`;
}

/**
 * Coerce legacy page-layout inputs into the canonical versioned document.
 * Accepts:
 *  - a bare `BuilderNode[]`
 *  - `{ nodes: BuilderNode[] }`
 *  - `{ sections_json: BuilderNode[] }` (legacy API row)
 * Backfills `id`, `visible`, `rules`, `props`, `children` on every node so
 * template-applied and seed data (which historically omit `id`) are valid.
 */
export function normalizePageLayout(input: unknown): PageLayoutDocument {
  const raw = Array.isArray(input)
    ? input
    : input && typeof input === "object" && Array.isArray((input as any).nodes)
      ? (input as any).nodes
      : input && typeof input === "object" && Array.isArray((input as any).sections_json)
        ? (input as any).sections_json
        : [];

  return {
    version: LAYOUT_VERSION,
    nodes: raw.map((node: unknown) => normalizeNode(node)),
  };
}

function normalizeNode(node: unknown): BuilderNode {
  if (!node || typeof node !== "object") {
    return {
      id: generateNodeId(),
      component: "",
      props: {},
      children: [],
      visible: true,
      rules: [],
    };
  }
  const n = node as Record<string, unknown>;
  return {
    id: typeof n.id === "string" && n.id.length > 0 ? n.id : generateNodeId(),
    component: typeof n.component === "string" ? n.component : "",
    props:
      n.props && typeof n.props === "object" && !Array.isArray(n.props)
        ? { ...(n.props as Record<string, unknown>) }
        : {},
    children: Array.isArray(n.children)
      ? (n.children as unknown[]).map((child) => normalizeNode(child))
      : [],
    visible: n.visible !== false,
    rules: Array.isArray(n.rules) ? (n.rules as VisibilityRule[]) : [],
  };
}

const RULE_EQ_RE = /^([\w.]+)\s*(==|!=)\s*'([^']*)'$/;
const RULE_IN_RE = /^([\w.]+)\s+in\s+\(([^)]*)\)$/;

function matchRule(expr: string, dataContext: Record<string, unknown>): boolean {
  const eq = expr.match(RULE_EQ_RE);
  if (eq) {
    const actual = resolveDataPath(eq[1], dataContext);
    const target = eq[3];
    return eq[2] === "==" ? String(actual) === target : String(actual) !== target;
  }
  const inMatch = expr.match(RULE_IN_RE);
  if (inMatch) {
    const actual = String(resolveDataPath(inMatch[1], dataContext));
    const allowed = inMatch[2]
      .split(",")
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    return allowed.includes(actual);
  }
  return false;
}

/**
 * Whether a node should render for the given data context.
 * `visible: false` is the author override and short-circuits rule evaluation.
 * A node renders iff visible AND every rule is satisfied
 * (`show` = must match, `hide` = must not match).
 */
export function evaluateRules(
  node: BuilderNode,
  dataContext: Record<string, unknown>
): boolean {
  if (node.visible === false) return false;
  if (!node.rules || node.rules.length === 0) return true;
  for (const rule of node.rules) {
    const matched = matchRule(rule.if, dataContext);
    if (rule.action === "show" && !matched) return false;
    if (rule.action === "hide" && matched) return false;
  }
  return true;
}

function isDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length)
      return false;
    return a.every((item, i) => isDeepEqual(item, b[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => isDeepEqual(aObj[k], bObj[k]));
  }
  return false;
}

function isRulesEqual(a: VisibilityRule[], b: VisibilityRule[]): boolean {
  return isDeepEqual(a, b);
}

/**
 * Structural equality for node forests — the editor's dirty check.
 * Order-, id-, component-, visible-, rules-, and props-sensitive.
 */
export function areNodesEqual(a: BuilderNode[], b: BuilderNode[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((node, i) => isNodeEqual(node, b[i]));
}

function isNodeEqual(a: BuilderNode, b: BuilderNode): boolean {
  return (
    a.id === b.id &&
    a.component === b.component &&
    a.visible === b.visible &&
    isRulesEqual(a.rules, b.rules) &&
    isDeepEqual(a.props, b.props) &&
    areNodesEqual(a.children, b.children)
  );
}
