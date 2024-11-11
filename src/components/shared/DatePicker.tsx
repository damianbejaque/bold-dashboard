import { useState, useEffect } from "react";
import { currentMont } from "../../utils/utils";

interface DatePickerProps {
  handleToday: () => void;
  handleWeek: () => void;
  handleMonth: () => void;
  activeTitle: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  handleToday,
  handleWeek,
  handleMonth,
  activeTitle,
}) => {
  const currentMonth = currentMont();
  const [activeTab, setActiveTab] = useState(activeTitle);

  useEffect(() => {
    setActiveTab(activeTitle);
  }, [activeTitle]);

  const renderButton = (title: string, onClick: () => void) => (
    <button
      className={`flex-1 text-center py-1 mx-1  text-azul min-w-32 ${
        activeTab === title
          ? "bg-gris-claro rounded-full"
          : "hover:text-gray-800"
      }`}
      onClick={() => {
        setActiveTab(title);
        onClick();
      }}
    >
      {title.charAt(0).toUpperCase() + title.slice(1)}
    </button>
  );

  return (
    <div className="flex justify-center items-center bg-gray-50 align-baseline p-2 rounded-lg shadow-sm mb-4">
      {renderButton("hoy", handleToday)}
      {renderButton("esta semana", handleWeek)}
      {renderButton(currentMonth, handleMonth)}
    </div>
  );
};

export default DatePicker;
