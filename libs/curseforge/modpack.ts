import { HttpError } from "@forged/Errors";
import {
  ModLoaderType,
  ModsSearchSortField,
  SearchModsResponse,
  SortOrder,
} from "@forged/types";

import { baseApi } from ".";

const modpackCategory = 4471;

interface GetModpackParams {
  sortField: ModsSearchSortField;
  sortOrder: SortOrder;
  modLoader?: ModLoaderType;
  gameVersion?: string;
}

export const getModpacks = async (
  args: GetModpackParams = { sortField: 2, sortOrder: "desc" }
): Promise<SearchModsResponse | null> => {
  const params = { classId: modpackCategory, ...args };
  const response = await baseApi.get("mods/search", { params });
  const data: SearchModsResponse = response.data;

  if (!data) return null;

  return data;
};
