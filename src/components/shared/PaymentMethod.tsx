import React from "react";
import daviplata from "src/assets/daviplata.png";
import bancolombia from "src/assets/bancolombia.jpg";
import pse from "src/assets/pse.png";
import nequi from "src/assets/nequi.png";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";

interface PaymentMethodProps {
  paymentMethod: string;
  franchise?: string;
  transactionReference: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  franchise = "",
  transactionReference,
}) => {
  const renderPaymentInfo = (
    logoSrc: string | null,
    reference: string,
    label: string | null = null
  ) => (
    <>
      {logoSrc && <img src={logoSrc} className="h-6 w-6" alt="Logo" />}
      <span className="text-gris-oscuro grow">
        {label ? label : `**** ${reference}`}
      </span>
    </>
  );

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
        return renderPaymentInfo(pse, transactionReference, "PSE");
      case "NEQUI":
        return renderPaymentInfo(nequi, transactionReference);
      case "DAVIPLATA":
        return renderPaymentInfo(daviplata, transactionReference);
      case "BANCOLOMBIA":
        return renderPaymentInfo(bancolombia, transactionReference);
      default:
        return renderPaymentInfo(
          null,
          transactionReference,
          `${paymentMethod} ${transactionReference}`
        );
    }
  };

  return <div className="inline-flex gap-4 grow">{paymentReturn()}</div>;
};

export default PaymentMethod;
