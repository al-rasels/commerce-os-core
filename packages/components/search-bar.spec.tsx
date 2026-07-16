import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Find products…" />);
    expect(screen.getByPlaceholderText("Find products…")).toBeInTheDocument();
  });

  it("updates input value on typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "shoes");
    expect(input).toHaveValue("shoes");
  });

  it("calls onSearch on form submit", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "shoes");
    await user.keyboard("{Enter}");
    expect(onSearch).toHaveBeenCalledWith("shoes");
  });

  it("shows clear button when query is non-empty", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "shoes");
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("clears input and focuses on clear", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "shoes");
    await user.click(screen.getByLabelText("Clear search"));
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });

  it("hides clear button when query is empty", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("has search role", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });
});
