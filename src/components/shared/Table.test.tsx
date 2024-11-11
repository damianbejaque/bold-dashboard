import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Table from "./Table";

interface TestData {
  id: string;
  name: string;
  age: number;
  [key: string]: React.ReactNode;
}

const columns = ["id", "name", "age"];
const data: TestData[] = [
  { id: "1", name: "John Doe", age: 30 },
  { id: "2", name: "Jane Smith", age: 25 },
];

describe("Table component", () => {
  it("renders table with correct columns and data", () => {
    render(<Table title="Test Table" columns={columns} data={data} />);

    expect(screen.getByText("Test Table")).toBeInTheDocument();
    columns.forEach((column) => {
      expect(screen.getByText(column)).toBeInTheDocument();
    });
    data.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
    });
  });

  it("renders 'No data available' when data is empty", () => {
    render(<Table title="Empty Table" columns={columns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("calls rowClick function when a row is clicked", () => {
    const rowClick = vi.fn();
    render(
      <Table
        title="Clickable Table"
        columns={columns}
        data={data}
        rowClick={rowClick}
      />
    );

    fireEvent.click(screen.getByText(data[0].name));
    expect(rowClick).toHaveBeenCalledWith(data[0]);
  });

  it("filters out hidden columns", () => {
    render(
      <Table
        title="Filtered Table"
        columns={columns}
        data={data}
        hiddenColumns={["age"]}
      />
    );

    expect(screen.queryByText("age")).not.toBeInTheDocument();
    expect(screen.getByText(data[0].name)).toBeInTheDocument();
    expect(screen.queryByText(data[0].age.toString())).not.toBeInTheDocument();
  });

  it("renders SearchInput when handleSearchInput is provided", () => {
    const handleSearchInput = vi.fn();
    render(
      <Table
        title="Searchable Table"
        columns={columns}
        data={data}
        handleSearchInput={handleSearchInput}
        searchInput="test"
      />
    );

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });
});
