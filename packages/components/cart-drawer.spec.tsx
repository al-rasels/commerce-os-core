import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "./cart-drawer";

const sampleItems = [
  { id: "1", name: "T-Shirt", priceCents: 2999, quantity: 2, imageUrl: "/tshirt.jpg" },
  { id: "2", name: "Jeans", priceCents: 5999, quantity: 1, imageUrl: "/jeans.jpg" },
];

describe("CartDrawer", () => {
  it("does not render when closed", () => {
    const { container } = render(
      <CartDrawer open={false} onClose={vi.fn()} items={[]} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders cart items when open", () => {
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={sampleItems} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    expect(screen.getByText("T-Shirt")).toBeInTheDocument();
    expect(screen.getByText("Jeans")).toBeInTheDocument();
  });

  it("shows empty cart message when no items", () => {
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={[]} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("calculates and displays subtotal", () => {
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={sampleItems} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    // $29.99 * 2 + $59.99 * 1 = $119.97
    expect(screen.getByText("$119.97")).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <CartDrawer open={true} onClose={onClose} items={[]} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    await user.click(screen.getByLabelText("Close cart"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onUpdateQuantity when quantity changes", async () => {
    const user = userEvent.setup();
    const onUpdateQuantity = vi.fn();
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={sampleItems} onUpdateQuantity={onUpdateQuantity} onRemoveItem={vi.fn()} />,
    );
    const increaseButtons = screen.getAllByLabelText("Increase quantity");
    await user.click(increaseButtons[0]);
    expect(onUpdateQuantity).toHaveBeenCalledWith("1", 3);
  });

  it("calls onRemoveItem when remove clicked", async () => {
    const user = userEvent.setup();
    const onRemoveItem = vi.fn();
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={sampleItems} onUpdateQuantity={vi.fn()} onRemoveItem={onRemoveItem} />,
    );
    const removeButtons = screen.getAllByLabelText("Remove item");
    await user.click(removeButtons[0]);
    expect(onRemoveItem).toHaveBeenCalledWith("1");
  });

  it("renders checkout button with total", () => {
    render(
      <CartDrawer open={true} onClose={vi.fn()} items={sampleItems} onUpdateQuantity={vi.fn()} onRemoveItem={vi.fn()} />,
    );
    expect(screen.getByText("Checkout • $119.97")).toBeInTheDocument();
  });
});
