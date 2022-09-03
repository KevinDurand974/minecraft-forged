import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

const PackItem: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl small-case font-semibold">
        <i className="icon-iconly-outline-arrow-right-circle" /> {title}
      </h3>
      <div className="border-2 border-tertiary p-4">{children}</div>
    </div>
  );
};

export default PackItem;
