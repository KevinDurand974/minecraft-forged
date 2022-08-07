import { Mod } from "@forged/types";
import { FC } from "react";

import ModpackRows from "./ModpackRow";
import ModpackTile from "./ModpackTile";

interface Props {
  pack: Mod;
  type: "tiles" | "rows";
}

const Modpack: FC<Props> = ({ pack, type = "tiles" }) => {
  if (type === "tiles") return <ModpackTile pack={pack} />;
  else if (type === "rows") return <ModpackRows pack={pack} />;
  return null;
};

export default Modpack;
