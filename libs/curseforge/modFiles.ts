import { File, GetModFilesResponse } from "@forged/types";

import { baseApiClean, getCFFileChanglog } from ".";

const fetchFiles = async (modId: number, index = 0) => {
  const response = await baseApiClean(`mods/${modId}/files`, {
    params: { index },
  });
  return response.data as GetModFilesResponse;
};

const getCFModFiles = async (modId: number) => {
  try {
    let files: File[] = [];
    const { data, pagination } = await fetchFiles(modId);
    files = [...files, ...data];

    if (!data.length) return [];

    const max = pagination.totalCount;
    const rest = max - 50;

    if (rest > 0) {
      const loop = Math.ceil(rest / 50);
      const othersFiles: Promise<GetModFilesResponse>[] = [];
      for (let i = 0; i < loop; i++) {
        const res = fetchFiles(modId, (i + 1) * 50);
        othersFiles.push(res);
      }
      const res = await Promise.all(othersFiles);
      files = [...files, ...res.map(({ data }) => data).flat()];
    }

    const lastFile = files[0];
    const changelog = await getCFFileChanglog(modId, lastFile.id);
    files[0]["changelog"] = changelog;

    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { getCFModFiles };
