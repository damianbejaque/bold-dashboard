import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useFilters from "./useFilters";
import { myBussiness } from "../types/myBussiness";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

const mockData: myBussiness[] = [
  { id: 1, salesType: "TERMINAL", date: "2024-11-01", description: "Sale A" },
  {
    id: 2,
    salesType: "PAYMENT_LINK",
    date: "2024-11-02",
    description: "Sale B",
  },
  { id: 3, salesType: "CASH", date: "2024-11-03", description: "Sale C" },
];

const FILTER_CHECKBOXES = [
  { name: "Cobro con datafono", searchValue: "TERMINAL", active: false },
  {
    name: "Cobro con link de pago",
    searchValue: "PAYMENT_LINK",
    active: false,
  },
  { name: "Ver todos", searchValue: "", active: true },
];

describe("useFilters Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with default filter values", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );
    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.filterDate).toBe("");
    expect(result.current.filterCheckbox).toEqual(FILTER_CHECKBOXES);
    expect(result.current.filterTextInput).toBe("");
  });

  it("should filter data by date", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    act(() => {
      result.current.handleDateRange("2024-11-01");
    });

    expect(result.current.filterDate).toBe("2024-11-01");
    expect(result.current.filteredData).toEqual([
      {
        id: 1,
        salesType: "TERMINAL",
        date: "2024-11-01",
        description: "Sale A",
      },
    ]);
  });

  it("should toggle checkbox filters", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    // Toggle "Cobro con datafono"
    act(() => {
      result.current.filterCheckbox[0].handleClick();
    });

    act(() => {
      result.current.handleApplyFilterCheckbox();
    });

    expect(result.current.filterCheckbox[0].active).toBe(true);
    expect(result.current.filteredData).toEqual([
      {
        id: 1,
        salesType: "TERMINAL",
        date: "2024-11-01",
        description: "Sale A",
      },
    ]);
  });

  it("should filter data by text input", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    act(() => {
      result.current.setFilterTextInput("Sale B");
    });

    expect(result.current.filterTextInput).toBe("Sale B");
    expect(result.current.filteredData).toEqual([
      {
        id: 2,
        salesType: "PAYMENT_LINK",
        date: "2024-11-02",
        description: "Sale B",
      },
    ]);
  });

  it("should reset all filters when 'Ver todos' is clicked", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    // Activate some filters
    act(() => {
      result.current.filterCheckbox[0].handleClick(); // Activate "Cobro con datafono"
    });

    act(() => {
      result.current.filterCheckbox[2].handleClick(); // Click "Ver todos"
    });

    expect(result.current.filterCheckbox[0].active).toBe(false);
    expect(result.current.filterCheckbox[2].active).toBe(true);
    expect(result.current.filteredData).toEqual(mockData); // All data should be shown
  });

  it("should save and retrieve the date filter from localStorage", () => {
    localStorage.setItem("localFilterDate", "2024-11-02");

    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    expect(result.current.filterDate).toBe("2024-11-02");
    expect(result.current.filteredData).toEqual([
      {
        id: 2,
        salesType: "PAYMENT_LINK",
        date: "2024-11-02",
        description: "Sale B",
      },
    ]);
  });
});
