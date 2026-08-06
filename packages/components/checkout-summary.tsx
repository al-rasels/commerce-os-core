import { cn } from "./utils";

export interface CheckoutSummaryProps {
  subtotalCents: number;
  shippingCents?: number;
  taxCents?: number;
  totalCents: number;
  currency?: string;
  onCheckout: () => void;
  checkoutLabel?: string;
  showPromoCodeInput?: boolean;
}

function formatCurrency(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function CheckoutSummary({
  subtotalCents,
  shippingCents,
  taxCents,
  totalCents,
  currency = "USD",
  onCheckout,
  checkoutLabel = "Checkout",
  showPromoCodeInput = true,
}: CheckoutSummaryProps) {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {showPromoCodeInput && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Promo code"
            className="h-10 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
          >
            Apply
          </button>
        </div>
      )}

      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotalCents, currency)}</span>
        </div>
        {shippingCents !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">{formatCurrency(shippingCents, currency)}</span>
          </div>
        )}
        {taxCents !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">{formatCurrency(taxCents, currency)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <span>Total</span>
          <span>{formatCurrency(totalCents, currency)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
      >
        {checkoutLabel}
      </button>
    </div>
  );
}
