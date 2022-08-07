import { FC, ReactNode } from "react";

interface Props {
  title: string;
  value?: string;
  children?: ReactNode;
  className?: string;
}

const Filter: FC<Props> = ({ title, value, children, className }) => {
  const style =
    className ||
    "text-xl small-case bg-tertiary px-6 py-2 rounded-xl shadow-xs shadow-tertiary";
  return (
    <span className={style}>
      {title} ▸ {value}
      {children}
    </span>
  );
};

export default Filter;
