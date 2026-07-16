import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, type Tab } from "./tabs";

const tabs: Tab[] = [
  { id: "details", label: "Details", content: <p>Product details</p> },
  { id: "shipping", label: "Shipping", content: <p>Shipping info</p> },
  { id: "reviews", label: "Reviews", content: <p>Customer reviews</p> },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Product details")).toBeVisible();
  });

  it("hides non-active tab content", () => {
    render(<Tabs tabs={tabs} />);
    const shippingPanel = screen.getByText("Shipping info");
    expect(shippingPanel.closest('[role="tabpanel"]')).toHaveAttribute("hidden");
  });

  it("switches content on tab click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByText("Shipping"));
    expect(screen.getByText("Shipping info")).toBeVisible();
    expect(screen.getByText("Product details").closest('[role="tabpanel"]')).toHaveAttribute("hidden");
  });

  it("marks active tab as selected", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Details").closest('[role="tab"]')).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Shipping").closest('[role="tab"]')).toHaveAttribute("aria-selected", "false");
  });

  it("uses defaultTab when provided", () => {
    render(<Tabs tabs={tabs} defaultTab="reviews" />);
    expect(screen.getByText("Customer reviews")).toBeVisible();
    expect(screen.getByText("Reviews").closest('[role="tab"]')).toHaveAttribute("aria-selected", "true");
  });

  it("renders nothing for empty tabs", () => {
    const { container } = render(<Tabs tabs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("has tablist role", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
});
