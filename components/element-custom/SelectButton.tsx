import { FC } from "react";

interface Props {
  value: string;
  status?: boolean;
  defaultValue?: string;
  onClick: (value: string) => void;
}

const SelectButton: FC<Props> = ({ value, onClick, status, defaultValue }) => {
  const handleClick = (value: string) => {
    onClick(value);
  };

  return (
    <button
      key={value}
      className="p-3 text-left transition-all duration-300 bg-transparent hover:pl-4 hover:bg-tertiary hover:bg-opacity-80 even:bg-t-alt even:bg-opacity-70 flex justify-between items-center"
      onClick={() => handleClick(value)}
    >
      <span>{value}</span>
      {(status || (defaultValue === value && status)) && (
        <span className="text-xs text-accent pointer-events-none font-semibold tracking-wide">
          Remove
        </span>
      )}
    </button>
  );
};

export default SelectButton;
