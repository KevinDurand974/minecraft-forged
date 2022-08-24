import { baseApiClean } from ".";

const getCFModDescription = async (modId: number) => {
  try {
    const response = await baseApiClean(`mods/${modId}/description`);
    const htmlDescription: string = response.data.data;
    if (!htmlDescription.length) return "";
    return htmlDescription;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export { getCFModDescription };
