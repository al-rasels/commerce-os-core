import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutSummary } from "./checkout-summary";

describe("CheckoutSummary", () => {
  it("renders subtotal, total, and checkout button", () => {
    render(
      <CheckoutSummary subtotalCents={5000} totalCents={5500} currency="USD" onCheckout={vi.fn()} />,
    );
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(screen.getByText("$55.00")).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("renders shipping and tax when provided", () => {
    render(
      <CheckoutSummary subtotalCents={5000} shippingCents={999} taxCents={499} totalCents={6498} currency="USD" onCheckout={vi.fn()} />,
    );
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("$4.99")).toBeInTheDocument();
  });

  it("uses custom checkout label", () => {
    render(
      <CheckoutSummary subtotalCents={5000} totalCents={5000} currency="USD" onCheckout={vi.fn()} checkoutLabel="Pay Now" />,
    );
    expect(screen.getByText("Pay Now")).toBeInTheDocument();
  });

  it("calls onCheckout when button clicked", async () => {
    const user = userEvent.setup();
    const onCheckout = vi.fn();
    render(
      <CheckoutSummary subtotalCents={5000} totalCents={5000} currency="USD" onCheckout={onCheckout} />,
    );
    await user.click(screen.getByText("Checkout"));
    expect(onCheckout).toHaveBeenCalledOnce();
  });
});
