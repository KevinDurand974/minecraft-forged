import { ChildrenProps } from "@forged/types";
import { FC } from "react";

interface Props extends ChildrenProps {
  title?: string;
}

const PackItem: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl small-case font-semibold">{title}</h3>
      <div className="border-2 border-tertiary p-4">{children}</div>
    </div>
  );
};

export default PackItem;
