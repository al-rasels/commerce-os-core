import { render, screen } from "@testing-library/react";
import { RichText } from "./rich-text";
import { sanitizeHtml } from "./sanitize";

describe("sanitizeHtml", () => {
  it("strips script tags and keeps safe content", () => {
    const result = sanitizeHtml("<script>alert(1)</script><p>ok</p>");
    expect(result).not.toContain("script");
    expect(result).toContain("<p>ok</p>");
  });

  it("removes event handler attributes", () => {
    const result = sanitizeHtml('<img src="x" onerror="alert(1)" />');
    expect(result).not.toContain("onerror");
  });
});

describe("RichText", () => {
  it("renders sanitized HTML and does not execute scripts", () => {
    render(<RichText content={'<script>window.__pwned = true</script><p>Hello</p>'} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(document.querySelector("script")).not.toBeInTheDocument();
  });
});
