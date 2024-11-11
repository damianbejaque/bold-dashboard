import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import * as utils from "../../utils/utils";

describe("DatePicker component", () => {
  const handleToday = vi.fn();
  const handleWeek = vi.fn();
  const handleMonth = vi.fn();
  const activeTitle = "hoy";

  beforeEach(() => {
    vi.spyOn(utils, "currentMonth").mockReturnValue("Octubre");
    render(
      <DatePicker
        handleToday={handleToday}
        handleWeek={handleWeek}
        handleMonth={handleMonth}
        activeTitle={activeTitle}
      />
    );
  });

  it("renders DatePicker component", () => {
    expect(screen.getByText("Hoy")).toBeInTheDocument();
    expect(screen.getByText("Esta semana")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Octubre"))
    ).toBeInTheDocument();
  });

  it("renders buttons with correct titles", () => {
    expect(screen.getByText("Hoy")).toBeInTheDocument();
    expect(screen.getByText("Esta semana")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Octubre"))
    ).toBeInTheDocument();
  });

  it("handles button clicks correctly", () => {
    fireEvent.click(screen.getByText("Hoy"));
    expect(handleToday).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Esta semana"));
    expect(handleWeek).toHaveBeenCalled();

    fireEvent.click(screen.getByText((content) => content.includes("Octubre")));
    expect(handleMonth).toHaveBeenCalled();
  });

  it("sets active tab correctly on button click", () => {
    fireEvent.click(screen.getByText("Hoy"));
    expect(screen.getByText("Hoy").closest("button")).toHaveClass(
      "bg-gris-claro"
    );

    fireEvent.click(screen.getByText("Esta semana"));
    expect(screen.getByText("Esta semana").closest("button")).toHaveClass(
      "bg-gris-claro"
    );

    fireEvent.click(screen.getByText((content) => content.includes("Octubre")));
    expect(
      screen
        .getByText((content) => content.includes("Octubre"))
        .closest("button")
    ).toHaveClass("bg-gris-claro");
  });
});
