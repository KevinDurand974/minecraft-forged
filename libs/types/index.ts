import { ReactNode } from "react";

import { ModLoaderType, ModsSearchSortField, SortOrder } from "./curseforge";

export * from "./curseforge";

export interface ChildrenProps {
  children?: ReactNode;
}

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
