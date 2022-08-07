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

export const maxPage = 499;
export const maxItemPerPage = 20;
export const maxItemForAllPage = maxPage * maxItemPerPage;

export * from "./modpack";
export * from "./version";
