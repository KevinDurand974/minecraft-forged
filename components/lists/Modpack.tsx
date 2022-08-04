import { Mod } from "@forged/types";
import Image from "next/image";
import { FC } from "react";

interface Props {
  pack: Mod;
}

const Modpack: FC<Props> = ({ pack }) => {
  return (
    <div className="bg-tertiary h-48 w-48 m-auto relative group">
      <h3 className="absolute bottom-0 left-0 p-2 z-10 bg-black bg-opacity-90 font-bold w-full max-h-full overflow-hidden text-ellipsis">
        {pack.name}
      </h3>
      <div className="relative h-full w-full">
        <Image
          src={pack.logo.thumbnailUrl}
          alt="sdfsdf"
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-90 z-20 shadow-xs shadow-accent cursor-pointer border-2 border-accent opacity-0 pointer-events-none transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <i className="icon-window-maximise text-[150px] group-hover:animate-hover-sized" />
      </div>
    </div>
  );
};

export default Modpack;
