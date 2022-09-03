import { FC, useCallback, useMemo, useState } from "react";

import { ArrowBoldDown } from "./icons";

interface Props {
  nbPage: number;
  currentPage: number;
  onPageClick?: (page: number) => void;
  onPageChange?: (page: number) => void;
}

const Pagination: FC<Props> = ({
  nbPage,
  currentPage,
  onPageClick,
  onPageChange,
}) => {
  const handlePageClick = useCallback(
    (page: number) => {
      if (onPageChange) onPageChange(page + 1);
      if (onPageClick) onPageClick(page + 1);
    },
    [onPageClick, onPageChange]
  );

  const onCurrent = useMemo(() => {
    return "text-accent border-accent";
  }, []);

  const buttonStyle = useMemo(() => {
    return "p-2 border-2 border-normal font-semibold rounded-md min-w-[3.25rem] min-h-[3.25rem]";
  }, []);

  const pageList = useMemo(() => {
    const list: any[] = [];
    if (nbPage <= 5) {
      for (let i = 0; i < nbPage; i++) {
        list.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${currentPage === i + 1 && onCurrent} ${buttonStyle}`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      if (currentPage < 5) {
        for (let i = 0; i < 5; i++) {
          list.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`${currentPage === i + 1 && onCurrent} ${buttonStyle}`}
            >
              {i + 1}
            </button>
          );
        }
        list.push(
          <span className={`${buttonStyle} tracking-wider text-center`}>
            ...
          </span>
        );
        list.push(
          <button
            onClick={() => handlePageClick(nbPage - 1)}
            className={buttonStyle}
          >
            {nbPage}
          </button>
        );
      } else if (currentPage > nbPage - 4) {
        list.push(
          <button onClick={() => handlePageClick(0)} className={buttonStyle}>
            1
          </button>
        );
        list.push(
          <span className={`${buttonStyle} tracking-wider text-center`}>
            ...
          </span>
        );
        for (let i = nbPage - 5; i < nbPage; i++) {
          list.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`${currentPage === i + 1 && onCurrent} ${buttonStyle}`}
            >
              {i + 1}
            </button>
          );
        }
      } else {
        list.push(
          <button onClick={() => handlePageClick(0)} className={buttonStyle}>
            1
          </button>
        );
        list.push(
          <span className={`${buttonStyle} tracking-wider text-center`}>
            ...
          </span>
        );
        for (let i = currentPage - 3; i < currentPage + 2; i++) {
          list.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`${currentPage === i + 1 && onCurrent} ${buttonStyle}`}
            >
              {i + 1}
            </button>
          );
        }
        list.push(
          <span className={`${buttonStyle} tracking-wider text-center`}>
            ...
          </span>
        );
        list.push(
          <button
            onClick={() => handlePageClick(nbPage - 1)}
            className={buttonStyle}
          >
            {nbPage}
          </button>
        );
      }
    }
    return list;
  }, [buttonStyle, currentPage, handlePageClick, nbPage, onCurrent]);

  return (
    <div className="flex justify-evenly items-center gap-2">
      <button
        onClick={() => handlePageClick(currentPage - 2)}
        disabled={currentPage - 2 < 0}
        className="p-2 border-2 border-normal font-semibold rounded-md min-w-[3.25rem] min-h-[3.25rem] text-1xl flex items-center justify-center"
      >
        <ArrowBoldDown className="fill-normal rotate-90 w-5" />
      </button>
      {pageList}
      <button
        onClick={() => handlePageClick(currentPage)}
        disabled={currentPage + 1 > nbPage}
        className="p-2 border-2 border-normal font-semibold rounded-md min-w-[3.25rem] min-h-[3.25rem] text-1xl flex items-center justify-center"
      >
        <ArrowBoldDown className="fill-normal -rotate-90 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
