import { FC, ReactNode } from "react";

interface Props {
  title: string;
  value?: string;
  children?: ReactNode;
  onClick: () => void;
  className?: string;
}

const Filter: FC<Props> = ({ title, value, children, className, onClick }) => {
  const handleClick = () => onClick();

  const style =
    className ||
    "text-xl lt-2xl:text-lg small-case bg-tertiary px-6 py-2 rounded-xl shadow-xs shadow-tertiary";
  return (
    <button className={style} onClick={handleClick}>
      {title} ▸ {value}
      {children}
    </button>
  );
};

export default Filter;
