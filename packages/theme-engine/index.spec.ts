import { resolveOverride } from './index';

describe('theme-engine: resolveOverride', () => {
  it('base + empty override -> resolves to base unchanged', () => {
    const base = { colors: { primary: '#000', secondary: '#fff' } };
    const override = {};
    const result = resolveOverride(base, override);
    
    expect(result.resolved).toEqual(base);
    expect(result.conflicts).toHaveLength(0);
  });

  it('base + partial override -> override wins only on overlapping keys', () => {
    const base = { colors: { primary: '#000', secondary: '#fff' }, spacing: { sm: '4px' } };
    const override = { colors: { primary: '#111' } };
    const result = resolveOverride(base, override);
    
    expect(result.resolved).toEqual({
      colors: { primary: '#111', secondary: '#fff' },
      spacing: { sm: '4px' }
    });
    expect(result.conflicts).toHaveLength(0);
  });

  it('base version bump with existing override present -> override survives unchanged, no data loss', () => {
    // Simulating base being updated (v2 adds tertiary color)
    const base = { colors: { primary: '#000', secondary: '#fff', tertiary: '#f00' } };
    const override = { colors: { primary: '#111' } };
    const result = resolveOverride(base, override);
    
    expect(result.resolved).toEqual({
      colors: { primary: '#111', secondary: '#fff', tertiary: '#f00' }
    });
    expect(result.conflicts).toHaveLength(0);
  });

  it('conflicting keys (base removes a key the override references) -> flagged explicitly', () => {
    const base = { colors: { primary: '#000' } }; // secondary removed
    const override = { colors: { secondary: '#111' } };
    const result = resolveOverride(base, override);
    
    // The override value will be merged in, but the key is flagged as a conflict.
    expect(result.resolved).toEqual({
      colors: { primary: '#000', secondary: '#111' }
    });
    expect(result.conflicts).toContain('colors.secondary');
  });

  it('arrays in override replace base arrays, never concatenate', () => {
    const base = { fonts: ['Inter', 'Roboto'] };
    const override = { fonts: ['Outfit'] };
    const result = resolveOverride(base, override);
    
    expect(result.resolved).toEqual({ fonts: ['Outfit'] });
    expect(result.conflicts).toHaveLength(0);
  });
});
