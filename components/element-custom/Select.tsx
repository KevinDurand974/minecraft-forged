import { ArrowBoldDown, Close } from "@components/icons";
import { FC, useEffect, useRef, useState } from "react";

import SelectButton from "./SelectButton";
import SelectCategory from "./SelectCategory";

type BasicValues = string;

type ComplexValues = {
  category: string;
  values: string[];
};

interface Props {
  values: (BasicValues | ComplexValues)[];
}

const Select: FC<Props> = ({ values }) => {
  // State
  const [isBoxSelectOpen, setIsBoxSelectOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Ref
  const boxRef = useRef<HTMLDivElement>(null);

  // Handler choice click
  const handleChoiceClick = (value: string) => {
    setSelectedValue(value);
    setInputValue(value);
    setIsBoxSelectOpen(false);
  };

  // Handler Reset click
  const handleResetClick = () => {
    setSelectedValue("");
    setInputValue("");
  };

  // UseEffect
  useEffect(() => {
    const handleClick = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsBoxSelectOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Custom Filter for complex values
  const filterWithObject = (
    values: (BasicValues | ComplexValues)[],
    filter: string
  ): (BasicValues | ComplexValues)[] => {
    return values.map(value => {
      if (typeof value === "object") {
        if (
          value.values.some(v => v.toLowerCase().includes(filter.toLowerCase()))
        ) {
          return {
            ...value,
            values: value.values.filter(v =>
              v.toLowerCase().includes(filter.toLowerCase())
            ),
          };
        } else {
          return {
            ...value,
            values: [],
          };
        }
      }
      return value;
    });
  };

  // Create appropriate HTML structure
  let list = null;
  if (values.every(value => typeof value === "string")) {
    // Only basic values
    list = (values as BasicValues[])
      .filter(value => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      })
      .map(value => (
        <SelectButton key={value} value="value" onClick={handleChoiceClick} />
      ));
  } else {
    // Complex values
    list = filterWithObject(values as ComplexValues[], inputValue)
      .filter(value => {
        if (typeof value === "string")
          return value.toLowerCase().includes(inputValue.toLowerCase());
        return value.values.length > 0;
      })
      .map((value, index) =>
        typeof value === "string" ? (
          <SelectButton key={value} value={value} onClick={handleChoiceClick} />
        ) : (
          <SelectCategory
            key={index}
            value={value}
            onClick={handleChoiceClick}
          />
        )
      );
  }

  return (
    <div
      ref={boxRef}
      className="flex items-center w-full border-2 border-normal p-2 justify-between h-full relative bg-secondary"
    >
      <div className="w-[calc(100%_-_5rem)] relative min-h-[32px] flex items-center">
        <span
          className={`w-full text-ellipsis overflow-hidden absolute pointer-events-none ${
            inputValue !== selectedValue && inputValue !== "" && "opacity-0"
          }`}
        >
          {selectedValue === "" || inputValue === ""
            ? "Select..."
            : selectedValue}
        </span>
        <input
          type="text"
          className={`w-full min-h-[32px] bg-transparent border-none outline-offset-4`}
          onFocus={() => setIsBoxSelectOpen(true)}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex items-center h-full gap-1">
        <button
          className="h-8 w-8 flex justify-center items-center"
          onClick={handleResetClick}
        >
          <Close className="fill-normal w-4" />
        </button>
        <div className="h-2/3 w-[2px] bg-normal" />
        <button
          className="h-8 w-8 flex items-center justify-center"
          onClick={() => setIsBoxSelectOpen(!isBoxSelectOpen)}
        >
          <ArrowBoldDown
            className={`fill-normal w-4 transition duration-300 ${
              isBoxSelectOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        className={`absolute -left-0.5 -right-0.5 top-full border-2 border-normal flex flex-col bg-secondary max-h-72 overflow-auto ${
          !isBoxSelectOpen && "hidden"
        }`}
      >
        {list}
      </div>
    </div>
  );
};

export default Select;
