import { adaptedMyBussinessTable, myBussiness } from "../types/myBussiness";
import { formatDateTime } from "../utils/utils";
import PaymentMethod from "../components/shared/PaymentMethod";
import TransactionTd from "../components/shared/Table/TransactionTd";
import AmmountTd from "../components/shared/Table/AmmountTd";

export const myBussinessDataTable = (
  data: myBussiness[]
): adaptedMyBussinessTable[] =>
  data.map((item) => ({
    Transaccion: (
      <TransactionTd status={item.status} salesType={item.salesType} />
    ),
    "Fecha y hora": formatDateTime(item.createdAt),
    "Metodo de pago": (
      <PaymentMethod
        paymentMethod={item.paymentMethod}
        franchise={item.franchise}
        transactionReference={item.transactionReference}
      />
    ),
    "ID transaccion Bold": item.id,
    Monto: <AmmountTd amount={item.amount} deduction={item.deduction || 0} />,
    amount: item.amount,
    id: item.id,
  }));
