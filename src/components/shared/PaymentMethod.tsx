import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import pse from "src/assets/pse.png";
import daviplata from "src/assets/daviplata.png";
import nequi from "src/assets/nequi.png";
import bancolombia from "src/assets/bancolombia.jpg";

interface PaymentMethodProps {
  paymentMethod: string;
  franchise: string;
  transactionReference: number;
}

const PaymentMethod = ({
  paymentMethod,
  franchise,
  transactionReference = 0,
}: PaymentMethodProps) => {
  const paymentReturn = () => {
    switch (paymentMethod) {
      case "CARD":
        return (
          <>
            {franchise === "VISA" && <FaCcVisa />}
            {franchise === "MASTERCARD" && <FaCcMastercard />}
            <span className="text-gris-oscuro grow">
              **** {transactionReference}
            </span>
          </>
        );
      case "PSE":
        return (
          <>
            <img src={pse} className="h-6 w-6 " alt="Logo" />
            <span className="text-gris-oscuro grow">PSE</span>
          </>
        );
      case "NEQUI":
        return (
          <>
            <img src={nequi} className="h-6 w-6 " alt="Logo" />
            <span className="text-gris-oscuro grow">
              **** {transactionReference}
            </span>
          </>
        );
      case "DAVIPLATA":
        return (
          <>
            <img src={daviplata} className="h-6 w-6 " alt="Logo" />
            <span className="text-gris-oscuro grow">
              **** {transactionReference}
            </span>
          </>
        );
      case "BANCOLOMBIA":
        return (
          <>
            <img src={bancolombia} className="h-6 w-6 " alt="Logo" />
            <span className="text-gris-oscuro grow">
              **** {transactionReference}
            </span>
          </>
        );
      default:
        return (
          <>
            <span className="text-gris-oscuro grow">
              {paymentMethod} {transactionReference}
            </span>
          </>
        );
    }
  };

  return <div className="inline-flex gap-4 grow">{paymentReturn()}</div>;
};
export default PaymentMethod;
