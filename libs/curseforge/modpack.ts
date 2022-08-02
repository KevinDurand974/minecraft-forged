import {
  ModLoaderType,
  ModsSearchSortField,
  SearchModsResponse,
  SortOrder,
} from "@forged/types";

import { baseApi } from ".";

const modpackCategory = 4471;

interface GetModpackParams {
  sortField?: ModsSearchSortField;
  sortOrder?: SortOrder;
  index?: number;
  modLoader?: ModLoaderType;
  gameVersion?: string;
}

export const getModpacks = async (
  args?: GetModpackParams
): Promise<SearchModsResponse | null> => {
  const params = {
    classId: modpackCategory,
    sortField: 2,
    sortOrder: "desc",
    index: 0,
    ...args,
  };
  const response = await baseApi.get("mods/search", { params });
  const data: SearchModsResponse = response.data;

  if (!data) return null;

  return data;
};
