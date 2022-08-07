import {
  ModLoaderType,
  ModsSearchSortField,
  SearchArgs,
  SearchModsResponse,
  SortOrder,
} from "@forged/types";

import { baseApi, maxItemPerPage } from ".";

const modpackCategory = 4471;

export const getModpacks = async (
  args?: Partial<SearchArgs>
): Promise<SearchModsResponse | null> => {
  const params = {
    classId: modpackCategory,
    sortField: 2,
    sortOrder: "desc",
    index: 0,
    pageSize: maxItemPerPage,
    ...args,
  };
  const response = await baseApi.get("mods/search", { params });
  const data: SearchModsResponse = response.data;

  if (!data) return null;

  return data;
};

export const testModpack = async (args: any = null) => {
  const params = {
    classId: modpackCategory,
    sortField: 2,
    sortOrder: "desc",
    modLoader: 4,
    gameVersion: "1.12.2",
    searchFilter: "nirvana",
  };
  const res = await baseApi.get("mods/search", { params });
  const data: SearchModsResponse = res.data;
  if (!data) return null;
  return data;
};
