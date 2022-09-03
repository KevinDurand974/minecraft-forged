import {
  File,
  Mod,
  ModLoaderType,
  ModsSearchSortField,
  Pagination,
  SortOrder,
} from "./curseforge";

export * from "./curseforge";

export interface GameVersion {
  version: string;
  list: string[];
}

export interface SearchArgs {
  gameId: number;
  classId: number;
  categoryId: number;
  gameVersion: string;
  searchFilter: string;
  sortField: ModsSearchSortField;
  sortOrder: SortOrder;
  modLoaderType: ModLoaderType;
  gameVersionTypeId: number;
  slug: string;
  index: number;
  pageSize: number;
}

export type DisplayFilter = "tiles" | "rows";

export type BasicCFSearchPage = "modpacks" | "mods" | "resource-packs";

export type CompleteMod = Mod & {
  description: string;
  files: File[];
};

export type Mods = {
  mods: Mod[];
  pagination?: Pagination;
};

export type Version = {
  version: string;
  list: string[];
};

export type ModLoader = {
  name: ModLoaderType;
};
