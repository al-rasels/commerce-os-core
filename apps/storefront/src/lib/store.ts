import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  cartId: string | null;
  sessionId: string;
  itemCount: number;
  setCartId: (id: string) => void;
  setItemCount: (count: number) => void;
}

const genSessionId = () =>
  'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: null,
      sessionId: genSessionId(),
      itemCount: 0,
      setCartId: (id) => set({ cartId: id }),
      setItemCount: (count) => set({ itemCount: count }),
    }),
    { name: 'cart-storage' },
  ),
);
