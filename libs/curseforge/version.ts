import {
  GameVersion,
  GetVersionsResponse,
  GetVersionTypesResponse,
} from "@forged/types";

import { baseApiClean } from ".";

const getMinecraftVersionType = async () => {
  try {
    const response = await baseApiClean.get("games/432/version-types");
    const { data }: GetVersionTypesResponse = response.data;
    const versions = data
      .filter(v => /^minecraft-[\d\-]+$/.test(v.slug))
      .map(v => ({ id: v.id, name: v.name.replace("Minecraft ", "") }));
    return versions;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getMinecraftVersion = async () => {
  try {
    const response = await baseApiClean.get("games/432/versions");
    const { data }: GetVersionsResponse = response.data;
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const formatVersion = (version: string) => {
  return Number(version.replace(/\./g, ""));
};

export const getMinecraftVersionList = async () => {
  try {
    const parentVersion = await getMinecraftVersionType();
    const childVersion = await getMinecraftVersion();
    const versions: GameVersion[] = [];
    parentVersion.forEach(parent => {
      const current = childVersion.find(c => c.type === parent.id);
      if (current?.versions.length) {
        const version = [...new Set([parent.name, ...current.versions])];
        versions.push({
          version: parent.name,
          list: version.sort((a, b) => {
            if (a.endsWith("-Snapshot")) return -2;
            if (formatVersion(a) < formatVersion(b)) return -1;
            if (formatVersion(a) > formatVersion(b)) return 1;
            return 0;
          }),
        });
      }
    });
    return versions.sort(
      (a, b) => formatVersion(a.version) - formatVersion(b.version)
    );
  } catch (err) {
    console.error(err);
    return [];
  }
};
