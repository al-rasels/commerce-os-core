import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "./banner";

describe("Banner", () => {
  it("renders heading and description", () => {
    render(<Banner heading="Sale" description="Up to 50% off" />);
    expect(screen.getByText("Sale")).toBeInTheDocument();
    expect(screen.getByText("Up to 50% off")).toBeInTheDocument();
  });

  it("renders CTA link when provided", () => {
    render(<Banner heading="Sale" description="Deals" ctaLabel="Shop Now" ctaHref="/shop" />);
    const link = screen.getByText("Shop Now");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  it("does not render CTA when label and href are omitted", () => {
    render(<Banner heading="Sale" description="Deals" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders dismiss button for dismissible variant", () => {
    render(<Banner heading="Sale" description="Deals" variant="dismissible" />);
    expect(screen.getByLabelText("Dismiss banner")).toBeInTheDocument();
  });

  it("does not render dismiss button for default variant", () => {
    render(<Banner heading="Sale" description="Deals" variant="default" />);
    expect(screen.queryByLabelText("Dismiss banner")).not.toBeInTheDocument();
  });

  it("calls onDismiss and hides banner when dismiss clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const { container } = render(
      <Banner heading="Sale" description="Deals" variant="dismissible" onDismiss={onDismiss} />,
    );
    await user.click(screen.getByLabelText("Dismiss banner"));
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(container.firstChild).toBeNull();
  });
});
