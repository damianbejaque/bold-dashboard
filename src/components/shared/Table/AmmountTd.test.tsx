import AmmountTd from "./AmmountTd";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("AmmountTd component", () => {
  it("renders AmmountTd component", () => {
    render(<AmmountTd amount={100} deduction={0} />);
    expect(screen.getByText("$ 100")).toBeInTheDocument();
  });

  it("renders AmmountTd component with a deduction", () => {
    render(<AmmountTd amount={100} deduction={20} />);
    expect(screen.getByText("Deduccion Bold")).toBeInTheDocument();
    expect(screen.getByText("$ 20")).toBeInTheDocument();
  });
});
