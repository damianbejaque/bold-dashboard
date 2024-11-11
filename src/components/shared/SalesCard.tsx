import { currentMont, formatAmount, formatDate } from "../../utils/utils";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface TotalSalesProps {
  title: string;
  total: number;
}

const SalesCard = ({ title, total }: TotalSalesProps) => {
  const today = new Date();
  let footerDate = "";
  if (title === "hoy") {
    footerDate = formatDate(Date.now());
  } else if (title === "esta semana") {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    footerDate = `${lastWeek.toLocaleDateString()} - ${today.toLocaleDateString()}`;
  } else {
    footerDate = `${currentMont()}, ${today.getFullYear()}`;
  }
  return (
    <aside className="flex-grow-[1] bg-white rounded-xl shadow-lg">
      <div className=" flex text-gris-claro p-4 rounded-t-xl justify-between bg-header items-center ">
        <h2 className="text-sm font-light">Total de ventas de {title}</h2>
        <div className="relative group">
          <IoIosInformationCircleOutline className="text-2xl text-white" />
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gris-oscuro text-white text-xs rounded py-1 px-2">
            Información adicional sobre las ventas
          </div>
        </div>
      </div>
      <div className="p-4 ">
        <h2 className="text-2xl font-bold text-header">
          {formatAmount(total)}
        </h2>
        <h5 className="text-sm text-gray-500 mt-2">{footerDate}</h5>
      </div>
    </aside>
  );
};

export default SalesCard;
