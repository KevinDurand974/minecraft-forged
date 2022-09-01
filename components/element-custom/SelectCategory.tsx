import { ArrowCurvedDown } from "@components/icons";
import { FC, useState } from "react";

import SelectButton from "./SelectButton";

type ComplexValues = {
  category: string;
  values: string[];
};

interface Props {
  value: ComplexValues;
  currentValues?: string[];
  defaultValue?: string;
  onClick: (value: string) => void;
}

const SelectCategory: FC<Props> = ({
  value,
  onClick,
  currentValues,
  defaultValue,
}) => {
  const [showSubValues, setShowSubValues] = useState(true);

  return (
    <div className="flex flex-col w-full">
      <button
        className="text-xl text-left font-semibold small-case p-2 border-l-4 border-normal bg-tertiary flex hover:bg-opacity-90"
        onClick={() => setShowSubValues(!showSubValues)}
      >
        <ArrowCurvedDown
          className={`fill-normal w-4 mr-4 ml-2 transition duration-300 ${
            !showSubValues && "-rotate-90"
          }`}
        />{" "}
        {value.category}
      </button>
      <div
        className={`flex flex-col border-l-4 border-normal border-opacity-50 ${
          !showSubValues && "hidden"
        }`}
      >
        {value.values.map(subvalue => {
          if (currentValues?.length) {
            return (
              <SelectButton
                key={subvalue}
                value={subvalue}
                onClick={onClick}
                defaultValue={defaultValue}
                status={currentValues.includes(subvalue)}
              />
            );
          } else {
            return (
              <SelectButton
                key={subvalue}
                value={subvalue}
                onClick={onClick}
                defaultValue={defaultValue}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SelectCategory;
