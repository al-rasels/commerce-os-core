import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar, type SidebarItem } from "./sidebar";

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: <span>🏠</span>, active: true },
  { label: "Orders", href: "/orders", badge: "3" },
  { label: "Settings", icon: <span>⚙️</span> },
];

describe("Sidebar", () => {
  it("renders items when open", () => {
    render(<Sidebar items={items} open={true} onClose={vi.fn()} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Sidebar items={items} open={true} onClose={vi.fn()} title="Menu" />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("renders item badges", () => {
    render(<Sidebar items={items} open={true} onClose={vi.fn()} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("marks active item", () => {
    render(<Sidebar items={items} open={true} onClose={vi.fn()} />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link?.className).toMatch(/font-medium/);
  });

  it("renders items without href as spans", () => {
    render(<Sidebar items={items} open={true} onClose={vi.fn()} />);
    expect(screen.getByText("Settings").closest("a")).toBeNull();
  });

  it("calls onClose when close button clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Sidebar items={items} open={true} onClose={onClose} />);
    await user.click(screen.getByLabelText("Close sidebar"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when overlay clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<Sidebar items={items} open={true} onClose={onClose} />);
    const overlay = container.querySelector(".fixed.inset-0");
    await user.click(overlay!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not render content when closed", () => {
    const { container } = render(<Sidebar items={items} open={false} onClose={vi.fn()} />);
    expect(container.querySelector("aside")).toBeInTheDocument();
  });
});
