import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  source: StaticImageData;
  title: string;
  link: string;
};

const HomeLink: FC<Props> = ({ source, title, link }) => {
  return (
    <Link href={link}>
      <a className="relative rounded-xl overflow-hidden border-2 border-secondary flex group shadow-tertiary shadow-md transition duration-300 hover:scale-95 hover:shadow-tertiary hover:shadow-lg">
        <h3 className="home-navigation-text z-10">{title}</h3>
        <Image src={source} alt="" className="w-[350px] object-cover h-full" />
      </a>
    </Link>
  );
};

export default HomeLink;
