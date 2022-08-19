import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://api.curseforge.com/v1",
  headers: {
    "x-api-key": process.env.CURSEFORGE_API!,
  },
  params: {
    gameId: 432,
  },
});

export const baseApiClean = axios.create({
  baseURL: "https://api.curseforge.com/v1",
  headers: {
    "x-api-key": process.env.CURSEFORGE_API!,
  },
});

const maxResult = 10000;
export const maxItemPerPage = 40;
export const maxPage = Math.ceil(maxResult / maxItemPerPage);
export const maxItemForAllPage = maxPage * maxItemPerPage;

export const modpackId = 4471;
export const modsId = 6;
export const resourcepacksId = 12;

export * from "./category";
export * from "./searchCFMods";
export * from "./version";
