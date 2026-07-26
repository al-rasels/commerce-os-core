import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./faq";

const items = [
  { question: "Q1", answer: "A1" },
  { question: "Q2", answer: "A2" },
];

describe("Faq", () => {
  it("renders all questions", () => {
    render(<Faq items={items} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });

  it("hides answers by default", () => {
    render(<Faq items={items} />);
    expect(screen.queryByText("A1")).not.toBeInTheDocument();
    expect(screen.queryByText("A2")).not.toBeInTheDocument();
  });

  it("shows answer when question clicked", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);
    await user.click(screen.getByText("Q1"));
    expect(screen.getByText("A1")).toBeInTheDocument();
  });

  it("closes open answer when clicked again", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);
    await user.click(screen.getByText("Q1"));
    expect(screen.getByText("A1")).toBeInTheDocument();
    await user.click(screen.getByText("Q1"));
    expect(screen.queryByText("A1")).not.toBeInTheDocument();
  });

  it("switches to new answer when different question clicked", async () => {
    const user = userEvent.setup();
    render(<Faq items={items} />);
    await user.click(screen.getByText("Q1"));
    expect(screen.getByText("A1")).toBeInTheDocument();
    await user.click(screen.getByText("Q2"));
    expect(screen.queryByText("A1")).not.toBeInTheDocument();
    expect(screen.getByText("A2")).toBeInTheDocument();
  });
});
