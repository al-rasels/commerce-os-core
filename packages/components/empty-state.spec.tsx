import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="Nothing here" description="Add some items" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Add some items")).toBeInTheDocument();
  });

  it("renders action link when provided", () => {
    render(<EmptyState title="Empty" description="No data" actionLabel="Create" actionHref="/new" />);
    const link = screen.getByText("Create");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/new");
  });

  it("does not render action when not provided", () => {
    render(<EmptyState title="Empty" description="No data" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
