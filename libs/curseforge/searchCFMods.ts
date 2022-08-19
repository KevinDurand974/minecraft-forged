import { SearchArgs, SearchModsResponse } from "@forged/types";

import { baseApi, maxItemPerPage } from ".";

export const getCFMods = async (
  classId: number | null,
  args?: Partial<SearchArgs>
): Promise<SearchModsResponse | null> => {
  try {
    const params = {
      classId,
      sortField: 2,
      sortOrder: "desc",
      index: 0,
      pageSize: maxItemPerPage,
      ...args,
    } as Partial<SearchArgs>;

    if (!params.classId) {
      delete params.classId;
    }

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
