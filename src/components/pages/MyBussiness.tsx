import { useCallback, useEffect, useMemo, useState } from "react";
import { myBussinessData, myBussinessDataTable } from "../../adapters/";
import useData from "../../hooks/useData";
import { myBussiness, adaptedMyBussinessTable } from "../../types/myBussiness";

import {
  currentMont,
  filterByCheckbox,
  filterByDate,
  filterByTextInput,
  sumAllSales,
} from "../../utils/utils";

import {
  DatePicker,
  Table,
  SalesCard,
  Filters,
  TransactionCard,
} from "../shared/";

import Modal from "../shared/Modal";
import { FilterOptions } from "../shared/Filters";

const hiddenColumns = ["id", "amount"];

const optionsFilterCheckbox: FilterOptions[] = [
  {
    name: "Cobro con datafono",
    searchValue: "TERMINAL",
    active: false,
    handleClick: () => {},
  },
  {
    name: "Cobro con link de pago",
    searchValue: "PAYMENT_LINK",
    active: false,
    handleClick: () => {},
  },
  {
    name: "Ver todos",
    active: false,
    handleClick: () => {},
  },
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<myBussiness | null>(null);
  const [filterDate, setFilterDate] = useState(
    localStorage.getItem("localFilterDate") || ""
  );
  const [filterCheckbox, setFilterCheckbox] = useState(optionsFilterCheckbox);
  const [filterTextInput, setFilterTextInput] = useState("");
  const [filteredData, setFilteredData] = useState(myBussinessInitialData);

  const applyAllFilters = useCallback(() => {
    let data = myBussinessInitialData;

    data = filterByDate(data, filterDate);
    data = filterByCheckbox(data, filterCheckbox);
    data = filterByTextInput(data, filterTextInput);

    setFilteredData(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate, filterTextInput, myBussinessInitialData]);

  const handleDateRange = useCallback((newTitle: string) => {
    setFilterDate(newTitle);
    localStorage.setItem("localFilterDate", newTitle);
  }, []);

  const handleClickRow = useCallback(
    (row: adaptedMyBussinessTable) => {
      const selected = myBussinessInitialData.find(
        (item) => item.id === row.id
      );
      if (selected) {
        setSelectedRow(selected);
        setIsModalOpen(true);
      }
    },
    [myBussinessInitialData]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleInputFilterSearch = useCallback((search: string) => {
    setFilterTextInput(search);
  }, []);

  const handleFilterClickCheckBox = useCallback((name: string) => {
    setFilterCheckbox((prevFilter) => {
      const newFilter = prevFilter.map((item) => {
        if (item.name === name) {
          return { ...item, active: !item.active };
        }
        return item;
      });
      return newFilter;
    });
  }, []);

  const handleApplyFilterCheckbox = useCallback(() => {
    const activeFilters = filterCheckbox.filter((item) => item.active);
    if (activeFilters.length > 0) {
      const filteredData = myBussinessInitialData.filter((item) => {
        return activeFilters.some(
          (filter) => item.salesType === filter.searchValue
        );
      });
      setFilteredData(filteredData);
    }
  }, [filterCheckbox, myBussinessInitialData]);

  const cleanFilterCheckbox = useCallback(() => {
    const newFilter = filterCheckbox.map((item) => {
      return { ...item, active: false };
    });
    setFilterCheckbox(newFilter);
  }, [filterCheckbox]);

  useEffect(() => {
    setFilterCheckbox((prevFilter) => {
      const newFilter = prevFilter.map((item) => {
        if (item.name === "Ver todos") {
          return { ...item, handleClick: cleanFilterCheckbox };
        }
        return {
          ...item,
          handleClick: () => handleFilterClickCheckBox(item.name),
        };
      });
      return newFilter;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyAllFilters();
  }, [filterDate, filterTextInput, applyAllFilters]);

  const tableData = useMemo(
    () => myBussinessDataTable(filteredData),
    [filteredData]
  );

  const columns =
    myBussinessInitialData.length > 0
      ? Object.keys(myBussinessDataTable(myBussinessInitialData)[0])
      : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
            handleMonth={() => handleDateRange(currentMont())}
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
          handleSearchInput={handleInputFilterSearch}
          searchInput={filterTextInput}
          title={`Transacciones de ${filterDate}`}
          hiddenColumns={hiddenColumns}
        />
      )}
    </>
  );
};

export default MyBussiness;
