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
