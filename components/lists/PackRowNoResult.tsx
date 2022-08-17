import { FC } from "react";

interface Props {
  type: string;
}

const PackRowNoResult: FC<Props> = ({ type }) => {
  return (
    <div className="grid modpack-rows max-w-screen-2xl mx-auto my-4 justify-between bg-tertiary border-2 border-transparent">
      <div className="h-32 w-32">
        <i className="icon-iconly-bold-close-square text-9xl -ml-6" />
      </div>
      <div className="p-4 max-h-32 flex flex-col justify-center">
        <h3 className="text-3xl font-bold tracking-wider">No {type} found!</h3>
        <h4 className="text-xl tracking-wider">
          Search another {type} name or reset the search!
        </h4>
      </div>
    </div>
  );
};

export default PackRowNoResult;
