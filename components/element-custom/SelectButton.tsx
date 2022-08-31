import { FC } from "react";

interface Props {
  value: string;
  onClick: (value: string) => void;
}

const SelectButton: FC<Props> = ({ value, onClick }) => {
  const handleClick = (value: string) => {
    onClick(value);
  };

  return (
    <button
      key={value}
      className="p-3 text-left transition-all duration-300 bg-transparent hover:pl-4 hover:bg-tertiary hover:bg-opacity-80 even:bg-t-alt even:bg-opacity-70"
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  );
};

export default SelectButton;
