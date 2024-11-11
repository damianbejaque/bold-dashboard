import React from "react";
import {
  adaptedMyBussinessTable,
  myBussiness,
  Status,
} from "../types/myBussiness";
import {
  formatAmount,
  formatDateTime,
  transactionStatus,
} from "../utils/utils";
import { PiLink, PiContactlessPaymentLight } from "react-icons/pi";
import PaymentMethod from "../components/shared/PaymentMethod";

interface TransactionTdProps {
  status: Status;
  salesType: string;
}

const TransactionTd = ({
  status,
  salesType,
}: TransactionTdProps): React.ReactNode => {
  return (
    <div className="flex items-center gap-2 text-azul">
      {salesType === "PAYMENT_LINK" && <PiLink className="basis-1/12" />}
      {salesType === "TERMINAL" && (
        <PiContactlessPaymentLight className="basis-1/12" />
      )}
      <p className="basis-1/2 grow">{transactionStatus(status)} </p>
    </div>
  );
};

interface AmountTdProps {
  amount: number;
  deduction: number;
}

const AmmountTd = ({ amount, deduction }: AmountTdProps): React.ReactNode => {
  return (
    <div className="flex flex-col text-azul justify-self-start">
      {formatAmount(amount)}
      {deduction > 0 && (
        <>
          <p className="text-gris-oscuro">Deduccion Bold </p>
          <p className="text-rojo">{formatAmount(deduction)} </p>{" "}
        </>
      )}
    </div>
  );
};

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
    Monto: <AmmountTd amount={item.amount} deduction={item.deduction} />,
    amount: item.amount,
    id: item.id,
  }));
