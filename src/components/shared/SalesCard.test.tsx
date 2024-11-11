import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SalesCard from "./SalesCard";
import { formatAmount, getFooterDate } from "../../utils/utils";

vi.mock("../../utils/utils", () => ({
  formatAmount: vi.fn(),
  getFooterDate: vi.fn(),
}));

describe("SalesCard component", () => {
  const title = "hoy";
  const total = 1234;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders SalesCard component with correct title and total", () => {
    (formatAmount as jest.Mock).mockReturnValue("$1,234.00");
    (getFooterDate as jest.Mock).mockReturnValue("01/01/2023");

    render(<SalesCard title={title} total={total} />);

    expect(screen.getByText(`Total de ventas de ${title}`)).toBeInTheDocument();
    expect(screen.getByText("$1,234.00")).toBeInTheDocument();
    expect(screen.getByText("01/01/2023")).toBeInTheDocument();
  });

  it("renders additional information tooltip", () => {
    (formatAmount as jest.Mock).mockReturnValue("$1,234.00");
    (getFooterDate as jest.Mock).mockReturnValue("01/01/2023");

    render(<SalesCard title={title} total={total} />);

    expect(
      screen.getByText("Información adicional sobre las ventas")
    ).toBeInTheDocument();
  });
});
