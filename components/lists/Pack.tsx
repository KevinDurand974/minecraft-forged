import { BasicCFSearchPage, Mod } from "@forged/types";
import { FC } from "react";

import PackRows from "./PackRow";
import PackTile from "./PackTile";

interface Props {
  pack: Mod;
  category: BasicCFSearchPage;
  type: "tiles" | "rows";
}

const Pack: FC<Props> = ({ pack, type = "tiles", category }) => {
  if (type === "tiles") return <PackTile pack={pack} type={category} />;
  else if (type === "rows") return <PackRows pack={pack} type={category} />;
  return null;
};

export default Pack;
