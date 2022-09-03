import { baseApiClean } from ".";

const getCFFileChanglog = async (modId: number, fileId: number) => {
  try {
    const response = await baseApiClean(
      `mods/${modId}/files/${fileId}/changelog`
    );
    const changelog: string = response.data.data;
    if (!changelog.length) return "No changelog...";
    return changelog;
  } catch (err) {
    console.error(err);
    return "No changelog...";
  }
};

export { getCFFileChanglog };
