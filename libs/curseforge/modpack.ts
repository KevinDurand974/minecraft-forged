import { SearchArgs, SearchModsResponse } from "@forged/types";

import { baseApi, maxItemPerPage, modpackId } from ".";

export const getModpacks = async (
  args?: Partial<SearchArgs>
): Promise<SearchModsResponse | null> => {
  try {
    const params = {
      classId: modpackId,
      sortField: 2,
      sortOrder: "desc",
      index: 0,
      pageSize: maxItemPerPage,
      ...args,
    };
    const response = await baseApi.get("mods/search", { params });
    const data: SearchModsResponse = response.data;

    if (!data) return null;

    const ddata = data.data.map(mod => {
      const categories = mod.categories.map(cat => {
        if (cat.slug === null || cat.slug === "") {
          cat.slug = cat.name
            .toLowerCase()
            .replace(/\s/g, "")
            .replace(/\W/, "-");
        }
        return cat;
      });
      return { ...mod, categories };
    });

    return { ...data, data: ddata };
  } catch (err) {
    console.error(err);
    return null;
  }
};
