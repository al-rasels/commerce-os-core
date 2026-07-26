import { render, screen } from "@testing-library/react";
import { Hero } from "./hero";

describe("Hero", () => {
  it("renders heading", () => {
    render(<Hero variant="modern" heading="Welcome" />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("renders subheading when provided", () => {
    render(<Hero variant="modern" heading="Welcome" subheading="Best store" />);
    expect(screen.getByText("Best store")).toBeInTheDocument();
  });

  it("renders CTA link when label and href provided", () => {
    render(<Hero variant="modern" heading="Welcome" ctaLabel="Shop Now" ctaHref="/shop" />);
    const link = screen.getByText("Shop Now");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  it("does not render CTA when label is omitted", () => {
    render(<Hero variant="modern" heading="Welcome" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not render CTA when href is omitted", () => {
    render(<Hero variant="modern" heading="Welcome" ctaLabel="Shop" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies background image when provided", () => {
    const { container } = render(<Hero variant="modern" heading="Welcome" backgroundImage="/bg.jpg" />);
    const section = container.querySelector("section");
    expect(section).toHaveStyle({ backgroundImage: "url(/bg.jpg)" });
  });
});
