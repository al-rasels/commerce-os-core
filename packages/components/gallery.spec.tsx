import { render, screen } from "@testing-library/react";
import { Gallery } from "./gallery";

const images = [
  { url: "/img1.jpg", alt: "Image 1" },
  { url: "/img2.jpg", alt: "Image 2" },
];

describe("Gallery", () => {
  it("renders all images with alt text", () => {
    render(<Gallery variant="grid" images={images} />);
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
  });

  it("renders images with correct src", () => {
    render(<Gallery variant="grid" images={images} />);
    expect(screen.getByAltText("Image 1")).toHaveAttribute("src", "/img1.jpg");
  });

  it("renders with grid variant", () => {
    const { container } = render(<Gallery variant="grid" images={images} />);
    expect(container.querySelector(".grid")).toBeInTheDocument();
  });

  it("renders with carousel variant", () => {
    const { container } = render(<Gallery variant="carousel" images={images} />);
    expect(container.querySelector(".flex")).toBeInTheDocument();
  });

  it("renders with masonry variant", () => {
    const { container } = render(<Gallery variant="masonry" images={images} />);
    expect(container.querySelector(".columns-1")).toBeInTheDocument();
  });
});
