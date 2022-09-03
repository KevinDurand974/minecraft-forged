import { FC } from "react";

interface Props {
  type: number;
  className?: string;
}

const ReleaseType: FC<Props> = ({ type, className = "w-12 h-12" }) => {
  const baseStyle =
    "px-2 py-2 pt-3 font-bold rounded-lg flex justify-center items-center" +
    " " +
    className;

  switch (type) {
    case 1:
      return <div className={baseStyle + " bg-green-600"}>R</div>;
    case 2:
      return <div className={baseStyle + " bg-blue-600"}>B</div>;
    case 3:
      return <div className={baseStyle + " bg-gray-500"}>A</div>;
    default:
      return <div className={baseStyle + " bg-gray-500"}>A</div>;
  }
};

export default ReleaseType;
