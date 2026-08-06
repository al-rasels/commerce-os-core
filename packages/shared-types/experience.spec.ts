import { describe, expect, it } from 'vitest';
import {
  normalizePageLayout,
  evaluateRules,
  areNodesEqual,
  type BuilderNode,
} from './experience';

describe('normalizePageLayout', () => {
  it('wraps a bare node array into a versioned document', () => {
    const doc = normalizePageLayout([{ component: 'hero.v1', props: {} }]);
    expect(doc.version).toBe(1);
    expect(doc.nodes).toHaveLength(1);
  });

  it('backfills id, visible, rules, children, and props', () => {
    const doc = normalizePageLayout([{ component: 'hero.v1' }]);
    const node = doc.nodes[0];
    expect(node.id).toBeTruthy();
    expect(node.visible).toBe(true);
    expect(node.rules).toEqual([]);
    expect(node.children).toEqual([]);
    expect(node.props).toEqual({});
  });

  it('coerces a legacy sections_json envelope', () => {
    const doc = normalizePageLayout({ sections_json: [{ component: 'hero.v1' }] });
    expect(doc.nodes).toHaveLength(1);
  });

  it('coerces a { nodes } envelope', () => {
    const doc = normalizePageLayout({ nodes: [{ component: 'hero.v1' }] });
    expect(doc.nodes).toHaveLength(1);
  });

  it('normalizes children recursively', () => {
    const doc = normalizePageLayout([
      { component: 'flex.v1', children: [{ component: 'text.v1' }] },
    ]);
    expect(doc.nodes[0].children[0].id).toBeTruthy();
  });
});

describe('evaluateRules', () => {
  const node = (over: Partial<BuilderNode> = {}): BuilderNode => ({
    id: 'n1',
    component: 'x.v1',
    props: {},
    children: [],
    visible: true,
    rules: [],
    ...over,
  });

  it('returns false when visible is false (author override)', () => {
    expect(evaluateRules(node({ visible: false }), {})).toBe(false);
  });

  it('returns true when there are no rules', () => {
    expect(evaluateRules(node(), {})).toBe(true);
  });

  it('honors show rules against the data context', () => {
    const rules = [{ if: "segment == 'vip'", action: 'show' as const }];
    expect(evaluateRules(node({ rules }), { segment: 'vip' })).toBe(true);
    expect(evaluateRules(node({ rules }), { segment: 'guest' })).toBe(false);
  });

  it('honors hide rules', () => {
    const rules = [{ if: "segment == 'vip'", action: 'hide' as const }];
    expect(evaluateRules(node({ rules }), { segment: 'vip' })).toBe(false);
    expect(evaluateRules(node({ rules }), { segment: 'guest' })).toBe(true);
  });

  it('supports the in() DSL', () => {
    const rules = [{ if: "category in ('tech','fashion')", action: 'show' as const }];
    expect(evaluateRules(node({ rules }), { category: 'tech' })).toBe(true);
    expect(evaluateRules(node({ rules }), { category: 'home' })).toBe(false);
  });

  it('resolves nested data paths', () => {
    const rules = [{ if: "product.status == 'active'", action: 'show' as const }];
    expect(evaluateRules(node({ rules }), { product: { status: 'active' } })).toBe(true);
  });

  it('returns false for unmatched expressions (fail closed)', () => {
    const rules = [{ if: "segment == 'vip'", action: 'show' as const }];
    expect(evaluateRules(node({ rules }), {})).toBe(false);
  });
});

describe('areNodesEqual', () => {
  const n = (id: string, props: Record<string, unknown> = {}): BuilderNode => ({
    id,
    component: 'hero.v1',
    props,
    children: [],
    visible: true,
    rules: [],
  });

  it('detects equal node lists', () => {
    expect(areNodesEqual([n('a'), n('b')], [n('a'), n('b')])).toBe(true);
  });

  it('detects reordering', () => {
    expect(areNodesEqual([n('a'), n('b')], [n('b'), n('a')])).toBe(false);
  });

  it('detects prop changes', () => {
    expect(areNodesEqual([n('a', { heading: 'x' })], [n('a')])).toBe(false);
  });

  it('detects visibility toggles', () => {
    expect(areNodesEqual([{ ...n('a'), visible: false }], [n('a')])).toBe(false);
  });
});
