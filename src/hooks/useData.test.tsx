import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useData from "./useData";

// Mocking fetch globally
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

// Transformation function for testing
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

    // Verify initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for hook to process data
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

    // Verify initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for hook to handle the error
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

    // Verify initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for hook to process the failed response
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

    // Wait for hook to process the empty response
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });
  });
});
