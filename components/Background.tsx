import Image from "next/image";
import { FC } from "react";

type Props = {
  num?: string;
};

const Background: FC<Props> = ({ num = "0" }) => {
  const source = `/images/backgrounds/minecraft-${num.padStart(
    2,
    "0"
  )}-compressed.jpg`;
  return (
    <div className="fixed w-screen h-screen top-0 left-0 -z-10">
      <Image
        src={source}
        alt="Random background"
        layout="fill"
        priority
        className="fixed w-screen h-screen pointer-events-none top-0 object-cover opacity-60 blur-md"
      />
      <div className="fixed w-screen top-0 h-screen bg-gradient-to-b from-transparent via-primary to-primary" />
    </div>
  );
};

export default Background;
