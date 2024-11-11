import { useMemo, useState } from "react";
import { myBussinessData, myBussinessDataTable } from "../../adapters/";
import useData from "../../hooks/useData";
import { myBussiness, adaptedMyBussinessTable } from "../../types/myBussiness";
import { currentMonth, sumAllSales } from "../../utils/utils";

import {
  DatePicker,
  Table,
  SalesCard,
  Filters,
  TransactionCard,
} from "../shared/";
import Modal from "../shared/Modal";
import useFilters from "../../hooks/useFilters";

const hiddenColumns = ["id", "amount"];
const FILTER_CHECKBOXES = [
  { name: "Cobro con datafono", searchValue: "TERMINAL", active: false },
  {
    name: "Cobro con link de pago",
    searchValue: "PAYMENT_LINK",
    active: false,
  },
  { name: "Ver todos", active: false },
];

const MyBussiness: React.FC = () => {
  const {
    data: myBussinessInitialData,
    isLoading,
    error,
  } = useData<myBussiness>({
    url: "https://bold-fe-api.vercel.app/api",
    transformation: myBussinessData,
  });

  const {
    filteredData,
    filterDate,
    filterCheckbox,
    filterTextInput,
    setFilterTextInput,
    handleDateRange,
    handleApplyFilterCheckbox,
  } = useFilters(myBussinessInitialData, FILTER_CHECKBOXES);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<myBussiness | null>(null);

  const handleClickRow = (row: adaptedMyBussinessTable) => {
    const selected = myBussinessInitialData.find((item) => item.id === row.id);
    if (selected) {
      setSelectedRow(selected);
      setIsModalOpen(true);
    }
  };

  const tableData = useMemo(
    () => myBussinessDataTable(filteredData),
    [filteredData]
  );

  const columns = useMemo(
    () =>
      myBussinessInitialData.length > 0
        ? Object.keys(myBussinessDataTable(myBussinessInitialData)[0])
        : [],
    [myBussinessInitialData]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedRow && <TransactionCard data={selectedRow} />}
        </Modal>
      )}
      <section className="columns-1 sm:columns-2 sm:flex text-gray-600 body-font mx-auto mb-2 gap-4">
        <div className="basis-1/3 mb-3">
          <SalesCard title={filterDate} total={sumAllSales(tableData)} />
        </div>
        <div className="flex flex-col basis-1/2 flex-grow">
          <DatePicker
            activeTitle={filterDate}
            handleToday={() => handleDateRange("hoy")}
            handleWeek={() => handleDateRange("esta semana")}
            handleMonth={() => handleDateRange(currentMonth())}
          />
          <Filters
            options={filterCheckbox}
            handleApplyFilter={handleApplyFilterCheckbox}
          />
        </div>
      </section>
      {columns.length > 0 && (
        <Table<adaptedMyBussinessTable>
          columns={columns}
          data={tableData}
          rowClick={handleClickRow}
          handleSearchInput={setFilterTextInput}
          searchInput={filterTextInput}
          title={`Transacciones de ${filterDate}`}
          hiddenColumns={hiddenColumns}
        />
      )}
    </>
  );
};

export default MyBussiness;
