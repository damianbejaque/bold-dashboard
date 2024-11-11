import { myBussiness } from "../../types/myBussiness";
import {
  formatAmount,
  formatDateTime,
  transactionStatus,
} from "../../utils/utils";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

import PaymentMethod from "./PaymentMethod";
import { PiContactlessPaymentLight, PiLink } from "react-icons/pi";

interface TransactionCardProps {
  data: myBussiness;
}

const TransactionCard = ({ data }: TransactionCardProps) => {
  const {
    status,
    createdAt,
    id,
    amount,
    deduction,
    salesType,
    paymentMethod,
    franchise,
    transactionReference,
  } = data;

  return (
    <div className="max-w mx-auto rounded-lg p-6 space-y-4">
      <div className="flex flex-col items-center justify-center space-x-2 mb-24 ">
        <div className="flex flex-col items-center">
          {status === "SUCCESSFUL" ? (
            <FaCheckCircle color="green" size={32} />
          ) : (
            <AiFillCloseCircle className="text-rojo" size={32} />
          )}
          <p className="text-lg font-semibold  text-gray-700 justify-center">
            ¡ {transactionStatus(status)}!
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-azul">{formatAmount(amount)}</p>
          <p className="text-gris-oscuro">{formatDateTime(createdAt)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gris-oscuro">ID transacción Bold</p>
          <p className="font-bold text-gray-700">{id}</p>
        </div>
        {deduction > 0 && (
          <div className="flex justify-between">
            <p className="text-gris-oscuro">Deducción Bold</p>
            <p className="text-red-500 font-medium">
              -{formatAmount(deduction)}
            </p>
          </div>
        )}
      </div>

      <hr className="border-solid border-[1px] border-gris-oscuro" />

      <div className="space-y-2">
        <div className="flex  justify-between">
          <p className="text-gris-oscuro">Metodo de pago</p>
          <div className="flex">
            <p className="text-gris-oscuro font-bold">
              <PaymentMethod
                paymentMethod={paymentMethod}
                franchise={franchise}
                transactionReference={transactionReference}
              />
            </p>
          </div>
        </div>
        {transactionStatus(status) === "Cobro exitoso" && (
          <div className="flex justify-between">
            <p className="text-gris-oscuro">Tipo de pago</p>
            <p className="text-gris-oscuro font-bold flex items-center space-x-1">
              <span className="flex gap-1 items-center">
                {salesType === "PAYMENT_LINK" && <PiLink size={20} />}
                {salesType === "TERMINAL" && (
                  <PiContactlessPaymentLight size={20} />
                )}
                {salesType === "TERMINAL" ? "Datafono" : "Link de Pagos"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
