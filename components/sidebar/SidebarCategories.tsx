import { FC } from "react";

type Categories =
  | "Modpacks"
  | "Mods"
  | "Resource Packs"
  | "Worlds"
  | "Other"
  | "All";

interface Props {
  current: number;
  onClick: (category: number) => void;
}

const categoryArray = [
  { name: "All Categories", value: 0 },
  { name: "Modpacks", value: 4471 },
  { name: "Mods", value: 6 },
  { name: "Resource Packs", value: 12 },
  { name: "Worlds", value: 17 },
];

const SidebarCategory: FC<Props> = ({ onClick, current }) => {
  // Handle click Display
  const handleClick = (category: number) => {
    onClick(category);
  };

  return (
    <div>
      <div className="bg-secondary p-2 text-lg w-full text-left font-semibold">
        <i
          className={`icon-iconly-outline-arrow-right-square before:transition before:duration-300`}
        />{" "}
        <span>Category</span>
      </div>
      <div className="w-full flex flex-col">
        {categoryArray.map(category => (
          <button
            key={category.value}
            className={`px-5 py-2 w-full text-right border-b-1 border-t-alt transition-all duration-300 sidebar-hover font-bold tracking-wider hover:bg-opacity-90 ${
              current === category.value ? "bg-accent pr-8" : "bg-tertiary"
            }`}
            onClick={() => handleClick(category.value)}
          >
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarCategory;
