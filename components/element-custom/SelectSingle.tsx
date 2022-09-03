import { ArrowBoldDown, Close } from "@components/icons";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { BehaviorSubject, debounceTime, Observable, Subscription } from "rxjs";

import SelectButton from "./SelectButton";
import SelectCategory from "./SelectCategory";

type BasicValues = string;

type ComplexValues = {
  category: string;
  values: string[];
};

interface Props {
  values: (BasicValues | ComplexValues)[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const SelectSingle: FC<Props> = ({ values, onChange, defaultValue = "" }) => {
  // Memo
  const savedParameters = useMemo(() => values, [values]);

  // State
  const [parameters, setParameters] = useState(savedParameters);
  const [isBoxSelectOpen, setIsBoxSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [selectedOldValue, setSelectedOldValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [inputOldValue, setInputOldValue] = useState(defaultValue);

  // BehaviorSubject
  const $selectedData = new BehaviorSubject<string>(
    selectedValue
  ).asObservable();
  const $inputValue = new BehaviorSubject<string>(inputValue).asObservable();

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
    setSelectedValue(defaultValue);
    setInputValue(defaultValue);
  };

  // Handler Input Focus
  const handleInputFocus = () => {
    setParameters(savedParameters);
    setIsBoxSelectOpen(true);
  };

  const handleOpenCloseBox = () => {
    if (isBoxSelectOpen) setIsBoxSelectOpen(false);
    else handleInputFocus();
  };

  // UseEffect - Handle click outside
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

  // UseEffect - OnChange Event
  useEffect(() => {
    if (!onChange) return;
    if (selectedValue === selectedOldValue) return;
    const $sub = $selectedData.pipe(debounceTime(200)).subscribe(values => {
      setSelectedOldValue(values);
      onChange(values.length > 0 ? values : "");
    });
    return () => {
      $sub.unsubscribe();
    };
  }, [$selectedData, onChange, selectedOldValue, selectedValue]);

  // UseEffect - Input Change Event
  useEffect(() => {
    const $preSub = $inputValue.pipe(debounceTime(150));
    const $sub = $preSub.subscribe(inputText => {
      if (inputText !== inputOldValue) {
        if (savedParameters.every(value => typeof value === "string")) {
          if (
            savedParameters.some(value =>
              (value as BasicValues).includes(inputText)
            )
          ) {
            console.log("Writed");
            const filtered = (savedParameters as BasicValues[]).filter(value =>
              value.toLowerCase().includes(inputText.toLowerCase())
            );
            setParameters(filtered);
            setInputOldValue(inputText);
          } else {
            setParameters([]);
          }
        } else {
          const matchInputText = (savedParameters as ComplexValues[]).some(
            value => {
              if (typeof value === "string") {
                return (value as BasicValues)
                  .toLowerCase()
                  .includes(inputText.toLowerCase());
              }
              return (value as ComplexValues).values.some(v =>
                v.toLowerCase().includes(inputText.toLowerCase())
              );
            }
          );
          if (matchInputText) {
            const filtered = filterWithObject(
              savedParameters as ComplexValues[],
              inputValue
            ).filter(value => {
              if (typeof value === "string")
                return value.toLowerCase().includes(inputValue.toLowerCase());
              return value.values.length > 0;
            });
            setParameters(filtered);
            setInputOldValue(inputText);
          }
        }
      }
    });

    return () => {
      $sub.unsubscribe();
    };
  }, [$inputValue, inputOldValue, inputValue, savedParameters]);

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
          {defaultValue === "" || selectedValue === "" || inputValue === ""
            ? "Select..."
            : selectedValue}
        </span>
        <input
          type="text"
          className={`w-full min-h-[32px] bg-transparent border-none outline-offset-4`}
          onFocus={handleInputFocus}
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
        <div className="h-7 w-[2px] bg-normal" />
        <button
          className="h-8 w-8 flex items-center justify-center"
          onClick={handleOpenCloseBox}
        >
          <ArrowBoldDown
            className={`fill-normal w-4 transition duration-300 ${
              isBoxSelectOpen && "rotate-180"
            }`}
          />
        </button>
      </div>
      <div
        className={`absolute z-100 -left-0.5 -right-0.5 top-full border-2 border-normal flex flex-col bg-secondary max-h-72 overflow-auto ${
          !isBoxSelectOpen && "hidden"
        }`}
      >
        {parameters.length > 0 ? (
          parameters.every(value => typeof value === "string") ? (
            (parameters as BasicValues[]).map(value => (
              <SelectButton
                key={value}
                value={value}
                onClick={handleChoiceClick}
              />
            ))
          ) : (
            (parameters as ComplexValues[]).map((value, index) =>
              typeof value === "string" ? (
                <SelectButton
                  key={value}
                  value={value}
                  onClick={handleChoiceClick}
                />
              ) : (
                <SelectCategory
                  key={index}
                  value={value}
                  onClick={handleChoiceClick}
                />
              )
            )
          )
        ) : (
          <div className="p-3 text-left bg-transparent">No results</div>
        )}
      </div>
    </div>
  );
};

export default SelectSingle;
