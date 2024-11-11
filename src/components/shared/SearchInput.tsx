import React from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, value }) => {
  return (
    <div className="p-4 border-b">
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Buscar"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
      />
    </div>
  );
};
export default SearchInput;
