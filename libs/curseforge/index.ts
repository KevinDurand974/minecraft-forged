import axios from "axios";

const API =
  process.env.CURSEFORGE_API || process.env.NEXT_PUBLIC_CURSEFORGE_API;

export const baseApi = axios.create({
  baseURL: "https://api.curseforge.com/v1",
  headers: {
    "x-api-key": API!,
  },
  params: {
    gameId: 432,
  },
});

export const baseApiClean = axios.create({
  baseURL: "https://api.curseforge.com/v1",
  headers: {
    "x-api-key": API!,
  },
});

const maxResult = 100; // 10000
export const maxItemPerPage = 20;
export const maxPage = Math.ceil(maxResult / maxItemPerPage);
export const maxItemForAllPage = maxPage * maxItemPerPage;

export const modpackId = 4471;
export const modsId = 6;
export const resourcepacksId = 12;

export * from "./category";
export * from "./changelog";
export * from "./modDescriptions";
export * from "./modFiles";
export * from "./searchCFMods";
export * from "./version";
