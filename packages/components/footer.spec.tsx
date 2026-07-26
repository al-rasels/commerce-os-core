import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

const columns = [
  { title: "Shop", links: [{ label: "T-shirts", href: "/tshirts" }] },
  { title: "Help", links: [{ label: "FAQ", href: "/faq" }] },
];

describe("Footer", () => {
  it("renders column titles and links", () => {
    render(<Footer columns={columns} copyrightText="© 2024" />);
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("T-shirts")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<Footer columns={columns} copyrightText="© 2024" />);
    const link = screen.getByText("T-shirts");
    expect(link).toHaveAttribute("href", "/tshirts");
  });

  it("renders copyright text", () => {
    render(<Footer columns={columns} copyrightText="© 2024 CommerceOS" />);
    expect(screen.getByText("© 2024 CommerceOS")).toBeInTheDocument();
  });

  it("renders social links when provided", () => {
    render(
      <Footer
        columns={columns}
        copyrightText="© 2024"
        socialLinks={[
          { platform: "instagram", href: "https://instagram.com" },
          { platform: "facebook", href: "https://facebook.com" },
        ]}
      />,
    );
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
  });

  it("does not render social section when no socialLinks", () => {
    render(<Footer columns={columns} copyrightText="© 2024" />);
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
  });
});
