import { Category, Mod } from "@forged/types";
import { FC } from "react";

import PackRows from "./PackRow";
import PackTile from "./PackTile";

interface Props {
  pack: Mod;
  type: "tiles" | "rows";
  categories: Category[];
}

const Pack: FC<Props> = ({ pack, type = "tiles", categories }) => {
  if (type === "tiles") return <PackTile pack={pack} categories={categories} />;
  else if (type === "rows")
    return <PackRows pack={pack} categories={categories} />;
  return null;
};

export default Pack;
