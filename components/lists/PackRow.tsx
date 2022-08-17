import { Mod } from "@forged/types";
import { format, formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";

interface Props {
  pack: Mod;
  type: string;
}

const PackRows: FC<Props> = ({ pack, type }) => {
  const [showInfo, setShowInfo] = useState(false);

  const categories = pack.categories.filter(
    (cat, index, self) =>
      index ===
      self.findIndex(t => t.slug === cat.slug && t.iconUrl === cat.iconUrl)
  );

  return (
    <div className="grid modpack-rows justify-between bg-tertiary border-2 border-transparent relative group transition duration-200 hover:border-accent hover:shadow-xs hover:shadow-accent">
      <Link href={`${type}/${pack.slug}`}>
        <a className="relative w-32 h-32 block">
          <Image
            src={pack.logo.thumbnailUrl}
            alt="sdfsdf"
            layout="fill"
            className="object-cover"
          />
        </a>
      </Link>
      <div className="p-4 max-h-32 overflow-hidden">
        <Link href={`${type}/${pack.slug}`}>
          <a className="font-bold text-xl tracking-wider mb-3 w-fit inline-block">
            {pack.name}
          </a>
        </Link>
        {!showInfo ? (
          <p className="max-h-[48px] overflow-hidden text-ellipsis text-sm font-light animate-fadeOutDown">
            {pack.summary}
          </p>
        ) : (
          <div className="flex gap-6 animate-fadeOutDown">
            {categories.map(cat => (
              <Link href={`category/${cat.slug}`} key={cat.id}>
                <a>
                  <div className="relative w-12 h-12 transition duration-200 hover:scale-125">
                    <Image
                      src={cat.iconUrl}
                      alt={cat.name}
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
      <ul className="flex flex-col p-4 whitespace-nowrap justify-between text-lg text-right items-end h-full">
        <li>
          {format(new Date(pack.dateCreated), "MMM d, Y")}{" "}
          <i className="icon-iconly-outline-plus" />
        </li>
        <li>
          {formatDistanceToNowStrict(new Date(pack.dateModified), {
            addSuffix: true,
          })}{" "}
          <i className="icon-iconly-outline-edit" />
        </li>
        <li className="tracking-wider">
          {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
            pack.downloadCount
          )}{" "}
          <i className="icon-iconly-outline-arrow-down-square" />
        </li>
      </ul>
      <div className="flex flex-col relative cursor-pointer">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex justify-center items-center text-3xl bg-gradient-to-r from-t-alt to-transparent border-l-1 border-l-primary shadow-inner shadow-secondary border-b-2 border-b-tertiary h-full hover:bg-gradient-to-l"
        >
          {showInfo ? (
            <i className="icon-iconly-outline-close-square text-accent" />
          ) : (
            <i className="icon-iconly-outline-info-square" />
          )}
        </button>
        <Link href={`${type}/${pack.slug}`}>
          <a className="flex justify-center items-center text-3xl bg-gradient-to-r from-t-alt to-transparent border-l-1 border-primary shadow-inner shadow-secondary h-full hover:bg-gradient-to-l">
            <i className="icon-iconly-curved-show" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PackRows;
