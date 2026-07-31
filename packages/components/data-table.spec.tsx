import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./data-table";

const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", sortable: true },
];

const data = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("calls onSort when sortable header clicked", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(<DataTable columns={columns} data={data} onSort={onSort} />);
    await user.click(screen.getByText("Age"));
    expect(onSort).toHaveBeenCalledWith("age");
  });

  it("shows sort indicator for active sort column", () => {
    render(<DataTable columns={columns} data={data} sortBy="age" sortDir="asc" />);
    const ageHeader = screen.getByText("Age");
    expect(ageHeader.closest("button")).toHaveAttribute("aria-label", "Sorted by Age ascending");
  });

  it("renders custom cell renderer", () => {
    const cols = [
      { key: "name", label: "Name", render: (item: { name: string; age: number }) => `Mr. ${item.name}` },
    ];
    render(<DataTable columns={cols} data={data} />);
    expect(screen.getByText("Mr. Alice")).toBeInTheDocument();
    expect(screen.getByText("Mr. Bob")).toBeInTheDocument();
  });
});
