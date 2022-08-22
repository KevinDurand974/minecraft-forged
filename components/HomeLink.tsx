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
        <h3 className="home-navigation-text z-10 xl:text-4xl 2xl:text-5xl lg:text-3xl gt-4xl:text-6xl lt-lg:text-2xl">
          {title}
        </h3>
        <div className="gt-xl:w-[350px] gt-lg:w-[250px] gt-4xl:w-[500px] w-[250px] h-full">
          <Image src={source} alt="" layout="responsive" />
        </div>
      </a>
    </Link>
  );
};

export default HomeLink;
