import {
  getAllModLoaders,
  getMinecraftVersionList,
  getModpacks,
} from "@forged/curseforge";
import { GameVersion, ModLoaderType } from "@forged/types";
import { Arg, Query, Resolver } from "type-graphql";

import { ModpackInput } from "../inputs";
import { ModLoader, Mods, Version } from "../schema/curseforge";

@Resolver(Mods)
export class ModpackResolver {
  @Query(() => Mods)
  async getModpacks(
    @Arg("args", type => ModpackInput, { nullable: true }) args: ModpackInput
  ): Promise<Mods> {
    const res = await getModpacks(args);
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

@Resolver(ModLoader)
export class ModLoaderResolver {
  @Query(() => [ModLoader])
  async getModLoaders(): Promise<ModLoaderType[]> {
    return await getAllModLoaders();
  }
}
