import { ArrowBoldDown, Close } from "@components/icons";
import { FC, useEffect, useMemo, useRef, useState } from "react";

import SelectButton from "./SelectButton";
import SelectCategory from "./SelectCategory";

type BasicValues = string;

type ComplexValues = {
  category: string;
  values: string[];
};

interface Props {
  values: (BasicValues | ComplexValues)[];
  onChange?: (value: string[]) => void;
}

const SelectMulti: FC<Props> = ({ values, onChange }) => {
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

  const removeFilterFromObject = (
    values: (BasicValues | ComplexValues)[],
    filter: string
  ): (BasicValues | ComplexValues)[] => {
    // Remove filter from BasicValues
    if (values.every(value => typeof value === "string")) {
      return values.filter(value => value !== filter);
    }
    // Remove filter from ComplexValues
    return values
      .map(value => {
        if (typeof value === "object") {
          return {
            ...value,
            values: value.values.filter(v => v !== filter),
          };
        }
        return value;
      })
      .filter(value => {
        if (typeof value === "string")
          return value.toLowerCase().includes(inputValue.toLowerCase());
        return value.values.length > 0;
      });
  };

  // State
  const oldValues = useMemo(() => values, [values]);
  const [choiceArray, setChoiceArray] =
    useState<(BasicValues | ComplexValues)[]>(oldValues);
  const [isBoxSelectOpen, setIsBoxSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isClickOutsideActive, setClickOutsideBoolan] = useState(false);

  // Ref
  const boxRef = useRef<HTMLDivElement>(null);

  // Handler choice click
  const handleChoiceClick = (value: string) => {
    if (selectedValue.includes(value)) {
      setSelectedValue(pre => {
        const newSelectedValue = pre.filter(v => v !== value);
        if (onChange) onChange(newSelectedValue);
        return newSelectedValue;
      });
    } else {
      setSelectedValue(pre => {
        const newSelectedValue = [...pre, value];
        if (onChange) onChange(newSelectedValue);
        return newSelectedValue;
      });
    }
    setInputValue("");
  };

  // Handler Reset click
  const handleResetClick = () => {
    setSelectedValue([]);
    setInputValue("");
    if (onChange) onChange([]);
  };

  // Handler Remove click
  const handleRemoveValue = (value: string) => {
    setClickOutsideBoolan(true);
    setSelectedValue(pre => {
      const newSelectedValue = pre.filter(v => v !== value);
      if (onChange) onChange(newSelectedValue);
      return newSelectedValue;
    });
  };

  // UseEffect
  useEffect(() => {
    const handleClick = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        if (isClickOutsideActive) {
          setClickOutsideBoolan(false);
        } else {
          setIsBoxSelectOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [boxRef, isClickOutsideActive]);

  // Create appropriate HTML structure
  let list = null;
  if (choiceArray.every(value => typeof value === "string")) {
    // Only basic values
    list = (choiceArray as BasicValues[])
      .filter(value => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      })
      .map(value => (
        <SelectButton
          key={value}
          value={value}
          onClick={handleChoiceClick}
          status={selectedValue.includes(value)}
        />
      ));
  } else {
    // Complex values
    list = filterWithObject(choiceArray as ComplexValues[], inputValue)
      .filter(value => {
        if (typeof value === "string")
          return value.toLowerCase().includes(inputValue.toLowerCase());
        return value.values.length > 0;
      })
      .map((value, index) =>
        typeof value === "string" ? (
          <SelectButton
            key={value}
            value={value}
            onClick={handleChoiceClick}
            status={selectedValue.includes(value)}
          />
        ) : (
          <SelectCategory
            key={index}
            value={value}
            currentValues={selectedValue}
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
      <div className="w-[calc(100%_-_5rem)] relative min-h-[32px] flex gap-3 items-center flex-wrap">
        {selectedValue.length > 0 ? (
          selectedValue.map(value => (
            <div
              key={value}
              className="flex items-center border border-normal px-1 gap-1 rounded-md"
            >
              <span>{value}</span>
              <button onClick={() => handleRemoveValue(value)}>
                <Close className="fill-normal w-3" />
              </button>
            </div>
          ))
        ) : (
          <span
            className={`absolute pointer-events-none ${
              selectedValue.length && "hidden"
            }`}
          >
            Select...
          </span>
        )}
        <input
          type="text"
          className={`min-w-[5rem] flex-1 min-h-[32px] bg-transparent border-none outline-offset-4`}
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
        {list.length ? (
          list
        ) : (
          <div className="p-3 text-left bg-transparent">No results</div>
        )}
      </div>
    </div>
  );
};

export default SelectMulti;
