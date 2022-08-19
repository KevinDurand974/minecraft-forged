import { DisplayFilter } from "@forged/types";
import { FC } from "react";

interface Props {
  current: DisplayFilter;
  onClick: (version: DisplayFilter) => void;
}

const SidebarDisplay: FC<Props> = ({ onClick, current }) => {
  // Handle click Display
  const handleClick = (display: DisplayFilter) => {
    onClick(display);
  };

  return (
    <div>
      <div className="bg-secondary p-2 text-lg w-full text-left font-semibold">
        <i
          className={`icon-iconly-outline-arrow-right-square before:transition before:duration-300`}
        />{" "}
        <span>Display</span>
      </div>
      <div className="w-full flex flex-col">
        <button
          className={`px-5 py-2 w-full text-right border-b-1 border-t-alt transition-all duration-300 sidebar-hover font-bold tracking-wider hover:bg-opacity-90 ${
            current === "rows" ? "bg-accent pr-8" : "bg-tertiary"
          }`}
          onClick={() => handleClick("rows")}
        >
          <span>GRID</span> <i className="icon-rows" />
        </button>
        <button
          className={`px-5 py-2 w-full text-right border-b-1 border-t-alt transition-all duration-300 sidebar-hover font-bold tracking-wider hover:bg-opacity-90 ${
            current === "tiles" ? "bg-accent pr-8" : "bg-tertiary"
          }`}
          onClick={() => handleClick("tiles")}
        >
          <span>TILES</span> <i className="icon-tiles" />
        </button>
      </div>
    </div>
  );
};

export default SidebarDisplay;
