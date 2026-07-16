import { render, screen } from "@testing-library/react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

const defaultItems: Crumb[] = [
  { label: "Category", href: "/category" },
  { label: "Subcategory", href: "/category/sub" },
  { label: "Product" },
];

describe("Breadcrumbs", () => {
  it("renders all crumbs", () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Subcategory")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("renders home icon by default", () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
  });

  it("hides home icon when showHome is false", () => {
    render(<Breadcrumbs items={defaultItems} showHome={false} />);
    expect(screen.queryByLabelText("Home")).not.toBeInTheDocument();
  });

  it("renders crumb hrefs as links", () => {
    render(<Breadcrumbs items={defaultItems} />);
    const link = screen.getByText("Category");
    expect(link.closest("a")).toHaveAttribute("href", "/category");
  });

  it("last crumb is not a link and has bold text", () => {
    render(<Breadcrumbs items={defaultItems} />);
    const last = screen.getByText("Product");
    expect(last.closest("a")).toBeNull();
    expect(last.className).toMatch(/font-medium/);
  });

  it("applies custom className", () => {
    const { container } = render(<Breadcrumbs items={defaultItems} className="my-custom" />);
    expect(container.firstChild).toHaveClass("my-custom");
  });
});
