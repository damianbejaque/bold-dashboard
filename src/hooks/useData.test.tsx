import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useData from "./useData";

const mockFetch = vi.fn();

global.fetch = mockFetch;

const mockResponse = {
  data: [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
  ],
};

const transformedData = [
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" },
];

const transformFunction = (data: { id: number; name: string }[]) => data;

describe("useData hook", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch and transform data successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() =>
      useData({
        url: "https://example.com/api",
        transformation: transformFunction,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(transformedData);
      expect(result.current.error).toBeNull();
    });
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useData({
        url: "https://example.com/api",
        transformation: transformFunction,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("Network error");
    });
  });

  it("should handle non-2xx HTTP status codes", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result } = renderHook(() =>
      useData({
        url: "https://example.com/api",
        transformation: transformFunction,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("Network response was not ok");
    });
  });

  it("should handle empty data response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    const { result } = renderHook(() =>
      useData({
        url: "https://example.com/api",
        transformation: transformFunction,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });
});
