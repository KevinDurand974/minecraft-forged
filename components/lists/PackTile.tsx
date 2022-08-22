import { Category, Mod } from "@forged/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  pack: Mod;
  categories: Category[];
}

const PackTile: FC<Props> = ({ pack, categories }) => {
  const packClassSlug = () => {
    if (pack?.classId) {
      const category = categories.find(
        category => category.id === pack.classId
      );
      if (category?.slug) return category.slug;
      return "other";
    }
    return "other";
  };

  return (
    <div className="bg-tertiary h-48 w-48 lt-sm:h-36 lt-sm:w-36 m-auto relative group">
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
      <Link href={`${packClassSlug}/${pack.slug}`}>
        <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-90 z-20 shadow-xs shadow-accent cursor-pointer border-2 border-accent opacity-0 pointer-events-none transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
          <i className="icon-window-maximise text-[8rem] group-hover:animate-hover-sized" />
        </div>
      </Link>
    </div>
  );
};

export default PackTile;
