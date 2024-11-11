import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders Header component", () => {
    {
      render(<Header />);
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("Mi Negocio")).toBeInTheDocument();
      expect(screen.getByText("Ayuda")).toBeInTheDocument();
    }
  });
});
