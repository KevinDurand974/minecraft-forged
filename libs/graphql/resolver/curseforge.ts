import {
  getCFCategories,
  getCFMods,
  getMinecraftVersionList,
  modpackId,
  modsId,
  resourcepacksId,
} from "@forged/curseforge";
import { GameVersion, ModLoaderType } from "@forged/types";
import { Arg, Query, Resolver } from "type-graphql";

import { CFSearchInput } from "../inputs";
import { Category, ModLoader, Mods, Version } from "../schema";

@Resolver(Mods)
export class CFModsResolver {
  @Query(() => Mods)
  async getModpacks(
    @Arg("args", type => CFSearchInput, { nullable: true }) args: CFSearchInput
  ): Promise<Mods> {
    const res = await getCFMods(modpackId, args);
    if (!res?.data.length) return { mods: [] };
    return {
      mods: res.data,
      pagination: res.pagination,
    };
  }

  @Query(() => Mods)
  async getMods(
    @Arg("args", type => CFSearchInput, { nullable: true }) args: CFSearchInput
  ): Promise<Mods> {
    const res = await getCFMods(modsId, args);
    if (!res?.data.length) return { mods: [] };
    return {
      mods: res.data,
      pagination: res.pagination,
    };
  }

  @Query(() => Mods)
  async getResourcePacks(
    @Arg("args", type => CFSearchInput, { nullable: true }) args: CFSearchInput
  ): Promise<Mods> {
    const res = await getCFMods(resourcepacksId, args);
    if (!res?.data.length) return { mods: [] };
    return {
      mods: res.data,
      pagination: res.pagination,
    };
  }

  @Query(() => Mods)
  async getSearch(
    @Arg("args", type => CFSearchInput, { nullable: true }) args: CFSearchInput
  ): Promise<Mods> {
    const res = await getCFMods(null, args);
    if (!res?.data.length) return { mods: [] };
    return {
      mods: res.data,
      pagination: res.pagination,
    };
  }
}

@Resolver(Version)
export class VersionResolver {
  @Query(() => [Version])
  async getVersions(): Promise<GameVersion[]> {
    return await getMinecraftVersionList();
  }
}

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category], { nullable: true })
  async getCategories() {
    return await getCFCategories();
  }
}
