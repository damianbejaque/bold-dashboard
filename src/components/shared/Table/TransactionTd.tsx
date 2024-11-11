import { PiContactlessPaymentLight, PiLink } from "react-icons/pi";
import { Status } from "../../../types/myBussiness";
import { transactionStatus } from "../../../utils/utils";

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
export default TransactionTd;
