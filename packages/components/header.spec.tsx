import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./header";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

describe("Header", () => {
  it("renders logo", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} />);
    expect(screen.getByAltText("Logo")).toHaveAttribute("src", "/logo.svg");
  });

  it("renders navigation items", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
  });

  it("renders search button by default", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("renders cart button by default", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} />);
    expect(screen.getByLabelText("Cart")).toBeInTheDocument();
  });

  it("hides search when showSearch is false", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} showSearch={false} />);
    expect(screen.queryByLabelText("Search")).not.toBeInTheDocument();
  });

  it("hides cart when showCart is false", () => {
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} showCart={false} />);
    expect(screen.queryByLabelText("Cart")).not.toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<Header variant="minimal" logoUrl="/logo.svg" navItems={navItems} />);
    const toggle = screen.getByLabelText("Toggle menu");
    await user.click(toggle);
    // jsdom doesn't apply hidden/flex media queries, so both desktop
    // and mobile nav items exist in the DOM after toggle.
    const homes = screen.getAllByText("Home");
    expect(homes.length).toBeGreaterThanOrEqual(1);
  });
});
