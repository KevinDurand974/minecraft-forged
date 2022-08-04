import { getModpacks } from "@forged/curseforge";
import { Arg, Query, Resolver } from "type-graphql";

import { ModpackInput } from "../inputs";
import { Mods } from "../schema/curseforge";

@Resolver(Mods)
export class ModpackResolver {
  @Query(() => Mods)
  async findMany(
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
