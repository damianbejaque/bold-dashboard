import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import useFilters from "./useFilters";
import { myBussiness, Status } from "../types/myBussiness";

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
  {
    id: "GZEN7YGE6X029",
    status: Status.SUCCESSFUL,
    paymentMethod: "PSE",
    salesType: "PAYMENT_LINK",
    createdAt: 1731393413402,
    transactionReference: 1785,
    amount: 8927561,
  },
  {
    id: "GZEN6J23UBH8I",
    status: Status.SUCCESSFUL,
    paymentMethod: "CARD",
    salesType: "TERMINAL",
    createdAt: 1731369600000,
    transactionReference: 2239,
    amount: 3610460,
    franchise: "MASTERCARD",
  },
  {
    id: "GZENWJW03GNF0",
    status: Status.SUCCESSFUL,
    paymentMethod: "NEQUI",
    salesType: "PAYMENT_LINK",
    createdAt: 1731393413402,
    transactionReference: 3712,
    amount: 3920488,
  },
  {
    id: "GZEN9SMDHWB98",
    status: Status.SUCCESSFUL,
    paymentMethod: "DAVIPLATA",
    salesType: "PAYMENT_LINK",
    createdAt: 1730764800000,
    transactionReference: 6133,
    amount: 9896860,
    deduction: 606528,
  },
];

const FILTER_CHECKBOXES = [
  { name: "Cobro con datafono", searchValue: "TERMINAL", active: false },
  {
    name: "Cobro con link de pago",
    searchValue: "PAYMENT_LINK",
    active: false,
  },
  { name: "Ver todos", searchValue: "", active: false },
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
    expect(result.current.filterTextInput).toBe("");
  });

  it("should toggle checkbox filters", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    act(() => {
      result.current.filterCheckbox[0].handleClick();
    });

    act(() => {
      result.current.handleApplyFilterCheckbox();
    });

    expect(result.current.filterCheckbox[0].active).toBe(true);
    expect(result.current.filteredData).toEqual([
      {
        id: "GZEN6J23UBH8I",
        status: Status.SUCCESSFUL,
        paymentMethod: "CARD",
        salesType: "TERMINAL",
        createdAt: 1731369600000,
        transactionReference: 2239,
        amount: 3610460,
        franchise: "MASTERCARD",
      },
    ]);
  });

  it("should filter data by text input", () => {
    const { result } = renderHook(() =>
      useFilters(mockData, FILTER_CHECKBOXES)
    );

    act(() => {
      result.current.setFilterTextInput("GNF0");
    });

    act(() => {
      expect(result.current.filteredData).toEqual([
        {
          id: "GZENWJW03GNF0",
          status: Status.SUCCESSFUL,
          paymentMethod: "NEQUI",
          salesType: "PAYMENT_LINK",
          createdAt: 1731393413402,
          transactionReference: 3712,
          amount: 3920488,
        },
      ]);
    });
  });
});
