import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormRenderer } from "./form-renderer";

const fields = [
  { name: "name", label: "Name", type: "text" as const, required: true },
  { name: "message", label: "Message", type: "textarea" as const },
  { name: "country", label: "Country", type: "select" as const, options: [{ value: "us", label: "US" }] },
];

describe("FormRenderer", () => {
  it("renders all fields", () => {
    render(<FormRenderer fields={fields} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("renders submit button with default label", () => {
    render(<FormRenderer fields={[]} onSubmit={vi.fn()} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders submit button with custom label", () => {
    render(<FormRenderer fields={[]} onSubmit={vi.fn()} submitLabel="Send" />);
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("calls onSubmit with form values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<FormRenderer fields={[{ name: "email", label: "Email", type: "email" }]} onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledWith({ email: "test@example.com" });
  });

  it("marks required fields", () => {
    render(<FormRenderer fields={fields} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Name")).toBeRequired();
  });
});
