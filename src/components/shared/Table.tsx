import React from "react";
import SearchInput from "./SearchInput";

interface TableProps<T> {
  title: string;
  columns: string[];
  data: T[];
  hiddenColumns?: string[];
  rowClick?: (data: T) => void;
  handleSearchInput?: (search: string) => void;
  searchInput?: string;
}

const Table = <
  T extends { id: string; [key: string]: string | number | React.ReactNode }
>({
  title,
  columns,
  data,
  hiddenColumns = [],
  rowClick,
  handleSearchInput,
  searchInput = "",
}: TableProps<T>) => {
  const visibleColumns = columns.filter(
    (column) => !hiddenColumns.includes(column)
  );

  return (
    <section className=" flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="text-white p-4 rounded-t-xl bg-header align-baseline">
        <h2 className="text-lg font-light  justify-self-start">{title}</h2>
      </div>

      {handleSearchInput && (
        <SearchInput value={searchInput} onChange={handleSearchInput} />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-y-2 border-solid border-y-gris-claro">
              {visibleColumns.map((column) => (
                <th className="p-3 font-normal text-gris-oscuro" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && <div>No data available</div>}
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b-[1px] border-solid border-gris-oscuro hover:bg-gray-50 border-l-2 ${
                  index % 2 === 0 ? " border-l-azul" : "border-l-gris-oscuro"
                }`}
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column}
                    className="p-4 text-gris-oscuro"
                    onClick={rowClick ? () => rowClick(row) : undefined}
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
