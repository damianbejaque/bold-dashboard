import { formatAmount } from "../../../utils/utils";

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

export default AmmountTd;
