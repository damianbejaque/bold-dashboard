import { useState, useEffect, useCallback } from "react";
import {
  filterByDate,
  filterByCheckbox,
  filterByTextInput,
} from "../utils/utils";
import { myBussiness } from "../types/myBussiness";

const useFilters = (data: myBussiness[], FILTER_CHECKBOXES) => {
  const [filterDate, setFilterDate] = useState(
    localStorage.getItem("localFilterDate") || ""
  );
  const [filterCheckbox, setFilterCheckbox] = useState(
    JSON.parse(localStorage.getItem("localFilterCheckbox") || "null") ||
      FILTER_CHECKBOXES
  );
  const [filterTextInput, setFilterTextInput] = useState(
    localStorage.getItem("localFilterTextInput") || ""
  );

  const handleFilterText = (text: string) => {
    setFilterTextInput(text);
    localStorage.setItem("localFilterTextInput", text);
  };
  const [filteredData, setFilteredData] = useState(data);

  const applyAllFilters = useCallback(() => {
    let result = filterByDate(data, filterDate);
    result = filterByCheckbox(result, filterCheckbox);
    result = filterByTextInput(result, filterTextInput);
    setFilteredData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterDate, filterTextInput]);

  const handleDateRange = (newDate: string) => {
    setFilterDate(newDate);
    localStorage.setItem("localFilterDate", newDate);
  };

  const toggleCheckbox = (name: string) => {
    setFilterCheckbox((prev) => {
      const newFilter = prev.map((item) =>
        item.name === name ? { ...item, active: !item.active } : item
      );
      if (
        newFilter.every((item) => item.name !== "Ver todos" && !item.active)
      ) {
        newFilter.find((item) => item.name === "Ver todos")!.active = true;
      } else {
        newFilter.find((item) => item.name === "Ver todos")!.active = false;
      }
      localStorage.setItem("localFilterCheckbox", JSON.stringify(newFilter));
      return newFilter;
    });
  };

  const resetCheckboxes = () => {
    setFilterCheckbox((prev) =>
      prev.map((item) => ({ ...item, active: true }))
    );
  };

  const handleApplyFilterCheckbox = useCallback(() => {
    const activeFilters = filterCheckbox.filter((item) => item.active);
    if (activeFilters.length > 0) {
      const filteredByCheckbox = data.filter((item) =>
        activeFilters.some((filter) => item.salesType === filter.searchValue)
      );
      setFilteredData(filteredByCheckbox);
    } else {
      setFilteredData(data);
    }
  }, [filterCheckbox, data]);

  useEffect(() => {
    setFilterCheckbox((prev) =>
      prev.map((item) =>
        item.name === "Ver todos"
          ? { ...item, handleClick: resetCheckboxes }
          : { ...item, handleClick: () => toggleCheckbox(item.name) }
      )
    );
  }, []);

  useEffect(() => {
    applyAllFilters();
  }, [applyAllFilters]);

  return {
    filteredData,
    filterDate,
    filterCheckbox,
    filterTextInput,
    handleFilterText,
    handleDateRange,
    handleApplyFilterCheckbox,
  };
};

export default useFilters;
