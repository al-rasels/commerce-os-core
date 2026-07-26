import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/lib/api', () => ({
  api: {
    cart: {
      get: vi.fn(),
      removeItem: vi.fn(),
      updateItem: vi.fn(),
    },
  },
}));

const mockCartStore = {
  cartId: 'test-cart-1',
  sessionId: 'test-session',
  setItemCount: vi.fn(),
};
vi.mock('@/lib/store', () => ({
  useCartStore: (selector: any) =>
    selector ? selector(mockCartStore) : mockCartStore,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import { api } from '@/lib/api';

async function getCartPage() {
  const mod = await import('../page');
  return mod.default;
}

describe('CartPage', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('shows loading state', async () => {
    vi.mocked(api.cart.get).mockReturnValue(new Promise(() => {}));
    const CartPage = await getCartPage();
    const { container } = render(<CartPage />);
    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('shows empty state', async () => {
    vi.mocked(api.cart.get).mockResolvedValue({ id: 'c1', items: [] });
    const CartPage = await getCartPage();
    render(<CartPage />);
    expect(await screen.findByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders items and totals', async () => {
    const items = [
      { id: 'i1', variant: { name: 'P1', price_cents: 2999, currency: 'USD' }, quantity: 2 },
      { id: 'i2', variant: { name: 'P2', price_cents: 4999, currency: 'USD' }, quantity: 1 },
    ];
    vi.mocked(api.cart.get).mockResolvedValue({ id: 'c1', items });
    const CartPage = await getCartPage();
    render(<CartPage />);
    expect(await screen.findByText('P1')).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.getByText('USD 109.97')).toBeInTheDocument();
  });
});
