import { adaptedMyBussinessTable, myBussiness, Status } from "../types/myBussiness";

export function sumAllSales(data: adaptedMyBussinessTable[]) {
  return data.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
}


export function formatDate(date: number) {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: number) {
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString('es-CO', { hour12: false })}`;
}

export function transactionStatus(transactionReference: Status) {
  return transactionReference === Status.SUCCESSFUL ? 'Cobro exitoso' : 'Cobro no realizado';
}

export function formatAmount(amount: number) {
  return `$ ${new Intl.NumberFormat('es-MX').format(amount)}`;
}

export function currentMont() {
  const currentDate = new Date();
  return currentDate
    .toLocaleString("es-CO", {
      month: "long",
    })
    .charAt(0)
    .toUpperCase() +
    currentDate
      .toLocaleString("es-CO", {
        month: "long",
      })
      .slice(1)
}

export const filterDataByDateRange = (
  data: myBussiness[],
  startDate: Date,
  endDate: Date
) => {
  return data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });
};


export const calculateStartDate = (filterDate: string): Date => {
  const today = new Date();
  let startDate = new Date();

  if (filterDate === "hoy") {
    startDate.setHours(0, 0, 0, 0);
  } else if (filterDate === "esta semana") {
    startDate.setDate(today.getDate() - 7);
  } else if (filterDate === currentMont()) {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  }

  return startDate;
};

export const filterByDate = (data: myBussiness[], filterDate: string): myBussiness[] => {
  if (!filterDate) return data;

  const today = new Date();
  const startDate = calculateStartDate(filterDate);
  return filterDataByDateRange(data, startDate, today);
};

export const filterByCheckbox = (data: myBussiness[], filterCheckbox: any[]): myBussiness[] => {
  const activeFilters = filterCheckbox.filter((item) => item.active);
  if (activeFilters.length === 0) return data;
  return data.filter((item) =>
    activeFilters.some((filter) => item.salesType === filter.searchValue)
  );
};

export const filterByTextInput = (data: myBussiness[], filterTextInput: string): myBussiness[] => {
  if (!filterTextInput) return data;

  return data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterTextInput.toLowerCase())
    )
  );
};