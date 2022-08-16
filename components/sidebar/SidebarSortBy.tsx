import { ModsSearchSortField } from "@forged/types";
import { FC } from "react";

interface Props {
  current: ModsSearchSortField;
  onClick: (sort: ModsSearchSortField) => void;
}

const SidebarSortBy: FC<Props> = ({ onClick, current }) => {
  const sortList = [
    {
      name: "Featured",
      value: 1,
    },
    {
      name: "Popularity",
      value: 2,
    },
    {
      name: "Last Updated",
      value: 3,
    },
    {
      name: "Name",
      value: 4,
    },
    {
      name: "Author",
      value: 5,
    },
    {
      name: "Total Downloads",
      value: 6,
    },
    {
      name: "Category",
      value: 7,
    },
    {
      name: "Game Version",
      value: 8,
    },
  ];

  // Handle click Display
  const handleClick = (display: ModsSearchSortField) => {
    onClick(display);
  };

  return (
    <div>
      <div className="bg-secondary p-2 text-lg w-full text-left font-semibold">
        <i
          className={`icon-iconly-outline-arrow-right-square before:transition before:duration-300`}
        />{" "}
        <span>Sort By</span>
      </div>
      <div className="w-full flex flex-col max-h-48 overflow-auto">
        {sortList.map(sort => (
          <button
            key={sort.value}
            className={`px-5 py-2 w-full text-right border-b-1 border-t-alt transition-all duration-300 sidebar-hover font-bold tracking-wider hover:bg-opacity-90 ${
              current === sort.value ? "bg-accent pr-8" : "bg-tertiary"
            }`}
            onClick={() => handleClick(sort.value)}
          >
            <span>{sort.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarSortBy;
