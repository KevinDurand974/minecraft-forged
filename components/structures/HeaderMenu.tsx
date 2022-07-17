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
              <i className="icon-outline-search" />
            </button>
          </li>
        )}
        <li>
          <button className="text-xl bg-secondary rounded-[10px] p-2">
            <i className="icon-bold-one-user" />
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
