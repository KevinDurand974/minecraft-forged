import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://api.curseforge.com/v1/",
  headers: {
    "x-api-key": "$2a$10$kfm3Opp19g.ZsRMVw/o06eB.tG8cwgz08YcDtWwhfVCgDR2y3XC8i",
  },
  params: {
    gameId: 432,
  },
});
