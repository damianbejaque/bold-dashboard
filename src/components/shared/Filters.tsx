import { useState } from "react";
import { FaFilter, FaRegWindowClose } from "react-icons/fa";

export interface FilterOption {
  name: string;
  active: boolean;
  searchValue?: string;
  handleClick: () => void;
}

interface FilterModalProps {
  options: FilterOption[];
  handleApplyFilter: () => void;
}

const FilterModal = ({ options, handleApplyFilter }: FilterModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const renderFilterOption = (filter: FilterOption) => (
    <div key={filter.name} className="flex items-center space-x-2">
      <label className="flex items-center space-x-2 text-gray-700">
        <input
          type="checkbox"
          checked={filter.active}
          className="form-checkbox"
          onChange={filter.handleClick}
        />
        <span>{filter.name}</span>
      </label>
    </div>
  );

  return (
    <div className="relative inline-block self-end">
      <button
        onClick={toggleModal}
        className="flex items-center space-x-1 text-blue-600 font-medium bg-gray-100 px-3 py-2 rounded-lg shadow-md"
      >
        <span>Filtrar</span>
        <FaFilter />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white w-64 p-4 rounded-lg shadow-lg space-y-4 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Filtrar</h2>
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaRegWindowClose />
            </button>
          </div>
          <div className="space-y-2">{options.map(renderFilterOption)}</div>
          <button
            onClick={handleApplyFilter}
            className="w-full bg-pink-300 text-white py-2 rounded-lg font-medium hover:bg-pink-400"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
