import { ApiResponseOfListOfMinecraftModLoaderIndex } from "@forged/types";

import { baseApiClean } from ".";

export const getAllModLoaders = async () => {
  try {
    const {
      data: { data },
    } = await baseApiClean.get<ApiResponseOfListOfMinecraftModLoaderIndex>(
      "minecraft/modloader",
      {
        params: {
          includeAll: "true",
        },
      }
    );

    const modloaders = [...new Set(data.map(loader => loader.type))];

    console.log(modloaders);

    return [];
  } catch (err) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>> ERROR");
    console.error(err);
    return [];
  }
};
