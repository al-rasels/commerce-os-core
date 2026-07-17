'use client';

import { useCartStore } from '@/lib/store';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function AddToCartButton({
  variantId,
  disabled,
  label,
}: {
  variantId: string;
  disabled?: boolean;
  label: string;
}) {
  const [loading, setLoading] = useState(false);
  const { cartId, sessionId, setCartId, setItemCount, itemCount } =
    useCartStore();

  const handleClick = async () => {
    setLoading(true);
    try {
      let currentCartId = cartId;
      if (!currentCartId) {
        const cart = await api.cart.create(sessionId);
        currentCartId = cart.id;
        setCartId(currentCartId!);
      }
      await api.cart.addItem(currentCartId!, variantId, 1);
      setItemCount(itemCount + 1);
    } catch (e) {
      console.error('Failed to add item', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled || loading} className="w-full">
      {loading ? 'Adding...' : label}
    </Button>
  );
}
