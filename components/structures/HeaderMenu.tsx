import { FC } from "react";

type Props = {
  showSearch: boolean;
};

const HeaderMenu: FC<Props> = ({ showSearch }) => {
  return (
    <nav className="col-start-3 justify-self-end">
      <ul className="flex flex-row gap-3">
        {showSearch && (
          <li>
            <button className="text-xl bg-secondary rounded-[10px] p-2">
              <i className="icon-iconly-outline-search" />
            </button>
          </li>
        )}
        <li>
          <button className="text-xl bg-secondary rounded-[10px] p-2">
            <i className="icon-iconly-bold-profile" />
          </button>
        </li>
        <li>
          <button className="text-xl bg-secondary rounded-[10px] p-2">
            <i className="icon-download" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
